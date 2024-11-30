import { useState } from 'react';
import { MdAdd, MdMoreVert } from 'react-icons/md';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import { ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import Dropdown from '@/components/Common/Dropdown/Dropdown.tsx';
import DropdownItem from '@/components/Common/Dropdown/DropdownItem.tsx';
import ProcessStepForm from '@/components/Process/ProcessStepForm.tsx';

interface ProcessDropdownProps {
  processId: string;
}

export default function ProcessDropdown({ processId }: ProcessDropdownProps) {
  const { mutate: createProcessesSteps } = useCreateProcessesSteps(processId);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCreateProcessesSteps = (data: ProcessStepToCreate): void => {
    createProcessesSteps([data]);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dropdown
        trigger={
          <Button variant={ButtonVariant.TEXT} size={ButtonSize.ICON}>
            <MdMoreVert />
          </Button>
        }
      >
        <DropdownItem onClick={() => setIsDialogOpen(true)}>
          <MdAdd className="text-xl" />
          Create Root Process Step
        </DropdownItem>
      </Dropdown>
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
