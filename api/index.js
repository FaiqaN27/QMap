import express, { urlencoded } from "express";
import dotenv from "dotenv";
import pdfRoute from "./routes/pdf.route.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", pdfRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
