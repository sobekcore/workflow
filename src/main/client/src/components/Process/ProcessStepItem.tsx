import { ProcessStep } from '@/interfaces/process-step.ts';
import WorkflowStepItem from '@/components/Common/WorkflowStepItem.tsx';

interface ProcessStepItemProps {
  processStep: ProcessStep;
}

export function ProcessStepItem({ processStep }: ProcessStepItemProps) {
  return <WorkflowStepItem processStep={processStep} />;
}
