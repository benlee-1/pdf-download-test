import express from "express";
import { generatePDF } from "./src/createPdf.js";
const app = express();

app.get("/pdf-make", (req, res) => {
  const pdfDoc = generatePDF();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
  pdfDoc.pipe(res);
  pdfDoc.end();
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
