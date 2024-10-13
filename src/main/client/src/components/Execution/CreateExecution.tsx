import { useState } from 'react';
import { MdOutlineNotificationAdd } from 'react-icons/md';
import { ExecutionToCreate } from '@/interfaces/execution/execution.ts';
import { useCreateExecutions } from '@/hooks/executions/useCreateExecutions.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import ExecutionForm from '@/components/Execution/ExecutionForm.tsx';

export default function CreateExecution() {
  const { mutate: createExecutions } = useCreateExecutions();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCreateExecutions = (data: ExecutionToCreate): void => {
    createExecutions([data]);
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
      title="Create Execution"
      open={isDialogOpen}
      content={<ExecutionForm onSubmit={handleCreateExecutions} onCancel={handleDialogClose} />}
    >
      <Button onClick={handleDialogOpen}>
        <MdOutlineNotificationAdd className="text-xl" />
        Create Execution
      </Button>
    </Dialog>
  );
}
