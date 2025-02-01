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
      data-testid="workflow-step-item"
      className={clsx(
        'flex min-w-[360px] flex-col gap-1 rounded-xl border p-2 outline-none',
        completed ? 'border-success-100 bg-success-100' : 'border-brand-50 bg-brand-50',
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
