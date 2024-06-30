import { Fragment } from 'react';
import { MdEast, MdHorizontalRule, MdOutlineNotifications } from 'react-icons/md';
import { Execution } from '@/interfaces/execution.ts';
import { ProcessStep } from '@/interfaces/process-step.ts';
import { useProgressExecutions } from '@/hooks/useProgressExecutions.ts';
import { ProcessStepItem } from '@/components/ProcessStep/ProcessStepItem.tsx';

interface ExecutionItemProps {
  execution: Execution;
}

export default function ExecutionItem({ execution }: ExecutionItemProps) {
  const { mutate: progressExecutions } = useProgressExecutions(execution.id);

  const handleActiveProcessStepClick = (): void => {
    progressExecutions([
      { executionId: execution.id, processId: execution.process.id, processStepId: execution.processStep?.id },
    ]);
  };

  return (
    <div className="flex flex-col items-start gap-2 rounded-md bg-slate-100 p-2">
      <div className="flex items-center gap-2">
        <MdOutlineNotifications className="text-xl" />
        <h1 className="flex items-center gap-1">
          {execution.process.name} <MdHorizontalRule /> Execution
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {execution.process.steps.map((processStep: ProcessStep, index: number) => (
          <Fragment key={processStep.id}>
            <ProcessStepItem
              processStep={processStep}
              active={processStep.id === execution.processStep?.id}
              onClick={processStep.id === execution.processStep?.id ? handleActiveProcessStepClick : undefined}
            />
            {index !== execution.process.steps.length - 1 && <MdEast />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
