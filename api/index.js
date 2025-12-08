import express from "express";
import dotenv from "dotenv";
import pdfRoute from "./routes/pdf.route.js";

dotenv.config();
const app = express();

app.use("/api/pdf", pdfRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
