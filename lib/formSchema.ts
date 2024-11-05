import { z } from 'zod';

export const baseSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  name: z.string().min(6, 'Name must be at least 6 characters').optional(),
});