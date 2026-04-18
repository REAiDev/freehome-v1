/**
 * Homepage Components Export Barrel
 * Responsibility: Centralize exports for homepage components
 * Follows DRY by providing a single import point
 */

export { FeaturedPropertyCard } from './featured-property-card';
export { FeaturedMunicipalityCard } from './featured-municipality-card';
export { LoadingGrid, PropertyCardSkeleton, MunicipalityCardSkeleton } from './loading-skeleton';
export { ErrorState } from './error-state';
export { default as FilterModalWrapper } from './FilterModalWrapper';

export type { FeaturedPropertyCardProps } from './featured-property-card';
export type { FeaturedMunicipalityCardProps } from './featured-municipality-card';
export type { LoadingGridProps } from './loading-skeleton';
export type { ErrorStateProps } from './error-state';
