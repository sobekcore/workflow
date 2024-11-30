import { useState } from 'react';
import { MdOutlineNewLabel } from 'react-icons/md';
import { ProcessToCreate } from '@/interfaces/process.ts';
import { useCreateProcesses } from '@/hooks/processes/useCreateProcesses.ts';
import Button from '@/components/Common/Button.tsx';
import Dialog from '@/components/Common/Dialog.tsx';
import ProcessForm from '@/components/Process/ProcessForm.tsx';

export default function CreateProcess() {
  const { mutate: createProcesses } = useCreateProcesses();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleCreateProcesses = (data: ProcessToCreate): void => {
    createProcesses([data]);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <MdOutlineNewLabel className="text-xl" />
        Create Process
      </Button>
      <Dialog title="Create Process" open={isDialogOpen}>
        <ProcessForm onSubmit={handleCreateProcesses} onCancel={() => setIsDialogOpen(false)} />
      </Dialog>
    </>
  );
}
