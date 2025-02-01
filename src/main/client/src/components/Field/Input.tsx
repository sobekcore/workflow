import { InputHTMLAttributes } from 'react';
import { FieldProps } from '@/interfaces/field.ts';
import FieldWrapper from '@/components/Field/FieldWrapper.tsx';

interface InputProps extends FieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {}

export default function Input({ name, label, register, errors, onChange }: InputProps) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <input
        id={name}
        className="rounded-xl bg-background px-3 py-2 outline-none ring-1 ring-inset ring-default-300 transition-[box-shadow] focus:ring-2 focus:ring-brand-500"
        {...(register ? register(name, { onChange }) : null)}
      />
    </FieldWrapper>
  );
}
