/**
 * Featured Municipality Card Component
 * Responsibility: Display a single featured municipality in card format
 * Follows SRP by focusing only on municipality card display
 * Follows OCP by being extensible through props
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Building2 } from 'lucide-react';
import Image from 'next/image';
import type { FeaturedMunicipality } from '@/services/homepage-service';

export interface FeaturedMunicipalityCardProps {
  readonly municipality: FeaturedMunicipality;
}

export function FeaturedMunicipalityCard({ municipality }: FeaturedMunicipalityCardProps) {
  const formatLocation = (): string => {
    const parts = [municipality.region.name, municipality.region.country.name].filter(Boolean);
    return parts.join(', ');
  };

  const formatPopulation = (population: number | null | undefined): string => {
    if (!population) return 'Unknown';
    if (population >= 1000000) return `${(population / 1000000).toFixed(1)}M`;
    if (population >= 1000) return `${(population / 1000).toFixed(1)}K`;
    return population.toString();
  };

  const formatPropertyCount = (count: number): string => {
    if (count === 0) return 'No available properties';
    if (count === 1) return '1 Available Property';
    return `${count} Available Properties`;
  };

  const getTruncatedDescription = (description: string | null | undefined): string => {
    if (!description) {
      return 'A charming municipality offering unique opportunities for new residents seeking affordable housing solutions.';
    }

    // Truncate description to approximately 120 characters for better readability
    if (description.length <= 120) return description;

    const truncated = description.substring(0, 120);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
      {/* Header Section with Image or Gradient */}
      <div className="relative h-56 w-full overflow-hidden">
        {municipality.imageUrl ? (
          <Image
            src={municipality.imageUrl}
            alt={municipality.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 group-hover:scale-105 transition-transform duration-500" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">
            {municipality.name}
          </h3>
          <div className="flex items-center text-blue-100 text-sm font-medium drop-shadow">
            <MapPin className="h-4 w-4 mr-1.5" />
            {formatLocation()}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6">
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {getTruncatedDescription(municipality.description)}
        </p>

        {/* Stats Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{formatPopulation(municipality.population)}</span>
          </div>

          <Badge
            variant={municipality.propertyCount > 0 ? 'default' : 'secondary'}
            className={`${
              municipality.propertyCount > 0
                ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
                : 'bg-gray-100 text-gray-600'
            } font-medium`}
          >
            <Building2 className="h-3 w-3 mr-1" />
            {municipality.propertyCount > 0 ? municipality.propertyCount : '0'}
          </Badge>
        </div>

        {/* Property Count Display */}
        <div>
          <p
            className={`text-sm font-semibold ${
              municipality.propertyCount > 0 ? 'text-gray-700' : 'text-gray-500'
            }`}
          >
            {formatPropertyCount(municipality.propertyCount)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
