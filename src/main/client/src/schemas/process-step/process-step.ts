import { ZodType, z } from 'zod';
import {
  ProcessStep,
  ProcessStepToAssign,
  ProcessStepToCreate,
  ProcessStepToUpdate,
} from '@/interfaces/process-step/process-step.ts';
import { conditionSchema } from '@/schemas/process-step/condition.ts';

const baseProcessStepSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  name: z.string(),
  description: z.string().optional(),
  condition: conditionSchema,
}) satisfies ZodType<ProcessStep>;

export const processStepSchema = baseProcessStepSchema.extend({
  prevProcessStep: baseProcessStepSchema.optional(),
  availableFrom: z.array(baseProcessStepSchema).optional(),
}) satisfies ZodType<ProcessStep>;

export const processStepToCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  condition: conditionSchema,
  prevProcessStepId: z.string().optional(),
  fromProcessStepsIds: z.array(z.string()).optional(),
  processId: z.string(),
}) satisfies ZodType<ProcessStepToCreate>;

export const processStepToUpdateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  condition: conditionSchema,
}) satisfies ZodType<ProcessStepToUpdate>;

export const processStepToAssignSchema = z.object({
  processStepId: z.string(),
  assignProcessStepId: z.string(),
}) satisfies ZodType<ProcessStepToAssign>;
