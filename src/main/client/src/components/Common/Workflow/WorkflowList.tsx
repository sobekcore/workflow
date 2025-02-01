import { PropsWithChildren, ReactNode } from 'react';

interface WorkflowListProps extends PropsWithChildren {
  list: ReactNode;
}

export default function WorkflowList({ list, children }: WorkflowListProps) {
  return (
    <div data-testid="workflow-list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr,4fr]">
      <div>
        <div className="rounded-2xl border border-indigo-100 bg-white p-2">{list}</div>
      </div>
      <div className="flex min-w-0 flex-col gap-4">{children}</div>
    </div>
  );
}
