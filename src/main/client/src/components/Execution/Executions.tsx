import { Execution } from '@/interfaces/execution/execution.ts';
import ExecutionLink from '@/components/Execution/ExecutionLink.tsx';

interface ExecutionsProps {
  executions: Execution[];
}

export default function Executions({ executions }: ExecutionsProps) {
  return (
    <ul className="flex flex-col gap-y-2">
      {executions
        ?.sort((a: Execution, b: Execution) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((execution: Execution) => (
          <li key={execution.id}>
            <ExecutionLink execution={execution} />
          </li>
        ))}
    </ul>
  );
}
