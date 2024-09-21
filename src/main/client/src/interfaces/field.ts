import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface FieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}
