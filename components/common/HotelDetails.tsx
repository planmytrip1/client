// components/common/HotelDetails.tsx
import { IHotel } from '@/lib/types/IBaseHajjPackage';
import { MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface HotelDetailsProps {
  hotel: IHotel;
}

export default function HotelDetails({ hotel }: HotelDetailsProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{hotel.name}</h3>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {hotel.packageType}
        </span>
      </div>
      <div className="mb-2 flex items-start">
        <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-1 flex-shrink-0" />
        <p className="text-sm text-gray-700">{hotel.location}</p>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-medium">Distance:</span> {hotel.distance}
      </p>
      {hotel.mapLink && (
        <Link 
          href={hotel.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-2"
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1" />
          View on Google Maps
        </Link>
      )}
    </div>
  );
}