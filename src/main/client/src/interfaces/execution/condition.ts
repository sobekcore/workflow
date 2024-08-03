import { ConditionOption } from '@/interfaces/process-step/condition.ts';

export interface ConditionToComplete {
  executionId: string;
  conditionStateRadio?: {
    option: ConditionOption;
  };
}
