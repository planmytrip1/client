"use client";

import { useGetBannersQuery } from "@/store/features/api/bannerApi";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-fade";
import { config } from "@/lib/config";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BannerCarousel() {
  const { data: banners = [] } = useGetBannersQuery();

  if (!banners.length) return null;

  return (
    <section className="relative w-full overflow-hidden mb-20">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        loop
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        className="banner-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div
              className="relative h-[85vh] flex items-center justify-center bg-center bg-cover transition-all duration-700"
              style={{
                backgroundImage: `url(${config.imageUrl}/banners/${banner.image})`,
              }}
            >
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

              {/* Animated content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
              >
                {banner.subtitle && (
                  <p className="uppercase tracking-widest text-sm md:text-base text-gray-200 mb-4">
                    {banner.subtitle}
                  </p>
                )}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                  {banner.title}
                </h1>
                {banner.buttonText && (
                  <Link
                    href={banner.buttonLink || "#"}
                    className="inline-block bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                    {banner.buttonText}
                  </Link>
                )}
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev absolute top-1/2 left-6 z-20 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all cursor-pointer">
          <ArrowLeft className="text-white w-6 h-6" />
        </div>
        <div className="swiper-button-next absolute top-1/2 right-6 z-20 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all cursor-pointer">
          <ArrowRight className="text-white w-6 h-6" />
        </div>

        {/* Custom pagination container */}
       <div className="custom-pagination"></div>
      </Swiper>

      {/* Optional bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-500 animate-pulse"></div>
    </section>
  );
}
