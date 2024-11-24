import { ConditionStatus } from '@/enums/execution/condition.ts';
import { ExecutionCantDetermineNextProcessStepException } from '@/exceptions/execution.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

function findNextProcessSteps(execution: Execution): ProcessStep[] {
  return execution.process.steps.filter(
    (processStep: ProcessStep): boolean | undefined =>
      !!execution.processStep?.id &&
      processStep.availableFrom
        ?.map((processStep: ProcessStep): string => processStep.id)
        .includes(execution.processStep.id),
  );
}

export function findNextProcessStep(execution: Execution, chooseProcessStepId?: string): ProcessStep | undefined {
  const nextProcessSteps: ProcessStep[] = findNextProcessSteps(execution);
  if (!nextProcessSteps.length) {
    return;
  }

  if (nextProcessSteps.length > 1) {
    if (chooseProcessStepId) {
      return nextProcessSteps.filter((processStep: ProcessStep): boolean => processStep.id === chooseProcessStepId)[0];
    }

    throw new ExecutionCantDetermineNextProcessStepException();
  }

  return nextProcessSteps[0];
}

export function isExecutionStepPossibleToChoose(execution: Execution, processStep: ProcessStep): boolean {
  const nextProcessStepsIds: string[] = findNextProcessSteps(execution).map(
    (processStep: ProcessStep): string => processStep.id,
  );

  return execution.conditionStatus === ConditionStatus.CHOOSE && nextProcessStepsIds.length > 1
    ? nextProcessStepsIds.includes(processStep.id)
    : false;
}
