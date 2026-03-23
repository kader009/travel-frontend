import { z } from 'zod';
import { registerSchema } from '@/src/validation/register.validation';
import { profileSchema } from '@/src/validation/profile.validation';
import { loginSchema } from '@/src/validation/login.validation';
import { planSchema } from '@/src/validation/travelPlan.validation';

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type PlanFormValues = z.infer<typeof planSchema>;

export interface ReviewFormValues {
  reviewee: string;
  rating: number;
  comment: string;
  travelPlan: string;
}
