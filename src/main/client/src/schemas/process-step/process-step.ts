import { ZodType, z } from 'zod';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { conditionSchema } from '@/schemas/process-step/condition.ts';

export const processStepSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  name: z.string(),
  description: z.string().optional(),
  condition: conditionSchema,
}) satisfies ZodType<ProcessStep>;
