import { RenderResult } from '@testing-library/react';
import { mockExecution } from '@test/mocks/execution.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import ExecutionItem from '@/components/Execution/ExecutionItem.tsx';

const execution: Execution = mockExecution();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ExecutionItem execution={execution} />
    </MockQueryClientProvider>,
  );
});

test('should render execution name', () => {
  expect(component.getByText(`${execution.process.name} Execution`)).toBeInTheDocument();
});

test('should render execution step name', () => {
  expect(component.getByText(`${execution.processStep?.name}`)).toBeInTheDocument();
});

test('should render status when completed', () => {
  const execution: Execution = {
    ...mockExecution(),
    processStep: undefined,
  };

  component = render(
    <MockQueryClientProvider>
      <ExecutionItem execution={execution} />
    </MockQueryClientProvider>,
  );

  expect(component.getByRole('status')).toBeInTheDocument();
});
