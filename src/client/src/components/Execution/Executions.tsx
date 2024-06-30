import { MdOutlineNotificationAdd } from 'react-icons/md';
import { Execution } from '@/interfaces/execution.ts';
import { useCreateExecutions } from '@/hooks/useCreateExecutions.ts';
import { useReadExecutions } from '@/hooks/useReadExecutions.ts';
import { useReadProcesses } from '@/hooks/useReadProcesses.ts';
import { Button } from '@/components/Common/Button.tsx';
import ExecutionItem from '@/components/Execution/ExecutionItem.tsx';

export function Executions() {
  const { data: processes } = useReadProcesses();
  const { data: executions } = useReadExecutions();
  const { mutate: createExecutions } = useCreateExecutions();

  const handleCreateExecutions = (): void => {
    const processId: string | undefined = processes?.[0]?.id;
    const processStepId: string | undefined = processes?.[0]?.steps[0]?.id;

    // TODO: Allow to customize processId and processStepId
    if (processId && processStepId) {
      createExecutions([{ processId, processStepId }]);
    }
  };

  return (
    <>
      <div className="px-2 pt-2">
        <Button onClick={handleCreateExecutions}>
          <MdOutlineNotificationAdd className="text-xl" />
          Create Execution
        </Button>
      </div>
      <div className="flex flex-col-reverse gap-y-2 p-2">
        {executions?.map((execution: Execution) => <ExecutionItem key={execution.id} execution={execution} />)}
      </div>
    </>
  );
}
