// TypeScript types for Globe component data structures

export interface ArcData {
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

export interface LinesData {
  type: string;
  pulls: ArcData[];
}

export interface CityCoordinate {
  city: string;
  lat: number;
  lng: number;
  size?: number;
}

export interface MapData {
  coordinates: CityCoordinate[];
}

export interface GeoJsonFeature {
  type: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export interface CountriesGeoJson {
  type: string;
  features: GeoJsonFeature[];
}

// Globe configuration types
export interface GlobeConfig {
  globeRadius?: number;
  hexPolygonResolution?: number;
  hexPolygonMargin?: number;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
}

export interface ArcConfig {
  arcDashLength?: number;
  arcDashGap?: number;
  arcDashAnimateTime?: number;
  arcsTransitionDuration?: number;
}

export interface LabelConfig {
  labelColor?: string;
  labelDotRadius?: number;
  labelResolution?: number;
  labelAltitude?: number;
  labelTypeFace?: string;
}
