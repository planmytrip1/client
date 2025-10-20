"use client";

import { useGetToursQuery } from "@/store/features/api/tourApi";
import { useGetHajjQuery } from "@/store/features/api/HajjApi";
import { useGetUmrahQuery } from "@/store/features/api/umrahApi";
import Link from "next/link";
import Banner from "@/components/layout/Banner";
import FeatureCard from "@/components/common/FeatureCard";

export default function HomePage() {
  const { data: tours, isLoading, error } = useGetToursQuery();
  const { data: hajj } = useGetHajjQuery();
  const { data: umrah } = useGetUmrahQuery();

  // Show only featured or latest tours (e.g., first 3)
  const featuredTours = tours ? tours.slice(0, 3) : [];
  const featuredHajj = hajj ? hajj.filter((item) => item.featured === true).slice(0, 3) : [];
  const featuredUmrah = umrah ? umrah.filter((item) => item.featured === true).slice(0, 3) : [];

  return (
    <main className="container mx-auto px-4">
      {/* Hero Section */}
      <Banner />

      {/* Featured Tours Section */}
      <section className="mb-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-10 shadow-sm hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary-600 flex items-center gap-2">🏝️ Featured Tours</h2>
          <Link href="/main/tours" className="text-secondary-600 font-semibold hover:text-secondary-700 hover:underline">
            View all tours →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <div key={tour._id} className="transform hover:scale-105 transition duration-300">
              <FeatureCard feature={tour} type="tours" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Hajj Section */}
      <section className="mb-16 bg-gradient-to-br from-[#FFF8EB] to-[#FFEEC8] rounded-3xl p-10 shadow-sm hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary-700 flex items-center gap-2">🕋 Featured Hajj</h2>
          <Link href="/main/hajj" className="text-secondary-600 font-semibold hover:text-secondary-700 hover:underline">
            View all Hajj →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredHajj.map((item) => (
            <div key={item._id} className="transform hover:scale-105 transition duration-300">
              <FeatureCard feature={item} type="hajj" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Umrah Section */}
      <section className="mb-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 shadow-sm hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary-700 flex items-center gap-2">🕌 Featured Umrah</h2>
          <Link href="/main/umrah" className="text-secondary-600 font-semibold hover:text-secondary-700 hover:underline">
            View all Umrah →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredUmrah.map((item) => (
            <div key={item._id} className="transform hover:scale-105 transition duration-300">
              <FeatureCard feature={item} type="umrah" />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-primary-800">💡 Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Best Price Guarantee",
              desc: "We offer the best prices on all our tours with no hidden fees.",
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
              title: "Trusted Service",
              desc: "With years of experience, we ensure safe and enjoyable trips.",
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
              title: "24/7 Support",
              desc: "Our customer support team is available around the clock.",
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
            <div key={idx} className="bg-surface p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transform transition duration-500 text-center">
              <div className="bg-gradient-to-tr from-primary-200 to-secondary-500 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-700 hover:text-secondary-600 transition-colors duration-300">{item.title}</h3>
              <p className="text-text-light text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
