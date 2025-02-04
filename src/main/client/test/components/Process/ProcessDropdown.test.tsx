import { RenderResult, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process, ProcessToUpdate } from '@/interfaces/process.ts';
import ProcessDropdown from '@/components/Process/ProcessDropdown.tsx';
import { ProcessFormProps } from '@/components/Process/ProcessForm.tsx';
import { ProcessStepFormProps } from '@/components/Process/ProcessStepForm.tsx';

const useCreateProcessesStepsMutate: Mock = vi.fn();
vi.mock('@/hooks/processes-steps/useCreateProcessesSteps.ts', () => ({
  useCreateProcessesSteps: () => ({
    mutate: useCreateProcessesStepsMutate,
  }),
}));

const useUpdateProcessesMutate: Mock = vi.fn();
vi.mock('@/hooks/processes/useUpdateProcesses.ts', () => ({
  useUpdateProcesses: () => ({
    mutate: useUpdateProcessesMutate,
  }),
}));

const process: Process = mockProcess();
const processStep: ProcessStep = mockProcessStep();
vi.mock('@/components/Process/ProcessStepForm.tsx', () => ({
  default: ({ onSubmit }: ProcessStepFormProps) => (
    <div
      data-testid="submit"
      onClick={() => onSubmit({ name: processStep.name, condition: processStep.condition, processId: process.id })}
    />
  ),
}));

vi.mock('@/components/Process/ProcessForm.tsx', () => ({
  default: ({ onSubmit }: ProcessFormProps<ProcessToUpdate>) => (
    <div data-testid="submit" onClick={() => onSubmit({ id: process.id, name: process.name })} />
  ),
}));

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ProcessDropdown process={process} />
    </MockQueryClientProvider>,
  );
});

test('should open create root process step dialog when clicked', async () => {
  await userEvent.click(component.getByTestId('process-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Create Root Process Step' }));

  expect(component.getByRole('dialog')).toBeInTheDocument();
});

test('should call useCreateProcessesSteps and close dialog when submitted', async () => {
  await userEvent.click(component.getByTestId('process-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Create Root Process Step' }));
  fireEvent.click(component.getByTestId('submit'));

  expect(useCreateProcessesStepsMutate).toHaveBeenCalledOnce();
  expect(useCreateProcessesStepsMutate).toHaveBeenCalledWith([
    { name: processStep.name, condition: processStep.condition, processId: process.id },
  ]);
  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});

test('should open edit process dialog when clicked', async () => {
  await userEvent.click(component.getByTestId('process-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Edit Process' }));

  expect(component.getByRole('dialog')).toBeInTheDocument();
});

test('should call useUpdateProcesses and close dialog when submitted', async () => {
  await userEvent.click(component.getByTestId('process-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Edit Process' }));
  fireEvent.click(component.getByTestId('submit'));

  expect(useUpdateProcessesMutate).toHaveBeenCalledOnce();
  expect(useUpdateProcessesMutate).toHaveBeenCalledWith([{ id: process.id, name: process.name }]);
  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});
