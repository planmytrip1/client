import Image from 'next/image';
import Link from 'next/link';
import { ITour } from '@/lib/types';

interface TourCardProps {
  tour: ITour;
}

export default function TourCard({ tour }: TourCardProps) {
  // Safe date formatting (hydration mismatch এড়াতে client-side format ব্যবহার ভালো)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // অথবা নির্দিষ্ট timezone
  });
};

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        {tour.images && tour.images.length > 0 ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/${tour.images[0]}`}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg md:text-xl line-clamp-1">
            {tour.title}
          </h3>
          <p className="text-white/80 text-sm">{tour.destination}</p>
        </div>

        {/* Price Tag */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
          <span className="text-blue-700 font-semibold text-sm">
            {tour.currency} {tour.pricePerPerson}
          </span>
          <span className="text-xs text-gray-500 ml-1">/person</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col justify-between h-52">
        <div>
          {/* Dates */}
          <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
            <span>{formatDate(tour.startDate)}</span>
            <span className="mx-1">→</span>
            <span>{formatDate(tour.endDate)}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
            {tour.description}
          </p>
        </div>

        {/* Button */}
        <Link
          href={`/main/tours/${tour._id}`}
          className="block w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-center rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
