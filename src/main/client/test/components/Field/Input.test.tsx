import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RenderResult } from '@testing-library/react';
import { Mock } from 'vitest';
import { mockErrors, mockRegister } from '@test/mocks/field.ts';
import { render } from '@test/render.ts';
import Input from '@/components/Field/Input.tsx';

const name: string = 'name';
const label: string = 'Label';
const register: UseFormRegister<any> = vi.fn(mockRegister(name));
const errors: FieldErrors = mockErrors(name);
const onChange: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(<Input name={name} label={label} register={register} errors={errors} onChange={onChange} />);
});

test('should add id attribute to input', () => {
  expect(component.getByLabelText(label)).toHaveAttribute('id', name);
});

test('should call register', () => {
  expect(register).toHaveBeenCalledOnce();
  expect(register).toHaveBeenCalledWith(name, { onChange });
});
