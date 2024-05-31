import { MdOutlineNewLabel } from 'react-icons/md';
import { Process } from '@/interfaces/process.ts';
import { useCreateProcesses } from '@/hooks/useCreateProcesses.ts';
import { useReadProcesses } from '@/hooks/useReadProcesses.ts';
import { Button } from '@/components/Common/Button.tsx';
import { ProcessItem } from '@/components/Process/ProcessItem.tsx';

export function Processes() {
  const { data: processes } = useReadProcesses();
  const { mutate: createProcesses } = useCreateProcesses();

  const handleCreateProcesses = (): void => {
    createProcesses([{ name: 'Process' }]);
  };

  return (
    <>
      <div className="px-2 pt-2">
        <Button onClick={handleCreateProcesses}>
          <MdOutlineNewLabel className="text-xl" />
          Create Process
        </Button>
      </div>
      <div className="flex flex-col-reverse gap-y-2 p-2">
        {processes?.map((process: Process) => <ProcessItem key={process.id} process={process} />)}
      </div>
    </>
  );
}
