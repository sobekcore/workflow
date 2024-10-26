import { MdHorizontalRule, MdOutlineNotifications } from 'react-icons/md';
import { Execution } from '@/interfaces/execution/execution.ts';

interface ExecutionTitleProps {
  execution: Execution;
  icon?: boolean;
}

export default function ExecutionTitle({ execution, icon = true }: ExecutionTitleProps) {
  return (
    <>
      {icon && <MdOutlineNotifications className="text-xl" />}
      <h1 className="flex items-center gap-1">
        {execution.process.name} <MdHorizontalRule /> Execution
      </h1>
    </>
  );
}
