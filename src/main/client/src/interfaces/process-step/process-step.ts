import { Condition } from '@/interfaces/process-step/condition.ts';

export interface ProcessStep {
  id: string;
  createdAt: string;
  name: string;
  description?: string;
  condition: Condition;
}

export interface ProcessStepToAdd {
  name: string;
  description?: string;
  condition: Condition;
  processId: string;
}
