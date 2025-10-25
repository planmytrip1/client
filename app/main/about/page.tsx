'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import aboutImg from '/public/about-banner.png'; // Replace with your own banner image

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#0B2149] mb-4">
          About <span className="text-[#F59E0B]">Amana Tours & Travels</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At Amana Tours & Travels, we believe travel is more than just a journey — 
          it’s an experience that connects people, cultures, and memories that last forever.
        </p>
      </motion.section>

      {/* Image & Text Section */}
      <div className="container mx-auto mt-12 px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Image
            src={aboutImg}
            alt="About Amana Tours"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0B2149] mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded with the goal of making every journey meaningful, 
            Amana Tours & Travels has been serving thousands of satisfied clients worldwide. 
            Whether it's a spiritual Hajj or Umrah pilgrimage, or an adventurous tour, 
            we ensure every trip is safe, comfortable, and unforgettable.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our dedicated team focuses on providing personalized services 
            that fit your travel style, budget, and dreams. 
            We don’t just plan trips — we craft experiences that speak to the heart.
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto mt-20 px-6 md:px-12 text-center"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { number: '10+', label: 'Years of Experience' },
            { number: '5000+', label: 'Happy Pilgrims' },
            { number: '50+', label: 'Destinations Covered' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md py-8 px-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-3xl font-bold text-[#F59E0B]">{stat.number}</h3>
              <p className="text-gray-700 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto mt-24 px-6 md:px-12 text-center max-w-3xl"
      >
        <h2 className="text-3xl font-semibold text-[#0B2149] mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          To make travel easy, meaningful, and accessible for everyone — 
          combining modern technology with trusted hospitality. 
          From visa processing to flight booking and hotel arrangements, 
          we ensure peace of mind every step of the way.
        </p>
      </motion.section>
    </div>
  );
}
