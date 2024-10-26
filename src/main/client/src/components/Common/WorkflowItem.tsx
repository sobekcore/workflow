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
        'flex flex-col items-start gap-2 rounded-2xl border p-2',
        completed ? 'border-emerald-200 bg-green-50' : 'border-indigo-100 bg-white',
      )}
    >
      <div className="flex items-center gap-2">{title}</div>
      {actions}
      {Children.count(children) > 0 && (
        <ol className="flex w-full list-inside list-decimal flex-col gap-2">{children}</ol>
      )}
    </div>
  );
}
