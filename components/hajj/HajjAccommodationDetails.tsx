import React from 'react';
import { IHajjSpecificAccommodation } from '@/lib/types/IHajj';
import { Home, Tent, MapPin, Check } from 'lucide-react';

interface HajjAccommodationDetailsProps {
  accommodations: IHajjSpecificAccommodation;
}

export default function HajjAccommodationDetails({ accommodations }: HajjAccommodationDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Mina */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <Tent className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium text-lg">Mina Accommodation</h3>
        </div>
        <p className="mb-2 text-gray-700">
          <span className="font-medium">Tent Type:</span> {accommodations.mina.tentType}
        </p>
        <p className="mb-2 text-gray-700">
          <span className="font-medium">Description:</span> {accommodations.mina.description}
        </p>
        {accommodations.mina.facilities.length > 0 && (
          <div>
            <p className="font-medium mb-1">Facilities:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {accommodations.mina.facilities.map((facility, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-1 flex-shrink-0" />
                  <span className="text-sm">{facility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Arafat */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <Tent className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium text-lg">Arafat Accommodation</h3>
        </div>
        <p className="mb-2 text-gray-700">
          <span className="font-medium">Tent Type:</span> {accommodations.arafat.tentType}
        </p>
        <p className="mb-2 text-gray-700">
          <span className="font-medium">Description:</span> {accommodations.arafat.description}
        </p>
        {accommodations.arafat.facilities.length > 0 && (
          <div>
            <p className="font-medium mb-1">Facilities:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {accommodations.arafat.facilities.map((facility, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-1 flex-shrink-0" />
                  <span className="text-sm">{facility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Muzdalifah */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <MapPin className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium text-lg">Muzdalifah Arrangements</h3>
        </div>
        <p className="mb-2 text-gray-700">
          <span className="font-medium">Description:</span> {accommodations.muzdalifah.description}
        </p>
        {accommodations.muzdalifah.arrangements.length > 0 && (
          <div>
            <p className="font-medium mb-1">Arrangements:</p>
            <ul className="grid grid-cols-1 gap-2">
              {accommodations.muzdalifah.arrangements.map((arrangement, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-1 flex-shrink-0" />
                  <span className="text-sm">{arrangement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Shisha */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <Home className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium text-lg">Shisha Accommodation</h3>
        </div>
        <p className="mb-2 text-gray-700">
          <span className="font-medium">Duration:</span> {accommodations.shisha.duration}
        </p>
        {accommodations.shisha.apartments.length > 0 && (
          <div>
            <p className="font-medium mb-1">Apartment Details:</p>
            {accommodations.shisha.apartments.map((apt, idx) => (
              <div key={idx} className="mb-3">
                <p className="text-sm font-medium">{apt.type}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {apt.facilities.map((facility, facilityIdx) => (
                    <li key={facilityIdx} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="text-sm">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}