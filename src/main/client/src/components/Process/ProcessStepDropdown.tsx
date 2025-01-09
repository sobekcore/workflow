import { useState } from 'react';
import { MdAdd, MdMoreVert, MdPolyline } from 'react-icons/md';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import { ProcessStepToAssign, ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { useAssignProcessesSteps } from '@/hooks/processes-steps/useAssignProcessesSteps.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import Dropdown from '@/components/Common/Dropdown/Dropdown.tsx';
import DropdownItem from '@/components/Common/Dropdown/DropdownItem.tsx';
import AssignProcessStepForm from '@/components/Process/AssignProcessStepForm.tsx';
import ProcessStepForm from '@/components/Process/ProcessStepForm.tsx';

interface ProcessStepDropdownProps {
  processId: string;
  prevProcessStepId: string;
  assignProcessStepId: string;
}

export default function ProcessStepDropdown({
  processId,
  prevProcessStepId,
  assignProcessStepId,
}: ProcessStepDropdownProps) {
  const { mutate: createProcessesSteps } = useCreateProcessesSteps(processId);
  const { mutate: assignProcessesSteps } = useAssignProcessesSteps(processId);

  const [isCreateProcessStepDialogOpen, setIsCreateProcessStepDialogOpen] = useState<boolean>(false);
  const [isAssignProcessStepDialogOpen, setIsAssignProcessStepDialogOpen] = useState<boolean>(false);

  const handleCreateProcessesSteps = (data: ProcessStepToCreate): void => {
    createProcessesSteps([data]);
    setIsCreateProcessStepDialogOpen(false);
  };

  const handleAssignProcessesSteps = (data: ProcessStepToAssign): void => {
    assignProcessesSteps([data]);
    setIsAssignProcessStepDialogOpen(false);
  };

  return (
    <>
      <Dropdown
        trigger={
          <Button data-testid="process-step-dropdown" variant={ButtonVariant.TEXT} size={ButtonSize.ICON}>
            <MdMoreVert />
          </Button>
        }
      >
        <DropdownItem onClick={() => setIsCreateProcessStepDialogOpen(true)}>
          <MdAdd className="text-xl" />
          Create Child Process Step
        </DropdownItem>
        <DropdownItem onClick={() => setIsAssignProcessStepDialogOpen(true)}>
          <MdPolyline className="text-xl" />
          Assign Process Step
        </DropdownItem>
      </Dropdown>
      <Dialog title="Create Child Process Step" open={isCreateProcessStepDialogOpen}>
        <ProcessStepForm
          processId={processId}
          prevProcessStepId={prevProcessStepId}
          onSubmit={handleCreateProcessesSteps}
          onCancel={() => setIsCreateProcessStepDialogOpen(false)}
        />
      </Dialog>
      <Dialog title="Assign Process Step" open={isAssignProcessStepDialogOpen}>
        <AssignProcessStepForm
          processId={processId}
          assignProcessStepId={assignProcessStepId}
          onSubmit={handleAssignProcessesSteps}
          onCancel={() => setIsAssignProcessStepDialogOpen(false)}
        />
      </Dialog>
    </>
  );
}
