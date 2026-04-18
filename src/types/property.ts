/**
 * Property domain types
 * Responsibility: Define property-specific contracts and interfaces
 * Follows ISP by segregating interfaces based on specific needs
 * Follows SRP by containing only property-related types
 */

import { BaseEntity, Coordinates } from './core';

// Property status enum - follows SRP
export enum PropertyStatus {
  FOR_SALE = 'FOR_SALE',
  FOR_RENT = 'FOR_RENT',
  SOLD = 'SOLD',
  RESERVED = 'RESERVED',
  PENDING = 'PENDING',
}

// Property type enum - follows SRP
export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  TOWNHOUSE = 'TOWNHOUSE',
  LAND = 'LAND',
  COMMERCIAL = 'COMMERCIAL',
}

// Core property interface - minimal required fields
export interface PropertyCore extends BaseEntity {
  readonly title: string;
  readonly currency: string;
  readonly listingUrl: string;
  readonly externalId: string;
  readonly sourceId: string;
  readonly cityId: string;
}

// Property description - separate concern
export interface PropertyDescription {
  readonly description?: string;
  readonly conditionDescription?: string;
  readonly propertyHistory?: string;
  readonly propertyDetails?: string;
}

// Property financial information - separate concern
export interface PropertyFinancial {
  readonly priceAmount?: number;
  readonly originalPrice?: number;
  readonly marketValue?: number;
  readonly renovationEstimate?: number;
  readonly deposit?: number;
  readonly listingType?: string;
}

// Property location - separate concern
export interface PropertyLocation extends Coordinates {
  readonly address?: string;
  readonly cityName?: string;
  readonly parsedLocationData?: Record<string, unknown>;
}

// Property specifications - separate concern
export interface PropertySpecifications {
  readonly propertyType?: string;
  readonly size?: number;
  readonly unitSize?: string;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly features?: ReadonlyArray<string>;
  readonly status?: string;
}

// Property timeline - separate concern
export interface PropertyTimeline {
  readonly availableFrom?: string;
  readonly availableUntil?: string;
  readonly applicationDeadline?: string;
  readonly scrapedAt: string;
  readonly sourceCreatedAt?: string;
  readonly sourceModifiedAt?: string;
}

/**
 * Extended timeline information including last update timestamp
 * Keeps temporal details isolated from other property data
 */
export interface PropertyTimelineInfo extends PropertyTimeline {
  readonly updatedAt?: string;
}

// Property media - separate concern
export interface PropertyMedia {
  readonly images?: ReadonlyArray<string>;
}

// Complete property interface - composition of focused interfaces
export interface Property
  extends PropertyCore,
    PropertyDescription,
    PropertyFinancial,
    PropertyLocation,
    PropertySpecifications,
    PropertyTimeline,
    PropertyMedia {
  readonly city?: PropertyCity;
  readonly postalCode?: PropertyPostalCode;
  readonly municipality?: PropertyMunicipality;
  readonly program?: PropertyProgram;
  readonly source?: PropertySource;
}

// Related entities - following SRP
export interface PropertyCity extends BaseEntity {
  readonly name: string;
  readonly region?: {
    readonly id: string;
    readonly name: string;
    readonly country?: {
      readonly id: string;
      readonly name: string;
      readonly code: string;
    };
  };
}

export interface PropertyPostalCode extends BaseEntity {
  readonly code: string;
  readonly city?: {
    readonly id: string;
    readonly name: string;
  };
}

export interface PropertyMunicipality extends BaseEntity {
  readonly name: string;
  readonly description?: string;
  readonly website?: string;
  readonly visitWebsite?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly province?: string;
  readonly population?: number;
  readonly altitude?: number;
  readonly history?: string;
  readonly addressFull?: string;
  readonly street?: string;
  readonly postalCode?: string;
  readonly phone?: ReadonlyArray<string>;
  readonly email?: ReadonlyArray<string>;
  readonly region?: {
    readonly id: string;
    readonly name: string;
    readonly country?: {
      readonly id: string;
      readonly name: string;
      readonly code: string;
    };
  };
  readonly attractions?: ReadonlyArray<PropertyAttraction>;
  readonly naturalFeatures?: ReadonlyArray<PropertyNaturalFeature>;
  readonly events?: ReadonlyArray<PropertyEvent>;
  readonly activities?: ReadonlyArray<PropertyActivity>;
}

export interface PropertyProgram extends BaseEntity {
  readonly programStatus: string;
  readonly renovationRequired?: boolean;
  readonly renovationTimeline?: string;
  readonly renovationPlanDeadline?: string;
  readonly renovationMinInvest?: number;
  readonly depositRequired?: number;
  readonly depositCurrency?: string;
  readonly livingRequirement?: string;
  readonly rentalAllowed?: boolean;
  readonly eligibilityAge?: string;
  readonly eligibilityProfile?: string;
  readonly visaRequirements?: string;
  readonly incentiveRenovation?: string;
  readonly incentiveRelocation?: string;
  readonly incentiveEnergy?: string;
  readonly otherIncentives?: string;
  readonly programTerms?: string;
  readonly applicationDeadline?: string;
  readonly officialWebsite?: string;
  readonly contactEmail?: string;
  readonly contactPhone?: string;
  readonly contactName?: string;
  readonly startYear?: number;
  readonly approvalDetails?: string;
  readonly applicationLinks?: ReadonlyArray<string>;
  readonly projectSummary?: string;
  readonly renovationRequirements?: string;
  readonly financialGuaranteeAmount?: number;
  readonly financialGuaranteeCurrency?: string;
  readonly renovationTimelineMonths?: number;
  readonly propertyDestinations?: ReadonlyArray<string>;
  readonly availablePropertyCount?: number;
  readonly category?: {
    readonly id: string;
    readonly name: string;
  };
}

export interface PropertySource extends BaseEntity {
  readonly sourceName?: string;
}

export interface PropertyAttraction extends BaseEntity {
  readonly name: string;
  readonly description?: string;
  readonly type?: string;
}

export interface PropertyNaturalFeature extends BaseEntity {
  readonly name: string;
  readonly description?: string;
  readonly type?: string;
}

export interface PropertyEvent extends BaseEntity {
  readonly name: string;
  readonly description?: string;
  readonly date?: string;
  readonly frequency?: string;
}

export interface PropertyActivity extends BaseEntity {
  readonly name: string;
  readonly description?: string;
  readonly type?: string;
}

// View-specific interfaces - follows ISP
export interface PropertyListItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly priceAmount?: number;
  readonly currency: string;
  readonly address?: string;
  readonly cityName?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly propertyType?: string;
  readonly size?: number;
  readonly unitSize?: string;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly features?: ReadonlyArray<string>;
  readonly images?: ReadonlyArray<string>;
  readonly listingUrl: string;
  readonly status?: string;
  readonly city?: {
    readonly id: string;
    readonly name: string;
    readonly region?: {
      readonly id: string;
      readonly name: string;
      readonly country?: {
        readonly id: string;
        readonly name: string;
        readonly code: string;
      };
    };
  };
  readonly municipality?: {
    readonly id: string;
    readonly name: string;
  };
  readonly program?: {
    readonly id: string;
    readonly programStatus: string;
    readonly category?: {
      readonly id: string;
      readonly name: string;
    };
  };
}

// PropertyDetail is an alias for Property as all detailed information is included in the base interface
export type PropertyDetail = Property;

// Filter interfaces - follows ISP
export interface PropertyFilters {
  readonly programId?: string;
  readonly municipalityId?: string;
  readonly cityId?: string;
  readonly priceMin?: number;
  readonly priceMax?: number;
  readonly bedroomsMin?: number;
  readonly bedroomsMax?: number;
  readonly propertyType?: string;
  readonly status?: PropertyStatus;
  readonly hasImages?: boolean;
  readonly hasProgram?: boolean;
}

// Statistics interfaces - follows ISP
export interface PropertyStatistics {
  readonly byStatus: PropertyStatusStatistics;
  readonly byPrice: PropertyPriceStatistics;
  readonly byLocation: PropertyLocationStatistics;
}

export interface PropertyStatusStatistics {
  readonly statusCounts: ReadonlyArray<{
    readonly status: string;
    readonly count: number;
  }>;
  readonly total: number;
}

export interface PropertyPriceStatistics {
  readonly priceRanges: ReadonlyArray<{
    readonly range: string;
    readonly count: number;
  }>;
  readonly total: number;
  readonly averagePrice: number;
  readonly minPrice: number;
  readonly maxPrice: number;
}

export interface PropertyLocationStatistics {
  readonly byCountry: ReadonlyArray<{
    readonly country: string;
    readonly count: number;
  }>;
  readonly byRegion: ReadonlyArray<{
    readonly region: string;
    readonly count: number;
  }>;
  readonly total: number;
}

/**
 * Image Gallery Contract Interface
 * Follows ISP by segregating image gallery specific functionality
 */
export interface ImageGalleryContract {
  images: string[];
  onImageClick: (index: number) => void;
  isLightboxOpen: boolean;
  currentImageIndex: number;
  onCloseLightbox: () => void;
}

/**
 * Lightbox State Management Interface
 * Follows SRP by focusing only on lightbox state
 */
export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
}

/**
 * Lightbox Actions Interface
 * Follows SRP by defining only lightbox actions
 */
export interface LightboxActions {
  readonly toggler: boolean;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  setCurrentIndex: (index: number) => void;
}

/**
 * Base Property Component Props Interface
 * Follows ISP by providing common component properties
 */
export interface BasePropertyComponentProps {
  readonly className?: string;
}

/**
 * Editable Property Component Props Interface
 * Extends BasePropertyComponentProps for components that support editing
 */
export interface EditablePropertyComponentProps
  extends BasePropertyComponentProps {
  readonly isEditable?: boolean;
  readonly showEditButton?: boolean;
  readonly onEdit?: () => void;
}

// Formatter interfaces - following ISP by separating concerns
export interface PriceFormatter {
  formatPrice(amount?: number, currency?: string): string;
}

export interface SizeFormatter {
  formatSize(size?: number, unit?: string): string;
}

export interface DateFormatter {
  formatDate(date?: string): string;
  formatDateTime(date?: string): string;
}

export interface StatusFormatter {
  getStatusColor(status?: string): string;
  formatStatusText(status?: string): string;
}

// Status color mapping type
export type StatusColorMap = {
  readonly FOR_SALE: string;
  readonly FOR_RENT: string;
  readonly SOLD: string;
  readonly RESERVED: string;
  readonly PENDING: string;
  readonly DEFAULT: string;
};

// PropertyViewData interface - comprehensive type for property views
export interface PropertyViewData {
  // Base info
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly status?: string;
  readonly conditionDescription?: string;
  readonly propertyHistory?: string;

  // Financial info
  readonly priceAmount?: number;
  readonly currency: string;
  readonly originalPrice?: number;
  readonly marketValue?: number;
  readonly renovationEstimate?: number;
  readonly deposit?: number;
  readonly listingType?: string;

  // Location info
  readonly address?: string;
  readonly cityName?: string;
  readonly latitude?: number;
  readonly longitude?: number;

  // Specification info
  readonly propertyType?: string;
  readonly size?: number;
  readonly unitSize?: string;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly features?: readonly string[];

  // Timeline info
  readonly availableFrom?: string;
  readonly availableUntil?: string;
  readonly applicationDeadline?: string;
  readonly scrapedAt?: string;
  readonly sourceCreatedAt?: string;
  readonly sourceModifiedAt?: string;
  readonly updatedAt?: string;

  // Source info
  readonly sourceInfo?: {
    readonly externalId?: string;
    readonly property_details?: string;
    readonly listingUrl?: string;
    readonly images?: readonly string[];
    readonly source?: {
      readonly id: string;
      readonly sourceName?: string;
    };
    readonly parsedLocationData?: Record<string, unknown>;
  };

  // Related entities
  readonly city?: {
    readonly id: string;
    readonly name: string;
    readonly region?: {
      readonly id: string;
      readonly name: string;
      readonly country?: {
        readonly id: string;
        readonly name: string;
        readonly code: string;
      };
    };
  };

  readonly postalCode?: {
    readonly id: string;
    readonly code: string;
    readonly city?: {
      readonly id: string;
      readonly name: string;
    };
  };

  readonly municipality?: {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly website?: string;
    readonly visitWebsite?: string;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly province?: string;
    readonly population?: number;
    readonly altitude?: number;
    readonly history?: string;
    readonly addressFull?: string;
    readonly street?: string;
    readonly postalCode?: string;
    readonly phone?: readonly string[];
    readonly email?: readonly string[];
    readonly region?: {
      readonly id: string;
      readonly name: string;
      readonly country?: {
        readonly id: string;
        readonly name: string;
        readonly code: string;
      };
    };
    readonly attractions?: readonly {
      readonly id: string;
      readonly name: string;
      readonly description?: string;
      readonly type?: string;
    }[];
    readonly naturalFeatures?: readonly {
      readonly id: string;
      readonly name: string;
      readonly description?: string;
      readonly type?: string;
    }[];
    readonly events?: readonly {
      readonly id: string;
      readonly name: string;
      readonly description?: string;
      readonly date?: string;
      readonly frequency?: string;
    }[];
    readonly activities?: readonly {
      readonly id: string;
      readonly name: string;
      readonly description?: string;
      readonly type?: string;
    }[];
  };

  readonly program?: {
    readonly id: string;
    readonly programStatus: string;
    readonly renovationRequired?: boolean;
    readonly renovationTimeline?: string;
    readonly renovationPlanDeadline?: string;
    readonly renovationMinInvest?: number;
    readonly depositRequired?: number;
    readonly depositCurrency?: string;
    readonly livingRequirement?: string;
    readonly rentalAllowed?: boolean;
    readonly eligibilityAge?: string;
    readonly eligibilityProfile?: string;
    readonly visaRequirements?: string;
    readonly incentiveRenovation?: string;
    readonly incentiveRelocation?: string;
    readonly incentiveEnergy?: string;
    readonly otherIncentives?: string;
    readonly programTerms?: string;
    readonly applicationDeadline?: string;
    readonly officialWebsite?: string;
    readonly contactEmail?: string;
    readonly contactPhone?: string;
    readonly contactName?: string;
    readonly startYear?: number;
    readonly approvalDetails?: string;
    readonly applicationLinks?: readonly string[];
    readonly projectSummary?: string;
    readonly renovationRequirements?: string;
    readonly financialGuaranteeAmount?: number;
    readonly financialGuaranteeCurrency?: string;
    readonly renovationTimelineMonths?: number;
    readonly propertyDestinations?: readonly string[];
    readonly availablePropertyCount?: number;
    readonly category?: {
      readonly id: string;
      readonly name: string;
    };
  };
}
