import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import WorkflowItem from '@/components/Common/Workflow/WorkflowItem.tsx';
import CreateProcessStep from '@/components/Process/CreateProcessStep.tsx';
import NestedProcessStepItem from '@/components/Process/NestedProcessStepItem.tsx';
import ProcessTitle from '@/components/Process/ProcessTitle.tsx';
import { NestedProcessStep, buildProcessStepTree } from '@/utils/processes.ts';

interface ProcessItemProps {
  process: Process;
}

export default function ProcessItem({ process }: ProcessItemProps) {
  return (
    <WorkflowItem title={<ProcessTitle process={process} />} actions={<CreateProcessStep processId={process.id} />}>
      {buildProcessStepTree(
        process.steps.sort((a: ProcessStep, b: ProcessStep) => a.createdAt.getTime() - b.createdAt.getTime()),
      ).map((step: NestedProcessStep) => (
        <NestedProcessStepItem key={step.id} processStep={step} processId={process.id} />
      ))}
    </WorkflowItem>
  );
}
