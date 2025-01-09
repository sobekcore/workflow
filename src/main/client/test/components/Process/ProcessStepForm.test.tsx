import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { RenderResult, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import ProcessStepForm from '@/components/Process/ProcessStepForm.tsx';

const process: Process = mockProcess();
const prevProcessStep: ProcessStep = mockProcessStep();
const onSubmit: Mock = vi.fn();
const onCancel: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <ProcessStepForm
      processId={process.id}
      prevProcessStepId={prevProcessStep.id}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />,
  );
});

test('should call onSubmit when condition type none', async () => {
  await userEvent.type(component.getByLabelText('Name'), 'Process Step');
  await userEvent.type(component.getByLabelText('Description'), 'Description');
  await userEvent.selectOptions(component.getByLabelText('Condition Type'), ConditionType.NONE);
  await userEvent.click(component.getByRole('button', { name: 'Create' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onSubmit when condition type visit', async () => {
  await userEvent.type(component.getByLabelText('Name'), 'Process Step');
  await userEvent.type(component.getByLabelText('Description'), 'Description');
  await userEvent.selectOptions(component.getByLabelText('Condition Type'), ConditionType.VISIT);
  await userEvent.type(component.getByLabelText('Link'), 'https://example.com');
  await userEvent.click(component.getByRole('button', { name: 'Create' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onSubmit when condition type radio', async () => {
  await userEvent.type(component.getByLabelText('Name'), 'Process Step');
  await userEvent.type(component.getByLabelText('Description'), 'Description');
  await userEvent.selectOptions(component.getByLabelText('Condition Type'), ConditionType.RADIO);
  await userEvent.type(component.getByLabelText('Option 1'), 'Option 1');
  await userEvent.click(component.getByRole('button', { name: 'Create' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onSubmit when condition type checkbox', async () => {
  await userEvent.type(component.getByLabelText('Name'), 'Process Step');
  await userEvent.type(component.getByLabelText('Description'), 'Description');
  await userEvent.selectOptions(component.getByLabelText('Condition Type'), ConditionType.CHECKBOX);
  await userEvent.type(component.getByLabelText('Option 1'), 'Option 1');
  await userEvent.click(component.getByRole('button', { name: 'Create' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should add option when clicked', async () => {
  await userEvent.selectOptions(component.getByLabelText('Condition Type'), ConditionType.CHECKBOX);
  await userEvent.click(component.getByRole('button', { name: 'Add Option' }));

  expect(component.getByLabelText('Option 1')).toBeInTheDocument();
  expect(component.getByLabelText('Option 2')).toBeInTheDocument();
});

test('should remove option when clicked', async () => {
  await userEvent.selectOptions(component.getByLabelText('Condition Type'), ConditionType.CHECKBOX);
  await userEvent.click(component.getByRole('button', { name: 'Add Option' }));
  await userEvent.click(component.getByRole('button', { name: 'Remove Option' }));

  expect(component.getByLabelText('Option 1')).toBeInTheDocument();
  expect(component.queryByLabelText('Option 2')).not.toBeInTheDocument();
});

test('should call onCancel', async () => {
  await userEvent.click(component.getByRole('button', { name: 'Cancel' }));

  expect(onCancel).toHaveBeenCalledOnce();
});
