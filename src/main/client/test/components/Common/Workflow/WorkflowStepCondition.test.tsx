import { mockProcessStep } from '@test/mocks/process-step.ts';
import { render } from '@test/render.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowStepCondition from '@/components/Common/Workflow/WorkflowStepCondition.tsx';
import { getConditionConfig } from '@/configs/condition.tsx';

vi.mock('@/configs/condition.tsx');

const processStep: ProcessStep = mockProcessStep();

beforeEach(() => {
  render(<WorkflowStepCondition processStep={processStep} />);
});

test('should call getConditionConfig', () => {
  expect(getConditionConfig).toHaveBeenCalledOnce();
  expect(getConditionConfig).toHaveBeenCalledWith(processStep.condition.type);
});
