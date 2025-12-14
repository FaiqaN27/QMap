import fs from "fs";

const dir = "node_modules/pdfjs-dist/es5/build/pdf.msj";
const content = fs.readFileSync(dir, { encoding: "utf-8" });
fs.writeFileSync(
  dir,
  content.replace('"./pdf.worker.mjs";', `__dirname + "/pdf.worker.mjs";`)
);
