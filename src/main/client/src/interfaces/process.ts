import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

export interface Process {
  id: string;
  createdAt: Date;
  name: string;
  steps: ProcessStep[];
  editable: boolean;
}

export interface ProcessToCreate {
  name: string;
}

export interface ProcessToUpdate {
  id: string;
  name: string;
}
