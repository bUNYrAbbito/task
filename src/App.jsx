
import React, { useRef, useState } from "react";
import Pdf from "./com/pdf.jsx";
import ItineraryForm from "./pdfcompo/Form.jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import footerLogo from "./assets/Group 1618874137.png";
// footer removed

function App() {
  const pdfRef = useRef(null);
  const [data, setData] = useState({
    travelerName: "",
    originCity: "",
    destinationCity: "",
    departureDate: "",
    arrivalDate: "",
    numNights: "",
    numTravelers: "",
    days: [],
    flights: [],
    bookings: [],
    notes: [],
    services: [],
    paymentPlan: { totalAmount: "", tcsNote: "", installments: [] },
  });
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    const node = pdfRef.current;
    if (!node) return;

    // A4 capture
    const canvas = await html2canvas(node, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");

    // Create A4 portrait PDF (mm units)
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate image dimensions with side margins while keeping aspect ratio
    const sideMarginPx = 20; // requested ~20px margins left/right
    const sideMarginMm = (sideMarginPx / 96) * 25.4; // convert px@96dpi to mm ≈ 5.29mm
    const contentWidth = pageWidth - sideMarginMm * 2;
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Reserve 20% of page height for a fixed footer image each page
    const footerHeight = pageHeight * 0.15; // 20%
    const contentHeight = pageHeight - footerHeight; // 80%

    // Load footer logo and convert to data URL for jsPDF
    async function loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    }
    const logoImg = await loadImage(footerLogo);
    const logoCanvas = document.createElement("canvas");
    logoCanvas.width = logoImg.naturalWidth;
    logoCanvas.height = logoImg.naturalHeight;
    const lc = logoCanvas.getContext("2d");
    lc.drawImage(logoImg, 0, 0);
    const logoData = logoCanvas.toDataURL("image/png");

    // Determine total pages and draw image slices (respecting footer space)
    const totalPages = Math.max(1, Math.ceil(imgHeight / contentHeight));
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) pdf.addPage();
      const positionY = -pageIndex * contentHeight; // shift by content area so footer remains free
      pdf.addImage(imgData, "PNG", sideMarginMm, positionY, imgWidth, imgHeight);

      // Mask the footer area to avoid any content overlap, then draw footer image
      const footerY = pageHeight - footerHeight;
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, footerY, pageWidth, footerHeight, "F");
      // Scale logo to fit within footer area, keep aspect, and align right; add some padding
      const padding = 6;
      const maxLogoWidth = pageWidth - padding * 2;
      const maxLogoHeight = footerHeight - padding * 2;
      const logoAspect = logoImg.naturalWidth > 0 ? logoImg.naturalWidth / logoImg.naturalHeight : 4;
      let drawW = maxLogoWidth;
      let drawH = drawW / logoAspect;
      if (drawH > maxLogoHeight) {
        drawH = maxLogoHeight;
        drawW = drawH * logoAspect;
      }
      const drawX = pageWidth - drawW - padding; // right align
      const drawY = footerY + (footerHeight - drawH) / 2; // vertically centered in footer area
      pdf.addImage(logoData, "PNG", drawX, drawY, drawW, drawH);
    }

    const fileName = `itinerary-${data?.travelerName || "guest"}.pdf`;
    pdf.save(fileName);
    setDownloading(false);
  }

  return (
    <>
      <div style={{ padding: 16, display: "grid", gap: 16 }}>
        <ItineraryForm initialData={data} onChange={setData} onGeneratePdf={handleDownload} downloading={downloading} />
        {/* Hidden render target for PDF capture */}
        <div style={{ position: "absolute", left: -99999, top: 0 }}>
          <div ref={pdfRef} style={{ width: 794, minHeight: 1123, background: "#ffffff" }}>
            <Pdf ref={pdfRef} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
