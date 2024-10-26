import { HTMLAttributes } from 'react';
import { FieldProps } from '@/interfaces/field.ts';
import FieldWrapper from '@/components/Field/FieldWrapper.tsx';

interface SelectProps extends FieldProps, HTMLAttributes<HTMLSelectElement> {}

export default function Select({ name, label, register, errors, children, onChange }: SelectProps) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <select
        id={name}
        className="rounded-xl bg-white px-2 py-2.5 outline-none ring-1 ring-inset ring-slate-300 transition-[box-shadow] focus:ring-2 focus:ring-indigo-500"
        {...(register ? register(name, { onChange }) : null)}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
