import { RenderResult } from '@testing-library/react';
import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import NestedExecutionStepItem from '@/components/Execution/NestedExecutionStepItem.tsx';
import { NestedProcessStep } from '@/utils/processes.ts';

const processStep: NestedProcessStep = {
  ...mockProcessStep(),
  children: [
    {
      ...mockProcessStep(),
      name: 'Process Step 2',
    },
  ],
};
const execution: Execution = mockExecution();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <NestedExecutionStepItem execution={execution} processStep={processStep} />
    </MockQueryClientProvider>,
  );
});

test('should render execution step name', () => {
  expect(component.getByText(processStep.name)).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByTestId('nested-execution-step-item-children')).toBeInTheDocument();
});

test('should not render children when empty', () => {
  const processStep: NestedProcessStep = {
    ...mockProcessStep(),
    children: [],
  };

  component = render(
    <MockQueryClientProvider>
      <NestedExecutionStepItem execution={execution} processStep={processStep} />
    </MockQueryClientProvider>,
  );

  expect(component.queryByTestId('nested-execution-step-item-children')).not.toBeInTheDocument();
});
