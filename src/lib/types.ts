export interface Farm {
  id: string;
  name: string;
  location: string;
  landAreaAcres: number;
  soilType: string;
  climate: string;
  waterAvailability: string;
  previousCrops: Crop[];
}

export interface Crop {
  id: string;
  name: string;
  year: number;
}
