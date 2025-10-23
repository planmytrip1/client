import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ✅ Attach plugin manually
jsPDF.autoTable = autoTable;

export const generateAndDownloadPDF = (data, type) => {
  const doc = new jsPDF();

  // Set common PDF styles
  doc.setFont('helvetica');

  switch (type) {
    case "tour":
      generateTourPDF(doc, data);
      break;
    case "hajj":
      generateHajjPDF(doc, data);
      break;
    case "umrah":
      generateUmrahPDF(doc, data);
      break;
    default:
      generateGenericPDF(doc, data);
  }

  // Download the PDF with a formatted name
  doc.save(`${type}-${data.title.replace(/\s+/g, '-').toLowerCase()}-details.pdf`);
};

// Header Design: Company name and tagline
const addHeader = (doc) => {
  // Gradient-like background using rectangles
  doc.setFillColor(41, 128, 185); // Blue tone
  doc.rect(0, 0, 210, 25, "F"); // full-width header bar

  // Company Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('Amana Tours and Travels', 105, 12, { align: 'center' });

  // Tagline
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(230, 230, 230);
  doc.text('A Journey with Trust', 105, 19, { align: 'center' });

  // Leave a little space for rest of content
  doc.setTextColor(0, 0, 0);
  return 30; // starting y position for next section
};


// Helper function to add section header
const addSectionTitle = (doc, title, y) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(44, 62, 80); // Dark blue color
  doc.text(title, 14, y);
  doc.setDrawColor(41, 128, 185); // Blue line
  doc.setLineWidth(0.5);
  doc.line(14, y + 1, 196, y + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  return y + 10;
};

// Helper to add list items
const addListItems = (doc, items, y, title) => {
  if (!items || items.length === 0) return y;

  y = addSectionTitle(doc, title, y);

  items.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(10);
    doc.text(`• ${item}`, 18, y);
    y += 6;
  });

  return y + 5;
};

// Tour PDF Generator
const generateTourPDF = (doc, tourData) => {

  let y = addHeader(doc);
  y += 10;

  // Header with logo and title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('TOUR PACKAGE DETAILS', 105, y, { align: 'center' });

  // Title and basic info
  y += 10
  doc.setFontSize(16);
  doc.text(tourData.title, 105, y, { align: 'center' });

  // Move down again before next section
  y += 15;

  // Basic details section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Destination:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(tourData.destination || 'Not specified', 50, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Duration:', 14, y);
  doc.setFont('helvetica', 'normal');
  const startDate = new Date(tourData.startDate).toLocaleDateString();
  const endDate = new Date(tourData.endDate).toLocaleDateString();
  doc.text(`${startDate} to ${endDate}`, 50, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Price per person:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${tourData.currency || 'BDT'} ${tourData.pricePerPerson}`, 50, y);
  y += 15;

  // Description
  y = addSectionTitle(doc, 'Description', y);
  doc.setFontSize(10);
  const descriptionLines = doc.splitTextToSize(tourData.description || 'No description available.', 180);
  doc.text(descriptionLines, 14, y);
  y += descriptionLines.length * 5 + 10;

  // Locations
  if (tourData.locations && tourData.locations.length > 0) {
    y = addSectionTitle(doc, 'Locations', y);
    const locationText = tourData.locations.join(', ');
    const locationLines = doc.splitTextToSize(locationText, 180);
    doc.text(locationLines, 14, y);
    y += locationLines.length * 5 + 10;
  }

  // Itinerary
  if (tourData.itinerary && tourData.itinerary.length > 0) {
    y = addSectionTitle(doc, 'Itinerary', y);

    tourData.itinerary.forEach((day, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`Day ${day.day}`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const activityLines = doc.splitTextToSize(day.activities, 180);
      doc.text(activityLines, 14, y + 5);

      y += activityLines.length * 5 + 10;

      if (day.accommodation) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(`Accommodation: ${day.accommodation}`, 18, y);
        y += 6;
      }

      y += 5;
    });
  }

  // Package Includes
  y = addListItems(doc, tourData.packageIncludes, y, 'Package Includes');

  // Package Excludes
  y = addListItems(doc, tourData.packageExcludes, y, 'Package Excludes');

  // Available Coupons
  if (tourData.coupons && tourData.coupons.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Available Coupons', y);

    tourData.coupons.forEach((coupon, index) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(coupon.name, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const discountText = coupon.type === 'percentage' ? `${coupon.value}% discount` : `${tourData.currency} ${coupon.value} off`;
      doc.text(discountText, 14, y + 5);
      y += 12;
    });
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('Contact for booking: +880 1324-418968', 105, 285, { align: 'center' });
  }
};

// Hajj PDF Generator
const generateHajjPDF = (doc, hajjData) => {
  let y = addHeader(doc);
  y += 10;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('HAJJ PACKAGE DETAILS', 105, y, { align: 'center' });

  // Title and basic info
  y += 10;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(hajjData.title, 105, y, { align: 'center' });

  y += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Hajj Year: ${hajjData.hajjYear}`, 105, y, { align: 'center' });

  // Move down again before next section
  y += 15;


  // Basic details section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Duration:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(hajjData.duration || 'Not specified', 80, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Starting Price:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`Taka ${hajjData.startingPrice.toLocaleString()}`, 80, y);
  y += 15;

  // Description
  y = addSectionTitle(doc, 'Description', y);
  doc.setFontSize(10);
  const descriptionLines = doc.splitTextToSize(hajjData.description || 'No description available.', 180);
  doc.text(descriptionLines, 14, y);
  y += descriptionLines.length * 5 + 10;

  // Hajj Accommodations
  if (hajjData.hajjAccommodations) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Hajj Accommodations', y);

    const accommodations = [
      { name: 'Mina', data: hajjData.hajjAccommodations.mina },
      { name: 'Arafat', data: hajjData.hajjAccommodations.arafat },
      { name: 'Muzdalifah', data: hajjData.hajjAccommodations.muzdalifah }
    ];

    accommodations.forEach(acc => {
      if (acc.data) {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(acc.name, 14, y);
        y += 6;

        if (acc.data.accommodationType) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`Type: ${acc.data.accommodationType}`, 18, y);
          y += 5;
        }

        if (acc.data.distance) {
          doc.setFontSize(10);
          doc.text(`Distance: ${acc.data.distance}`, 18, y);
          y += 5;
        }

        if (acc.data.amenities && acc.data.amenities.length) {
          doc.setFontSize(10);
          doc.text(`Amenities: ${acc.data.amenities.join(', ')}`, 18, y);
          y += 10;
        } else {
          y += 5;
        }
      }
    });
  }

  // Kurbani Details
  if (hajjData.kurbani) {
    y = addSectionTitle(doc, 'Kurbani Details', y);

    doc.setFontSize(10);
    doc.text(`Included: ${hajjData.kurbani.included ? 'Yes' : 'No'}`, 14, y);
    y += 5;

    if (hajjData.kurbani.included && hajjData.kurbani.type) {
      doc.text(`Type: ${hajjData.kurbani.type}`, 14, y);
      y += 10;
    } else {
      y += 5;
    }
  }

  // Package Includes
  y = addListItems(doc, hajjData.packageIncludes, y, 'Package Includes');

  // Package Excludes
  y = addListItems(doc, hajjData.packageExcludes, y, 'Package Excludes');

  // Pricing Table
  if (hajjData.pricing && hajjData.pricing.length > 0) {
    if (y > 200) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Pricing Details', y);

    const pricingData = [];
    hajjData.pricing.forEach(packageItem => {
      packageItem.priceDetails.forEach((detail, index) => {
        pricingData.push([
          index === 0 ? packageItem.packageType : '',
          detail.accommodationType,
          `Tk ${detail.price.toLocaleString()}`
        ]);
      });
    });

    autoTable(doc, {
      startY: y,
      head: [['Package Type', 'Accommodation Type', 'Price (BDT)']],
      body: pricingData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }
    });

    y = doc.lastAutoTable.finalY + 10;
  }

  // Policies
  if (hajjData.policies) {
    if (y > 220) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Policies', y);

    const policyTypes = [
      { key: 'payment', name: 'Payment Policy' },
      { key: 'cancellation', name: 'Cancellation Policy' },
      { key: 'visa', name: 'Visa Policy' },
      { key: 'general', name: 'General Policy' }
    ];

    policyTypes.forEach(policy => {
      if (hajjData.policies[policy.key] && hajjData.policies[policy.key].length > 0) {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(policy.name, 14, y);
        y += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        hajjData.policies[policy.key].forEach((item, index) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }

          const itemLines = doc.splitTextToSize(`• ${item}`, 180);
          doc.text(itemLines, 18, y);
          y += itemLines.length * 5 + 2;
        });

        y += 5;
      }
    });
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('Contact for booking: +880 1324-418968', 105, 285, { align: 'center' });
  }
};

// Umrah PDF Generator
const generateUmrahPDF = (doc, umrahData) => {

  let y = addHeader(doc);
  y += 10;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('UMRAH PACKAGE DETAILS', 105, y, { align: 'center' });

  // Title and basic info
  y += 10;
  doc.setFontSize(16);
  doc.text(umrahData.title, 105, y, { align: 'center' });

  // Move down again before next section
  y += 15;

  // Basic details section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Duration:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(umrahData.duration || 'Not specified', 80, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Starting Price:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`Taka ${umrahData.startingPrice.toLocaleString()}`, 80, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Group Size:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(umrahData.minimumGroupSize > 0 ? `Minimum ${umrahData.minimumGroupSize} people` : 'Individual/Group', 80, y);
  y += 15;

  // Description
  y = addSectionTitle(doc, 'Description', y);
  doc.setFontSize(10);
  const descriptionLines = doc.splitTextToSize(umrahData.description || 'No description available.', 180);
  doc.text(descriptionLines, 14, y);
  y += descriptionLines.length * 5 + 10;

  // Travel Dates
  if (umrahData.dateOptions && umrahData.dateOptions.groupTravelDates && umrahData.dateOptions.groupTravelDates.length > 0) {
    y = addSectionTitle(doc, 'Group Travel Dates', y);

    umrahData.dateOptions.groupTravelDates.forEach((date, index) => {
      doc.setFontSize(10);
      doc.text(`• ${date}`, 14, y);
      y += 6;
    });

    doc.text(`Custom Dates Available: ${umrahData.dateOptions.customDatesAvailable ? 'Yes' : 'No'}`, 14, y);
    y += 10;
  }

  // Package Includes
  y = addListItems(doc, umrahData.packageIncludes, y, 'Package Includes');

  // Package Excludes
  y = addListItems(doc, umrahData.packageExcludes, y, 'Package Excludes');

  // Umrah Requirements
  if (umrahData.umrahRequirements) {
    if (y > 220) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Umrah Requirements', y);

    if (umrahData.umrahRequirements.passport) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Passport Requirements:', 14, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Passport Validity: ${umrahData.umrahRequirements.passport.validityRequired}`, 18, y);
      y += 5;

      if (umrahData.umrahRequirements.passport.additionalRequirements && umrahData.umrahRequirements.passport.additionalRequirements.length > 0) {
        umrahData.umrahRequirements.passport.additionalRequirements.forEach((req, index) => {
          const reqLines = doc.splitTextToSize(`• ${req}`, 175);
          doc.text(reqLines, 18, y);
          y += reqLines.length * 5 + 2;
        });
      }

      y += 5;
    }

    if (umrahData.umrahRequirements.photos) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Photo Requirements:', 14, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Quantity: ${umrahData.umrahRequirements.photos.quantity} photo(s)`, 18, y);
      y += 5;

      if (umrahData.umrahRequirements.photos.specifications && umrahData.umrahRequirements.photos.specifications.length > 0) {
        umrahData.umrahRequirements.photos.specifications.forEach((spec, index) => {
          const specLines = doc.splitTextToSize(`• ${spec}`, 175);
          doc.text(specLines, 18, y);
          y += specLines.length * 5 + 2;
        });
      }

      y += 5;
    }
  }

  // Flight Options
  if (umrahData.flightOptions) {
    if (y > 220) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Flight Options', y);

    doc.setFontSize(10);
    doc.text(`Direct Flight: ${umrahData.flightOptions.directFlight ? 'Available' : 'Not available'}`, 14, y);
    y += 5;

    doc.text(`Transit Flight: ${umrahData.flightOptions.transitFlight ? 'Available' : 'Not available'}`, 14, y);
    y += 5;

    doc.text(`Departure City: ${umrahData.flightOptions.departureCity || 'Dhaka'}`, 14, y);
    y += 5;

    doc.text(`Arrival City: ${umrahData.flightOptions.arrivalCity || 'Jeddah/Madinah'}`, 14, y);
    y += 8;

    if (umrahData.flightOptions.airlines && umrahData.flightOptions.airlines.length > 0) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Available Airlines:', 14, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(umrahData.flightOptions.airlines.join(', '), 18, y);
      y += 10;
    }
  }

  // Meals Info
  if (umrahData.meals) {
    if (y > 220) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Meals Information', y);

    doc.setFontSize(10);
    doc.text(`Status: ${umrahData.meals.included ? 'Included' : 'Not included'}`, 14, y);
    y += 5;

    if (umrahData.meals.mealPlan) {
      doc.text(`Meal Plan: ${umrahData.meals.mealPlan}`, 14, y);
      y += 5;
    }

    if (umrahData.meals.approximateCost) {
      doc.text(`Approximate Cost: ${umrahData.meals.approximateCost}`, 14, y);
      y += 5;
    }

    if (umrahData.meals.menuOptions && umrahData.meals.menuOptions.length > 0) {
      doc.text('Menu Options:', 14, y);
      y += 5;

      umrahData.meals.menuOptions.forEach((option, index) => {
        doc.text(`• ${option}`, 18, y);
        y += 5;
      });

      y += 5;
    }
  }

  // Pricing Table
  if (umrahData.pricing && umrahData.pricing.length > 0) {
    if (y > 200) {
      doc.addPage();
      y = 20;
    }

    y = addSectionTitle(doc, 'Pricing Details', y);

    const pricingData = [];
    umrahData.pricing.forEach(price => {
      price.priceDetails.forEach((detail, i) => {
        pricingData.push([
          i === 0 ? price.packageType : '',
          detail.accommodationType,
          `Tk ${detail.price.toLocaleString()}`
        ]);
      });
    });

    autoTable(doc, {
      startY: y,
      head: [['Package Type', 'Accommodation Type', 'Price (BDT)']],
      body: pricingData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [76, 175, 80], textColor: [255, 255, 255] }
    });

    y = doc.lastAutoTable.finalY + 10;
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('Contact for booking: +880 1324-418968', 105, 285, { align: 'center' });
  }
};

// Generic PDF fallback
const generateGenericPDF = (doc, data) => {
  // Basic PDF with just the title and description
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('PACKAGE DETAILS', 105, 15, { align: 'center' });

  doc.setFontSize(16);
  doc.text(data.title || 'Package Information', 105, 25, { align: 'center' });

  let y = 40;

  // Description
  if (data.description) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Description:', 14, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const descriptionLines = doc.splitTextToSize(data.description, 180);
    doc.text(descriptionLines, 14, y);
  }

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text('Contact for booking: +880 1324-418968', 105, 285, { align: 'center' });
  doc.text('Page 1 of 1', 105, 290, { align: 'center' });
};