import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { FeatureCardProps } from "@/lib/types/common/FeatureCardProps";

export default function FeatureCard({ feature, type }: FeatureCardProps) {
  // Safe date formatting (optional)
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  // Dynamic fields based on type
  const title = feature.title;
  const description = feature.description;
  const images = feature.images ?? [];
  const destination = (feature as any).destination ?? ""; // only tours
  const startDate = (feature as any).startDate;
  const endDate = (feature as any).endDate;

  // Price handling
  const price =
    (feature as any).pricePerPerson ??
    (feature as any).startingPrice ??
    null;

  const currency = (feature as any).currency ?? "৳";

  return (
    <div className="group bg-surface rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        {images.length > 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/${type}/${images[0]}`}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg md:text-xl line-clamp-1">
            {title}
          </h3>
          {destination && (
            <p className="text-white/80 text-sm line-clamp-3 overflow-hidden">{destination}</p>
          )}
        </div>

        {/* Offer Tag */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
          <span className="text-primary font-semibold text-sm">15% off</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col justify-between h-60">
        <div>
          {/* Dates */}
          {startDate && endDate ? (
            <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
              <span>{formatDate(startDate)}</span>
              <span className="mx-1">→</span>
              <span>{formatDate(endDate)}</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-3">
              Duration: {(feature as any).duration ?? "N/A"}
            </p>
          )}

          {/* Description */}
          <p className="text-text-light text-sm line-clamp-3 mb-4">
            {description}
          </p>
        </div>

        <div>
          {/* Price + Reviews */}
          <div className="flex justify-between items-center mt-2 mb-4">
            {price && (
              <div>
                <span className="text-primary-400 font-semibold text-sm">
                  {currency} {price}
                </span>
                <span className="text-xs text-muted ml-1">/person</span>
              </div>
            )}

            <p className="flex justify-start items-center gap-1">
              <Star className="w-5 h-5 mt-[-1px] text-secondary" /> 4.47{" "}
              <small>(102)</small>
            </p>
          </div>

          {/* Button */}
          <Link
            href={`/main/${type}/${feature._id}`}
            className="block w-full py-2.5 px-4 bg-gradient-to-r from-primary to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white text-center rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}