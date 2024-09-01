import { ConditionType } from '@/enums/process-step/condition.ts';

export interface Condition {
  type: ConditionType;
  data?: ConditionData;
}

export interface ConditionData {
  link?: string;
  options?: ConditionOption[];
}

export interface ConditionOption {
  label: string;
}
