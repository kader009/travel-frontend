import { z } from 'zod';

export const newsletterValidationSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Please enter a valid email address' });
