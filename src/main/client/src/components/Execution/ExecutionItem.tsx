import { MdHorizontalRule, MdOutlineNotifications } from 'react-icons/md';
import { Execution } from '@/interfaces/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowItem from '@/components/Common/WorkflowItem.tsx';
import ExecutionStepItem from '@/components/Execution/ExecutionStepItem.tsx';

interface ExecutionItemProps {
  execution: Execution;
}

export default function ExecutionItem({ execution }: ExecutionItemProps) {
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
    >
      {execution.process.steps
        .sort((a: ProcessStep, b: ProcessStep) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((processStep: ProcessStep) => (
          <ExecutionStepItem key={processStep.id} execution={execution} processStep={processStep} />
        ))}
    </WorkflowItem>
  );
}
