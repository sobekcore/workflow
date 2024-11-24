import { useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import { ProcessStepToAssign } from '@/interfaces/process-step/process-step.ts';
import { useAssignProcessesSteps } from '@/hooks/processes-steps/useAssignProcessesSteps.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import Dropdown from '@/components/Common/Dropdown/Dropdown.tsx';
import { DropdownItem } from '@/components/Common/Dropdown/DropdownItem.tsx';
import AssignProcessStepForm from '@/components/Process/AssignProcessStepForm.tsx';

interface ProcessStepDropdownProps {
  processId: string;
  assignProcessStepId: string;
}

export default function ProcessStepDropdown({ processId, assignProcessStepId }: ProcessStepDropdownProps) {
  const { mutate: assignProcessesSteps } = useAssignProcessesSteps(processId);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleAssignProcessesSteps = (data: ProcessStepToAssign): void => {
    assignProcessesSteps([data]);
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
      title="Assign Process Step"
      open={isDialogOpen}
      content={
        <AssignProcessStepForm
          processId={processId}
          assignProcessStepId={assignProcessStepId}
          onSubmit={handleAssignProcessesSteps}
          onCancel={handleDialogClose}
        />
      }
    >
      <Dropdown content={<DropdownItem onClick={handleDialogOpen}>Assign Process Step</DropdownItem>}>
        <Button variant={ButtonVariant.TEXT} size={ButtonSize.ICON}>
          <MdMoreVert />
        </Button>
      </Dropdown>
    </Dialog>
  );
}
