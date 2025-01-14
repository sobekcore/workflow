import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { render } from '@test/render.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import AssignProcessStepForm from '@/components/Process/AssignProcessStepForm.tsx';

const assignProcessStep: ProcessStep = mockProcessStep();
const unavailableProcessStep: ProcessStep = {
  ...mockProcessStep(),
  id: 'process-2',
  name: 'Process Step 2',
  availableFrom: [assignProcessStep],
};
const chooseProcessStep: ProcessStep = {
  ...mockProcessStep(),
  id: 'process-3',
  name: 'Process Step 3',
};
const chooseAnotherProcessStep: ProcessStep = {
  ...mockProcessStep(),
  id: 'process-4',
  name: 'Process Step 4',
};
const process: Process = {
  ...mockProcess(),
  steps: [assignProcessStep, unavailableProcessStep, chooseProcessStep, chooseAnotherProcessStep],
};
vi.mock('@/hooks/processes/useReadProcesses.ts', () => ({
  useReadProcesses: () => ({
    data: [process],
  }),
}));

const onSubmit: Mock = vi.fn();
const onCancel: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <AssignProcessStepForm
      processId={process.id}
      assignProcessStepId={assignProcessStep.id}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />,
  );
});

test('should render select options', () => {
  expect(component.queryByRole('option', { name: assignProcessStep.name })).not.toBeInTheDocument();
  expect(component.queryByRole('option', { name: unavailableProcessStep.name })).not.toBeInTheDocument();
  expect(component.getByRole('option', { name: chooseProcessStep.name })).toBeInTheDocument();
  expect(component.getByRole('option', { name: chooseAnotherProcessStep.name })).toBeInTheDocument();
});

test('should call onSubmit', async () => {
  await userEvent.selectOptions(component.getByLabelText('Process Step'), chooseProcessStep.id);
  await userEvent.click(component.getByRole('button', { name: 'Assign' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onCancel', async () => {
  await userEvent.click(component.getByRole('button', { name: 'Cancel' }));

  expect(onCancel).toHaveBeenCalledOnce();
});
