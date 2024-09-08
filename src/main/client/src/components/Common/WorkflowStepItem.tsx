import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

interface WorkflowStepItemProps extends PropsWithChildren, HTMLAttributes<HTMLLIElement> {
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
    <li className={clsx('rounded p-2', completed ? 'bg-emerald-100' : 'bg-indigo-100', className)} {...props}>
      <h2 className="inline-block">{processStep.name}</h2>
      <div className="mt-1 flex flex-col items-start gap-1">
        {actions}
        {processStep.description && <span className="text-sm">{processStep.description}</span>}
        {children}
      </div>
    </li>
  );
}
