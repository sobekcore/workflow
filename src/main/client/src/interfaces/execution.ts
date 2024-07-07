import { ProcessStep } from '@/interfaces/process-step.ts';
import { Process } from '@/interfaces/process.ts';

export interface Execution {
  id: string;
  createdAt: string;
  process: Process;
  processStep?: ProcessStep;
}

export interface ExecutionToCreate {
  processId: string;
  processStepId: string;
}

export interface ExecutionToProgress {
  executionId: string;
  processId?: string;
  processStepId?: string;
}
