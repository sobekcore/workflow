import { ZodType, z } from 'zod';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { Condition, ConditionData, ConditionOption } from '@/interfaces/process-step/condition.ts';

export const conditionOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
}) satisfies ZodType<ConditionOption>;

export const conditionDataSchema = z.object({
  link: z.string().optional(),
  options: z.array(conditionOptionSchema).optional(),
}) satisfies ZodType<ConditionData>;

export const conditionSchema = z.object({
  type: z.nativeEnum(ConditionType),
  data: conditionDataSchema.optional(),
}) satisfies ZodType<Condition>;
