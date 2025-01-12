import { mockProcessStep } from '@test/mocks/process-step.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { buildProcessStepTree } from '@/utils/processes.ts';

test('should build process step tree', () => {
  const rootProcessStep: ProcessStep = {
    ...mockProcessStep(),
    prevProcessStep: undefined,
    availableFrom: undefined,
  };
  const processStep: ProcessStep = {
    ...mockProcessStep(),
    id: 'process-2',
    prevProcessStep: rootProcessStep,
  };
  const chooseProcessStep: ProcessStep = {
    ...mockProcessStep(),
    id: 'process-3',
    prevProcessStep: processStep,
  };
  const chooseAnotherProcessStep: ProcessStep = {
    ...mockProcessStep(),
    id: 'process-4',
    prevProcessStep: processStep,
  };

  expect(buildProcessStepTree([rootProcessStep, processStep, chooseProcessStep, chooseAnotherProcessStep])).toEqual([
    {
      ...rootProcessStep,
      children: [
        {
          ...processStep,
          prevProcessStep: expect.any(rootProcessStep.constructor),
          children: [
            { ...chooseProcessStep, prevProcessStep: expect.any(processStep.constructor) },
            { ...chooseAnotherProcessStep, prevProcessStep: expect.any(processStep.constructor) },
          ],
        },
      ],
    },
  ]);
});
