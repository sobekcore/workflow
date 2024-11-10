import ProcessStepItem from '@/components/Process/ProcessStepItem.tsx';
import { NestedProcessStep } from '@/utils/processes.ts';

interface NestedProcessStepItemProps {
  processStep: NestedProcessStep;
  processId: string;
}

export default function NestedProcessStepItem({ processStep, processId }: NestedProcessStepItemProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <ProcessStepItem processStep={processStep} processId={processId} />
      {!!processStep.children?.length && (
        <div className="flex w-full gap-2">
          {processStep.children.map((step: NestedProcessStep) => (
            <NestedProcessStepItem key={step.id} processStep={step} processId={processId} />
          ))}
        </div>
      )}
    </div>
  );
}
