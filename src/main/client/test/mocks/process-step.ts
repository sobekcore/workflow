import { ConditionType } from '@/enums/process-step/condition.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

export function mockProcessStep(): ProcessStep {
  const processStep: ProcessStep = {
    id: 'process-step',
    createdAt: new Date(0),
    name: 'Process Step',
    description: 'Description',
    condition: {
      type: ConditionType.NONE,
    },
  };

  return {
    ...processStep,
    prevProcessStep: {
      id: 'prev-process-step',
      createdAt: new Date(0),
      name: 'Prev Process Step',
      description: 'Description',
      condition: {
        type: ConditionType.NONE,
      },
      availableFrom: [processStep],
    },
  };
}
