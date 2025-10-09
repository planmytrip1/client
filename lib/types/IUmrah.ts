// types/umrah.ts
import type { IBasePackage } from './IBaseHajjPackage';

export interface IUmrahDateOptions {
  groupTravelDates: string[]; // ["November: 05, 09, 15, 21, 24"]
  customDatesAvailable: boolean;
  validityPeriod: {
    start: string;
    end: string;
  };
}

export interface IUmrahFlightOptions {
  directFlight: boolean;
  transitFlight: boolean;
  airlines: string[];
  departureCity: string;
  arrivalCity: string;
}

export interface IUmrahRequirements {
  passport: {
    validityRequired: string; // "6 months"
    additionalRequirements: string[];
  };
  photos: {
    quantity: number;
    specifications: string[];
  };
}

export interface IUmrahMeals {
  included: boolean;
  mealPlan?: string; // "Breakfast/lunch/dinner not included"
  approximateCost?: string; // "SR 25/Per Day Per Person"
  menuOptions?: string[];
}

export interface IUmrah extends IBasePackage {
  dateOptions: IUmrahDateOptions;
  flightOptions: IUmrahFlightOptions;
  umrahRequirements: IUmrahRequirements;
  meals: IUmrahMeals;
  minimumGroupSize: number;
  nusukApp: {
    required: boolean;
    purpose: string[];
    downloadLinks: {
      android: string;
      ios: string;
    };
  };
  muallimService: {
    umrahSupport: boolean;
    ziyarahGuide: boolean;
    limitations: string[];
  };
}

// For forms and API responses
export interface IUmrahFormData extends Omit<IUmrah, '_id' | 'createdAt' | 'updatedAt'> {}

export interface IUmrahApiResponse {
  success: boolean;
  message?: string;
  data?: IUmrah | IUmrah[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// For component props
export interface IUmrahCardProps {
  umrah: IUmrah;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: 'active' | 'inactive' | 'draft') => void;
}

export interface IUmrahFilterProps {
  onFilterChange: (filters: IUmrahFilters) => void;
  initialFilters?: IUmrahFilters;
}

export interface IUmrahFilters {
  packageType?: string;
  status?: 'active' | 'inactive' | 'draft';
  featured?: boolean;
  duration?: string;
  search?: string;
}
