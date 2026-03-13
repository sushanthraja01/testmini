'use server';
/**
 * @fileOverview An AI agent for providing crop recommendations.
 *
 * - cropRecommendation - A function that handles the crop recommendation process.
 * - CropRecommendationInput - The input type for the cropRecommendation function.
 * - CropRecommendationOutput - The return type for the cropRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CropRecommendationInputSchema = z.object({
  farmName: z.string().describe('The name of the farm.'),
  location: z.string().describe('The geographical location of the farm (e.g., city, country, or specific coordinates).'),
  soilType: z.string().describe('A description of the soil type (e.g., loamy, clay, sandy, pH level).'),
  climateData: z.string().describe('General climate description of the region (e.g., temperate, tropical, average rainfall, temperature range).'),
  previousCrops: z.array(z.string()).describe('A list of crops previously grown on the farm.').optional(),
  landAreaAcres: z.number().positive().describe('The total land area of the farm in acres.'),
  waterAvailability: z.string().describe('Description of water availability (e.g., good irrigation system, rain-fed, limited access).'),
});
export type CropRecommendationInput = z.infer<typeof CropRecommendationInputSchema>;

const CropRecommendationOutputSchema = z.object({
  recommendedCrops: z.array(
    z.object({
      cropName: z.string().describe('The name of the recommended crop.'),
      reason: z.string().describe('Why this crop is recommended given the farm conditions.'),
      optimalConditions: z.string().describe('Ideal conditions for this crop, specific to soil, climate, and water.'),
      estimatedYieldPotential: z.string().describe('A qualitative or quantitative estimate of the yield potential for this crop on this farm.'),
    })
  ).describe('A list of recommended crops for the farm.'),
  generalAdvice: z.string().describe('General agricultural advice for the farmer based on the provided farm data.'),
});
export type CropRecommendationOutput = z.infer<typeof CropRecommendationOutputSchema>;

export async function cropRecommendation(input: CropRecommendationInput): Promise<CropRecommendationOutput> {
  return cropRecommendationFlow(input);
}

const cropRecommendationPrompt = ai.definePrompt({
  name: 'cropRecommendationPrompt',
  input: { schema: CropRecommendationInputSchema },
  output: { schema: CropRecommendationOutputSchema },
  prompt: `You are an expert agricultural advisor and crop specialist. Your task is to provide the best crop recommendations for a farm based on the provided details. Consider all factors carefully to maximize yield and profitability while ensuring sustainable practices.

Here are the farm details:
Farm Name: {{{farmName}}}
Location: {{{location}}}
Soil Type: {{{soilType}}}
Climate Data: {{{climateData}}}
Land Area: {{{landAreaAcres}}} acres
Water Availability: {{{waterAvailability}}}
{{#if previousCrops}}
Previous Crops: {{#each previousCrops}}- {{{this}}}\n{{/each}}{{else}}
No previous crops specified.
{{/if}}

Based on these details, recommend 2-3 optimal crops. For each recommended crop, explain the reason for the recommendation, describe its optimal growing conditions relevant to the farm, and provide an estimated yield potential. Finally, offer some general advice for the farmer.

Respond with a JSON object following the structure:
{
  "recommendedCrops": [
    {
      "cropName": "[Name of Crop]",
      "reason": "[Explanation for recommendation]",
      "optimalConditions": "[Ideal conditions for this crop]",
      "estimatedYieldPotential": "[Yield estimate]"
    }
  ],
  "generalAdvice": "[General advice for the farmer]"
}
`,
});

const cropRecommendationFlow = ai.defineFlow(
  {
    name: 'cropRecommendationFlow',
    inputSchema: CropRecommendationInputSchema,
    outputSchema: CropRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await cropRecommendationPrompt(input);
    if (!output) {
      throw new Error('No output received from crop recommendation prompt.');
    }
    return output;
  }
);
