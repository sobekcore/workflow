import { ConditionOption } from '@/interfaces/process-step/condition.ts';

export interface ConditionState {
  visited?: boolean;
  option?: ConditionOption;
  options?: ConditionOption[];
}

export interface ConditionToComplete {
  executionId: string;
  state?: ConditionState;
}
