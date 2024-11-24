import { ConditionState } from '@/interfaces/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { useCompleteConditions } from '@/hooks/executions/useCompleteConditions.ts';
import WorkflowStepCondition from '@/components/Common/Workflow/WorkflowStepCondition.tsx';

interface ExecutionStepConditionProps {
  execution: Execution;
  processStep: ProcessStep;
}

export default function ExecutionStepCondition({ execution, processStep }: ExecutionStepConditionProps) {
  const { mutate: completeConditions } = useCompleteConditions(execution.id);

  const handleCompleteConditions = (state: ConditionState): void => {
    completeConditions([{ executionId: execution.id, state }]);
  };

  return (
    <WorkflowStepCondition processStep={processStep} execution={execution} onComplete={handleCompleteConditions} />
  );
}
