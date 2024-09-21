import { ZodType, z } from 'zod';
import { ConditionState } from '@/interfaces/execution/condition.ts';
import { conditionOptionSchema } from '@/schemas/process-step/condition.ts';

export const conditionStateSchema = z.object({
  visited: z.boolean().optional(),
  option: conditionOptionSchema.optional(),
  options: z.array(conditionOptionSchema).optional(),
}) satisfies ZodType<ConditionState>;
