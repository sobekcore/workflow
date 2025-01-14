import { RenderResult, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { AssignProcessStepForm } from '@/components/Process/AssignProcessStepForm.tsx';
import ProcessStepDropdown from '@/components/Process/ProcessStepDropdown.tsx';
import { ProcessStepFormProps } from '@/components/Process/ProcessStepForm.tsx';

const useCreateProcessesStepsMutate: Mock = vi.fn();
vi.mock('@/hooks/processes-steps/useCreateProcessesSteps.ts', () => ({
  useCreateProcessesSteps: () => ({
    mutate: useCreateProcessesStepsMutate,
  }),
}));

const useAssignProcessesStepsMutate: Mock = vi.fn();
vi.mock('@/hooks/processes-steps/useAssignProcessesSteps.ts', () => ({
  useAssignProcessesSteps: () => ({
    mutate: useAssignProcessesStepsMutate,
  }),
}));

const process: Process = mockProcess();
const processStep: ProcessStep = mockProcessStep();
vi.mock('@/components/Process/ProcessStepForm.tsx', () => ({
  default: ({ onSubmit }: ProcessStepFormProps) => (
    <div
      data-testid="process-step-form-submit"
      onClick={() => onSubmit({ name: processStep.name, condition: processStep.condition, processId: process.id })}
    />
  ),
}));

const assignProcessStep: ProcessStep = mockProcessStep();
vi.mock('@/components/Process/AssignProcessStepForm.tsx', () => ({
  default: ({ onSubmit }: AssignProcessStepForm) => (
    <div
      data-testid="assign-process-step-form-submit"
      onClick={() => onSubmit({ processStepId: processStep.id, assignProcessStepId: assignProcessStep.id })}
    />
  ),
}));

const prevProcessStep: ProcessStep = mockProcessStep();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ProcessStepDropdown
        processId={process.id}
        prevProcessStepId={prevProcessStep.id}
        assignProcessStepId={assignProcessStep.id}
      />
    </MockQueryClientProvider>,
  );
});

test('should open create child process step dialog when clicked', async () => {
  await userEvent.click(component.getByTestId('process-step-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Create Child Process Step' }));

  expect(component.getByRole('dialog')).toBeInTheDocument();
  expect(component.getByRole('heading', { name: 'Create Child Process Step' })).toBeInTheDocument();
});

test('should call useCreateProcessesSteps and close dialog when submitted', async () => {
  await userEvent.click(component.getByTestId('process-step-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Create Child Process Step' }));
  fireEvent.click(component.getByTestId('process-step-form-submit'));

  expect(useCreateProcessesStepsMutate).toHaveBeenCalledOnce();
  expect(useCreateProcessesStepsMutate).toHaveBeenCalledWith([
    { name: processStep.name, condition: processStep.condition, processId: process.id },
  ]);
  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});

test('should open assign process step dialog when clicked', async () => {
  await userEvent.click(component.getByTestId('process-step-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Assign Process Step' }));

  expect(component.getByRole('dialog')).toBeInTheDocument();
  expect(component.getByRole('heading', { name: 'Assign Process Step' })).toBeInTheDocument();
});

test('should call useAssignProcessesSteps and close dialog when submitted', async () => {
  await userEvent.click(component.getByTestId('process-step-dropdown'));
  fireEvent.click(component.getByRole('menuitem', { name: 'Assign Process Step' }));
  fireEvent.click(component.getByTestId('assign-process-step-form-submit'));

  expect(useAssignProcessesStepsMutate).toHaveBeenCalledOnce();
  expect(useAssignProcessesStepsMutate).toHaveBeenCalledWith([
    { processStepId: processStep.id, assignProcessStepId: assignProcessStep.id },
  ]);
  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});
