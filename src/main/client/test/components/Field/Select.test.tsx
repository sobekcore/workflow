import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RenderResult } from '@testing-library/react';
import { Mock } from 'vitest';
import { mockErrors, mockRegister } from '@test/mocks/field.ts';
import { render } from '@test/render.ts';
import Select from '@/components/Field/Select.tsx';

const name: string = 'name';
const label: string = 'Label';
const register: UseFormRegister<any> = vi.fn(mockRegister(name));
const errors: FieldErrors = mockErrors(name);
const onChange: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(<Select name={name} label={label} register={register} errors={errors} onChange={onChange} />);
});

test('should add id attribute to select', () => {
  expect(component.getByLabelText(label)).toHaveAttribute('id', name);
});

test('should call register', () => {
  expect(register).toHaveBeenCalledOnce();
  expect(register).toHaveBeenCalledWith(name, { onChange });
});
