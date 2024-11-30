import { PropsWithChildren, ReactNode } from 'react';

interface WorkflowListProps extends PropsWithChildren {
  list: ReactNode;
}

export default function WorkflowList({ list, children }: WorkflowListProps) {
  return (
    <div className="mt-4 grid grid-cols-[1fr,4fr] gap-4">
      <div>
        <div className="rounded-2xl border border-indigo-100 bg-white p-2">{list}</div>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
