'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { addFarm } from '@/lib/data';
import { cropRecommendation } from '@/ai/flows/crop-recommendation';

const addFarmSchema = z.object({
  name: z.string().min(1, 'Farm name is required.'),
  location: z.string().min(1, 'Location is required.'),
  landAreaAcres: z.coerce.number().positive('Land area must be a positive number.'),
  soilType: z.string().min(1, 'Soil type is required.'),
  climate: z.string().min(1, 'Climate is required.'),
  waterAvailability: z.string().min(1, 'Water availability is required.'),
});

export async function addFarmAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = addFarmSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        message: 'Validation Error',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await addFarm(validatedFields.data);

    revalidatePath('/dashboard');
    return { message: 'success' };
  } catch (error) {
    return { message: 'An unexpected error occurred.' };
  }
}

const recommendationSchema = z.object({
  farmName: z.string(),
  location: z.string(),
  soilType: z.string(),
  climateData: z.string(),
  previousCrops: z.preprocess((val) => (typeof val === 'string' && val ? val.split(',').map((s) => s.trim()) : []), z.array(z.string())),
  landAreaAcres: z.coerce.number(),
  waterAvailability: z.string(),
});

export async function getRecommendationAction(prevState: any, formData: FormData) {
  try {
    const parsedData = recommendationSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!parsedData.success) {
      console.error('Validation Error:', parsedData.error.flatten().fieldErrors);
      return { status: 'error', message: 'Invalid form data.' };
    }

    const result = await cropRecommendation(parsedData.data);
    return { status: 'success', data: result };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'Failed to get recommendation from AI.' };
  }
}
