import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { ConditionStatus } from '@/enums/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';

export function mockExecution(): Execution {
  return {
    id: 'execution',
    createdAt: new Date(0),
    conditionStatus: ConditionStatus.COMPLETED,
    conditionState: {},
    process: mockProcess(),
    processStep: mockProcessStep(),
  };
}
