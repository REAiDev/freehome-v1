/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
};

export type Activity = {
  __typename?: 'Activity';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  municipality: Municipality;
  municipalityId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Attraction = {
  __typename?: 'Attraction';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  municipality: Municipality;
  municipalityId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type City = {
  __typename?: 'City';
  altitude?: Maybe<Scalars['Int']['output']>;
  demographics_info?: Maybe<Scalars['String']['output']>;
  distance_to_city?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nature_scenery?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['Int']['output']>;
  postalCodes?: Maybe<Array<PostalCode>>;
  properties?: Maybe<Array<Property>>;
  region: Region;
  regionId: Scalars['String']['output'];
  travel_logistics?: Maybe<Scalars['String']['output']>;
};

export type ContactFormInput = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type ContactFormResponse = {
  __typename?: 'ContactFormResponse';
  contactId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  regions?: Maybe<Array<Region>>;
};

export type Event = {
  __typename?: 'Event';
  createdAt: Scalars['String']['output'];
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  frequency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  municipality: Municipality;
  municipalityId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type LocationCount = {
  __typename?: 'LocationCount';
  count: Scalars['Int']['output'];
  country?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type LocationStatistics = {
  __typename?: 'LocationStatistics';
  byCountry: Array<LocationCount>;
  byRegion: Array<LocationCount>;
  total: Scalars['Int']['output'];
};

export type Municipality = {
  __typename?: 'Municipality';
  activities?: Maybe<Array<Activity>>;
  addressFull?: Maybe<Scalars['String']['output']>;
  altitude?: Maybe<Scalars['Int']['output']>;
  attractions?: Maybe<Array<Attraction>>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Array<Scalars['String']['output']>>;
  events?: Maybe<Array<Event>>;
  history?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  naturalFeatures?: Maybe<Array<NaturalFeature>>;
  phone?: Maybe<Array<Scalars['String']['output']>>;
  population?: Maybe<Scalars['Int']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  programs?: Maybe<Array<Program>>;
  properties?: Maybe<Array<Property>>;
  province?: Maybe<Scalars['String']['output']>;
  region: Region;
  regionId: Scalars['String']['output'];
  street?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  visitWebsite?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  submitContactForm: ContactFormResponse;
};

export type MutationSubmitContactFormArgs = {
  input: ContactFormInput;
};

export type NaturalFeature = {
  __typename?: 'NaturalFeature';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  municipality: Municipality;
  municipalityId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type PaginatedActivities = {
  __typename?: 'PaginatedActivities';
  items: Array<Activity>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedAttractions = {
  __typename?: 'PaginatedAttractions';
  items: Array<Attraction>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedCities = {
  __typename?: 'PaginatedCities';
  items: Array<City>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedEvents = {
  __typename?: 'PaginatedEvents';
  items: Array<Event>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedMunicipalities = {
  __typename?: 'PaginatedMunicipalities';
  items: Array<Municipality>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedNaturalFeatures = {
  __typename?: 'PaginatedNaturalFeatures';
  items: Array<NaturalFeature>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedPrograms = {
  __typename?: 'PaginatedPrograms';
  items: Array<Program>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedProperties = {
  __typename?: 'PaginatedProperties';
  items: Array<Property>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedRegions = {
  __typename?: 'PaginatedRegions';
  items: Array<Region>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PostalCode = {
  __typename?: 'PostalCode';
  city: City;
  cityId: Scalars['String']['output'];
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  properties?: Maybe<Array<Property>>;
};

export type PriceRange = {
  __typename?: 'PriceRange';
  count: Scalars['Int']['output'];
  range: Scalars['String']['output'];
};

export type PriceStatistics = {
  __typename?: 'PriceStatistics';
  averagePrice: Scalars['Float']['output'];
  maxPrice: Scalars['Float']['output'];
  minPrice: Scalars['Float']['output'];
  priceRanges: Array<PriceRange>;
  total: Scalars['Int']['output'];
};

export type Program = {
  __typename?: 'Program';
  applicationLinks?: Maybe<Array<Scalars['String']['output']>>;
  application_deadline?: Maybe<Scalars['String']['output']>;
  approvalDetails?: Maybe<Scalars['String']['output']>;
  availablePropertyCount?: Maybe<Scalars['Int']['output']>;
  category: ProgramCategory;
  categoryId: Scalars['String']['output'];
  contact_email?: Maybe<Scalars['String']['output']>;
  contact_name?: Maybe<Scalars['String']['output']>;
  contact_phone?: Maybe<Scalars['String']['output']>;
  deposit_currency?: Maybe<Scalars['String']['output']>;
  deposit_required?: Maybe<Scalars['Int']['output']>;
  eligibility_age?: Maybe<Scalars['String']['output']>;
  eligibility_profile?: Maybe<Scalars['String']['output']>;
  financialGuaranteeAmount?: Maybe<Scalars['Int']['output']>;
  financialGuaranteeCurrency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  incentive_energy?: Maybe<Scalars['Int']['output']>;
  incentive_relocation?: Maybe<Scalars['Int']['output']>;
  incentive_renovation?: Maybe<Scalars['Int']['output']>;
  last_updated: Scalars['String']['output'];
  living_requirement?: Maybe<Scalars['String']['output']>;
  municipality?: Maybe<Municipality>;
  municipalityId?: Maybe<Scalars['String']['output']>;
  official_website?: Maybe<Scalars['String']['output']>;
  other_incentives?: Maybe<Scalars['String']['output']>;
  program_status?: Maybe<ProgramStatus>;
  program_terms?: Maybe<Scalars['String']['output']>;
  projectSummary?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Array<Property>>;
  propertyDestinations?: Maybe<Array<Scalars['String']['output']>>;
  renovationRequirements?: Maybe<Scalars['String']['output']>;
  renovationTimelineMonths?: Maybe<Scalars['Int']['output']>;
  renovation_min_invest?: Maybe<Scalars['Int']['output']>;
  renovation_plan_deadline?: Maybe<Scalars['String']['output']>;
  renovation_required: Scalars['Boolean']['output'];
  renovation_timeline?: Maybe<Scalars['String']['output']>;
  rental_allowed?: Maybe<Scalars['String']['output']>;
  source?: Maybe<ScrapeSource>;
  sourceId?: Maybe<Scalars['String']['output']>;
  startYear?: Maybe<Scalars['Int']['output']>;
  visa_requirements?: Maybe<Scalars['String']['output']>;
};

export type ProgramCategory = {
  __typename?: 'ProgramCategory';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  programs?: Maybe<Array<Program>>;
  updatedAt: Scalars['String']['output'];
};

export enum ProgramStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
  Upcoming = 'UPCOMING',
}

export type Property = {
  __typename?: 'Property';
  address?: Maybe<Scalars['String']['output']>;
  applicationDeadline?: Maybe<Scalars['String']['output']>;
  availableFrom?: Maybe<Scalars['String']['output']>;
  availableUntil?: Maybe<Scalars['String']['output']>;
  bathrooms?: Maybe<Scalars['Int']['output']>;
  bedrooms?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<City>;
  cityId: Scalars['String']['output'];
  cityName?: Maybe<Scalars['String']['output']>;
  conditionDescription?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
  deposit?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  externalId: Scalars['String']['output'];
  features?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  latitude?: Maybe<Scalars['Float']['output']>;
  listingType?: Maybe<Scalars['String']['output']>;
  listingUrl: Scalars['String']['output'];
  longitude?: Maybe<Scalars['Float']['output']>;
  marketValue?: Maybe<Scalars['Float']['output']>;
  municipality?: Maybe<Municipality>;
  municipalityId?: Maybe<Scalars['String']['output']>;
  originalPrice?: Maybe<Scalars['Float']['output']>;
  parsedLocationData?: Maybe<Scalars['JSON']['output']>;
  postalCode?: Maybe<PostalCode>;
  postalCodeId?: Maybe<Scalars['String']['output']>;
  priceAmount?: Maybe<Scalars['Float']['output']>;
  program?: Maybe<Program>;
  programId?: Maybe<Scalars['String']['output']>;
  propertyHistory?: Maybe<Scalars['String']['output']>;
  propertyType?: Maybe<PropertyType>;
  property_details?: Maybe<Scalars['String']['output']>;
  renovationEstimate?: Maybe<Scalars['Float']['output']>;
  scrapedAt: Scalars['String']['output'];
  size?: Maybe<Scalars['Float']['output']>;
  source: ScrapeSource;
  sourceCreatedAt?: Maybe<Scalars['String']['output']>;
  sourceId: Scalars['String']['output'];
  sourceModifiedAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PropertyStatus>;
  title?: Maybe<Scalars['String']['output']>;
  unitSize?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export enum PropertySortField {
  Bedrooms = 'BEDROOMS',
  CreatedAt = 'CREATED_AT',
  Price = 'PRICE',
  Size = 'SIZE',
  UpdatedAt = 'UPDATED_AT',
}

export type PropertyStatistics = {
  __typename?: 'PropertyStatistics';
  byLocation: LocationStatistics;
  byPrice: PriceStatistics;
  byStatus: StatusStatistics;
};

export enum PropertyStatus {
  ForRent = 'FOR_RENT',
  ForSale = 'FOR_SALE',
  Pending = 'PENDING',
  Reserved = 'RESERVED',
  Sold = 'SOLD',
}

export enum PropertyType {
  Apartment = 'APARTMENT',
  Commercial = 'COMMERCIAL',
  House = 'HOUSE',
  Land = 'LAND',
  Townhouse = 'TOWNHOUSE',
  Villa = 'VILLA',
}

export type Query = {
  __typename?: 'Query';
  activities: PaginatedActivities;
  activity?: Maybe<Activity>;
  attraction?: Maybe<Attraction>;
  attractions: PaginatedAttractions;
  cities: PaginatedCities;
  city?: Maybe<City>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  event?: Maybe<Event>;
  events: PaginatedEvents;
  me?: Maybe<User>;
  municipalities: PaginatedMunicipalities;
  municipality?: Maybe<Municipality>;
  naturalFeature?: Maybe<NaturalFeature>;
  naturalFeatures: PaginatedNaturalFeatures;
  postalCode?: Maybe<PostalCode>;
  postalCodes: Array<PostalCode>;
  program?: Maybe<Program>;
  programCategories: Array<ProgramCategory>;
  programCategory?: Maybe<ProgramCategory>;
  programs: PaginatedPrograms;
  properties: PaginatedProperties;
  property?: Maybe<Property>;
  propertySizeRangeCounts: Array<SizeRangeCount>;
  propertyStatistics: PropertyStatistics;
  region?: Maybe<Region>;
  regions: PaginatedRegions;
  scrapeSource?: Maybe<ScrapeSource>;
  scrapeSources: Array<ScrapeSource>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryActivitiesArgs = {
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type QueryActivityArgs = {
  id: Scalars['ID']['input'];
};

export type QueryAttractionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryAttractionsArgs = {
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCitiesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  regionId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCityArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCountryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEventsArgs = {
  dateFrom?: InputMaybe<Scalars['String']['input']>;
  dateTo?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Scalars['String']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryMunicipalitiesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  regionId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryMunicipalityArgs = {
  id: Scalars['ID']['input'];
};

export type QueryNaturalFeatureArgs = {
  id: Scalars['ID']['input'];
};

export type QueryNaturalFeaturesArgs = {
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPostalCodeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPostalCodesArgs = {
  cityId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryProgramArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProgramCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProgramsArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProgramStatus>;
};

export type QueryPropertiesArgs = {
  bedroomsMax?: InputMaybe<Scalars['Int']['input']>;
  bedroomsMin?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  priceMax?: InputMaybe<Scalars['Float']['input']>;
  priceMin?: InputMaybe<Scalars['Float']['input']>;
  programId?: InputMaybe<Scalars['ID']['input']>;
  propertyType?: InputMaybe<PropertyType>;
  search?: InputMaybe<Scalars['String']['input']>;
  sizeMax?: InputMaybe<Scalars['Float']['input']>;
  sizeMin?: InputMaybe<Scalars['Float']['input']>;
  sortBy?: InputMaybe<PropertySortField>;
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<PropertyStatus>;
};

export type QueryPropertyArgs = {
  id: Scalars['ID']['input'];
};

export type QueryPropertySizeRangeCountsArgs = {
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  programId?: InputMaybe<Scalars['ID']['input']>;
  propertyType?: InputMaybe<PropertyType>;
  sizeRanges: Array<SizeRangeBucket>;
  status?: InputMaybe<PropertyStatus>;
};

export type QueryRegionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryRegionsArgs = {
  countryId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryScrapeSourceArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Region = {
  __typename?: 'Region';
  avg_cost_of_living?: Maybe<Scalars['String']['output']>;
  cities?: Maybe<Array<City>>;
  country: Country;
  countryId: Scalars['String']['output'];
  famous_for?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  municipalities?: Maybe<Array<Municipality>>;
  name: Scalars['String']['output'];
};

export type ScrapeSource = {
  __typename?: 'ScrapeSource';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  headers?: Maybe<Scalars['JSON']['output']>;
  httpMethod: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastScraped?: Maybe<Scalars['String']['output']>;
  lastSuccess?: Maybe<Scalars['String']['output']>;
  priority: Scalars['Int']['output'];
  programs?: Maybe<Array<Program>>;
  properties?: Maybe<Array<Property>>;
  queryParams?: Maybe<Scalars['JSON']['output']>;
  randomDelayMs?: Maybe<Scalars['Int']['output']>;
  requestPayload?: Maybe<Scalars['JSON']['output']>;
  responseType?: Maybe<Scalars['String']['output']>;
  scrapingMethod: Scalars['String']['output'];
  selectors?: Maybe<Scalars['JSON']['output']>;
  sourceName: Scalars['String']['output'];
  throttleMs: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SizeRangeBucket = {
  sizeMax: Scalars['Float']['input'];
  sizeMin: Scalars['Float']['input'];
};

export type SizeRangeCount = {
  __typename?: 'SizeRangeCount';
  count: Scalars['Int']['output'];
  sizeMax: Scalars['Float']['output'];
  sizeMin: Scalars['Float']['output'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StatusCount = {
  __typename?: 'StatusCount';
  count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type StatusStatistics = {
  __typename?: 'StatusStatistics';
  statusCounts: Array<StatusCount>;
  total: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER',
}

export type GetCountriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCountriesQuery = {
  __typename?: 'Query';
  countries: Array<{
    __typename?: 'Country';
    id: string;
    name: string;
    code: string;
    currency: string;
  }>;
};

export type GetCountryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCountryQuery = {
  __typename?: 'Query';
  country?: {
    __typename?: 'Country';
    id: string;
    name: string;
    code: string;
    currency: string;
    regions?: Array<{ __typename?: 'Region'; id: string; name: string }> | null;
  } | null;
};

export type GetMunicipalitiesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  regionId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetMunicipalitiesQuery = {
  __typename?: 'Query';
  municipalities: {
    __typename?: 'PaginatedMunicipalities';
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
    items: Array<{
      __typename?: 'Municipality';
      id: string;
      name: string;
      province?: string | null;
      population?: number | null;
      latitude?: number | null;
      longitude?: number | null;
      description?: string | null;
      region: {
        __typename?: 'Region';
        id: string;
        name: string;
        country: { __typename?: 'Country'; id: string; name: string; code: string };
      };
      properties?: Array<{ __typename?: 'Property'; id: string }> | null;
      programs?: Array<{
        __typename?: 'Program';
        id: string;
        program_status?: ProgramStatus | null;
      }> | null;
    }>;
  };
};

export type GetMunicipalityQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetMunicipalityQuery = {
  __typename?: 'Query';
  municipality?: {
    __typename?: 'Municipality';
    id: string;
    name: string;
    province?: string | null;
    population?: number | null;
    altitude?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    description?: string | null;
    history?: string | null;
    addressFull?: string | null;
    street?: string | null;
    postalCode?: string | null;
    phone?: Array<string> | null;
    email?: Array<string> | null;
    website?: string | null;
    visitWebsite?: string | null;
    region: {
      __typename?: 'Region';
      id: string;
      name: string;
      country: { __typename?: 'Country'; id: string; name: string; code: string };
    };
    programs?: Array<{
      __typename?: 'Program';
      id: string;
      program_status?: ProgramStatus | null;
      projectSummary?: string | null;
      category: { __typename?: 'ProgramCategory'; id: string; name: string };
    }> | null;
    properties?: Array<{
      __typename?: 'Property';
      id: string;
      title?: string | null;
      priceAmount?: number | null;
      currency: string;
      images?: Array<string> | null;
      propertyType?: PropertyType | null;
      bedrooms?: number | null;
      bathrooms?: number | null;
      size?: number | null;
      unitSize?: string | null;
      cityName?: string | null;
      city?: {
        __typename?: 'City';
        id: string;
        name: string;
        region: {
          __typename?: 'Region';
          id: string;
          name: string;
          country: { __typename?: 'Country'; id: string; name: string; code: string };
        };
      } | null;
    }> | null;
    attractions?: Array<{
      __typename?: 'Attraction';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
    }> | null;
    naturalFeatures?: Array<{
      __typename?: 'NaturalFeature';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
    }> | null;
    events?: Array<{
      __typename?: 'Event';
      id: string;
      name: string;
      description?: string | null;
      date?: string | null;
      frequency?: string | null;
    }> | null;
    activities?: Array<{
      __typename?: 'Activity';
      id: string;
      name: string;
      description?: string | null;
      type?: string | null;
    }> | null;
  } | null;
};

export type GetPropertiesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  programId?: InputMaybe<Scalars['ID']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  cityId?: InputMaybe<Scalars['ID']['input']>;
  priceMin?: InputMaybe<Scalars['Float']['input']>;
  priceMax?: InputMaybe<Scalars['Float']['input']>;
  bedroomsMin?: InputMaybe<Scalars['Int']['input']>;
  bedroomsMax?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetPropertiesQuery = {
  __typename?: 'Query';
  properties: {
    __typename?: 'PaginatedProperties';
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
    items: Array<{
      __typename?: 'Property';
      id: string;
      title?: string | null;
      description?: string | null;
      priceAmount?: number | null;
      currency: string;
      address?: string | null;
      cityName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
      propertyType?: PropertyType | null;
      size?: number | null;
      unitSize?: string | null;
      bedrooms?: number | null;
      bathrooms?: number | null;
      features?: Array<string> | null;
      images?: Array<string> | null;
      listingUrl: string;
      status?: PropertyStatus | null;
      renovationEstimate?: number | null;
      city?: {
        __typename?: 'City';
        id: string;
        name: string;
        region: {
          __typename?: 'Region';
          id: string;
          name: string;
          country: { __typename?: 'Country'; id: string; name: string; code: string };
        };
      } | null;
      municipality?: { __typename?: 'Municipality'; id: string; name: string } | null;
      program?: {
        __typename?: 'Program';
        id: string;
        program_status?: ProgramStatus | null;
        category: { __typename?: 'ProgramCategory'; id: string; name: string };
      } | null;
    }>;
  };
};

export type GetPropertyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetPropertyQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    id: string;
    title?: string | null;
    description?: string | null;
    priceAmount?: number | null;
    currency: string;
    address?: string | null;
    cityName?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    propertyType?: PropertyType | null;
    size?: number | null;
    unitSize?: string | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    features?: Array<string> | null;
    images?: Array<string> | null;
    listingUrl: string;
    status?: PropertyStatus | null;
    conditionDescription?: string | null;
    propertyHistory?: string | null;
    originalPrice?: number | null;
    marketValue?: number | null;
    renovationEstimate?: number | null;
    availableFrom?: string | null;
    availableUntil?: string | null;
    applicationDeadline?: string | null;
    scrapedAt: string;
    sourceCreatedAt?: string | null;
    sourceModifiedAt?: string | null;
    updatedAt: string;
    deposit?: number | null;
    listingType?: string | null;
    externalId: string;
    property_details?: string | null;
    parsedLocationData?: any | null;
    source: { __typename?: 'ScrapeSource'; id: string };
    postalCode?: {
      __typename?: 'PostalCode';
      id: string;
      code: string;
      city: { __typename?: 'City'; id: string; name: string };
    } | null;
    city?: {
      __typename?: 'City';
      id: string;
      name: string;
      region: {
        __typename?: 'Region';
        id: string;
        name: string;
        country: { __typename?: 'Country'; id: string; name: string; code: string };
      };
    } | null;
    municipality?: {
      __typename?: 'Municipality';
      id: string;
      name: string;
      description?: string | null;
      website?: string | null;
      visitWebsite?: string | null;
      latitude?: number | null;
      longitude?: number | null;
      province?: string | null;
      population?: number | null;
      altitude?: number | null;
      history?: string | null;
      addressFull?: string | null;
      street?: string | null;
      postalCode?: string | null;
      phone?: Array<string> | null;
      email?: Array<string> | null;
      region: {
        __typename?: 'Region';
        id: string;
        name: string;
        country: { __typename?: 'Country'; id: string; name: string; code: string };
      };
      attractions?: Array<{
        __typename?: 'Attraction';
        id: string;
        name: string;
        description?: string | null;
        type?: string | null;
      }> | null;
      naturalFeatures?: Array<{
        __typename?: 'NaturalFeature';
        id: string;
        name: string;
        description?: string | null;
        type?: string | null;
      }> | null;
      events?: Array<{
        __typename?: 'Event';
        id: string;
        name: string;
        description?: string | null;
        date?: string | null;
        frequency?: string | null;
      }> | null;
      activities?: Array<{
        __typename?: 'Activity';
        id: string;
        name: string;
        description?: string | null;
        type?: string | null;
      }> | null;
    } | null;
    program?: {
      __typename?: 'Program';
      id: string;
      program_status?: ProgramStatus | null;
      renovation_required: boolean;
      renovation_timeline?: string | null;
      renovation_plan_deadline?: string | null;
      renovation_min_invest?: number | null;
      deposit_required?: number | null;
      deposit_currency?: string | null;
      living_requirement?: string | null;
      rental_allowed?: string | null;
      eligibility_age?: string | null;
      eligibility_profile?: string | null;
      visa_requirements?: string | null;
      incentive_renovation?: number | null;
      incentive_relocation?: number | null;
      incentive_energy?: number | null;
      other_incentives?: string | null;
      program_terms?: string | null;
      application_deadline?: string | null;
      official_website?: string | null;
      contact_email?: string | null;
      contact_phone?: string | null;
      contact_name?: string | null;
      startYear?: number | null;
      approvalDetails?: string | null;
      applicationLinks?: Array<string> | null;
      projectSummary?: string | null;
      renovationRequirements?: string | null;
      financialGuaranteeAmount?: number | null;
      financialGuaranteeCurrency?: string | null;
      renovationTimelineMonths?: number | null;
      propertyDestinations?: Array<string> | null;
      availablePropertyCount?: number | null;
      category: { __typename?: 'ProgramCategory'; id: string; name: string };
    } | null;
  } | null;
};

export type GetPropertyStatisticsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPropertyStatisticsQuery = {
  __typename?: 'Query';
  propertyStatistics: {
    __typename?: 'PropertyStatistics';
    byStatus: {
      __typename?: 'StatusStatistics';
      total: number;
      statusCounts: Array<{ __typename?: 'StatusCount'; status: string; count: number }>;
    };
    byPrice: {
      __typename?: 'PriceStatistics';
      total: number;
      averagePrice: number;
      minPrice: number;
      maxPrice: number;
      priceRanges: Array<{ __typename?: 'PriceRange'; range: string; count: number }>;
    };
    byLocation: {
      __typename?: 'LocationStatistics';
      total: number;
      byCountry: Array<{ __typename?: 'LocationCount'; country?: string | null; count: number }>;
      byRegion: Array<{ __typename?: 'LocationCount'; region?: string | null; count: number }>;
    };
  };
};

export const GetCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountries' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetCountryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountry' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'country' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'regions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountryQuery, GetCountryQueryVariables>;
export const GetMunicipalitiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMunicipalities' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'regionId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'municipalities' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'regionId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'regionId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'province' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'population' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'region' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'properties' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'programs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'program_status' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalItems' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMunicipalitiesQuery, GetMunicipalitiesQueryVariables>;
export const GetMunicipalityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMunicipality' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'municipality' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'province' } },
                { kind: 'Field', name: { kind: 'Name', value: 'population' } },
                { kind: 'Field', name: { kind: 'Name', value: 'altitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'history' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressFull' } },
                { kind: 'Field', name: { kind: 'Name', value: 'street' } },
                { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'visitWebsite' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'region' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'programs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'program_status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'projectSummary' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'properties' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'priceAmount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'unitSize' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cityName' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'city' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'country' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attractions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'naturalFeatures' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'events' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'activities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMunicipalityQuery, GetMunicipalityQueryVariables>;
export const GetPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'programId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'municipalityId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cityId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'priceMin' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'priceMax' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bedroomsMin' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bedroomsMax' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'properties' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'programId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'programId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'municipalityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'municipalityId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cityId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cityId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'priceMin' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'priceMin' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'priceMax' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'priceMax' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bedroomsMin' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bedroomsMin' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'bedroomsMax' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bedroomsMax' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'priceAmount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cityName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'unitSize' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'features' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'listingUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'renovationEstimate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'city' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'country' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'municipality' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'program' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'program_status' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'category' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalItems' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPropertiesQuery, GetPropertiesQueryVariables>;
export const GetPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'priceAmount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cityName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                { kind: 'Field', name: { kind: 'Name', value: 'unitSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bedrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bathrooms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'features' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'conditionDescription' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyHistory' } },
                { kind: 'Field', name: { kind: 'Name', value: 'originalPrice' } },
                { kind: 'Field', name: { kind: 'Name', value: 'marketValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'renovationEstimate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'availableFrom' } },
                { kind: 'Field', name: { kind: 'Name', value: 'availableUntil' } },
                { kind: 'Field', name: { kind: 'Name', value: 'applicationDeadline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scrapedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sourceCreatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sourceModifiedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deposit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'property_details' } },
                { kind: 'Field', name: { kind: 'Name', value: 'parsedLocationData' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'source' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'postalCode' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'city' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'city' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'region' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'municipality' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'visitWebsite' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'province' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'population' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'altitude' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'history' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'addressFull' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'street' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'region' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'attractions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'naturalFeatures' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'events' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'activities' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'program' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'program_status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'renovation_required' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'renovation_timeline' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'renovation_plan_deadline' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'renovation_min_invest' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'deposit_required' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'deposit_currency' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'living_requirement' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rental_allowed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'eligibility_age' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'eligibility_profile' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'visa_requirements' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'incentive_renovation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'incentive_relocation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'incentive_energy' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'other_incentives' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'program_terms' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'application_deadline' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'official_website' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'contact_email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'contact_phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'contact_name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startYear' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'approvalDetails' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'applicationLinks' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'projectSummary' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'renovationRequirements' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'financialGuaranteeAmount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'financialGuaranteeCurrency' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'renovationTimelineMonths' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'propertyDestinations' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'availablePropertyCount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPropertyQuery, GetPropertyQueryVariables>;
export const GetPropertyStatisticsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPropertyStatistics' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertyStatistics' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'byStatus' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'statusCounts' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'byPrice' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'priceRanges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'range' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'averagePrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'minPrice' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxPrice' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'byLocation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'byCountry' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'byRegion' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'region' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPropertyStatisticsQuery, GetPropertyStatisticsQueryVariables>;
