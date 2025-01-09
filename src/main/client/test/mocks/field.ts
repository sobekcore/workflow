import { FieldErrors, UseFormRegister } from 'react-hook-form';

export function mockRegister(name: string): UseFormRegister<any> {
  return () => ({
    onChange: () => Promise.resolve(),
    onBlur: () => Promise.resolve(),
    ref: () => {},
    name: name as any,
  });
}

export function mockErrors(name: string): FieldErrors {
  return {
    [name]: {
      type: 'required',
      message: 'Error',
    },
  };
}
