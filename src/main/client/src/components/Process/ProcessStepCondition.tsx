import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowStepCondition from '@/components/Common/Workflow/WorkflowStepCondition.tsx';

interface ProcessStepConditionProps {
  processStep: ProcessStep;
}

export default function ProcessStepCondition({ processStep }: ProcessStepConditionProps) {
  return <WorkflowStepCondition processStep={processStep} />;
}
