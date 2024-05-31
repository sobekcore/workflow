import { ProcessStep } from '@/interfaces/process-step.ts';

export interface Process {
  id: string;
  name: string;
  steps: ProcessStep[];
}

export interface ProcessToAdd {
  name: string;
}
