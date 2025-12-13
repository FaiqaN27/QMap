import path from "path";
import fs from "fs/promises";
import { analyzeWithPdfJS } from "../utils/analyzeWithPdfJS.js";

export const handlePdfAnalyze = async (req, res) => {
  try {
    const files = req.files || [];
    const results = [];

    for (const file of files) {
      const filePath = path.resolve(file.path);
      const result = await analyzeWithPdfJS(filePath, file.originalname);
      results.push(result);
      try {
        await fs.unlink(filePath);
      } catch (cleanupErr) {
        console.error("Failed to delete file", cleanupErr);
      }
    }

    res.status(200).json({ success: true, results });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
