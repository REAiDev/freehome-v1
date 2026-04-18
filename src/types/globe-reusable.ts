/**
 * Reusable Globe Types
 * Export these types to use in other components
 */

// Main arc connection data structure
export interface GlobeArc {
  type: string;
  order: number;
  from: string;
  to: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  arcAlt: number;
  status?: boolean;
}

// Collection of arcs
export interface GlobeArcsData {
  type: string;
  pulls: GlobeArc[];
}

// City/location data
export interface GlobeLocation {
  city: string;
  lat: number;
  lng: number;
  size?: number;
}

// Map locations collection
export interface GlobeMapData {
  coordinates: GlobeLocation[];
}

// For creating dynamic arcs
export interface DynamicArcConfig {
  minArcs?: number;
  maxArcs?: number;
  colors?: string[];
  speedRange?: [number, number];
  altitudeRange?: [number, number];
}

// Globe animation settings
export interface GlobeAnimationConfig {
  autoRotateSpeed?: number;
  breathingIntensity?: number;
  arcAnimationTime?: number;
  arcRefreshInterval?: number;
}
