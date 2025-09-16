'use client';

import { useGetToursQuery } from '@/store/features/api/tourApi';
import TourCard from '@/components/tours/TourCard';
import Link from 'next/link';

export default function HomePage() {
  const { data: tours, isLoading, error } = useGetToursQuery();

  // Show only featured or latest tours (e.g., first 3)
  const featuredTours = tours ? tours.slice(0, 3) : [];

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="relative py-24 rounded-2xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-teal-600 to-green-500 opacity-90"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-6">
            Plan Your Perfect Trip
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover amazing tours, breathtaking views and plan your next adventure with us.
          </p>
          <Link
            href="/main/tours"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-blue-50 hover:scale-105 transition-all duration-300"
          >
            Explore Tours
          </Link>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🌍 Featured Tours</h2>
          <Link
            href="/main/tours"
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition"
          >
            View all tours →
          </Link>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-3 text-gray-500">Loading tours...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">⚠ Failed to load tours</p>
          </div>
        )}

        {!isLoading && !error && featuredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tours available at the moment.</p>
          </div>
        )}

        {featuredTours.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <div
                key={tour._id}
                className="transform hover:scale-105 transition duration-300"
              >
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          💡 Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Best Price Guarantee',
              desc: 'We offer the best prices on all our tours with no hidden fees.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ),
            },
            {
              title: 'Trusted Service',
              desc: 'With years of experience, we ensure safe and enjoyable trips.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              ),
            },
            {
              title: '24/7 Support',
              desc: 'Our customer support team is available around the clock.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              ),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl text-center transition duration-300"
            >
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
