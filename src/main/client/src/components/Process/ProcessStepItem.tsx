import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowStepItem from '@/components/Common/WorkflowStepItem.tsx';
import ProcessStepCondition from '@/components/Process/ProcessStepCondition.tsx';

interface ProcessStepItemProps {
  processStep: ProcessStep;
}

export default function ProcessStepItem({ processStep }: ProcessStepItemProps) {
  return (
    <WorkflowStepItem processStep={processStep}>
      <div className="cursor-not-allowed rounded-xl border-2 border-dashed border-slate-400 bg-slate-200 p-2">
        <div className="pointer-events-none brightness-75 contrast-50">
          <ProcessStepCondition processStep={processStep} />
        </div>
      </div>
    </WorkflowStepItem>
  );
}
