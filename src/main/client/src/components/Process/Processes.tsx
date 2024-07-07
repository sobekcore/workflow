import { MdOutlineNewLabel } from 'react-icons/md';
import { Process } from '@/interfaces/process.ts';
import { useCreateProcesses } from '@/hooks/processes/useCreateProcesses.ts';
import { useReadProcesses } from '@/hooks/processes/useReadProcesses.ts';
import { Button } from '@/components/Common/Button.tsx';
import { ProcessItem } from '@/components/Process/ProcessItem.tsx';

export function Processes() {
  const { data: processes } = useReadProcesses();
  const { mutate: createProcesses } = useCreateProcesses();

  const handleCreateProcesses = (): void => {
    // TODO: Allow to customize process name
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
      <ul className="flex flex-col-reverse gap-y-2 p-2">
        {processes
          ?.sort((a: Process, b: Process) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map((process: Process) => <ProcessItem key={process.id} process={process} />)}
      </ul>
    </>
  );
}
