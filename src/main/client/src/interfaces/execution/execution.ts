import { ConditionStatus } from '@/enums/execution/condition.ts';
import { ConditionState } from '@/interfaces/execution/condition.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';

export interface Execution {
  id: string;
  createdAt: Date;
  conditionStatus: ConditionStatus;
  conditionState?: ConditionState;
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
  chooseProcessStepId?: string;
}
