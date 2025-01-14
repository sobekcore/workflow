import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import CreateExecution from '@/components/Execution/CreateExecution.tsx';
import { ExecutionFormProps } from '@/components/Execution/ExecutionForm.tsx';

const mutate: Mock = vi.fn();
vi.mock('@/hooks/executions/useCreateExecutions.ts', () => ({
  useCreateExecutions: () => ({
    mutate,
  }),
}));

const process: Process = mockProcess();
const processStep: ProcessStep = mockProcessStep();
vi.mock('@/components/Execution/ExecutionForm.tsx', () => ({
  default: ({ onSubmit }: ExecutionFormProps) => (
    <div data-testid="submit" onClick={() => onSubmit({ processId: process.id, processStepId: processStep.id })} />
  ),
}));

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <CreateExecution />
    </MockQueryClientProvider>,
  );
});

test('should open dialog when clicked', () => {
  fireEvent.click(component.getByRole('button'));

  expect(component.getByRole('dialog')).toBeInTheDocument();
});

test('should call useCreateExecutions and close dialog when submitted', () => {
  fireEvent.click(component.getByRole('button'));
  fireEvent.click(component.getByTestId('submit'));

  expect(mutate).toHaveBeenCalledOnce();
  expect(mutate).toHaveBeenCalledWith([{ processId: process.id, processStepId: processStep.id }]);
  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});
