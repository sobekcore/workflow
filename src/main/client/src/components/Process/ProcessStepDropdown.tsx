import { useState } from 'react';
import { MdAdd, MdEdit, MdMoreVert, MdPolyline } from 'react-icons/md';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import { DropdownSide } from '@/enums/dropdown.ts';
import { HttpStatus } from '@/enums/http.ts';
import { ToastType } from '@/enums/toast.ts';
import { HttpException } from '@/exceptions/http.ts';
import {
  ProcessStep,
  ProcessStepToAssign,
  ProcessStepToCreate,
  ProcessStepToUpdate,
} from '@/interfaces/process-step/process-step.ts';
import { useAssignProcessesSteps } from '@/hooks/processes-steps/useAssignProcessesSteps.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';
import { useUpdateProcessesSteps } from '@/hooks/processes-steps/useUpdateProcessesSteps.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import Dropdown from '@/components/Common/Dropdown/Dropdown.tsx';
import DropdownItem from '@/components/Common/Dropdown/DropdownItem.tsx';
import AssignProcessStepForm from '@/components/Process/AssignProcessStepForm.tsx';
import ProcessStepForm from '@/components/Process/ProcessStepForm.tsx';
import { createToast } from '@/utils/toast.tsx';

interface ProcessStepDropdownProps {
  processStep: ProcessStep;
  processId: string;
  prevProcessStepId: string;
  assignProcessStepId: string;
}

export default function ProcessStepDropdown({
  processStep,
  processId,
  prevProcessStepId,
  assignProcessStepId,
}: ProcessStepDropdownProps) {
  const { mutate: createProcessesSteps } = useCreateProcessesSteps({
    processId,
    onSuccess: () => createToast(ToastType.SUCCESS, 'Process Step has been created'),
    onError: (exception: HttpException) =>
      exception.response.status === HttpStatus.CONFLICT
        ? createToast(ToastType.ERROR, 'Executions related to this Process has not been completed', 6000)
        : createToast(ToastType.ERROR, 'Process Step cannot be created'),
  });
  const { mutate: assignProcessesSteps } = useAssignProcessesSteps({
    processId,
    onSuccess: () => createToast(ToastType.SUCCESS, 'Process Step has been assigned'),
    onError: (exception: HttpException) =>
      exception.response.status === HttpStatus.CONFLICT
        ? createToast(ToastType.ERROR, 'Executions related to this Process has not been completed', 6000)
        : createToast(ToastType.ERROR, 'Process Step cannot be assigned'),
  });
  const { mutate: updateProcessesSteps } = useUpdateProcessesSteps({
    processId,
    onSuccess: () => createToast(ToastType.SUCCESS, 'Process Step has been edited'),
    onError: (exception: HttpException) =>
      exception.response.status === HttpStatus.CONFLICT
        ? createToast(ToastType.ERROR, 'Executions related to this Process has not been completed', 6000)
        : createToast(ToastType.ERROR, 'Process Step cannot be edited'),
  });

  const [isCreateProcessStepDialogOpen, setIsCreateProcessStepDialogOpen] = useState<boolean>(false);
  const [isAssignProcessStepDialogOpen, setIsAssignProcessStepDialogOpen] = useState<boolean>(false);
  const [isEditProcessStepDialogOpen, setIsEditProcessStepDialogOpen] = useState<boolean>(false);

  const handleCreateProcessesSteps = (data: ProcessStepToCreate): void => {
    createProcessesSteps([data]);
    setIsCreateProcessStepDialogOpen(false);
  };

  const handleAssignProcessesSteps = (data: ProcessStepToAssign): void => {
    assignProcessesSteps([data]);
    setIsAssignProcessStepDialogOpen(false);
  };

  const handleEditProcessesSteps = (data: ProcessStepToUpdate): void => {
    updateProcessesSteps([data]);
    setIsEditProcessStepDialogOpen(false);
  };

  return (
    <>
      <Dropdown
        trigger={
          <Button data-testid="process-step-dropdown" variant={ButtonVariant.TEXT} size={ButtonSize.ICON}>
            <MdMoreVert />
          </Button>
        }
        side={DropdownSide.RIGHT}
      >
        <DropdownItem onClick={() => setIsCreateProcessStepDialogOpen(true)}>
          <MdAdd className="text-xl" />
          Create Child Process Step
        </DropdownItem>
        <DropdownItem onClick={() => setIsAssignProcessStepDialogOpen(true)}>
          <MdPolyline className="text-xl" />
          Assign Process Step
        </DropdownItem>
        <DropdownItem onClick={() => setIsEditProcessStepDialogOpen(true)}>
          <MdEdit className="text-xl" />
          Edit Process Step
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
      <Dialog title="Edit Process Step" open={isEditProcessStepDialogOpen}>
        <ProcessStepForm
          processStep={processStep}
          processId={processId}
          onSubmit={handleEditProcessesSteps}
          onCancel={() => setIsEditProcessStepDialogOpen(false)}
        />
      </Dialog>
    </>
  );
}
