// Import jsPDF for PDF generation
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

/**
 * Generate a PDF voucher/brochure for a tour/package
 * @param {object} item - The tour or package data
 * @param {string} type - The type of package (tour, hajj, umrah)
 * @returns {Promise<Blob>} - The generated PDF as a Blob
 */
export const generatePackagePDF = (item, type = "tour") => {
  return new Promise((resolve) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Add company logo and header
    // In a real implementation, you would add your company logo here
    doc.setFontSize(20);
    doc.setTextColor(10, 34, 64); // primary color
    doc.text("Amana Tours & Travels", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("A Journey With Trust", 105, 28, { align: "center" });
    
    // Add a horizontal line
    doc.setDrawColor(242, 156, 31); // secondary color
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Package title
    doc.setFontSize(16);
    doc.setTextColor(10, 34, 64);
    doc.text(item.title, 105, 45, { align: "center" });
    
    // Package image if available
    if (item.images && item.images.length > 0) {
      try {
        // In a real implementation, you'd need to load the image properly
        // This is a simplified placeholder
        // const img = new Image();
        // img.src = `${process.env.NEXT_PUBLIC_API_URL}/images/${type}/${item.images[0]}`;
        // doc.addImage(img, 'JPEG', 20, 50, 170, 80);
        
        // For now, we'll just add a placeholder text
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text("* Package image would appear here *", 105, 60, { align: "center" });
      } catch (err) {
        console.error("Error adding image to PDF:", err);
      }
    }
    
    // Package details
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    
    // Y position tracker
    let yPos = 75;
    
    // Package type-specific information
    if (type === "tour") {
      // Destination
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Destination:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      doc.text(item.destination || "N/A", 70, yPos);
      yPos += 10;
      
      // Duration
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Duration:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      
      if (item.startDate && item.endDate) {
        const startDate = new Date(item.startDate).toLocaleDateString();
        const endDate = new Date(item.endDate).toLocaleDateString();
        doc.text(`${startDate} - ${endDate}`, 70, yPos);
      } else {
        doc.text("N/A", 70, yPos);
      }
      yPos += 10;
      
      // Price
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Price per person:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      doc.text(`${item.currency || "৳"} ${item.pricePerPerson?.toLocaleString() || "N/A"}`, 70, yPos);
      yPos += 15;
    } else if (type === "hajj") {
      // Hajj Year
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Hajj Year:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      doc.text(item.hajjYear || "N/A", 70, yPos);
      yPos += 10;
      
      // Duration
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Duration:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      doc.text(item.duration || "N/A", 70, yPos);
      yPos += 10;
      
      // Price
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Starting Price:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      doc.text(`৳ ${item.startingPrice?.toLocaleString() || "N/A"}`, 70, yPos);
      yPos += 15;
    } else if (type === "umrah") {
      // Duration
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Duration:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      doc.text(item.duration || "N/A", 70, yPos);
      yPos += 10;
      
      // Group Size
      if (item.minimumGroupSize) {
        doc.setFontSize(14);
        doc.setTextColor(10, 34, 64);
        doc.text("Group Size:", 20, yPos);
        doc.setTextColor(60, 60, 60);
        doc.text(`Min ${item.minimumGroupSize} people`, 70, yPos);
        yPos += 10;
      }
      
      // Price
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Starting Price:", 20, yPos);
      doc.setTextColor(60, 60, 60);
      doc.text(`৳ ${item.startingPrice?.toLocaleString() || "N/A"}`, 70, yPos);
      yPos += 15;
    }
    
    // Description
    doc.setFontSize(14);
    doc.setTextColor(10, 34, 64);
    doc.text("Description:", 20, yPos);
    yPos += 7;
    
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    
    // Handle long descriptions with text wrapping
    const splitDescription = doc.splitTextToSize(item.description || "No description available", 170);
    doc.text(splitDescription, 20, yPos);
    yPos += (splitDescription.length * 7) + 10;
    
    // Package includes/excludes as a table
    if (item.packageIncludes && item.packageIncludes.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Package Includes:", 20, yPos);
      yPos += 7;
      
      // Create a table for package includes
      autoTable(doc, {
        startY: yPos,
        head: [],
        body: item.packageIncludes.map(include => [include]),
        theme: 'grid',
        headStyles: { fillColor: [10, 34, 64] },
        margin: { left: 20, right: 20 },
        tableWidth: 170,
      });
      
      // Update Y position after table
      yPos = doc.lastAutoTable.finalY + 10;
    }
    
    if (item.packageExcludes && item.packageExcludes.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Package Excludes:", 20, yPos);
      yPos += 7;
      
      // Create a table for package excludes
      autoTable(doc, {
        startY: yPos,
        head: [],
        body: item.packageExcludes.map(exclude => [exclude]),
        theme: 'grid',
        headStyles: { fillColor: [10, 34, 64] },
        margin: { left: 20, right: 20 },
        tableWidth: 170,
      });
      
      // Update Y position after table
      yPos = doc.lastAutoTable.finalY + 10;
    }
    
    // Itinerary if available
    if (item.itinerary && item.itinerary.length > 0) {
      // Add a new page if we're running out of space
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(10, 34, 64);
      doc.text("Itinerary:", 20, yPos);
      yPos += 7;
      
      // Create a table for the itinerary
      const itineraryData = item.itinerary.map(day => [
        `Day ${day.day}`,
        day.activities,
        day.accommodation ? `Accommodation: ${day.accommodation}` : ""
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Day', 'Activities', 'Accommodation']],
        body: itineraryData,
        theme: 'grid',
        headStyles: { fillColor: [10, 34, 64] },
        margin: { left: 20, right: 20 },
        tableWidth: 170,
      });
      
      // Update Y position after table
      yPos = doc.lastAutoTable.finalY + 10;
    }
    
    // Footer with contact information
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Add a horizontal line
      doc.setDrawColor(242, 156, 31);
      doc.setLineWidth(0.5);
      doc.line(20, 280, 190, 280);
      
      // Contact info
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text("Amana Tours & Travels | Phone: +880 1324-418968", 105, 287, { align: "center" });
      doc.text("Email: amanatours&travel.com | www.amanatourstravel.com", 105, 293, { align: "center" });
      
      // Page numbers
      doc.text(`Page ${i} of ${pageCount}`, 185, 280, { align: "right" });
    }
    
    // Generate the PDF as a blob and resolve the promise
    const pdfBlob = doc.output('blob');
    resolve(pdfBlob);
  });
};

/**
 * Download the PDF with the given filename
 * @param {Blob} pdfBlob - The PDF blob to download
 * @param {string} filename - The name of the downloaded file
 */
export const downloadPDF = (pdfBlob, filename) => {
  // Create a URL for the blob
  const blobUrl = URL.createObjectURL(pdfBlob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  
  // Append the link to the body
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};

/**
 * Generate and download a package PDF
 * @param {object} item - The tour or package data
 * @param {string} type - The type of package (tour, hajj, umrah)
 */
export const generateAndDownloadPDF = async (item, type = "tour") => {
  try {
    // Generate the PDF
    const pdfBlob = await generatePackagePDF(item, type);
    
    // Create a filename
    const sanitizedTitle = (item.title || "package").replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${type}_${sanitizedTitle}.pdf`;
    
    // Download the PDF
    downloadPDF(pdfBlob, filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF. Please try again.");
  }
};

export default {
  generatePackagePDF,
  downloadPDF,
  generateAndDownloadPDF
};