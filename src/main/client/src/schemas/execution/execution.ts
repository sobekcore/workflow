import { ZodType, z } from 'zod';
import { Execution, ExecutionToCreate } from '@/interfaces/execution/execution.ts';
import { conditionStateSchema } from '@/schemas/execution/condition.ts';
import { processStepSchema } from '@/schemas/process-step/process-step.ts';
import { processSchema } from '@/schemas/process.ts';

export const executionSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  conditionCompleted: z.boolean(),
  conditionState: conditionStateSchema.optional(),
  process: processSchema,
  processStep: processStepSchema.optional(),
}) satisfies ZodType<Execution>;

export const executionToCreateSchema = z.object({
  processId: z.string().min(1, { message: 'Process must be selected' }),
  processStepId: z.string().min(1, { message: 'Process Step must be selected' }),
}) satisfies ZodType<ExecutionToCreate>;
