'use client';

import { useGetHajjByIdQuery } from '../../../../store/features/api/HajjApi';
import Image from 'next/image';
import { useState } from 'react';
import { MapPin, Calendar, DollarSign, CheckCircle, XCircle, Tag, Star } from 'lucide-react';
import { use } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import HotelDetails from '@/components/common/HotelDetails';
import ItineraryTimeline from '@/components/common/ItineraryTimeline';
import HajjAccommodationDetails from '@/components/hajj/HajjAccommodationDetails';
import ReviewSection from "@/components/common/ReviewSection";

export default function HajjDetailsPage({ params }: { params: { id: string } }) {
  // Unwrap the params with React.use()
  // const resolvedParams = use(params instanceof Promise ? params : Promise.resolve(params));
  const id = params?.id;
  const { data: hajj, isLoading, error } = useGetHajjByIdQuery(id ?? '');
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <LoadingSpinner />
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Package Gallery */}
        <div className="relative">
          {hajj.images && hajj.images.length > 0 ? (
            <div>
              <div className="relative h-[400px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/hajj/${hajj.images[activeImage]}`}
                  alt={hajj.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {hajj.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 p-2 bg-gray-100">
                  {hajj.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-16 w-24 flex-shrink-0 cursor-pointer ${
                        activeImage === index ? 'ring-2 ring-green-600' : ''
                      }`}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/hajj/${image}`}
                        alt={`Hajj image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[400px] bg-gray-200 flex items-center justify-center">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/images/hajj-default.jpg"
                  alt={hajj.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Package Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{hajj.title}</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="h-5 w-5 mr-1" />
            <span>{hajj.duration} | Hajj {hajj.hajjYear}</span>
          </div>
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="text-gray-700 font-medium">4.8 (24 reviews)</span>
          </div>

          {/* Package Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{hajj.duration}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Starting Price</p>
                <p className="font-medium">
                  ৳ {hajj.startingPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Kurbani Included</p>
                <p className="font-medium">{hajj.kurbani?.included ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex overflow-x-auto">
              {['overview', 'itinerary', 'accommodation', 'hotels', 'policies'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 mb-6">{hajj.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Includes */}
                  {hajj.packageIncludes && hajj.packageIncludes.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Package Includes</h2>
                      <ul className="space-y-2">
                        {hajj.packageIncludes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
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
                          <li key={index} className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Itinerary</h2>
                <ItineraryTimeline itinerary={hajj.itinerary} />
              </div>
            )}

            {activeTab === 'accommodation' && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Hajj Accommodations</h2>
                <HajjAccommodationDetails accommodations={hajj.hajjAccommodations} />
              </div>
            )}

            {activeTab === 'hotels' && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Hotels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hajj.hotels.map((hotel, index) => (
                    <HotelDetails key={index} hotel={hotel} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Policies</h2>
                {hajj.policies?.payment && hajj.policies.payment.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">Payment Policy</h3>
                    <ul className="list-disc pl-5">
                      {hajj.policies.payment.map((item, idx) => (
                        <li key={idx} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {hajj.policies?.cancellation && hajj.policies.cancellation.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">Cancellation Policy</h3>
                    <ul className="list-disc pl-5">
                      {hajj.policies.cancellation.map((item, idx) => (
                        <li key={idx} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {hajj.policies?.visa && hajj.policies.visa.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-2">Visa Policy</h3>
                    <ul className="list-disc pl-5">
                      {hajj.policies.visa.map((item, idx) => (
                        <li key={idx} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {hajj.policies?.general && hajj.policies.general.length > 0 && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">General Policy</h3>
                    <ul className="list-disc pl-5">
                      {hajj.policies.general.map((item, idx) => (
                        <li key={idx} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pricing Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 bg-gray-100">Package Type</th>
                    <th className="text-left p-3 bg-gray-100">Accommodation Type</th>
                    <th className="text-left p-3 bg-gray-100">Price (BDT)</th>
                  </tr>
                </thead>
                <tbody>
                  {hajj.pricing.map((price, priceIndex) => (
                    price.priceDetails.map((detail, detailIndex) => (
                      <tr key={`${priceIndex}-${detailIndex}`} className="border-b border-gray-200">
                        {detailIndex === 0 && (
                          <td className="p-3 font-medium" rowSpan={price.priceDetails.length}>
                            {price.packageType}
                          </td>
                        )}
                        <td className="p-3">{detail.accommodationType}</td>
                        <td className="p-3 font-medium">৳ {detail.price.toLocaleString()}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
            <button className="w-full md:w-auto py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
              Book This Package
            </button>
            <button className="w-full md:w-auto py-3 px-8 border border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors">
              Download Brochure
            </button>
          </div>
        </div>

        <div className="p-6">{hajj && hajj._id && <ReviewSection entityId={hajj._id} entityType="Hajj" />}</div>
      </div>
    </div>
  );
}