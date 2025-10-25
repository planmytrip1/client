"use client";

import { useGetTourByIdQuery } from "@/store/features/api/tourApi";
import { useGetUserBookingsQuery } from "@/store/features/api/bookingApi";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/features/auth/authSlice";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, DollarSign, CheckCircle, XCircle, Tag, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { use } from "react";
import ReviewSection from "@/components/common/ReviewSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BookingForm from "@/components/common/BookingForm";
import { generateAndDownloadPDF } from "@/utils/pdfService";

export interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}
export default function TourDetailsPage({ params, searchParams }: PageProps) {
  const resolvedParams = use(params instanceof Promise ? params : Promise.resolve(params));
  const { data: tour, isLoading, error } = useGetTourByIdQuery(resolvedParams.id);

  const [activeImage, setActiveImage] = useState(0);
  const tabs = ["overview", "itinerary", "details", "coupons"] as const;
  type TabKey = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [showBookingForm, setShowBookingForm] = useState(false);

   // ✅ Get current user info
  const user = useAppSelector(selectUser);
  const currentUserId = user?.id;
  const packageId = tour?._id;

   // ✅ Only fetch user bookings when logged in & tour loaded
  const { data: userBookings } = useGetUserBookingsQuery(
    { userId: currentUserId!, packageId: packageId! },
    { skip: !currentUserId || !packageId }
  );

  const alreadyBooked = userBookings && userBookings.length > 0;

  // Carousel navigation
  const nextImage = () => {
    if (tour?.images?.length) {
      setActiveImage((prev) => (prev === tour.images!.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (tour?.images?.length) {
      setActiveImage((prev) => (prev === 0 ? tour.images!.length - 1 : prev - 1));
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!tour?.images || tour.images.length <= 1) return;
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [tour, activeImage]);

  // Handle download brochure
  // const handleDownloadBrochure = () => {
  //   if (tour) {
  //     generateAndDownloadPDF(tour, "tour");
  //   }
  // };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <LoadingSpinner />
        <p className="mt-2 text-gray-600">Loading tour details...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">Failed to load tour details</p>
      </div>
    );
  }

  // Format date to readable format
  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

    const CTASection = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 flex flex-col md:flex-row gap-4 items-center"
    >
      {alreadyBooked ? (
        <div className="w-full md:w-auto py-3 px-10 bg-green-100 text-green-800 text-lg font-semibold rounded-lg border border-green-300 text-center shadow-sm">
          ✅ You Already Booked This Tour
        </div>
      ) : (
        <button
          onClick={() => setShowBookingForm(true)}
          className="w-full md:w-auto py-3 px-10 bg-tour hover:bg-tour-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
        >
          <span>Book This Tour</span>
        </button>
      )}

      <button
        onClick={() => generateAndDownloadPDF(tour, "tour")}
        className="w-full md:w-auto py-3 px-6 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
      >
        Download Brochure
      </button>
    </motion.div>
  );


  // Tab content components with animation
  const tabContent = {
    overview: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Description </h2>
        <p className="text-gray-700">{tour.description}</p>

        {/* Locations */}
        {tour.locations && tour.locations.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Locations</h2>
            <div className="flex flex-wrap gap-2">
              {tour.locations.map((location, index) => (
                <span key={index} className="px-3 py-1 bg-tour-100 text-tour-800 rounded-full text-sm">
                  {location}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    ),

    itinerary: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Itinerary</h2>
        <div className="space-y-4">
          {tour.itinerary &&
            tour.itinerary.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-tour hover:shadow-md transition-all"
              >
                <h3 className="font-medium flex items-center">
                  <div className="w-8 h-8 bg-tour-100 text-tour-800 rounded-full flex items-center justify-center mr-2">{day.day}</div>
                  Day {day.day}
                </h3>
                <p className="mt-2 text-gray-700">{day.activities}</p>
                {day.accommodation && (
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Accommodation:</span> {day.accommodation}
                  </p>
                )}
              </motion.div>
            ))}
        </div>
      </motion.div>
    ),

    details: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Includes */}
        {tour.packageIncludes && tour.packageIncludes.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Package Includes</h2>
            <ul className="space-y-2">
              {tour.packageIncludes.map((item, index) => (
                <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tour mr-2 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Excludes */}
        {tour.packageExcludes && tour.packageExcludes.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Package Excludes</h2>
            <ul className="space-y-2">
              {tour.packageExcludes.map((item, index) => (
                <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    ),

    coupons: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="text-xl font-semibold mb-3">Available Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tour.coupons && tour.coupons.length > 0 ? (
            tour.coupons.map((coupon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition-all hover:border-tour cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 text-tour mr-2" />
                  <h3 className="font-medium">{coupon.name}</h3>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{coupon.type === "percentage" ? "Percentage" : "Fixed Amount"}</span>
                  <span className="font-bold">{coupon.type === "percentage" ? `${coupon.value}%` : `${tour.currency} ${coupon.value}`}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No coupons available for this tour</p>
          )}
        </div>
      </motion.div>
    ),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tour Gallery with Carousel */}
        <div className="relative">
          {tour.images && tour.images.length > 0 ? (
            <div>
              <div className="relative h-[600px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                    <Image src={`/api/images/tours/${tour.images[activeImage]}`} alt={tour.title} fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                {tour.images.length > 1 && (
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
                      {activeImage + 1} / {tour.images.length}
                    </div>
                  </>
                )}

                {/* Social Share Button */}
                <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors" onClick={() => alert("Share functionality would open here")}>
                  <Share2 className="w-5 h-5 text-tour" />
                </button>
              </div>

              {/* Thumbnails */}
              {tour.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 p-2 bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  {tour.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-16 w-24 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                        activeImage === index ? "ring-2 ring-tour scale-105 shadow-md" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={`/api/images/tours/${image}`} alt={`Tour image ${index + 1}`} fill className="object-cover rounded" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[400px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No images available</span>
            </div>
          )}
        </div>

        {/* Tour Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{tour.destination}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-3 bg-tour-50 rounded-lg hover:shadow-md transition-all"
            >
              <Calendar className="h-5 w-5 text-tour mr-2" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">
                  {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center p-3 bg-tour-50 rounded-lg hover:shadow-md transition-all"
            >
              <DollarSign className="h-5 w-5 text-tour mr-2" />
              <div>
                <p className="text-sm text-gray-600">Price per person</p>
                <p className="font-medium">
                  {tour.currency} {tour.pricePerPerson}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center p-3 bg-tour-50 rounded-lg hover:shadow-md transition-all"
            >
              <CheckCircle className="h-5 w-5 text-tour mr-2" />
              <div>
                <p className="text-sm text-gray-600">Airfare Included</p>
                <p className="font-medium">{tour.airfareIncluded ? "Yes" : "No"}</p>
              </div>
            </motion.div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 border-b">
            <div className="flex overflow-x-auto">
              {(["overview", "itinerary", "details", "coupons"] as TabKey[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium transition-all duration-300 relative ${activeTab === tab ? "text-tour" : "text-gray-600 hover:text-tour"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-tour" initial={false} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            <AnimatePresence mode="wait">{tabContent[activeTab]}</AnimatePresence>
          </div>

          {/* Enhanced CTA Buttons */}
           {CTASection}
        </div>

        {/* Reviews Section */}
        <div className="p-6 border-t border-gray-100">{tour && tour._id && <ReviewSection entityId={tour._id} entityType="Tours" />}</div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && <BookingForm title={`Book ${tour.title}`} type="tours" itemName={tour.title} itemId={tour._id || ""} onClose={() => setShowBookingForm(false)} />}
    </div>
  );
}
