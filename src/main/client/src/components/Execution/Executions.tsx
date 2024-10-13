import { Execution } from '@/interfaces/execution/execution.ts';
import { useReadExecutions } from '@/hooks/executions/useReadExecutions.ts';
import CreateExecution from '@/components/Execution/CreateExecution.tsx';
import ExecutionItem from '@/components/Execution/ExecutionItem.tsx';

export default function Executions() {
  const { data: executions } = useReadExecutions();

  return (
    <>
      <div className="px-2 pt-2">
        <CreateExecution />
      </div>
      <ul className="flex flex-col gap-y-2 p-2">
        {executions
          ?.sort((a: Execution, b: Execution) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((execution: Execution) => <ExecutionItem key={execution.id} execution={execution} />)}
      </ul>
    </>
  );
}
