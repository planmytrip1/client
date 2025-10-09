export interface IDayPlan {
  day: number;
  activities: string;
  accommodation?: string;
}

export interface IHotelInfo {
  name: string;
  location: string;
  nights: number;
}

export interface ICoupon {
  name: string;
  type: string;
  value: number;
}

export interface ITour {
  _id?: string;
  title: string;
  description: string;
  destination: string;
  locations?: string[];
  itinerary?: IDayPlan[];
  startDate: string;
  endDate: string;
  pricePerPerson: number;
  currency?: string;
  airfareIncluded?: boolean;
  hotels?: IHotelInfo[];
  packageIncludes?: string[];
  packageExcludes?: string[];
  coupons?: ICoupon[];
  images?: string[];
}