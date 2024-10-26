import { Execution } from '@/interfaces/execution/execution.ts';
import { useReadExecutions } from '@/hooks/executions/useReadExecutions.ts';
import { useChildRoute } from '@/hooks/useChildRoute.ts';
import WorkflowList from '@/components/Common/WorkflowList.tsx';
import CreateExecution from '@/components/Execution/CreateExecution.tsx';
import ExecutionItem from '@/components/Execution/ExecutionItem.tsx';
import Executions from '@/components/Execution/Executions.tsx';

export function ExecutionsRoute() {
  const { data: executions } = useReadExecutions();
  const execution: Execution | null = useChildRoute(executions, `/executions/$executionId`, 'executionId');

  return (
    <div className="px-4 pb-4">
      <CreateExecution />
      {!!executions?.length && (
        <WorkflowList list={<Executions executions={executions} />}>
          {execution && <ExecutionItem execution={execution} />}
        </WorkflowList>
      )}
    </div>
  );
}
