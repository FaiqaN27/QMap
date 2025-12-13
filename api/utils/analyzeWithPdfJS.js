import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const questionRegex = /(?:Q|Question)\.?\s*\(?\s*(\d+)\s*\)?/gi;
const printedPageRegex = /(\d+)/;

export const analyzeWithPdfJS = async (filePath, fileName) => {
  const doc = await pdfjsLib.getDocument(filePath).promise;

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

    // ✅ Printed Page Detection (Top or Bottom)
    let printedPage = null;
    for (let t of items) {
      if (t.y > pageHeight * 0.9 || t.y < pageHeight * 0.1) {
        const m = t.str.match(printedPageRegex);
        if (m) {
          printedPage = Number(m[1]);
          break;
        }
      }
    }

    if (printedPage != null) {
      printedPageSequence.push(printedPage);
    }

    const fullText = items.map((i) => i.str).join(" ");
    const found = [...fullText.matchAll(questionRegex)].map((m) =>
      Number(m[1])
    );

    if (printedPage != null) {
      if (found.length === 0) {
        pageSummary.push({
          printedPage,
          range: null,
          questionStarts: [],
        });
      } else {
        const min = Math.min(...found);
        const max = Math.max(...found);
        pageSummary.push({
          printedPage,
          range: `${min}-${max}`,
          questionStarts: [...new Set(found)],
        });
      }
    }
  }

  return {
    fileName,
    totalPages: doc.numPages,
    printedPageSequence,
    pageSummary,
  };
};
