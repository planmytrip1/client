// types/base.ts

export interface IHotel {
  packageType: string; // Economy, Standard, Deluxe, Superior, Premium
  name: string;
  location: string;
  distance: string;
  mapLink?: string;
  city?: 'makkah' | 'madinah' ;
}

export interface IPricing {
  packageType: string; // Economy, Standard, Deluxe, Superior, Premium
  priceDetails: {
    accommodationType: string; // "4/5/6 bed share", "Triple share", "Double share", "Single", "Child", "Infant"
    price: number;
  }[];
}

export interface ITineraryDay {
  day: string;
  title: string;
  description: string;
}

export interface IPolicies {
  payment?: string[];
  cancellation?: string[];
  visa?: string[];
  general?: string[];
  hotel?: string[];
  vehicle?: string[];
  flight?: string[];
  food?: string[];
}

export interface IBasePackage {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  featured?: boolean;
  startingPrice: number;
  packageIncludes: string[];
  packageExcludes: string[];
  pricing: IPricing[];
  hotels: IHotel[];
  itinerary: ITineraryDay[];
  ziyarahTours: {
    makkah: string[];
    madinah: string[];
  };
  notes?: string[];
  policies?: IPolicies;
  requirements?: string[];
  images?: string[];
  imagesToDelete?: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt?: string;
  updatedAt?: string;
}