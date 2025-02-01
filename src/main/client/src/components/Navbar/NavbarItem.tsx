import { ButtonHTMLAttributes, MouseEvent, PropsWithChildren, forwardRef } from 'react';
import { IconType } from 'react-icons';
import { useMatchRoute, useRouter } from '@tanstack/react-router';
import clsx from 'clsx';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import Button from '@/components/Common/Button.tsx';

interface NavbarItemProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  activeIcon?: IconType;
  pathname?: string;
  success?: boolean;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export default forwardRef<HTMLButtonElement, NavbarItemProps>(function NavbarItem(
  { icon, activeIcon = icon, pathname, success, onClick, children, className, ...props },
  ref,
) {
  const router = useRouter();
  const matchRoute = useMatchRoute();

  const active: boolean = pathname ? matchRoute({ to: pathname, fuzzy: true }) : false;
  const Icon: IconType = active ? activeIcon : icon;

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (pathname) {
      router.navigate({ to: pathname });
    }
    onClick?.(event);
  };

  return (
    <Button
      ref={ref}
      variant={success ? ButtonVariant.SUCCESS : ButtonVariant.TEXT}
      size={ButtonSize.SMALL}
      className={clsx(active && (success ? 'bg-success-100' : 'bg-brand-100'), className)}
      onClick={handleButtonClick}
      {...props}
    >
      <Icon className="text-xl" />
      {children}
    </Button>
  );
});
