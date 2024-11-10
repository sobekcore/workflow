import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';

const variants: Record<ButtonVariant, string> = {
  [ButtonVariant.DEFAULT]: 'bg-indigo-500 text-white hover:bg-indigo-600',
  [ButtonVariant.TEXT]: 'text-indigo-500 hover:bg-indigo-100',
  [ButtonVariant.SUCCESS]: 'text-emerald-500 hover:bg-emerald-100',
  [ButtonVariant.DISABLED]: 'bg-slate-200 text-slate-400 cursor-not-allowed',
};

const sizes: Record<ButtonSize, string> = {
  [ButtonSize.SMALL]: 'px-2 py-1 text-sm',
  [ButtonSize.MEDIUM]: 'px-4 py-2',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  variant = ButtonVariant.DEFAULT,
  size = ButtonSize.MEDIUM,
  type = 'button',
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'flex items-center gap-2 whitespace-nowrap rounded-full',
        disabled ? variants[ButtonVariant.DISABLED] : variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
