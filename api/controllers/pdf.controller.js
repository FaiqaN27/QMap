import path from "path";
import fs from "fs/promises";
import { analyzeWithPdfJS } from "../utils/analyzeWithPdfJS.js";

export const handlePdfAnalyze = async (req, res) => {
  try {
    const files = req.files || [];
    const results = [];

    await Promise.all(
      files.map(async (file) => {
        const result = await analyzeWithPdfJS(file.path, file.originalname);

        results.push(result);

        await fs.unlink(file.path).catch((e) => {
          console.error("File cleanup failed:", e.message);
        });
      })
    );

    res.status(200).json({ success: true, results });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
