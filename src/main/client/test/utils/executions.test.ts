import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { ConditionStatus } from '@/enums/execution/condition.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { findNextProcessStep, isExecutionStepPossibleToChoose } from '@/utils/executions.ts';

const processStep: ProcessStep = mockProcessStep();
const anotherProcessStep: ProcessStep = {
  ...mockProcessStep(),
  id: 'process-step-2',
  availableFrom: [processStep],
};

test('should return undefined when next steps doesnt exist', () => {
  expect(
    findNextProcessStep({
      ...mockExecution(),
      process: {
        ...mockProcess(),
        steps: [processStep],
      },
    }),
  ).toBeUndefined();
});

test('should find next execution step', () => {
  expect(
    findNextProcessStep({
      ...mockExecution(),
      process: {
        ...mockProcess(),
        steps: [processStep, anotherProcessStep],
      },
    }),
  ).toEqual(anotherProcessStep);
});

test('should find next execution step when multiple steps are found', () => {
  expect(
    findNextProcessStep(
      {
        ...mockExecution(),
        process: {
          ...mockProcess(),
          steps: [
            processStep,
            anotherProcessStep,
            {
              ...mockProcessStep(),
              id: 'process-step-3',
              prevProcessStep: processStep,
              availableFrom: [processStep],
            },
          ],
        },
      },
      anotherProcessStep.id,
    ),
  ).toEqual(anotherProcessStep);
});

test('should throw exception when cant determine next execution step', () => {
  expect(() =>
    findNextProcessStep({
      ...mockExecution(),
      process: {
        ...mockProcess(),
        steps: [
          processStep,
          anotherProcessStep,
          {
            ...mockProcessStep(),
            id: 'process-step-3',
            prevProcessStep: processStep,
            availableFrom: [processStep],
          },
        ],
      },
    }),
  ).toThrow();
});

test('should return true when execution step is possible to choose', () => {
  expect(
    isExecutionStepPossibleToChoose(
      {
        ...mockExecution(),
        conditionStatus: ConditionStatus.CHOOSE,
        process: {
          ...mockProcess(),
          steps: [
            processStep,
            anotherProcessStep,
            {
              ...mockProcessStep(),
              id: 'process-step-3',
              prevProcessStep: processStep,
              availableFrom: [processStep],
            },
          ],
        },
      },
      anotherProcessStep,
    ),
  ).toBeTruthy();
});

test('should return false when execution step is not possible to choose', () => {
  expect(
    isExecutionStepPossibleToChoose(
      {
        ...mockExecution(),
        conditionStatus: ConditionStatus.CHOOSE,
        process: {
          ...mockProcess(),
          steps: [processStep, anotherProcessStep],
        },
      },
      anotherProcessStep,
    ),
  ).toBeFalsy();
});
