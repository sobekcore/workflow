import { Execution } from '@/interfaces/execution/execution.ts';
import ExecutionStepItem from '@/components/Execution/ExecutionStepItem.tsx';
import { NestedProcessStep } from '@/utils/processes.ts';

interface NestedExecutionStepItemProps {
  execution: Execution;
  processStep: NestedProcessStep;
  completed?: boolean;
}

export default function NestedExecutionStepItem({ execution, processStep, completed }: NestedExecutionStepItemProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <ExecutionStepItem execution={execution} processStep={processStep} completed={completed} />
      {!!processStep.children?.length && (
        <div data-testid="nested-execution-step-item-children" className="flex w-full gap-2">
          {processStep.children.map((step: NestedProcessStep) => (
            <NestedExecutionStepItem key={step.id} execution={execution} processStep={step} completed={completed} />
          ))}
        </div>
      )}
    </div>
  );
}
