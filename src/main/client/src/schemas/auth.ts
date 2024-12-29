import { ZodType, z } from 'zod';
import { User } from '@/interfaces/auth.ts';

export const userSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  email: z.string(),
  name: z.string(),
}) satisfies ZodType<User>;
