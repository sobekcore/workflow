import { ChangeEvent, ReactNode } from 'react';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { ConditionState } from '@/interfaces/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { Condition, ConditionOption } from '@/interfaces/process-step/condition.ts';

interface ConditionConfig {
  isConditionReady(state?: ConditionState): boolean;
  render(props: ConditionConfigRenderProps): ReactNode;
}

interface ConditionConfigRenderProps {
  id: string;
  condition: Condition;
  execution?: Execution;
  onComplete?(state?: ConditionState): void;
}

const conditionConfig: Readonly<Record<ConditionType, ConditionConfig>> = {
  [ConditionType.NONE]: {
    isConditionReady(): boolean {
      return true;
    },
    render(): ReactNode {
      return <span className="text-slate-500">To complete this step, no conditions are required...</span>;
    },
  },
  [ConditionType.VISIT]: {
    isConditionReady(state?: ConditionState): boolean {
      return !!state?.visited;
    },
    render({ condition, onComplete }: ConditionConfigRenderProps): ReactNode {
      return (
        <>
          To complete this step, visit this link:
          <a href={condition?.data?.link} target="_blank" onClick={() => onComplete?.({ visited: true })}>
            {condition?.data?.link}
          </a>
        </>
      );
    },
  },
  [ConditionType.RADIO]: {
    isConditionReady(state?: ConditionState): boolean {
      return !!state?.option;
    },
    render({ id, condition, execution, onComplete }: ConditionConfigRenderProps): ReactNode {
      return (
        <form className="contents">
          To complete this step, fill this radio list:
          {condition?.data?.options?.map((option: ConditionOption, index: number) => (
            <label key={index} className="flex items-center gap-1">
              <input
                type="radio"
                name={id}
                defaultChecked={option.label === execution?.conditionState?.option?.label}
                onChange={() => onComplete?.({ option })}
              />
              {option.label}
            </label>
          ))}
        </form>
      );
    },
  },
  [ConditionType.CHECKBOX]: {
    isConditionReady(state?: ConditionState): boolean {
      return !!state?.options?.length;
    },
    render({ id, condition, execution, onComplete }: ConditionConfigRenderProps): ReactNode {
      return (
        <form className="contents">
          To complete this step, fill this checkbox list:
          {condition?.data?.options?.map((option: ConditionOption, index: number) => (
            <label key={index} className="flex items-center gap-1">
              <input
                type="checkbox"
                name={id}
                defaultChecked={execution?.conditionState?.options
                  ?.map((option: ConditionOption): string => option.label)
                  .includes(option.label)}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onComplete?.({
                    options: event.target.checked
                      ? [...(execution?.conditionState?.options ?? []), option]
                      : execution?.conditionState?.options?.filter(
                          (stateOption: ConditionOption): boolean => stateOption.label !== option.label,
                        ) ?? [],
                  })
                }
              />
              {option.label}
            </label>
          ))}
        </form>
      );
    },
  },
};

export function getConditionConfig(type?: ConditionType): ConditionConfig | undefined {
  return type && conditionConfig[type];
}
