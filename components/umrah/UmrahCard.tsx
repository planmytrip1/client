import Image from "next/image";
import Link from "next/link";
import { IUmrah } from "@/lib/types/IUmrah";
import { Star, Calendar, Check } from "lucide-react";

interface UmrahCardProps {
  umrah: IUmrah;
}

export default function UmrahCard({ umrah }: UmrahCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        {umrah.images && umrah.images.length > 0 ? (
          <Image 
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/umrah/${umrah.images[0]}`} 
            alt={umrah.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="relative w-full h-full">
            <Image 
              src="/images/umrah-default.jpg" 
              alt={umrah.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg md:text-xl line-clamp-1">{umrah.title}</h3>
          <p className="text-white/80 text-sm">{umrah.duration}</p>
        </div>

        {/* Featured or Discount Badge */}
        {umrah.featured && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
            <span className="text-blue-700 font-semibold text-sm">Featured</span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col justify-between h-64">
        <div>
          {/* Key Features */}
          <div className="space-y-2 mb-4">
            {umrah.flightOptions.airlines.length > 0 && (
              <div className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mt-1 mr-2" />
                <p className="text-gray-700 text-sm line-clamp-1">
                  {umrah.flightOptions.directFlight ? 'Direct Flight' : 'Transit Flight'}: {umrah.flightOptions.airlines.join(', ')}
                </p>
              </div>
            )}
            {/* <div className="flex items-start">
              <Check className="h-4 w-4 text-blue-500 mt-1 mr-2" />
              <p className="text-gray-700 text-sm line-clamp-1">
                Hotels: {umrah.hotels.map(h => h.name.split(' ')[0]).join(' & ')}
              </p>
            </div> */}
            <div className="flex items-start">
              <Check className="h-4 w-4 text-blue-500 mt-1 mr-2" />
              <p className="text-gray-700 text-sm line-clamp-1">
                {umrah.meals.included ? 'Meals included' : 'Meals not included'}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm line-clamp-2 mb-4">{umrah.description}</p>
        </div>

        <div>
          {/* Price & Reviews */}
          <div className="flex justify-between items-center mt-2 mb-4">
            <div className="">
              <span className="text-blue-700 font-semibold text-sm">
                ৳ {umrah.startingPrice.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 ml-1">onwards</span>
            </div>

            <p className="flex justify-start items-center gap-1">
              <Star className="w-5 h-5 mt-[-1px] text-yellow-500" /> 4.5 <small>(18)</small>
            </p>
          </div>
          
          {/* Button */}
          <Link
            href={`/main/umrah/${umrah._id}`}
            className="block w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white text-center rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}