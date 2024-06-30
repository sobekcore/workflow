import { Fragment } from 'react';
import { MdAddTask, MdEast, MdLabelOutline } from 'react-icons/md';
import { ButtonSize } from '@/enums/button.ts';
import { ProcessStep } from '@/interfaces/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useCreateProcessesSteps } from '@/hooks/useCreateProcessesSteps.ts';
import { Button } from '@/components/Common/Button.tsx';
import { ProcessStepItem } from '@/components/ProcessStep/ProcessStepItem.tsx';

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
    <div className="flex flex-col items-start gap-2 rounded-md bg-slate-100 p-2">
      <div className="flex items-center gap-2">
        <MdLabelOutline className="text-xl" />
        <h1>{process.name}</h1>
      </div>
      <Button size={ButtonSize.SMALL} onClick={handleCreateProcessesSteps}>
        <MdAddTask className="text-md" />
        Create Process Step
      </Button>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {process.steps.map((processStep: ProcessStep, index: number) => (
          <Fragment key={processStep.id}>
            <ProcessStepItem processStep={processStep} />
            {index !== process.steps.length - 1 && <MdEast />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
