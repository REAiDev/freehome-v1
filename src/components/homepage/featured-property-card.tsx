/**
 * Featured Property Card Component
 * Responsibility: Display a single featured property in card format
 * Follows SRP by focusing only on property card display
 * Follows OCP by being extensible through props
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PropertyImage from '@/components/common/PropertyImage';
import { MapPin, Home, Bath, Maximize, Lock } from 'lucide-react';
import type { FeaturedProperty } from '@/services/homepage-service';
import { formatPrice } from '@/lib/property-formatters';

export interface FeaturedPropertyCardProps {
  readonly property: FeaturedProperty;
  readonly canViewAddressDetails?: boolean;
}

export function FeaturedPropertyCard({
  property,
  canViewAddressDetails = false,
}: FeaturedPropertyCardProps) {
  const formatPropertyPrice = (amount: number | null | undefined): string => {
    if (amount === null || amount === undefined) return '€1';
    const currencySymbol = property.currency === 'USD' ? '$' : '€';
    if (amount === 0) return `${currencySymbol}0`;
    if (amount <= 1) return '€1';
    return `${currencySymbol}${amount.toLocaleString()}`;
  };

  const getPropertyLabel = (): string => {
    const price = property.priceAmount;
    // Free properties ($0)
    if (price === 0) {
      return 'Free Property';
    }
    if (price === null || price === undefined || price <= 1) {
      return '€1 Property';
    }
    // For properties under €10,000, show as "Low Price Property"
    if (price < 10000) {
      return 'Low Price Property';
    }
    // For properties under €50,000, show as "Affordable Property"
    if (price < 50000) {
      return 'Affordable Property';
    }
    return 'Property';
  };

  const getRenovationEstimate = (): string => {
    if (property.renovationEstimate) {
      return formatPrice(property.renovationEstimate, property.currency);
    }
    // Return empty string if no renovation estimate available
    return '';
  };

  const formatLocation = (): string => {
    // Always show region and country
    const publicParts = [property.city?.region?.name, property.city?.region?.country?.name].filter(
      Boolean
    );

    // Only show city name if user can view address details
    if (canViewAddressDetails) {
      const fullParts = [property.cityName || property.city?.name, ...publicParts].filter(Boolean);
      return fullParts.length > 0 ? fullParts.join(', ') : 'Location not specified';
    }

    // For non-paying users, only show region and country
    return publicParts.length > 0 ? publicParts.join(', ') : 'Italy';
  };

  const getLocationIcon = () => {
    if (!canViewAddressDetails && (property.cityName || property.city?.name)) {
      return (
        <div className="flex items-center gap-1">
          <Lock className="h-3 w-3 text-gray-400" />
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
        </div>
      );
    }
    return <MapPin className="h-4 w-4 mr-1 text-gray-400" />;
  };

  const formatSpecs = (): Array<{ icon: React.ReactNode; text: string }> => {
    const specs: Array<{ icon: React.ReactNode; text: string }> = [];

    if (property.bedrooms) {
      specs.push({
        icon: <Home className="h-4 w-4" />,
        text: `${property.bedrooms} Bedroom${property.bedrooms > 1 ? 's' : ''}`,
      });
    }

    if (property.bathrooms) {
      specs.push({
        icon: <Bath className="h-4 w-4" />,
        text: `${property.bathrooms} Bathroom${property.bathrooms > 1 ? 's' : ''}`,
      });
    }

    if (property.size) {
      specs.push({
        icon: <Maximize className="h-4 w-4" />,
        text: `${property.size} ${property.unitSize || 'm²'}`,
      });
    }

    return specs;
  };

  const getPropertyImage = (): string => {
    const images = property.images;
    if (images && images.length > 0) {
      return images[0];
    }
    return '/placeholder-property.jpg'; // Fallback image
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200">
      <div className="block">
        <div className="relative h-56 w-full overflow-hidden cursor-not-allowed">
          <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold px-3 py-1 text-sm shadow-lg">
            {getPropertyLabel()}
          </Badge>
          <div className="relative h-full w-full">
            <PropertyImage
              src={getPropertyImage()}
              alt={property.title || 'Property image'}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {property.title || 'Charming Property'}
            </h3>
            <div className="flex items-center mt-2 text-gray-600">
              {getLocationIcon()}
              <p className="text-sm">{formatLocation()}</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="text-2xl font-bold text-primary">
              {formatPropertyPrice(property.priceAmount)}
            </div>
            {getRenovationEstimate() && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Est. Renovation</div>
                <div className="text-lg font-semibold text-gray-700">
                  ~{getRenovationEstimate()}
                </div>
              </div>
            )}
          </div>

          {formatSpecs().length > 0 && (
            <div className="flex items-center gap-4 py-2 border-t border-gray-100">
              {formatSpecs().map((spec, index) => (
                <div key={index} className="flex items-center gap-1 text-sm text-gray-600">
                  {spec.icon}
                  <span>{spec.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
