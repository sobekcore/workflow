import { RenderResult, fireEvent, render } from '@testing-library/react';
import { Mock } from 'vitest';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { ConditionOption } from '@/interfaces/process-step/condition.ts';
import { ConditionConfig, getConditionConfig } from '@/configs/condition.tsx';

describe('condition type none', () => {
  let conditionConfig: ConditionConfig;

  beforeEach(() => {
    conditionConfig = getConditionConfig(ConditionType.NONE)!;
  });

  test('should return true', () => {
    expect(conditionConfig.isConditionReady()).toBeTruthy();
  });
});

describe('condition type visit', () => {
  const link: string = 'https://example.com';
  const onComplete: Mock = vi.fn();

  let conditionConfig: ConditionConfig;
  let component: RenderResult;

  beforeEach(() => {
    conditionConfig = getConditionConfig(ConditionType.VISIT)!;
    component = render(
      conditionConfig.render({
        id: 'process-step',
        condition: {
          type: ConditionType.VISIT,
          data: {
            link,
          },
        },
        onComplete,
      }),
    );
  });

  test('should return false if condition is not ready', () => {
    expect(conditionConfig.isConditionReady()).toBeFalsy();
    expect(conditionConfig.isConditionReady({})).toBeFalsy();
    expect(conditionConfig.isConditionReady({ visited: false })).toBeFalsy();
  });

  test('should return true if condition is ready', () => {
    expect(conditionConfig.isConditionReady({ visited: true })).toBeTruthy();
  });

  test('should add href attribute to link', () => {
    expect(component.getByRole('link').getAttribute('href')).toBe(link);
  });

  test('should call onComplete', () => {
    fireEvent.click(component.getByRole('link'));

    expect(onComplete).toHaveBeenCalledOnce();
    expect(onComplete).toHaveBeenCalledWith({ visited: true });
  });
});

describe('condition type radio', () => {
  const id: string = 'process-step';
  const option: ConditionOption = { label: 'Label', value: 'Value' };
  const onComplete: Mock = vi.fn();

  let conditionConfig: ConditionConfig;
  let component: RenderResult;

  beforeEach(() => {
    conditionConfig = getConditionConfig(ConditionType.RADIO)!;
    component = render(
      conditionConfig.render({
        id,
        condition: {
          type: ConditionType.RADIO,
          data: {
            options: [option],
          },
        },
        onComplete,
      }),
    );
  });

  test('should return false if condition is not ready', () => {
    expect(conditionConfig.isConditionReady()).toBeFalsy();
    expect(conditionConfig.isConditionReady({})).toBeFalsy();
    expect(conditionConfig.isConditionReady({ option: undefined })).toBeFalsy();
  });

  test('should return true if condition is ready', () => {
    expect(conditionConfig.isConditionReady({ option })).toBeTruthy();
  });

  test('should render label', () => {
    expect(component.getByText(option.label)).toBeInTheDocument();
  });

  test('should add name attribute to radio', () => {
    expect(component.getByRole('radio').getAttribute('name')).toBe(id);
  });

  test('should call onComplete', () => {
    fireEvent.click(component.getByRole('radio'));

    expect(onComplete).toHaveBeenCalledOnce();
    expect(onComplete).toHaveBeenCalledWith({ option });
  });
});

describe('condition type checkbox', () => {
  const id: string = 'process-step';
  const option: ConditionOption = { label: 'Label', value: 'Value' };
  const onComplete: Mock = vi.fn();

  let conditionConfig: ConditionConfig;
  let component: RenderResult;

  beforeEach(() => {
    conditionConfig = getConditionConfig(ConditionType.CHECKBOX)!;
    component = render(
      conditionConfig.render({
        id,
        condition: {
          type: ConditionType.CHECKBOX,
          data: {
            options: [option],
          },
        },
        onComplete,
      }),
    );
  });

  test('should return false if condition is not ready', () => {
    expect(conditionConfig.isConditionReady()).toBeFalsy();
    expect(conditionConfig.isConditionReady({})).toBeFalsy();
    expect(conditionConfig.isConditionReady({ options: undefined })).toBeFalsy();
    expect(conditionConfig.isConditionReady({ options: [] })).toBeFalsy();
  });

  test('should return true if condition is ready', () => {
    expect(conditionConfig.isConditionReady({ options: [{ label: 'Label', value: 'Value' }] })).toBeTruthy();
  });

  test('should render label', () => {
    expect(component.getByText(option.label)).toBeInTheDocument();
  });

  test('should add name attribute to checkbox', () => {
    expect(component.getByRole('checkbox').getAttribute('name')).toBe(id);
  });

  test('should call onComplete when selected', () => {
    fireEvent.click(component.getByRole('checkbox'));

    expect(onComplete).toHaveBeenCalledOnce();
    expect(onComplete).toHaveBeenCalledWith({ options: [option] });
  });

  test('should call onComplete when unselected', () => {
    fireEvent.click(component.getByRole('checkbox'));
    fireEvent.click(component.getByRole('checkbox'));

    expect(onComplete).toHaveBeenCalledTimes(2);
    expect(onComplete).toHaveBeenLastCalledWith({ options: [] });
  });
});
