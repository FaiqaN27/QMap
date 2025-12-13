import express from "express";
import { handlePdfAnalyze } from "../controllers/pdf.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/analyze-pdf", upload.array("pdfs"), handlePdfAnalyze);

export default router;
