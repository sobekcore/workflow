import { MdOutlineNotificationAdd } from 'react-icons/md';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useCreateExecutions } from '@/hooks/executions/useCreateExecutions.ts';
import { useReadExecutions } from '@/hooks/executions/useReadExecutions.ts';
import { useReadProcesses } from '@/hooks/processes/useReadProcesses.ts';
import { Button } from '@/components/Common/Button.tsx';
import ExecutionItem from '@/components/Execution/ExecutionItem.tsx';

export function Executions() {
  const { data: processes } = useReadProcesses();
  const { data: executions } = useReadExecutions();
  const { mutate: createExecutions } = useCreateExecutions();

  const handleCreateExecutions = (): void => {
    const firstProcess: Process | undefined = processes?.sort(
      (a: Process, b: Process) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )?.[0];

    const processId: string | undefined = firstProcess?.id;
    const processStepId: string | undefined = firstProcess?.steps.sort(
      (a: ProcessStep, b: ProcessStep) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )?.[0]?.id;

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
      <ul className="flex flex-col gap-y-2 p-2">
        {executions
          ?.sort((a: Execution, b: Execution) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((execution: Execution) => <ExecutionItem key={execution.id} execution={execution} />)}
      </ul>
    </>
  );
}
