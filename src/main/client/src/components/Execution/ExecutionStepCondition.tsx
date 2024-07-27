import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowStepCondition from '@/components/Common/WorkflowStepCondition.tsx';

interface ExecutionStepConditionProps {
  processStep: ProcessStep;
}

export default function ExecutionStepCondition({ processStep }: ExecutionStepConditionProps) {
  const handleCompleteCondition = (): void => {
    // TODO: Mark step as valid to allow actually completing it
  };

  return <WorkflowStepCondition processStep={processStep} onComplete={handleCompleteCondition} />;
}
