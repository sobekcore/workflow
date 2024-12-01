import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import WorkflowStepItem from '@/components/Common/Workflow/WorkflowStepItem.tsx';
import ProcessStepCondition from '@/components/Process/ProcessStepCondition.tsx';
import ProcessStepDropdown from '@/components/Process/ProcessStepDropdown.tsx';
import { tailwindConfig } from '@/utils/tailwind.ts';

interface ProcessStepItemProps {
  processStep: ProcessStep;
  processId: string;
}

export default function ProcessStepItem({ processStep, processId }: ProcessStepItemProps) {
  return (
    <WorkflowStepItem
      processStep={processStep}
      actions={
        <ProcessStepDropdown
          processId={processId}
          prevProcessStepId={processStep.id}
          assignProcessStepId={processStep.id}
        />
      }
      className="transition-[border,background]"
      tabIndex={0}
      data-process-step-id={processStep.id}
      data-process-step-available-from={processStep.availableFrom
        ?.map((processStep: ProcessStep) => processStep.id)
        .join()}
    >
      <style>{`
        body:has([data-process-step-id="${processStep.id}"]:is(:hover, :focus))
        [data-process-step-available-from*="${processStep.id}"] {
          border-color: ${tailwindConfig.colors.indigo['300']};
          background: ${tailwindConfig.colors.indigo['100']};
        }
      `}</style>
      <div className="w-full cursor-not-allowed rounded-xl border-2 border-dashed border-slate-400 bg-slate-200 p-2">
        <div className="pointer-events-none brightness-75 contrast-50">
          <ProcessStepCondition processStep={processStep} />
        </div>
      </div>
    </WorkflowStepItem>
  );
}
