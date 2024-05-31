import { MdTaskAlt } from 'react-icons/md';
import { ProcessStep } from '@/interfaces/process-step.ts';

interface ProcessStepItemProps {
  processStep: ProcessStep;
}

export function ProcessStepItem({ processStep }: ProcessStepItemProps) {
  return (
    <div className="flex items-center gap-1 rounded bg-indigo-100 p-1">
      <MdTaskAlt className="text-xl" />
      <h2>
        {processStep.name}
        <span className="text-xs text-slate-500">#{processStep.id}</span>
      </h2>
    </div>
  );
}
