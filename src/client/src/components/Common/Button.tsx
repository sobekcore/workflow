import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { ButtonSize } from '@/enums/button.ts';

const sizes: Record<ButtonSize, string> = {
  [ButtonSize.SMALL]: 'px-2 py-1 text-sm',
  [ButtonSize.MEDIUM]: 'px-4 py-2',
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

export function Button({ size = ButtonSize.MEDIUM, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx('flex items-center gap-2 rounded-md bg-indigo-500 text-white', sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
