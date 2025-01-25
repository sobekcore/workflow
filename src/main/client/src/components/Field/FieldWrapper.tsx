import { PropsWithChildren } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface FieldWrapperProps extends PropsWithChildren {
  name: string;
  label: string;
  errors: FieldErrors;
}

export default function FieldWrapper({ name, label, errors, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor={name} className="inline-flex leading-6">
          {label}
        </label>
      </div>
      {children}
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <span className="text-sm text-red-600">{message}</span>}
      />
    </div>
  );
}
