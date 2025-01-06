import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { Mock } from 'vitest';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import ExecutionStepCondition from '@/components/Execution/ExecutionStepCondition.tsx';

const mutate: Mock = vi.fn();
vi.mock('@/hooks/executions/useCompleteConditions.ts', () => ({
  useCompleteConditions: () => ({
    mutate,
  }),
}));

const processStep: ProcessStep = {
  ...mockProcessStep(),
  condition: {
    type: ConditionType.VISIT,
    data: {
      link: 'https://example.com',
    },
  },
};
const execution: Execution = {
  ...mockExecution(),
  processStep,
};
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ExecutionStepCondition execution={execution} processStep={processStep} />
    </MockQueryClientProvider>,
  );
});

test('should call useCompleteConditions', () => {
  fireEvent.click(component.getByRole('link'));

  expect(mutate).toHaveBeenCalledOnce();
  expect(mutate).toHaveBeenCalledWith([{ executionId: execution.id, state: { visited: true } }]);
});
