import { ZodType, z } from 'zod';
import { User } from '@/interfaces/auth.ts';

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  email: z.string(),
  name: z.string(),
}) satisfies ZodType<User>;

export const userToUpdateSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
});
