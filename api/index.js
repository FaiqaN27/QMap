import express, { urlencoded } from "express";
import dotenv from "dotenv";
import pdfRoute from "./routes/pdf.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const corsOption = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-type", "Authorization"],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", pdfRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
