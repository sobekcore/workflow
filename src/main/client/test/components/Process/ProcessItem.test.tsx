import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { RenderResult, cleanup, render } from '@testing-library/react';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import ProcessItem from '@/components/Process/ProcessItem.tsx';

const process: Process = mockProcess();
const processStep: ProcessStep = mockProcessStep();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ProcessItem process={process} />
    </MockQueryClientProvider>,
  );
});

test('should render process name', () => {
  expect(component.getByText(process.name)).toBeInTheDocument();
});

test('should render process step name', () => {
  expect(component.getByText(processStep.name)).toBeInTheDocument();
});

test('should render process step description', () => {
  expect(component.getByText(`${processStep.description}`)).toBeInTheDocument();
});

test('should render process dropdown', () => {
  expect(component.getByTestId('process-dropdown')).toBeInTheDocument();
});

test('should render create root process step when steps are empty', () => {
  const process: Process = {
    ...mockProcess(),
    steps: [],
  };

  cleanup();
  component = render(
    <MockQueryClientProvider>
      <ProcessItem process={process} />
    </MockQueryClientProvider>,
  );

  expect(component.getByRole('button', { name: 'Create Root Process Step' })).toBeInTheDocument();
});
