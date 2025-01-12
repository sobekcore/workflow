import { mockProcessStep } from '@test/mocks/process-step.ts';
import { Process } from '@/interfaces/process.ts';

export function mockProcess(): Process {
  return {
    id: 'process',
    createdAt: new Date(0),
    name: 'Process',
    steps: [mockProcessStep()],
  };
}
