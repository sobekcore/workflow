import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';

const variants: Record<ButtonVariant, string> = {
  [ButtonVariant.DEFAULT]: 'bg-indigo-500 text-white hocus:bg-indigo-600',
  [ButtonVariant.TEXT]: 'text-indigo-500 hocus:bg-indigo-100',
  [ButtonVariant.SUCCESS]: 'text-emerald-500 hocus:bg-emerald-100',
  [ButtonVariant.DISABLED]: 'bg-slate-200 text-slate-400 cursor-not-allowed',
};

const sizes: Record<ButtonSize, string> = {
  [ButtonSize.ICON]: 'p-1 text-xl',
  [ButtonSize.SMALL]: 'px-2 py-1 text-sm',
  [ButtonSize.MEDIUM]: 'px-4 py-2',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = ButtonVariant.DEFAULT,
    size = ButtonSize.MEDIUM,
    type = 'button',
    disabled,
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={clsx(
        'flex items-center gap-2 whitespace-nowrap rounded-full outline-none',
        disabled ? variants[ButtonVariant.DISABLED] : variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
