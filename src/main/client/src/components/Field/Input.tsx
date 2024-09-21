import { FieldProps } from '@/interfaces/field.ts';
import FieldWrapper from '@/components/Field/FieldWrapper.tsx';

export default function Input({ name, label, register, errors }: FieldProps) {
  return (
    <FieldWrapper name={name} label={label} errors={errors}>
      <input
        id={name}
        className="rounded-md px-3 py-2 outline-none ring-1 ring-inset ring-slate-300 transition-[box-shadow] focus:ring-2 focus:ring-indigo-500"
        {...(register ? register(name) : null)}
      />
    </FieldWrapper>
  );
}
