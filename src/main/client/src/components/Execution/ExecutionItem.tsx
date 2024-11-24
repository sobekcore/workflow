import { MdCheck } from 'react-icons/md';
import { StatusVariant } from '@/enums/status.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import Status from '@/components/Common/Status.tsx';
import WorkflowItem from '@/components/Common/Workflow/WorkflowItem.tsx';
import ExecutionTitle from '@/components/Execution/ExecutionTitle.tsx';
import NestedExecutionStepItem from '@/components/Execution/NestedExecutionStepItem.tsx';
import { buildProcessStepTree } from '@/utils/processes.ts';

interface ExecutionItemProps {
  execution: Execution;
}

export default function ExecutionItem({ execution }: ExecutionItemProps) {
  const isExecutionCompleted: boolean = !execution.processStep;

  return (
    <WorkflowItem
      title={<ExecutionTitle execution={execution} />}
      actions={
        isExecutionCompleted && (
          <div className="flex">
            <Status icon={MdCheck} label="Completed" variant={StatusVariant.SUCCESS} />
          </div>
        )
      }
      completed={isExecutionCompleted}
    >
      {buildProcessStepTree(
        execution.process.steps.sort((a: ProcessStep, b: ProcessStep) => a.createdAt.getTime() - b.createdAt.getTime()),
      ).map((processStep: ProcessStep) => (
        <NestedExecutionStepItem
          key={processStep.id}
          execution={execution}
          processStep={processStep}
          completed={isExecutionCompleted}
        />
      ))}
    </WorkflowItem>
  );
}
