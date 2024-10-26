import { Process } from '@/interfaces/process.ts';
import ProcessLink from '@/components/Process/ProcessLink.tsx';

interface ProcessesProps {
  processes: Process[];
}

export default function Processes({ processes }: ProcessesProps) {
  return (
    <ul className="flex flex-col gap-y-2">
      {processes
        ?.sort((a: Process, b: Process) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((process: Process) => (
          <li key={process.id}>
            <ProcessLink process={process} />
          </li>
        ))}
    </ul>
  );
}
