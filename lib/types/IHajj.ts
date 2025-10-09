// types/hajj.ts
import type { IBasePackage } from './IBaseHajjPackage';

export interface IHajjSpecificAccommodation {
  mina: {
    tentType: 'standard' | 'vip';
    description: string;
    facilities: string[];
  };
  arafat: {
    tentType: 'standard' | 'vip';
    description: string;
    facilities: string[];
  };
  muzdalifah: {
    description: string;
    arrangements: string[];
  };
  shisha: {
    duration: string; // "10/11 Nights"
    apartments: {
      type: string;
      facilities: string[];
    }[];
  };
}

export interface IHajjPreparation {
  workshop: boolean;
  mcqExams: boolean;
  examStartPeriod: string; // "two months before traveling"
  guidebook: string; // language
  muallimSupport: boolean;
}

export interface IHajjOptional {
  vipTent: {
    available: boolean;
    additionalCost: number;
    includes: string[];
  };
  specialRooms: {
    haramView: boolean;
    kabaView: boolean;
    suiteRoom: boolean;
  };
  additionalTours: string[];
}

export interface IHajj extends IBasePackage {
  hajjYear: string; 
  hajjAccommodations: IHajjSpecificAccommodation;
  preparation: IHajjPreparation;
  optional: IHajjOptional;
  preRegistration: {
    required: boolean;
    amount: number;
    refundable: boolean;
  };
  kurbani: {
    included: boolean;
    approximateCost?: string; // "SR 700-800/Per Person"
  };
  transportation: {
    airline: string[];
    busService: string[];
    specialTransport: string[];
  };
}

// For forms and API responses
export interface IHajjFormData extends Omit<IHajj, '_id' | 'createdAt' | 'updatedAt'> {}

export interface IHajjApiResponse {
  success: boolean;
  message?: string;
  data?: IHajj | IHajj[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// For component props
export interface IHajjCardProps {
  hajj: IHajj;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: 'active' | 'inactive' | 'draft') => void;
}

export interface IHajjFilterProps {
  onFilterChange: (filters: IHajjFilters) => void;
  initialFilters?: IHajjFilters;
}

export interface IHajjFilters {
  hajjYear?: string;
  status?: 'active' | 'inactive' | 'draft';
  featured?: boolean;
  search?: string;
}