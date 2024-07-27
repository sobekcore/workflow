import { PropsWithChildren, ReactNode } from 'react';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

interface WorkflowStepItemProps extends PropsWithChildren {
  processStep: ProcessStep;
  actions?: ReactNode;
}

export default function WorkflowStepItem({ processStep, actions, children }: WorkflowStepItemProps) {
  return (
    <li className="rounded bg-indigo-100 p-2">
      <h2 className="inline-block">{processStep.name}</h2>
      <div className="mt-1 flex flex-col items-start gap-1">
        {actions}
        {processStep.description && <span className="text-sm">{processStep.description}</span>}
        {children}
      </div>
    </li>
  );
}
