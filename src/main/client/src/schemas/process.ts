import { ZodType, z } from 'zod';
import { Process, ProcessToCreate, ProcessToUpdate } from '@/interfaces/process.ts';
import { processStepSchema } from '@/schemas/process-step/process-step.ts';

export const processSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  name: z.string(),
  steps: z.array(processStepSchema),
}) satisfies ZodType<Process>;

export const processToCreateSchema = z.object({
  name: z.string().min(1),
}) satisfies ZodType<ProcessToCreate>;

export const processToUpdateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
}) satisfies ZodType<ProcessToUpdate>;
