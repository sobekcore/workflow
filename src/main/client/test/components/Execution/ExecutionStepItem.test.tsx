import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { ConditionStatus } from '@/enums/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import ExecutionStepItem from '@/components/Execution/ExecutionStepItem.tsx';

const mutate: Mock = vi.fn();
vi.mock('@/hooks/executions/useProgressExecutions.ts', () => ({
  useProgressExecutions: () => ({
    mutate,
  }),
}));

const processStep: ProcessStep = mockProcessStep();
const execution: Execution = mockExecution();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ExecutionStepItem execution={execution} processStep={processStep} />
    </MockQueryClientProvider>,
  );
});

test('should render execution step name', () => {
  expect(component.getByText(`${processStep.name}`)).toBeInTheDocument();
});

test('should render condition when step is active', () => {
  expect(component.getByTestId('workflow-step-condition')).toBeInTheDocument();
});

test('should not render condition when step is not active', () => {
  const execution: Execution = {
    ...mockExecution(),
    processStep: undefined,
  };

  component = render(
    <MockQueryClientProvider>
      <ExecutionStepItem execution={execution} processStep={processStep} />
    </MockQueryClientProvider>,
  );

  expect(component.queryByTestId('workflow-step-condition')).not.toBeInTheDocument();
});

test('should render current execution step when in progress', () => {
  const execution: Execution = {
    ...mockExecution(),
    conditionStatus: ConditionStatus.IN_PROGRESS,
  };

  component = render(
    <MockQueryClientProvider>
      <ExecutionStepItem execution={execution} processStep={processStep} />
    </MockQueryClientProvider>,
  );

  expect(component.getByText('Current Execution Step')).toBeInTheDocument();
});

test('should call useProgressExecutions when completed', () => {
  fireEvent.click(component.getByRole('button', { name: 'Complete Execution Step' }));

  expect(mutate).toHaveBeenCalledOnce();
  expect(mutate).toHaveBeenCalledWith([{ executionId: execution.id }]);
});

test('should call useProgressExecutions when choose', () => {
  const execution: Execution = {
    ...mockExecution(),
    conditionStatus: ConditionStatus.CHOOSE,
    process: {
      ...mockProcess(),
      steps: [
        processStep,
        {
          ...mockProcessStep(),
          availableFrom: [processStep],
        },
        {
          ...mockProcessStep(),
          availableFrom: [processStep],
        },
      ],
    },
  };

  component = render(
    <MockQueryClientProvider>
      <ExecutionStepItem execution={execution} processStep={processStep} />
    </MockQueryClientProvider>,
  );

  fireEvent.click(component.getByRole('button', { name: 'Choose Execution Step' }));

  expect(mutate).toHaveBeenCalledOnce();
  expect(mutate).toHaveBeenCalledWith([{ executionId: execution.id, chooseProcessStepId: processStep.id }]);
});
