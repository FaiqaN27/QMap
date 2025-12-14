import { Canvas, Image, ImageData } from "@napi-rs/canvas";

global.Image = Image;
global.ImageData = ImageData;
global.DOMMatrix = global.DOMMatrix || class DOMMatrix {};
global.Path2D = global.Path2D || class Path2D {};

// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
// import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs/promises";

const questionRegex = /(?:Q|Question)\.?\s*\(?\s*(\d+)\s*\)?/gi;
const printedPageRegex =
  /^(?:page|p\.?)?\s*[\(\[\-]?\s*(\d{1,4})\s*(?:of\s*\d{1,4})?[\)\]\-]?\s*$/i;

export const analyzeWithPdfJS = async (filePath, fileName) => {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const fileBuffer = await fs.readFile(filePath);

  const doc = await pdfjsLib.getDocument({
    data: new Uint8Array(fileBuffer),
    disableWorker: true,
  }).promise;

  const printedPageSequence = [];
  const pageSummary = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const pageHeight = viewport.height;

    const text = await page.getTextContent();
    const items = text.items.map((it) => ({
      str: it.str.trim(),
      y: it.transform[5],
    }));

    // Full text of page
    const fullText = items
      .map((i) => i.str)
      .join(" ")
      .trim();

    // Printed Page Detection (Top/Bottom)
    let printedPage = null;
    for (let t of items) {
      if (t.y > pageHeight * 0.9 || t.y < pageHeight * 0.1) {
        const m = t.str.match(printedPageRegex);
        if (m) {
          //m[1] -> regex capturing group
          printedPage = Number(m[1]);
          break;
        }
      }
    }

    if (printedPage != null) {
      printedPageSequence.push(printedPage);
    }

    const found = [...fullText.matchAll(questionRegex)].map((m) =>
      Number(m[1])
    );

    let range = null;
    let questionStarts = [];
    let summaryLabel = "No questions on this page";

    if (found.length > 0) {
      const min = Math.min(...found);
      const max = Math.max(...found);
      range = `${min}-${max}`;
      questionStarts = [...new Set(found)];
      summaryLabel = `Question ${range}`;
    }

    pageSummary.push({
      printedPage: printedPage ?? `PDF-${i}`,
      summaryLabel,
    });
  }

  return {
    fileName,
    totalPages: doc.numPages,
    printedPageSequence,
    pageSummary,
  };
};
