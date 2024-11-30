import { Children, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

interface WorkflowItemProps extends PropsWithChildren {
  title: ReactNode;
  actions?: ReactNode;
  completed?: boolean;
}

export default function WorkflowItem({ title, actions, completed, children }: WorkflowItemProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-2 overflow-x-auto rounded-2xl border p-2',
        completed ? 'border-emerald-200 bg-green-50' : 'border-indigo-100 bg-white',
      )}
    >
      <div className="sticky left-0 flex min-h-7 items-center justify-between gap-2">
        <div className="flex items-center gap-2">{title}</div>
        {actions}
      </div>
      {Children.count(children) > 0 && <div className="flex w-full gap-2">{children}</div>}
    </div>
  );
}
