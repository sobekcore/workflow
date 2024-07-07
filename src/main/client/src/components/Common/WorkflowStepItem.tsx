import { ReactNode } from 'react';
import { ProcessStep } from '@/interfaces/process-step.ts';

interface WorkflowStepItemProps {
  processStep: ProcessStep;
  actions?: ReactNode;
}

export default function WorkflowStepItem({ processStep, actions }: WorkflowStepItemProps) {
  return (
    <li className="rounded bg-indigo-100 p-2">
      <h2 className="inline-block">{processStep.name}</h2>
      {actions}
      {processStep.description && <p className="mt-1 text-sm text-slate-500">{processStep.description}</p>}
    </li>
  );
}
