import { useState } from 'react';
import { MdOutlineNotificationAdd } from 'react-icons/md';
import { ToastType } from '@/enums/toast.ts';
import { ExecutionToCreate } from '@/interfaces/execution/execution.ts';
import { useCreateExecutions } from '@/hooks/executions/useCreateExecutions.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import ExecutionForm from '@/components/Execution/ExecutionForm.tsx';
import { createToast } from '@/utils/toast.tsx';

export default function CreateExecution() {
  const { mutate: createExecutions } = useCreateExecutions({
    onSuccess: () => createToast(ToastType.SUCCESS, 'Execution has been created'),
    onError: () => createToast(ToastType.ERROR, 'Execution cannot be created'),
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCreateExecutions = (data: ExecutionToCreate): void => {
    createExecutions([data]);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <MdOutlineNotificationAdd className="text-xl" />
        Create Execution
      </Button>
      <Dialog title="Create Execution" open={isDialogOpen}>
        <ExecutionForm onSubmit={handleCreateExecutions} onCancel={() => setIsDialogOpen(false)} />
      </Dialog>
    </>
  );
}
