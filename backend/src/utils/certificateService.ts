import PDFDocument from "pdfkit";
import { uploadPdfToCloudinary } from "./clodinaryServices";

export const generateAndUploadCertificate = async (
  studentName: string,
  courseName: string,
  folder: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const chunks: Uint8Array[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", async () => {
        const pdfBuffer = Buffer.concat(chunks);

        const pdfUrl = await uploadPdfToCloudinary(pdfBuffer, folder);
        resolve(pdfUrl);
      });

      doc.on("error", (err) => reject(err));

      doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50)
      .lineWidth(2)
      .stroke("#bfa46f");

    // Tutoriam logo-style header (top-left)
    // doc
    //   .font("Helvetica-Bold")
    //   .fontSize(24)
    //   .fillColor("#2c3e50")
    //   .text("Tutoriam", 50, 40);

    // Title centered
    doc
      .font("Times-Bold")
      .fontSize(28)
      .fillColor("#bfa46f")
      .text("Certificate of Completion", 0, 120, {
        align: "center",
      });

    // Watermark
    // doc
    //   .fillColor("#eeeeee")
    //   .font("Times-BoldItalic")
    //   .fontSize(100)
    //   .opacity(0.1)
    //   .rotate(-20, { origin: [150, 300] })
    //   .text("Tutoriam", 100, 230, {
    //     align: "center",
    //   })
    //   .rotate(0)
    //   .opacity(1);

    // Student Name
    doc
      .font("Helvetica")
      .fontSize(16)
      .fillColor("#333")
      .text("This is to certify that", 0, 250, { align: "center" });

    doc
      .font("Times-Bold")
      .fontSize(24)
      .fillColor("#000")
      .text(studentName, 0, 280, { align: "center" });

    doc
      .font("Helvetica")
      .fontSize(16)
      .text("has successfully completed the course", 0, 310, {
        align: "center",
      });

    doc
      .font("Times-Italic")
      .fontSize(20)
      .fillColor("#000")
      .text(courseName, 0, 340, { align: "center" });

      doc
      .font("Times-Italic")
      .fontSize(16)
      .fillColor("#333")
      .text("From Tutoriam", 0, 370, { align: "center" });  

    // Signature line and date
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#000")
      .text("________________________", 50, 620);
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Instructor", 50, 640);

    doc
      .font("Helvetica-Oblique")
      .fontSize(12)
      .text(`Date: ${new Date().toLocaleDateString()}`, doc.page.width - 150, 640);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
