import * as z from 'zod';

export const planSchema = z.object({
  destination: z.string().min(2, 'Destination must be at least 2 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.object({
    min: z.number().min(0, 'Minimum budget cannot be negative'),
    max: z.number().min(0, 'Maximum budget cannot be negative')
  }),
  travelType: z.enum(['Solo', 'Friends', 'Family', 'Couple', 'Group', 'Business']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  itinerary: z.string().min(10, 'Itinerary must be at least 10 characters'),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required')
});
