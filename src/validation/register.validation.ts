import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  role: z.enum(['USER', 'ADMIN']),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

