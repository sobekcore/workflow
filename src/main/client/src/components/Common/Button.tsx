import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';

const variants: Record<ButtonVariant, string> = {
  [ButtonVariant.DEFAULT]: 'bg-brand-500 text-background hocus:bg-brand-600',
  [ButtonVariant.TEXT]: 'text-brand-500 hocus:bg-brand-100',
  [ButtonVariant.SUCCESS]: 'text-success-500 hocus:bg-success-100',
  [ButtonVariant.DISABLED]: 'bg-default-200 text-default-400 cursor-not-allowed',
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
