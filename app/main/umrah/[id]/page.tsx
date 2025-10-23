"use client";

import { useGetUmrahByIdQuery } from "@/store/features/api/umrahApi";
import Image from "next/image";
import { useState, useEffect } from "react";
import { use } from "react";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import HotelDetails from "@/components/common/HotelDetails";
import ItineraryTimeline from "@/components/common/ItineraryTimeline";
import ReviewSection from "@/components/common/ReviewSection";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "@/components/common/BookingForm";
import { generateAndDownloadPDF } from "@/utils/pdfService";

export default function UmrahDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params instanceof Promise ? params : Promise.resolve(params));
  const { data: umrah, isLoading, error } = useGetUmrahByIdQuery(resolvedParams.id);

  type TabKey = "overview" | "itinerary" | "hotels" | "policies";

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Carousel
  const nextImage = () => {
    if (umrah?.images?.length) {
      setActiveImage((prev) => (prev === umrah.images!.length - 1 ? 0 : prev + 1));
    }
  };
  const prevImage = () => {
    if (umrah?.images?.length) {
      setActiveImage((prev) => (prev === 0 ? umrah.images!.length - 1 : prev - 1));
    }
  };

  // Auto slide
  useEffect(() => {
    if (!umrah?.images || umrah.images.length <= 1) return;
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [umrah, activeImage]);

  // PDF download
  const handleDownloadBrochure = () => {
    if (umrah) {
      generateAndDownloadPDF(umrah, "umrah");
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <LoadingSpinner />
        <p className="mt-2 text-gray-600">Loading umrah package details...</p>
      </div>
    );

  if (error || !umrah)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">Failed to load umrah package details</p>
      </div>
    );

  const tabContent = {
    overview: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-700 mb-6">{umrah.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {umrah.packageIncludes && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Package Includes</h3>
              <ul className="space-y-2">
                {umrah.packageIncludes.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-umrah mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {umrah.packageExcludes && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Package Excludes</h3>
              <ul className="space-y-2">
                {umrah.packageExcludes.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    ),

    itinerary: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Itinerary</h2>
        <ItineraryTimeline itinerary={umrah.itinerary} />
      </motion.div>
    ),

    hotels: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {umrah.hotels.map((hotel, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <HotelDetails hotel={hotel} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),

    policies: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Policies</h2>
        {umrah.policies?.general?.length ? (
          <ul className="list-disc pl-5">
            {umrah.policies.general.map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                {item}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No specific policies available.</p>
        )}
      </motion.div>
    ),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="relative">
          {umrah.images?.length ? (
            <>
              <div className="relative h-[500px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/api/images/umrah/${umrah.images[activeImage]}`}
                      alt={umrah.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {umrah.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50"
                    >
                      <ChevronRight />
                    </button>

                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {activeImage + 1} / {umrah.images.length}
                    </div>
                  </>
                )}
              </div>

              {umrah.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 p-2 bg-gray-100">
                  {umrah.images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative h-16 w-24 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                        activeImage === i ? "ring-2 ring-umrah scale-105" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={`/api/images/umrah/${img}`} alt={`Image ${i + 1}`} fill className="object-cover rounded" />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-[400px] bg-gray-200 flex items-center justify-center">No Image Available</div>
          )}
        </div>

        {/* Package Info */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{umrah.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <Calendar className="h-5 w-5 mr-2" /> <span>{umrah.duration}</span>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex overflow-x-auto">
              {(["overview", "itinerary", "hotels", "policies"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium transition-all relative ${
                    activeTab === tab ? "text-umrah" : "text-gray-600 hover:text-umrah"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-umrah" initial={false} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">{tabContent[activeTab]}</AnimatePresence>

          {/* CTA */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full md:w-auto py-4 px-10 bg-umrah hover:bg-umrah-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              Book This Package
            </button>

            <button
              onClick={handleDownloadBrochure}
              className="w-full md:w-auto py-3.5 px-6 border border-umrah text-umrah hover:bg-umrah-50 font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Brochure
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div className="p-6 border-t border-gray-100">
          {umrah._id && <ReviewSection entityId={umrah._id} entityType="Umrah" />}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm title={`Book ${umrah.title}`} type="umrah" itemName={umrah.title} itemId={umrah._id || ""} onClose={() => setShowBookingForm(false)} />
      )}
    </div>
  );
}
