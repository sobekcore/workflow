import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

interface WorkflowStepItemProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  processStep: ProcessStep;
  actions?: ReactNode;
  completed?: boolean;
}

export default function WorkflowStepItem({
  processStep,
  actions,
  completed,
  children,
  className,
  ...props
}: WorkflowStepItemProps) {
  return (
    <div
      className={clsx(
        'flex min-w-[360px] flex-col gap-1 rounded-xl p-2',
        completed ? 'bg-emerald-100' : 'bg-indigo-50',
        className,
      )}
      {...props}
    >
      <div className="flex min-h-7 items-center justify-between gap-2">
        <h2>{processStep.name}</h2>
        {actions}
      </div>
      {processStep.description && <span className="text-sm">{processStep.description}</span>}
      {children}
    </div>
  );
}
