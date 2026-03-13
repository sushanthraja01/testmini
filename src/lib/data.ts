import type { Farm } from './types';

// Mock data
let farms: Farm[] = [
  {
    id: '1',
    name: 'Green Valley Farms',
    location: 'California, USA',
    landAreaAcres: 150,
    soilType: 'Loamy',
    climate: 'Temperate',
    waterAvailability: 'Good irrigation system',
    previousCrops: [
      { id: 'c1', name: 'Corn', year: 2023 },
      { id: 'c2', name: 'Soybeans', year: 2022 },
    ],
  },
  {
    id: '2',
    name: 'Sunrise Meadows',
    location: 'Iowa, USA',
    landAreaAcres: 300,
    soilType: 'Silty clay loam',
    climate: 'Continental',
    waterAvailability: 'Rain-fed with backup well',
    previousCrops: [
      { id: 'c3', name: 'Wheat', year: 2023 },
      { id: 'c4', name: 'Alfalfa', year: 2022 },
    ],
  },
  {
    id: '3',
    name: 'Golden Fields',
    location: 'Kansas, USA',
    landAreaAcres: 500,
    soilType: 'Sandy loam',
    climate: 'Semi-arid',
    waterAvailability: 'Limited, center-pivot irrigation',
    previousCrops: [{ id: 'c5', name: 'Sorghum', year: 2023 }],
  },
];

export async function getFarms(): Promise<Farm[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return farms;
}

export async function getFarmById(id: string): Promise<Farm | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return farms.find((farm) => farm.id === id);
}

export async function addFarm(farmData: Omit<Farm, 'id' | 'previousCrops'>): Promise<Farm> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newFarm: Farm = {
    ...farmData,
    id: (farms.length + 1).toString(),
    previousCrops: [],
  };
  farms.push(newFarm);
  return newFarm;
}
