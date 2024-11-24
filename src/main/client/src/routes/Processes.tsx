import { Process } from '@/interfaces/process.ts';
import { useReadProcesses } from '@/hooks/processes/useReadProcesses.ts';
import { useChildRoute } from '@/hooks/useChildRoute.ts';
import WorkflowList from '@/components/Common/Workflow/WorkflowList.tsx';
import CreateProcess from '@/components/Process/CreateProcess.tsx';
import ProcessItem from '@/components/Process/ProcessItem.tsx';
import Processes from '@/components/Process/Processes.tsx';

export function ProcessesRoute() {
  const { data: processes } = useReadProcesses();
  const process: Process | null = useChildRoute(processes, `/processes/$processId`, 'processId');

  return (
    <div className="px-4 pb-4">
      <CreateProcess />
      {!!processes?.length && (
        <WorkflowList list={<Processes processes={processes} />}>
          {process && <ProcessItem process={process} />}
        </WorkflowList>
      )}
    </div>
  );
}
