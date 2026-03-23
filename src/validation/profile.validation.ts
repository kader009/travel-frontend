import * as z from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  image: z.string().optional(),
  bio: z.string().optional(),
  currentLocation: z.string().optional(),
  travelInterests: z.array(z.string()).optional(),
  visitedCountries: z.array(z.string()).optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional()
});
