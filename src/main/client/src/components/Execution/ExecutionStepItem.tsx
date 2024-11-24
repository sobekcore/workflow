import { MdCheck } from 'react-icons/md';
import clsx from 'clsx';
import { ButtonSize } from '@/enums/button.ts';
import { ConditionStatus } from '@/enums/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { useProgressExecutions } from '@/hooks/executions/useProgressExecutions.ts';
import Button from '@/components/Common/Button.tsx';
import Status from '@/components/Common/Status.tsx';
import WorkflowStepItem from '@/components/Common/Workflow/WorkflowStepItem.tsx';
import ExecutionStepCondition from '@/components/Execution/ExecutionStepCondition.tsx';
import { isExecutionStepPossibleToChoose as isExecutionStepPossibleToChooseFn } from '@/utils/executions.ts';

interface ExecutionStepItemProps {
  execution: Execution;
  processStep: ProcessStep;
  completed?: boolean;
}

export default function ExecutionStepItem({ execution, processStep, completed }: ExecutionStepItemProps) {
  const { mutate: progressExecutions } = useProgressExecutions(execution.id);

  const handleExecutionStepClick = (chooseProcessStepId?: string): void => {
    progressExecutions([{ executionId: execution.id, chooseProcessStepId }]);
  };

  const isExecutionStepActive: boolean = processStep.id === execution.processStep?.id;

  const isExecutionStepPossibleToChoose: boolean = isExecutionStepPossibleToChooseFn(execution, processStep);

  return (
    <WorkflowStepItem
      processStep={processStep}
      actions={
        <>
          {isExecutionStepActive &&
            execution.conditionStatus !== ConditionStatus.CHOOSE &&
            (execution.conditionStatus !== ConditionStatus.COMPLETED ? (
              <Status icon={MdCheck} label="Current Execution Step" />
            ) : (
              <Button size={ButtonSize.SMALL} onClick={() => handleExecutionStepClick()}>
                <MdCheck className="text-lg" />
                Complete Execution Step
              </Button>
            ))}
          {isExecutionStepPossibleToChoose && (
            <Button size={ButtonSize.SMALL} onClick={() => handleExecutionStepClick(processStep.id)}>
              Choose Execution Step
            </Button>
          )}
        </>
      }
      completed={completed}
      className={clsx(isExecutionStepActive && 'border border-indigo-500')}
    >
      {isExecutionStepActive && <ExecutionStepCondition execution={execution} processStep={processStep} />}
    </WorkflowStepItem>
  );
}
