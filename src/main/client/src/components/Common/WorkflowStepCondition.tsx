import { ConditionType } from '@/enums/process-step/condition.ts';
import { ConditionOption } from '@/interfaces/process-step/condition.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

interface WorkflowStepConditionProps {
  processStep: ProcessStep;
  onComplete?(): void;
}

export default function WorkflowStepCondition({ processStep, onComplete }: WorkflowStepConditionProps) {
  const handleCompleteCondition = (): void => {
    onComplete?.();
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      {processStep.conditionType === ConditionType.NONE && (
        <span className="text-slate-500">To complete this step, no conditions are required...</span>
      )}
      {processStep.conditionType === ConditionType.VISIT && processStep.conditionDataVisit && (
        <>
          To complete this step, visit this link:
          <a href={processStep.conditionDataVisit.link} target="_blank" onClick={handleCompleteCondition}>
            {processStep.conditionDataVisit.link}
          </a>
        </>
      )}
      {processStep.conditionType === ConditionType.RADIO && processStep.conditionDataRadio && (
        <>
          To complete this step, fill this radio list:
          {processStep.conditionDataRadio.options.map((option: ConditionOption, index: number) => (
            <label key={index} className="flex items-center gap-1">
              <input type="radio" name={processStep.id} onChange={handleCompleteCondition} />
              {option.label}
            </label>
          ))}
        </>
      )}
    </div>
  );
}
