import { Condition } from '@/enums/process-step/condition.ts';
import { ConditionOption } from '@/interfaces/process-step/condition.ts';

export interface ProcessStep {
  id: string;
  createdAt: string;
  name: string;
  description?: string;
  conditionType: Condition;
  conditionDataVisit?: {
    link: string;
  };
  conditionDataRadio?: {
    options: ConditionOption[];
  };
}

export interface ProcessStepToAdd {
  name: string;
  description?: string;
  conditionType: Condition;
  conditionDataVisit?: {
    link: string;
  };
  conditionDataRadio?: {
    options: ConditionOption[];
  };
  processId: string;
}
