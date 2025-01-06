import { mockProcessStep } from '@test/mocks/process-step.ts';
import { RenderResult, render } from '@testing-library/react';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowStepItem from '@/components/Common/Workflow/WorkflowStepItem.tsx';

const processStep: ProcessStep = mockProcessStep();
const actions: string = 'Actions';
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(
    <WorkflowStepItem processStep={processStep} actions={actions}>
      {children}
    </WorkflowStepItem>,
  );
});

test('should render process step name', () => {
  expect(component.getByText(processStep.name)).toBeInTheDocument();
});

test('should render process step description', () => {
  expect(component.getByText(processStep.description ?? '')).toBeInTheDocument();
});

test('should render actions', () => {
  expect(component.getByText(actions)).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});
