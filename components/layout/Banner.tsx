"use client";
import { useGetBannersQuery } from "@/store/features/api/bannerApi";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { config } from '@/lib/config';

export default function BannerCarousel() {
  const { data: banners = [] } = useGetBannersQuery();

  if (!banners.length) return null;

  return (
    <section className="relative w-full overflow-hidden mb-16">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div
              className="relative h-[80vh] flex items-center justify-center"
              style={{
                backgroundImage: `url(${config.imageUrl}/${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-none "></div>

              {/* Content */}
              <div className="relative z-10 text-center text-white px-6 max-w-2xl">
                <p className="uppercase tracking-wide text-sm mb-2">
                  {banner.subtitle}
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow">
                  {banner.title}
                </h1>
                {/* Replace details with description field or remove if not needed */}
                <p className="mb-6 text-lg md:text-xl">{banner.subtitle}</p>
                <Link
                  href={banner.buttonLink || "#"}
                  className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                >
                  {banner.buttonText || "Learn More"}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}