/**
 * Soil nutrient levels (in ppm or kg/hectare)
 */
export interface SoilNutrients {
  nitrogen: number; // N content
  phosphorus: number; // P content
  potassium: number; // K content
}

/**
 * Environmental/climatic conditions
 */
export interface EnvironmentalConditions {
  temperature: number; // in Celsius
  humidity: number; // percentage (0-100)
  rainfall: number; // in mm per season/month
}

/**
 * Soil properties
 */
export interface SoilProperties {
  ph: number; // soil pH (0-14)
}

/**
 * Geographic and temporal context
 */
export interface FarmContext {
  location: string; // location name or region
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

/**
 * Complete input data for crop recommendation
 * Includes soil nutrients, environmental conditions, and farm context
 */
export interface CropRecommendationInput {
  soil: SoilNutrients;
  environment: EnvironmentalConditions;
  soilProperties: SoilProperties;
  farm: FarmContext;
}
