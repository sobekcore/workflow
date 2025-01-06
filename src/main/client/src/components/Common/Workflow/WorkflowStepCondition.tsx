import { ConditionState } from '@/interfaces/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { getConditionConfig } from '@/configs/condition.tsx';

interface WorkflowStepConditionProps {
  processStep: ProcessStep;
  execution?: Execution;
  onComplete?(state?: ConditionState): void;
}

export default function WorkflowStepCondition({ processStep, execution, onComplete }: WorkflowStepConditionProps) {
  return (
    <div data-testid="workflow-step-condition" className="flex flex-col gap-1 text-sm">
      {getConditionConfig(processStep.condition.type)?.render({
        id: processStep.id,
        condition: processStep.condition,
        execution,
        onComplete,
      })}
    </div>
  );
}
