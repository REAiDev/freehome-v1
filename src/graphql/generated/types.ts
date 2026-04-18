export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  JSON: { input: Record<string, unknown>; output: Record<string, unknown> };
};

export type Activity = {
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

export type Country = {
  code: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  regions?: Maybe<Array<Region>>;
};

export type CreateActivityInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  municipalityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAttractionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  municipalityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCityInput = {
  altitude?: InputMaybe<Scalars['Int']['input']>;
  demographics_info?: InputMaybe<Scalars['String']['input']>;
  distance_to_city?: InputMaybe<Scalars['Int']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  nature_scenery?: InputMaybe<Scalars['String']['input']>;
  population?: InputMaybe<Scalars['Int']['input']>;
  regionId: Scalars['ID']['input'];
  travel_logistics?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCountryInput = {
  code: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateEventInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Scalars['String']['input']>;
  municipalityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateMunicipalityInput = {
  addressFull?: InputMaybe<Scalars['String']['input']>;
  altitude?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Array<Scalars['String']['input']>>;
  history?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Array<Scalars['String']['input']>>;
  population?: InputMaybe<Scalars['Int']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  regionId: Scalars['ID']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
  visitWebsite?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNaturalFeatureInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  municipalityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostalCodeInput = {
  cityId: Scalars['ID']['input'];
  code: Scalars['String']['input'];
};

export type CreateProgramCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateProgramInput = {
  applicationLinks?: InputMaybe<Array<Scalars['String']['input']>>;
  application_deadline?: InputMaybe<Scalars['String']['input']>;
  approvalDetails?: InputMaybe<Scalars['String']['input']>;
  availablePropertyCount?: InputMaybe<Scalars['Int']['input']>;
  categoryId: Scalars['ID']['input'];
  contact_email?: InputMaybe<Scalars['String']['input']>;
  contact_name?: InputMaybe<Scalars['String']['input']>;
  contact_phone?: InputMaybe<Scalars['String']['input']>;
  deposit_currency?: InputMaybe<Scalars['String']['input']>;
  deposit_required?: InputMaybe<Scalars['Int']['input']>;
  eligibility_age?: InputMaybe<Scalars['String']['input']>;
  eligibility_profile?: InputMaybe<Scalars['String']['input']>;
  financialGuaranteeAmount?: InputMaybe<Scalars['Int']['input']>;
  financialGuaranteeCurrency?: InputMaybe<Scalars['String']['input']>;
  incentive_energy?: InputMaybe<Scalars['Int']['input']>;
  incentive_relocation?: InputMaybe<Scalars['Int']['input']>;
  incentive_renovation?: InputMaybe<Scalars['Int']['input']>;
  living_requirement?: InputMaybe<Scalars['String']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  official_website?: InputMaybe<Scalars['String']['input']>;
  other_incentives?: InputMaybe<Scalars['String']['input']>;
  program_status: ProgramStatus;
  program_terms?: InputMaybe<Scalars['String']['input']>;
  projectSummary?: InputMaybe<Scalars['String']['input']>;
  propertyDestinations?: InputMaybe<Array<Scalars['String']['input']>>;
  renovationRequirements?: InputMaybe<Scalars['String']['input']>;
  renovationTimelineMonths?: InputMaybe<Scalars['Int']['input']>;
  renovation_min_invest?: InputMaybe<Scalars['Int']['input']>;
  renovation_plan_deadline?: InputMaybe<Scalars['String']['input']>;
  renovation_required?: InputMaybe<Scalars['Boolean']['input']>;
  renovation_timeline?: InputMaybe<Scalars['String']['input']>;
  rental_allowed?: InputMaybe<Scalars['String']['input']>;
  sourceId?: InputMaybe<Scalars['ID']['input']>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
  visa_requirements?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePropertyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  applicationDeadline?: InputMaybe<Scalars['String']['input']>;
  availableFrom?: InputMaybe<Scalars['String']['input']>;
  availableUntil?: InputMaybe<Scalars['String']['input']>;
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId: Scalars['ID']['input'];
  cityName?: InputMaybe<Scalars['String']['input']>;
  conditionDescription?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  deposit?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  externalId: Scalars['String']['input'];
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  listingType?: InputMaybe<Scalars['String']['input']>;
  listingUrl: Scalars['String']['input'];
  longitude?: InputMaybe<Scalars['Float']['input']>;
  marketValue?: InputMaybe<Scalars['Float']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  originalPrice?: InputMaybe<Scalars['Float']['input']>;
  parsedLocationData?: InputMaybe<Scalars['JSON']['input']>;
  postalCodeId?: InputMaybe<Scalars['ID']['input']>;
  priceAmount?: InputMaybe<Scalars['Float']['input']>;
  programId?: InputMaybe<Scalars['ID']['input']>;
  propertyHistory?: InputMaybe<Scalars['String']['input']>;
  propertyType?: InputMaybe<PropertyType>;
  property_details?: InputMaybe<Scalars['String']['input']>;
  renovationEstimate?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  sourceCreatedAt?: InputMaybe<Scalars['String']['input']>;
  sourceId: Scalars['ID']['input'];
  sourceModifiedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PropertyStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  unitSize?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRegionInput = {
  avg_cost_of_living?: InputMaybe<Scalars['String']['input']>;
  countryId: Scalars['ID']['input'];
  famous_for?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateScrapeSourceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  httpMethod: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  queryParams?: InputMaybe<Scalars['JSON']['input']>;
  requestPayload?: InputMaybe<Scalars['JSON']['input']>;
  responseType?: InputMaybe<Scalars['String']['input']>;
  scrapingMethod?: InputMaybe<Scalars['String']['input']>;
  selectors?: InputMaybe<Scalars['JSON']['input']>;
  sourceName: Scalars['String']['input'];
  throttleMs?: InputMaybe<Scalars['Int']['input']>;
  url: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role: UserRole;
};

export type Event = {
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
  count: Scalars['Int']['output'];
  country?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type LocationStatistics = {
  byCountry: Array<LocationCount>;
  byRegion: Array<LocationCount>;
  total: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  token: Scalars['String']['output'];
  user: User;
};

export type Municipality = {
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
  createActivity: Activity;
  createAttraction: Attraction;
  createCity: City;
  createCountry: Country;
  createEvent: Event;
  createMunicipality: Municipality;
  createNaturalFeature: NaturalFeature;
  createPostalCode: PostalCode;
  createProgram: Program;
  createProgramCategory: ProgramCategory;
  createProperty: Property;
  createRegion: Region;
  createScrapeSource: ScrapeSource;
  createUser: User;
  deleteActivity: Scalars['Boolean']['output'];
  deleteAttraction: Scalars['Boolean']['output'];
  deleteCity: Scalars['Boolean']['output'];
  deleteCountry: Scalars['Boolean']['output'];
  deleteEvent: Scalars['Boolean']['output'];
  deleteMunicipality: Scalars['Boolean']['output'];
  deleteNaturalFeature: Scalars['Boolean']['output'];
  deletePostalCode: Scalars['Boolean']['output'];
  deleteProgram: Scalars['Boolean']['output'];
  deleteProgramCategory: Scalars['Boolean']['output'];
  deleteProperty: Scalars['Boolean']['output'];
  deleteRegion: Scalars['Boolean']['output'];
  deleteScrapeSource: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  updateActivity: Activity;
  updateAttraction: Attraction;
  updateCity: City;
  updateCountry: Country;
  updateEvent: Event;
  updateMunicipality: Municipality;
  updateNaturalFeature: NaturalFeature;
  updatePostalCode: PostalCode;
  updateProgram: Program;
  updateProgramCategory: ProgramCategory;
  updateProperty: Property;
  updateRegion: Region;
  updateScrapeSource: ScrapeSource;
  updateUser: User;
};

export type MutationCreateActivityArgs = {
  input: CreateActivityInput;
};

export type MutationCreateAttractionArgs = {
  input: CreateAttractionInput;
};

export type MutationCreateCityArgs = {
  input: CreateCityInput;
};

export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};

export type MutationCreateEventArgs = {
  input: CreateEventInput;
};

export type MutationCreateMunicipalityArgs = {
  input: CreateMunicipalityInput;
};

export type MutationCreateNaturalFeatureArgs = {
  input: CreateNaturalFeatureInput;
};

export type MutationCreatePostalCodeArgs = {
  input: CreatePostalCodeInput;
};

export type MutationCreateProgramArgs = {
  input: CreateProgramInput;
};

export type MutationCreateProgramCategoryArgs = {
  input: CreateProgramCategoryInput;
};

export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput;
};

export type MutationCreateRegionArgs = {
  input: CreateRegionInput;
};

export type MutationCreateScrapeSourceArgs = {
  input: CreateScrapeSourceInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteActivityArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteAttractionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteCityArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteCountryArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteMunicipalityArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteNaturalFeatureArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeletePostalCodeArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteProgramArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteProgramCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeletePropertyArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteRegionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteScrapeSourceArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationUpdateActivityArgs = {
  id: Scalars['ID']['input'];
  input: UpdateActivityInput;
};

export type MutationUpdateAttractionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAttractionInput;
};

export type MutationUpdateCityArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCityInput;
};

export type MutationUpdateCountryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCountryInput;
};

export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEventInput;
};

export type MutationUpdateMunicipalityArgs = {
  id: Scalars['ID']['input'];
  input: UpdateMunicipalityInput;
};

export type MutationUpdateNaturalFeatureArgs = {
  id: Scalars['ID']['input'];
  input: UpdateNaturalFeatureInput;
};

export type MutationUpdatePostalCodeArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePostalCodeInput;
};

export type MutationUpdateProgramArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProgramInput;
};

export type MutationUpdateProgramCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProgramCategoryInput;
};

export type MutationUpdatePropertyArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePropertyInput;
};

export type MutationUpdateRegionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateRegionInput;
};

export type MutationUpdateScrapeSourceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateScrapeSourceInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type NaturalFeature = {
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
  items: Array<Activity>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedAttractions = {
  items: Array<Attraction>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedCities = {
  items: Array<City>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedEvents = {
  items: Array<Event>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedMunicipalities = {
  items: Array<Municipality>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedNaturalFeatures = {
  items: Array<NaturalFeature>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedPrograms = {
  items: Array<Program>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedProperties = {
  items: Array<Property>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedRegions = {
  items: Array<Region>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PostalCode = {
  city: City;
  cityId: Scalars['String']['output'];
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  properties?: Maybe<Array<Property>>;
};

export type PriceRange = {
  count: Scalars['Int']['output'];
  range: Scalars['String']['output'];
};

export type PriceStatistics = {
  averagePrice: Scalars['Float']['output'];
  maxPrice: Scalars['Float']['output'];
  minPrice: Scalars['Float']['output'];
  priceRanges: Array<PriceRange>;
  total: Scalars['Int']['output'];
};

export type Program = {
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
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  programs?: Maybe<Array<Program>>;
  updatedAt: Scalars['String']['output'];
};

export type ProgramStatus = 'ACTIVE' | 'EXPIRED' | 'INACTIVE' | 'SUSPENDED' | 'UPCOMING';

export type Property = {
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

export type PropertyStatistics = {
  byLocation: LocationStatistics;
  byPrice: PriceStatistics;
  byStatus: StatusStatistics;
};

export type PropertyStatus = 'FOR_RENT' | 'FOR_SALE' | 'PENDING' | 'RESERVED' | 'SOLD';

export type PropertyType = 'APARTMENT' | 'COMMERCIAL' | 'HOUSE' | 'LAND' | 'TOWNHOUSE' | 'VILLA';

export type Query = {
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
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  priceMax?: InputMaybe<Scalars['Float']['input']>;
  priceMin?: InputMaybe<Scalars['Float']['input']>;
  programId?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryPropertyArgs = {
  id: Scalars['ID']['input'];
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
  requestPayload?: Maybe<Scalars['JSON']['output']>;
  responseType?: Maybe<Scalars['String']['output']>;
  scrapingMethod: Scalars['String']['output'];
  selectors?: Maybe<Scalars['JSON']['output']>;
  sourceName: Scalars['String']['output'];
  throttleMs: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type StatusCount = {
  count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type StatusStatistics = {
  statusCounts: Array<StatusCount>;
  total: Scalars['Int']['output'];
};

export type UpdateActivityInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAttractionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCityInput = {
  altitude?: InputMaybe<Scalars['Int']['input']>;
  demographics_info?: InputMaybe<Scalars['String']['input']>;
  distance_to_city?: InputMaybe<Scalars['Int']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nature_scenery?: InputMaybe<Scalars['String']['input']>;
  population?: InputMaybe<Scalars['Int']['input']>;
  regionId?: InputMaybe<Scalars['ID']['input']>;
  travel_logistics?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCountryInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Scalars['String']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMunicipalityInput = {
  addressFull?: InputMaybe<Scalars['String']['input']>;
  altitude?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Array<Scalars['String']['input']>>;
  history?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Array<Scalars['String']['input']>>;
  population?: InputMaybe<Scalars['Int']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  regionId?: InputMaybe<Scalars['ID']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  visitWebsite?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNaturalFeatureInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostalCodeInput = {
  cityId?: InputMaybe<Scalars['ID']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProgramCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProgramInput = {
  applicationLinks?: InputMaybe<Array<Scalars['String']['input']>>;
  application_deadline?: InputMaybe<Scalars['String']['input']>;
  approvalDetails?: InputMaybe<Scalars['String']['input']>;
  availablePropertyCount?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  contact_email?: InputMaybe<Scalars['String']['input']>;
  contact_name?: InputMaybe<Scalars['String']['input']>;
  contact_phone?: InputMaybe<Scalars['String']['input']>;
  deposit_currency?: InputMaybe<Scalars['String']['input']>;
  deposit_required?: InputMaybe<Scalars['Int']['input']>;
  eligibility_age?: InputMaybe<Scalars['String']['input']>;
  eligibility_profile?: InputMaybe<Scalars['String']['input']>;
  financialGuaranteeAmount?: InputMaybe<Scalars['Int']['input']>;
  financialGuaranteeCurrency?: InputMaybe<Scalars['String']['input']>;
  incentive_energy?: InputMaybe<Scalars['Int']['input']>;
  incentive_relocation?: InputMaybe<Scalars['Int']['input']>;
  incentive_renovation?: InputMaybe<Scalars['Int']['input']>;
  living_requirement?: InputMaybe<Scalars['String']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  official_website?: InputMaybe<Scalars['String']['input']>;
  other_incentives?: InputMaybe<Scalars['String']['input']>;
  program_status?: InputMaybe<ProgramStatus>;
  program_terms?: InputMaybe<Scalars['String']['input']>;
  projectSummary?: InputMaybe<Scalars['String']['input']>;
  propertyDestinations?: InputMaybe<Array<Scalars['String']['input']>>;
  renovationRequirements?: InputMaybe<Scalars['String']['input']>;
  renovationTimelineMonths?: InputMaybe<Scalars['Int']['input']>;
  renovation_min_invest?: InputMaybe<Scalars['Int']['input']>;
  renovation_plan_deadline?: InputMaybe<Scalars['String']['input']>;
  renovation_required?: InputMaybe<Scalars['Boolean']['input']>;
  renovation_timeline?: InputMaybe<Scalars['String']['input']>;
  rental_allowed?: InputMaybe<Scalars['String']['input']>;
  sourceId?: InputMaybe<Scalars['ID']['input']>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
  visa_requirements?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePropertyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  applicationDeadline?: InputMaybe<Scalars['String']['input']>;
  availableFrom?: InputMaybe<Scalars['String']['input']>;
  availableUntil?: InputMaybe<Scalars['String']['input']>;
  bathrooms?: InputMaybe<Scalars['Int']['input']>;
  bedrooms?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['ID']['input']>;
  cityName?: InputMaybe<Scalars['String']['input']>;
  conditionDescription?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  deposit?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  listingType?: InputMaybe<Scalars['String']['input']>;
  listingUrl?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  marketValue?: InputMaybe<Scalars['Float']['input']>;
  municipalityId?: InputMaybe<Scalars['ID']['input']>;
  originalPrice?: InputMaybe<Scalars['Float']['input']>;
  parsedLocationData?: InputMaybe<Scalars['JSON']['input']>;
  postalCodeId?: InputMaybe<Scalars['ID']['input']>;
  priceAmount?: InputMaybe<Scalars['Float']['input']>;
  programId?: InputMaybe<Scalars['ID']['input']>;
  propertyHistory?: InputMaybe<Scalars['String']['input']>;
  propertyType?: InputMaybe<PropertyType>;
  property_details?: InputMaybe<Scalars['String']['input']>;
  renovationEstimate?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  sourceCreatedAt?: InputMaybe<Scalars['String']['input']>;
  sourceId?: InputMaybe<Scalars['ID']['input']>;
  sourceModifiedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PropertyStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  unitSize?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRegionInput = {
  avg_cost_of_living?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  famous_for?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateScrapeSourceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  httpMethod?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  queryParams?: InputMaybe<Scalars['JSON']['input']>;
  requestPayload?: InputMaybe<Scalars['JSON']['input']>;
  responseType?: InputMaybe<Scalars['String']['input']>;
  scrapingMethod?: InputMaybe<Scalars['String']['input']>;
  selectors?: InputMaybe<Scalars['JSON']['input']>;
  sourceName?: InputMaybe<Scalars['String']['input']>;
  throttleMs?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';
