import { Process } from '@/interfaces/process.ts';
import { useReadProcesses } from '@/hooks/processes/useReadProcesses.ts';
import CreateProcess from '@/components/Process/CreateProcess.tsx';
import ProcessItem from '@/components/Process/ProcessItem.tsx';

export default function Processes() {
  const { data: processes } = useReadProcesses();

  return (
    <>
      <div className="px-2 pt-2">
        <CreateProcess />
      </div>
      <ul className="flex flex-col gap-y-2 p-2">
        {processes
          ?.sort((a: Process, b: Process) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((process: Process) => <ProcessItem key={process.id} process={process} />)}
      </ul>
    </>
  );
}
