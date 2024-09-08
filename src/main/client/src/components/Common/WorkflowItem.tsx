import { Children, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

interface WorkflowItemProps extends PropsWithChildren {
  title: ReactNode;
  actions?: ReactNode;
  completed?: boolean;
  open?: boolean;
}

export default function WorkflowItem({ title, actions, completed, open, children }: WorkflowItemProps) {
  return (
    <li className={clsx('flex flex-col items-start gap-2 rounded-md p-2', completed ? 'bg-green-50' : 'bg-blue-50')}>
      <div className="flex items-center gap-2">{title}</div>
      {actions}
      {Children.count(children) > 0 && (
        <details open={open} className="w-full">
          <summary className="cursor-pointer px-1">Steps</summary>
          <ol className="mt-2 flex w-full list-inside list-decimal flex-col gap-2">{children}</ol>
        </details>
      )}
    </li>
  );
}
