import { Execution } from '@/interfaces/execution/execution.ts';
import { ConditionOption } from '@/interfaces/process-step/condition.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { useCompleteConditions } from '@/hooks/executions/useCompleteConditions.ts';
import WorkflowStepCondition from '@/components/Common/WorkflowStepCondition.tsx';

interface ExecutionStepConditionProps {
  execution: Execution;
  processStep: ProcessStep;
}

export default function ExecutionStepCondition({ execution, processStep }: ExecutionStepConditionProps) {
  const { mutate: completeConditions } = useCompleteConditions(execution.id);

  const handleComplete = (): void => {
    completeConditions([{ executionId: execution.id }]);
  };

  const handleCompleteRadio = (option: ConditionOption): void => {
    completeConditions([{ executionId: execution.id, conditionStateRadio: { option } }]);
  };

  return (
    <WorkflowStepCondition
      processStep={processStep}
      execution={execution}
      onComplete={handleComplete}
      onCompleteRadio={handleCompleteRadio}
    />
  );
}
