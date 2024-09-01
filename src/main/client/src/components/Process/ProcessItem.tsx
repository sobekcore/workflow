import { MdChecklist, MdLabelOutline } from 'react-icons/md';
import { ButtonSize } from '@/enums/button.ts';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { ProcessStep, ProcessStepToAdd } from '@/interfaces/process-step/process-step.ts';
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
    const chance: number = Math.random();

    // TODO: Allow to customize process step name and description
    const processStep: Omit<ProcessStepToAdd, 'condition'> = {
      name: 'Step',
      description: 'Step description',
      processId: process.id,
    };

    if (chance > 0.75) {
      createProcessesSteps([
        {
          ...processStep,
          condition: {
            type: ConditionType.CHECKBOX,
            data: {
              options: [{ label: 'First option' }, { label: 'Second option' }],
            },
          },
        },
      ]);
    } else if (chance > 0.5) {
      createProcessesSteps([
        {
          ...processStep,
          condition: {
            type: ConditionType.RADIO,
            data: {
              options: [{ label: 'First option' }, { label: 'Second option' }],
            },
          },
        },
      ]);
    } else if (chance > 0.25) {
      createProcessesSteps([
        {
          ...processStep,
          condition: {
            type: ConditionType.VISIT,
            data: {
              link: 'https://google.com',
            },
          },
        },
      ]);
    } else {
      createProcessesSteps([
        {
          ...processStep,
          condition: {
            type: ConditionType.NONE,
          },
        },
      ]);
    }
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
      {process.steps
        .sort((a: ProcessStep, b: ProcessStep) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((processStep: ProcessStep) => (
          <ProcessStepItem key={processStep.id} processStep={processStep} />
        ))}
    </WorkflowItem>
  );
}
