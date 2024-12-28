import { ZodType, z } from 'zod';
import { User } from '@/interfaces/auth.ts';

export const userSchema = z.object({
  login: z.string(),
}) satisfies ZodType<User>;
