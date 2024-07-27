import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

export interface Process {
  id: string;
  createdAt: string;
  name: string;
  steps: ProcessStep[];
}

export interface ProcessToCreate {
  name: string;
}
