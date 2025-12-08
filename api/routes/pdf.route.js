import express from "express";
import handlePdfAnalyze from "./../controllers/pdf.controller";

const router = express.Router();

router.post("/analyze", handlePdfAnalyze);

export default router;
