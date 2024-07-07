import { MdChecklist, MdLabelOutline } from 'react-icons/md';
import { ButtonSize } from '@/enums/button.ts';
import { ProcessStep } from '@/interfaces/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';
import { Button } from '@/components/Common/Button.tsx';
import WorkflowItem from '@/components/Common/WorkflowItem.tsx';
import { ProcessStepItem } from '@/components/Process/ProcessStepItem.tsx';

interface ProcessItemProps {
  process: Process;
}

export function ProcessItem({ process }: ProcessItemProps) {
  const { mutate: createProcessesSteps } = useCreateProcessesSteps(process.id);

  const handleCreateProcessesSteps = (): void => {
    // TODO: Allow to customize process step name
    createProcessesSteps([{ name: 'Step', processId: process.id }]);
  };

  return (
    <WorkflowItem
      title={
        <>
          <MdLabelOutline className="text-xl" />
          <h1>{process.name}</h1>
        </>
      }
      actions={
        <Button size={ButtonSize.SMALL} onClick={handleCreateProcessesSteps}>
          <MdChecklist className="text-lg" />
          Create Process Step
        </Button>
      }
    >
      {process.steps.map((processStep: ProcessStep) => (
        <ProcessStepItem key={processStep.id} processStep={processStep} />
      ))}
    </WorkflowItem>
  );
}
