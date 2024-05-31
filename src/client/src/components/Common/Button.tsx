import { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2 text-white" {...props}>
      {children}
    </button>
  );
}
