import { MdCheck, MdHorizontalRule, MdOutlineNotifications } from 'react-icons/md';
import { StatusVariant } from '@/enums/status.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import Status from '@/components/Common/Status.tsx';
import WorkflowItem from '@/components/Common/WorkflowItem.tsx';
import ExecutionStepItem from '@/components/Execution/ExecutionStepItem.tsx';

interface ExecutionItemProps {
  execution: Execution;
}

export default function ExecutionItem({ execution }: ExecutionItemProps) {
  const isExecutionCompleted: boolean = !execution.processStep;

  return (
    <WorkflowItem
      title={
        <>
          <MdOutlineNotifications className="text-xl" />
          <h1 className="flex items-center gap-1">
            {execution.process.name} <MdHorizontalRule /> Execution
          </h1>
        </>
      }
      actions={
        isExecutionCompleted && (
          <div className="flex">
            <Status icon={MdCheck} label="Completed" variant={StatusVariant.SUCCESS} />
          </div>
        )
      }
      completed={isExecutionCompleted}
      open={!isExecutionCompleted}
    >
      {execution.process.steps
        .sort((a: ProcessStep, b: ProcessStep) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((processStep: ProcessStep) => (
          <ExecutionStepItem
            key={processStep.id}
            execution={execution}
            processStep={processStep}
            completed={isExecutionCompleted}
          />
        ))}
    </WorkflowItem>
  );
}
