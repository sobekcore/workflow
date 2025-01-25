import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
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
  onClick?(): void;
}

export default function NavbarItem({
  icon,
  activeIcon = icon,
  pathname,
  success,
  onClick,
  children,
  className,
  ...props
}: NavbarItemProps) {
  const router = useRouter();
  const matchRoute = useMatchRoute();

  const active: boolean = pathname ? matchRoute({ to: pathname, fuzzy: true }) : false;
  const Icon: IconType = active ? activeIcon : icon;

  const handleButtonClick = (): void => {
    if (pathname) {
      router.navigate({ to: pathname });
    }
    onClick?.();
  };

  return (
    <Button
      variant={success ? ButtonVariant.SUCCESS : ButtonVariant.TEXT}
      size={ButtonSize.SMALL}
      className={clsx(active && (success ? 'bg-emerald-100' : 'bg-indigo-100'), className)}
      onClick={handleButtonClick}
      {...props}
    >
      <Icon className="text-xl" />
      {children}
    </Button>
  );
}
