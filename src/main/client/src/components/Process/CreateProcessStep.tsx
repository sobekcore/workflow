import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { ButtonSize } from '@/enums/button.ts';
import { ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import ProcessStepForm from '@/components/Process/ProcessStepForm.tsx';

interface CreateProcessStepProps {
  processId: string;
}

export default function CreateProcessStep({ processId }: CreateProcessStepProps) {
  const { mutate: createProcessesSteps } = useCreateProcessesSteps(processId);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCreateProcessesSteps = (data: ProcessStepToCreate): void => {
    createProcessesSteps([data]);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button size={ButtonSize.SMALL} onClick={() => setIsDialogOpen(true)}>
        <MdAdd className="text-xl" />
        Create Root Process Step
      </Button>
      <Dialog title="Create Root Process Step" open={isDialogOpen}>
        <ProcessStepForm
          processId={processId}
          onSubmit={handleCreateProcessesSteps}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </>
  );
}
