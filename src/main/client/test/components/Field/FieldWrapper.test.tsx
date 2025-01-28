import { FieldErrors } from 'react-hook-form';
import { RenderResult } from '@testing-library/react';
import { mockErrors } from '@test/mocks/field.ts';
import { render } from '@test/render.ts';
import FieldWrapper from '@/components/Field/FieldWrapper.tsx';

const name: string = 'name';
const label: string = 'Label';
const children: string = 'Children';
const errors: FieldErrors = mockErrors(name);
let component: RenderResult;

beforeEach(() => {
  component = render(
    <FieldWrapper name={name} label={label} errors={errors}>
      {children}
    </FieldWrapper>,
  );
});

test('should add for attribute to label', () => {
  expect(component.getByText(label)).toHaveAttribute('for', name);
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});

test('should render error message', () => {
  expect(component.getByText(`${errors[name]?.message}`)).toBeInTheDocument();
});
