import { useState } from 'react';
import { MdLabelOutline } from 'react-icons/md';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import WorkflowItem from '@/components/Common/WorkflowItem.tsx';
import CreateProcessStep from '@/components/Process/CreateProcessStep.tsx';
import ProcessStepItem from '@/components/Process/ProcessStepItem.tsx';

interface ProcessItemProps {
  process: Process;
}

export default function ProcessItem({ process }: ProcessItemProps) {
  const [isWorkflowItemOpen, setIsWorkflowItemOpen] = useState<boolean>(false);

  return (
    <WorkflowItem
      title={
        <>
          <MdLabelOutline className="text-xl" />
          <h1>{process.name}</h1>
        </>
      }
      actions={<CreateProcessStep processId={process.id} onSuccess={() => setIsWorkflowItemOpen(true)} />}
      open={isWorkflowItemOpen}
    >
      {process.steps
        .sort((a: ProcessStep, b: ProcessStep) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((processStep: ProcessStep) => (
          <ProcessStepItem key={processStep.id} processStep={processStep} />
        ))}
    </WorkflowItem>
  );
}
