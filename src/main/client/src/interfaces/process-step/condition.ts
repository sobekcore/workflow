import { ConditionType } from '@/enums/process-step/condition.ts';

export interface ConditionOption {
  label: string;
  value: string;
}

export interface ConditionData {
  link?: string;
  options?: ConditionOption[];
}

export interface Condition {
  type: ConditionType;
  data?: ConditionData;
}
