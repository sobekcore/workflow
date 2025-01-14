import { RenderResult } from '@testing-library/react';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { Process } from '@/interfaces/process.ts';
import NestedProcessStepItem from '@/components/Process/NestedProcessStepItem.tsx';
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
const process: Process = mockProcess();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <NestedProcessStepItem processStep={processStep} processId={process.id} />
    </MockQueryClientProvider>,
  );
});

test('should render process step name', () => {
  expect(component.getByText(processStep.name)).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByTestId('nested-process-step-item-children')).toBeInTheDocument();
});

test('should not render children when empty', () => {
  const processStep: NestedProcessStep = {
    ...mockProcessStep(),
    children: [],
  };

  component = render(
    <MockQueryClientProvider>
      <NestedProcessStepItem processStep={processStep} processId={process.id} />
    </MockQueryClientProvider>,
  );

  expect(component.queryByTestId('nested-process-step-item-children')).not.toBeInTheDocument();
});
