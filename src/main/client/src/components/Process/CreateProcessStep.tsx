import { useState } from 'react';
import { MdChecklist } from 'react-icons/md';
import { ButtonSize } from '@/enums/button.ts';
import { ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import ProcessStepForm from '@/components/Process/ProcessStepForm.tsx';

interface CreateProcessStepProps {
  processId: string;
  prevProcessStepId?: string;
}

export default function CreateProcessStep({ processId, prevProcessStepId }: CreateProcessStepProps) {
  const { mutate: createProcessesSteps } = useCreateProcessesSteps(processId);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCreateProcessesSteps = (data: ProcessStepToCreate): void => {
    createProcessesSteps([data]);
    setIsDialogOpen(false);
  };

  const handleDialogOpen = (): void => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = (): void => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      title="Create Process Step"
      open={isDialogOpen}
      content={
        <ProcessStepForm
          processId={processId}
          prevProcessStepId={prevProcessStepId}
          onSubmit={handleCreateProcessesSteps}
          onCancel={handleDialogClose}
        />
      }
    >
      <Button size={ButtonSize.SMALL} onClick={handleDialogOpen}>
        <MdChecklist className="text-lg" />
        Create Process Step
      </Button>
    </Dialog>
  );
}
