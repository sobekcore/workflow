import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import ProcessDropdown from '@/components/Process/ProcessDropdown.tsx';
import { ProcessStepFormProps } from '@/components/Process/ProcessStepForm.tsx';

const mutate: Mock = vi.fn();
vi.mock('@/hooks/processes-steps/useCreateProcessesSteps.ts', () => ({
  useCreateProcessesSteps: () => ({
    mutate,
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

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ProcessDropdown processId={process.id} />
    </MockQueryClientProvider>,
  );
});

test('should open dialog when clicked', async () => {
  await userEvent.click(component.getByTestId('process-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Create Root Process Step' }));

  expect(component.getByRole('dialog')).toBeInTheDocument();
});

test('should call useCreateProcessesSteps and close dialog when submitted', async () => {
  await userEvent.click(component.getByTestId('process-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Create Root Process Step' }));
  fireEvent.click(component.getByTestId('submit'));

  expect(mutate).toHaveBeenCalledOnce();
  expect(mutate).toHaveBeenCalledWith([
    { name: processStep.name, condition: processStep.condition, processId: process.id },
  ]);
  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});
