import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import WorkflowItem from '@/components/Common/WorkflowItem.tsx';
import CreateProcessStep from '@/components/Process/CreateProcessStep.tsx';
import ProcessStepItem from '@/components/Process/ProcessStepItem.tsx';
import ProcessTitle from '@/components/Process/ProcessTitle.tsx';

interface ProcessItemProps {
  process: Process;
}

export default function ProcessItem({ process }: ProcessItemProps) {
  return (
    <WorkflowItem title={<ProcessTitle process={process} />} actions={<CreateProcessStep processId={process.id} />}>
      {process.steps
        .sort((a: ProcessStep, b: ProcessStep) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((processStep: ProcessStep) => (
          <ProcessStepItem key={processStep.id} processStep={processStep} />
        ))}
    </WorkflowItem>
  );
}
