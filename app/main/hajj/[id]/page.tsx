"use client";

import { useGetHajjByIdQuery } from "@/store/features/api/HajjApi";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Calendar, DollarSign, CheckCircle, XCircle, Tag, Star, Download, Users, MapPin, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { use } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import HotelDetails from "@/components/common/HotelDetails";
import ItineraryTimeline from "@/components/common/ItineraryTimeline";
import HajjAccommodationDetails from "@/components/hajj/HajjAccommodationDetails";
import ReviewSection from "@/components/common/ReviewSection";
import { generateAndDownloadPDF } from "@/utils/pdfService";
import BookingForm from "@/components/common/BookingForm";
import { motion, AnimatePresence } from "framer-motion"; // Import for animations

export default function HajjDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params instanceof Promise ? params : Promise.resolve(params));
  const { data: hajj, isLoading, error } = useGetHajjByIdQuery(resolvedParams.id);

 type TabKey = "overview" | "itinerary" | "accommodation" | "hotels" | "policies";

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Carousel navigation
  const nextImage = () => {
    if (hajj?.images?.length) {
      setActiveImage((prev) => (prev === hajj.images!.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (hajj?.images?.length) {
      setActiveImage((prev) => (prev === 0 ? hajj.images!.length - 1 : prev - 1));
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!hajj?.images || hajj.images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [hajj, activeImage]);

  // Handle download brochure
  const handleDownloadBrochure = () => {
    if (hajj) {
      generateAndDownloadPDF(hajj, "hajj");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <LoadingSpinner />
        <p className="mt-2 text-gray-600">Loading hajj package details...</p>
      </div>
    );
  }

  if (error || !hajj) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">Failed to load hajj package details</p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Tab content components with animation
  const tabContent = {
    overview: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-700 mb-6">{hajj.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Includes */}
          {hajj.packageIncludes && hajj.packageIncludes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Package Includes</h2>
              <ul className="space-y-2">
                {hajj.packageIncludes.map((item, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-hajj mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Excludes */}
          {hajj.packageExcludes && hajj.packageExcludes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Package Excludes</h2>
              <ul className="space-y-2">
                {hajj.packageExcludes.map((item, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Kurbani Section */}
        {hajj.kurbani && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="mt-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Kurbani Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-hajj mr-2" />
                <span className="text-gray-700">
                  <span className="font-medium">Included:</span> {hajj.kurbani.included ? "Yes" : "No"}
                </span>
              </div>

              {hajj.kurbani?.included && (
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-hajj mr-2" />
                  <span className="text-gray-700">
                    <span className="font-medium">Type:</span> {hajj.kurbani.approximateCost}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Transportation Section */}
        {hajj.transportation && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="mt-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Transportation Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hajj.transportation?.airline && (
                <div className="md:col-span-2">
                  <p className="font-medium mb-1">Airline Details:</p>
                  <p className="text-gray-700">{hajj.transportation.airline}</p>
                </div>
              )}

              {hajj.transportation.busService && (
                <div className="md:col-span-2">
                  <p className="font-medium mb-1">Bus Details:</p>
                  <p className="text-gray-700">{hajj.transportation.busService}</p>
                </div>
              )}
              {hajj.transportation.specialTransport && (
                <div className="md:col-span-2">
                  <p className="font-medium mb-1">special Transport:</p>
                  <p className="text-gray-700">{hajj.transportation.specialTransport}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    ),

    itinerary: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Itinerary</h2>
        <ItineraryTimeline itinerary={hajj.itinerary} />
      </motion.div>
    ),

    accommodation: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Hajj Accommodations</h2>
        <HajjAccommodationDetails accommodations={hajj.hajjAccommodations} />
      </motion.div>
    ),

    hotels: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hajj.hotels.map((hotel, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
              <HotelDetails hotel={hotel} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),

    policies: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Policies</h2>
        {hajj.policies?.payment && hajj.policies.payment.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-lg mb-2">Payment Policy</h3>
            <ul className="list-disc pl-5">
              {hajj.policies.payment.map((item, idx) => (
                <motion.li key={idx} className="mb-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {hajj.policies?.cancellation && hajj.policies.cancellation.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-lg mb-2">Cancellation Policy</h3>
            <ul className="list-disc pl-5">
              {hajj.policies.cancellation.map((item, idx) => (
                <motion.li key={idx} className="mb-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {hajj.policies?.visa && hajj.policies.visa.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-lg mb-2">Visa Policy</h3>
            <ul className="list-disc pl-5">
              {hajj.policies.visa.map((item, idx) => (
                <motion.li key={idx} className="mb-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {hajj.policies?.general && hajj.policies.general.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2">General Policy</h3>
            <ul className="list-disc pl-5">
              {hajj.policies.general.map((item, idx) => (
                <motion.li key={idx} className="mb-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    ),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Package Gallery with Carousel */}
        <div className="relative">
          {hajj.images && hajj.images.length > 0 ? (
            <div>
              <div className="relative h-[500px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                    <Image src={`/api/images/hajj/${hajj.images[activeImage]}`} alt={hajj.title} fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                {hajj.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {activeImage + 1} / {hajj.images.length}
                    </div>
                  </>
                )}

                {/* Hajj Year Badge */}
                <div className="absolute top-4 left-4 bg-hajj text-white px-4 py-2 rounded-lg font-bold">Hajj {hajj.hajjYear}</div>
              </div>

              {/* Thumbnails */}
              {hajj.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 p-2 bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  {hajj.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-16 w-24 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                        activeImage === index ? "ring-2 ring-hajj scale-105 shadow-md" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={`/api/images/hajj/${image}`} alt={`Hajj image ${index + 1}`} fill className="object-cover rounded" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[400px] bg-gray-200 flex items-center justify-center">
              <div className="relative h-[400px] w-full">
                <Image src="/images/hajj-default.jpg" alt={hajj.title} fill className="object-cover" />

                {/* Hajj Year Badge */}
                <div className="absolute top-4 left-4 bg-hajj text-white px-4 py-2 rounded-lg font-bold">Hajj {hajj.hajjYear}</div>
              </div>
            </div>
          )}
        </div>

        {/* Package Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{hajj.title}</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="h-5 w-5 mr-1" />
            <span>{hajj.duration}</span>
          </div>

          {/* Package Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-3 bg-hajj-50 rounded-lg hover:shadow-md transition-all"
            >
              <Calendar className="h-5 w-5 text-hajj mr-2" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{hajj.duration}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center p-3 bg-hajj-50 rounded-lg hover:shadow-md transition-all"
            >
              <DollarSign className="h-5 w-5 text-hajj mr-2" />
              <div>
                <p className="text-sm text-gray-600">Starting Price</p>
                <p className="font-medium">৳ {hajj.startingPrice.toLocaleString()}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center p-3 bg-hajj-50 rounded-lg hover:shadow-md transition-all"
            >
              <CheckCircle className="h-5 w-5 text-hajj mr-2" />
              <div>
                <p className="text-sm text-gray-600">Kurbani Included</p>
                <p className="font-medium">{hajj.kurbani?.included ? "Yes" : "No"}</p>
              </div>
            </motion.div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 border-b">
            <div className="flex overflow-x-auto">
              {(["overview", "itinerary", "accommodation", "hotels", "policies"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium transition-all duration-300 relative ${activeTab === tab ? "text-hajj" : "text-gray-600 hover:text-hajj"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-hajj" initial={false} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            <AnimatePresence mode="wait">{tabContent[activeTab]}</AnimatePresence>
          </div>

          {/* Pricing Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 p-6 bg-hajj-50/50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 bg-hajj-100/70">Package Type</th>
                    <th className="text-left p-3 bg-hajj-100/70">Accommodation Type</th>
                    <th className="text-left p-3 bg-hajj-100/70">Price (BDT)</th>
                  </tr>
                </thead>
                <tbody>
                  {hajj.pricing.map((price, priceIndex) =>
                    price.priceDetails.map((detail, detailIndex) => (
                      <tr key={`${priceIndex}-${detailIndex}`} className="border-b border-gray-200 hover:bg-hajj-50/80 transition-colors">
                        {detailIndex === 0 && (
                          <td className="p-3 font-medium" rowSpan={price.priceDetails.length}>
                            {price.packageType}
                          </td>
                        )}
                        <td className="p-3">{detail.accommodationType}</td>
                        <td className="p-3 font-medium">৳ {detail.price.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 flex flex-col md:flex-row gap-4 items-center">
            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full md:w-auto py-4 px-10 bg-hajj hover:bg-hajj-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <span>Book This Package</span>
            </button>

            <button
              onClick={handleDownloadBrochure}
              className="w-full md:w-auto py-3.5 px-6 border border-hajj text-hajj hover:bg-hajj-50 font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Brochure
            </button>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 border-t border-gray-100">{hajj && hajj._id && <ReviewSection entityId={hajj._id} entityType="Hajj" />}</div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && <BookingForm title={`Book ${hajj.title}`} type="hajj" itemName={hajj.title} itemId={hajj._id || ""} onClose={() => setShowBookingForm(false)} />}
    </div>
  );
}
