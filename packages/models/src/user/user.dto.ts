import { z } from 'zod';

export const userDefinition = z.object({
  name: z.string().min(3),
  email: z.string().email().min(5),
  password: z.string().min(8).optional(),
  createdAt: z.string().datetime().or(z.date()).nullable().optional(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});
