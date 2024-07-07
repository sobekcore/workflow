import { MdCheck } from 'react-icons/md';
import { ButtonSize } from '@/enums/button.ts';
import { Execution } from '@/interfaces/execution.ts';
import { ProcessStep } from '@/interfaces/process-step.ts';
import { useProgressExecutions } from '@/hooks/executions/useProgressExecutions.ts';
import { Button } from '@/components/Common/Button.tsx';
import WorkflowStepItem from '@/components/Common/WorkflowStepItem.tsx';

interface ExecutionStepItemProps {
  execution: Execution;
  processStep: ProcessStep;
}

export default function ExecutionStepItem({ execution, processStep }: ExecutionStepItemProps) {
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
        isExecutionStepActive && (
          <Button size={ButtonSize.SMALL} className="mt-1" onClick={handleActiveExecutionStepClick}>
            <MdCheck className="text-lg" />
            Complete Step
          </Button>
        )
      }
    />
  );
}
