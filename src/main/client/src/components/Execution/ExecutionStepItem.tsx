import { MdCheck } from 'react-icons/md';
import clsx from 'clsx';
import { ButtonSize } from '@/enums/button.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { useProgressExecutions } from '@/hooks/executions/useProgressExecutions.ts';
import { Button } from '@/components/Common/Button.tsx';
import Status from '@/components/Common/Status.tsx';
import WorkflowStepItem from '@/components/Common/WorkflowStepItem.tsx';
import ExecutionStepCondition from '@/components/Execution/ExecutionStepCondition.tsx';

interface ExecutionStepItemProps {
  execution: Execution;
  processStep: ProcessStep;
  completed?: boolean;
}

export default function ExecutionStepItem({ execution, processStep, completed }: ExecutionStepItemProps) {
  const { mutate: progressExecutions } = useProgressExecutions(execution.id);

  const handleActiveExecutionStepClick = (): void => {
    progressExecutions([
      { executionId: execution.id, processId: execution.process.id, processStepId: execution.processStep?.id },
    ]);
  };

  const isExecutionStepActive: boolean = processStep.id === execution.processStep?.id;

  return (
    <WorkflowStepItem
      processStep={processStep}
      actions={
        isExecutionStepActive &&
        (!execution.conditionCompleted ? (
          <Status icon={MdCheck} label="Current Execution Step" />
        ) : (
          <Button size={ButtonSize.SMALL} onClick={handleActiveExecutionStepClick}>
            <MdCheck className="text-lg" />
            Complete Execution Step
          </Button>
        ))
      }
      completed={completed}
      className={clsx(isExecutionStepActive && 'border border-indigo-500')}
    >
      {isExecutionStepActive && <ExecutionStepCondition execution={execution} processStep={processStep} />}
    </WorkflowStepItem>
  );
}
