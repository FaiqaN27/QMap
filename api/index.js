import express from "express";
import dotenv from "dotenv";
import pdfRoute from "./routes/pdf.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const corsOption = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", pdfRoute);

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
}
