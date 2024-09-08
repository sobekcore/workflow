import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { ButtonSize, ButtonType } from '@/enums/button.ts';

const types: Record<ButtonType, string> = {
  [ButtonType.DEFAULT]: 'bg-indigo-500 text-white',
  [ButtonType.TEXT]: 'text-indigo-500 hover:bg-indigo-100',
};

const sizes: Record<ButtonSize, string> = {
  [ButtonSize.SMALL]: 'px-2 py-1 text-sm',
  [ButtonSize.MEDIUM]: 'px-4 py-2',
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ButtonSize;
}

export function Button({
  type = ButtonType.DEFAULT,
  size = ButtonSize.MEDIUM,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx('flex items-center gap-2 rounded-md', types[type], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
