import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { RenderResult, render, cleanup } from '@testing-library/react';
import { Process } from '@/interfaces/process.ts';
import ProcessItem from '@/components/Process/ProcessItem.tsx';

const process: Process = mockProcess();
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
  expect(component.getByText(process.steps[0].name)).toBeInTheDocument();
});

test('should render process step description', () => {
  expect(component.getByText(`${process.steps[0].description}`)).toBeInTheDocument();
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
