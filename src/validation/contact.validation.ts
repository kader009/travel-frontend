import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(8, "Full name must be at least 8 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(15, "Subject must be at least 15 characters."),
  message: z.string().min(20, "Message must be at least 20 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
