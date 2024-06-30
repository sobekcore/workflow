import { HTMLProps } from 'react';
import { MdTaskAlt } from 'react-icons/md';
import clsx from 'clsx';
import { ProcessStep } from '@/interfaces/process-step.ts';

interface ProcessStepItemProps extends HTMLProps<HTMLButtonElement> {
  processStep: ProcessStep;
  active?: boolean;
}

export function ProcessStepItem({ processStep, active, onClick }: ProcessStepItemProps) {
  return (
    <button
      className={clsx('flex items-center gap-1 rounded p-1', active ? 'bg-indigo-500 text-white' : 'bg-indigo-100')}
      disabled={!active}
      onClick={onClick}
    >
      <MdTaskAlt />
      <h2 className="text-sm">{processStep.name}</h2>
    </button>
  );
}
