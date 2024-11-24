import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

export interface NestedProcessStep extends ProcessStep {
  children?: NestedProcessStep[];
}

function findParent(steps: NestedProcessStep[], processStepId: string): NestedProcessStep | undefined {
  const parent: NestedProcessStep | undefined = steps.find(
    (processStep: NestedProcessStep): boolean => processStep.id === processStepId,
  );
  if (parent) {
    return parent;
  }

  for (const processStep of steps) {
    if (!processStep.children?.length) {
      continue;
    }

    const parent: NestedProcessStep | undefined = findParent(processStep.children, processStepId);
    if (parent) {
      return parent;
    }
  }
}

function buildProcessStepTreeMutate(steps: NestedProcessStep[]): void {
  for (const [index, processStep] of steps.entries()) {
    if (!processStep.prevProcessStep?.id) {
      continue;
    }

    const parent: NestedProcessStep | undefined = findParent(steps, processStep.prevProcessStep.id);
    if (!parent) {
      continue;
    }

    (parent.children ??= []).push(processStep);
    steps.splice(index, 1);

    buildProcessStepTreeMutate(steps);
  }
}

export function buildProcessStepTree(steps: NestedProcessStep[]): NestedProcessStep[] {
  const clone: NestedProcessStep[] = structuredClone(steps);
  buildProcessStepTreeMutate(clone);

  return clone;
}
