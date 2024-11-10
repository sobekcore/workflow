import { Condition } from '@/interfaces/process-step/condition.ts';

export interface ProcessStep {
  id: string;
  createdAt: Date;
  name: string;
  description?: string;
  condition: Condition;
  prevProcessStep?: ProcessStep;
}

export interface ProcessStepToCreate {
  name: string;
  description?: string;
  condition: Condition;
  prevProcessStepId?: string;
  fromProcessStepsIds?: string[];
  processId: string;
}
