import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowStepItem from '@/components/Common/WorkflowStepItem.tsx';
import ProcessStepCondition from '@/components/Process/ProcessStepCondition.tsx';

interface ProcessStepItemProps {
  processStep: ProcessStep;
}

export default function ProcessStepItem({ processStep }: ProcessStepItemProps) {
  return (
    <WorkflowStepItem processStep={processStep}>
      <div className="cursor-not-allowed rounded border-2 border-dashed border-slate-400 p-2 brightness-75 contrast-50">
        <div className="pointer-events-none">
          <ProcessStepCondition processStep={processStep} />
        </div>
      </div>
    </WorkflowStepItem>
  );
}
