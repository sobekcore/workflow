import { MdLabelOutline } from 'react-icons/md';
import { Process } from '@/interfaces/process.ts';

interface ProcessTitleProps {
  process: Process;
  icon?: boolean;
}

export default function ProcessTitle({ process, icon = true }: ProcessTitleProps) {
  return (
    <>
      {icon && <MdLabelOutline data-testid="process-title-icon" className="text-xl" />}
      <h1>{process.name}</h1>
    </>
  );
}
