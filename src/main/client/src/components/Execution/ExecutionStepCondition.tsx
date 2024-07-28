import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { useCompleteConditions } from '@/hooks/executions/useCompleteConditions.ts';
import WorkflowStepCondition from '@/components/Common/WorkflowStepCondition.tsx';

interface ExecutionStepConditionProps {
  execution: Execution;
  processStep: ProcessStep;
}

export default function ExecutionStepCondition({ execution, processStep }: ExecutionStepConditionProps) {
  const { mutate: completeConditions } = useCompleteConditions(execution.id);

  const handleCompleteConditions = (): void => {
    completeConditions([{ executionId: execution.id }]);
  };

  return <WorkflowStepCondition processStep={processStep} onComplete={handleCompleteConditions} />;
}
