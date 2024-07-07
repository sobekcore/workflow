import { PropsWithChildren, ReactNode } from 'react';

interface WorkflowItemProps extends PropsWithChildren {
  title: ReactNode;
  actions?: ReactNode;
}

export default function WorkflowItem({ title, actions, children }: WorkflowItemProps) {
  return (
    <li className="flex flex-col items-start gap-2 rounded-md bg-blue-50 p-2">
      <div className="flex items-center gap-2">{title}</div>
      {actions}
      <ol className="flex w-full list-inside list-decimal flex-col gap-2">{children}</ol>
    </li>
  );
}
