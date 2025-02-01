import { useState } from 'react';
import { MdAdd, MdEdit, MdMoreVert } from 'react-icons/md';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import { DropdownSide } from '@/enums/dropdown.ts';
import { HttpStatus } from '@/enums/http.ts';
import { ToastType } from '@/enums/toast.ts';
import { HttpException } from '@/exceptions/http.ts';
import { ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { Process, ProcessToUpdate } from '@/interfaces/process.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';
import { useUpdateProcesses } from '@/hooks/processes/useUpdateProcesses.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import Dropdown from '@/components/Common/Dropdown/Dropdown.tsx';
import DropdownItem from '@/components/Common/Dropdown/DropdownItem.tsx';
import ProcessForm from '@/components/Process/ProcessForm.tsx';
import ProcessStepForm from '@/components/Process/ProcessStepForm.tsx';
import { createToast } from '@/utils/toast.tsx';

interface ProcessDropdownProps {
  process: Process;
}

export default function ProcessDropdown({ process }: ProcessDropdownProps) {
  const { mutate: createProcessesSteps } = useCreateProcessesSteps({
    processId: process.id,
    onSuccess: () => createToast(ToastType.SUCCESS, 'Process Step has been created'),
    onError: (exception: HttpException) =>
      exception.response.status === HttpStatus.CONFLICT
        ? createToast(ToastType.ERROR, 'Executions related to this Process has not been completed', 6000)
        : createToast(ToastType.ERROR, 'Process Step cannot be created'),
  });
  const { mutate: updateProcesses } = useUpdateProcesses({
    onSuccess: () => createToast(ToastType.SUCCESS, 'Process has been edited'),
    onError: (exception: HttpException) =>
      exception.response.status === HttpStatus.CONFLICT
        ? createToast(ToastType.ERROR, 'Executions related to this Process has not been completed', 6000)
        : createToast(ToastType.ERROR, 'Process cannot be edited'),
  });

  const [isCreateProcessStepDialogOpen, setIsCreateProcessStepDialogOpen] = useState<boolean>(false);
  const [isEditProcessDialogOpen, setIsEditProcessDialogOpen] = useState<boolean>(false);

  const handleCreateProcessesSteps = (data: ProcessStepToCreate): void => {
    createProcessesSteps([data]);
    setIsCreateProcessStepDialogOpen(false);
  };

  const handleUpdateProcesses = (data: ProcessToUpdate): void => {
    updateProcesses([data]);
    setIsEditProcessDialogOpen(false);
  };

  return (
    <>
      <Dropdown
        trigger={
          <Button data-testid="process-dropdown" variant={ButtonVariant.TEXT} size={ButtonSize.ICON}>
            <MdMoreVert />
          </Button>
        }
        side={DropdownSide.RIGHT}
      >
        <DropdownItem onClick={() => setIsCreateProcessStepDialogOpen(true)}>
          <MdAdd className="text-xl" />
          Create Root Process Step
        </DropdownItem>
        <DropdownItem onClick={() => setIsEditProcessDialogOpen(true)}>
          <MdEdit className="text-xl" />
          Edit Process
        </DropdownItem>
      </Dropdown>
      <Dialog title="Create Root Process Step" open={isCreateProcessStepDialogOpen}>
        <ProcessStepForm
          processId={process.id}
          onSubmit={handleCreateProcessesSteps}
          onCancel={() => setIsCreateProcessStepDialogOpen(false)}
        />
      </Dialog>
      <Dialog title="Edit Process" open={isEditProcessDialogOpen}>
        <ProcessForm
          process={process}
          onSubmit={handleUpdateProcesses}
          onCancel={() => setIsEditProcessDialogOpen(false)}
        />
      </Dialog>
    </>
  );
}
