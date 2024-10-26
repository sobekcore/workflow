import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { useMatchRoute, useRouter } from '@tanstack/react-router';
import clsx from 'clsx';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import Button from '@/components/Common/Button.tsx';

interface NavbarItemProps extends PropsWithChildren {
  pathname: string;
  icon: IconType;
  activeIcon: IconType;
  success?: boolean;
  onClick?(): void;
}

export default function NavbarItem({ pathname, icon, activeIcon, success, onClick, children }: NavbarItemProps) {
  const router = useRouter();
  const matchRoute = useMatchRoute();

  const active: boolean = matchRoute({ to: pathname, fuzzy: true });
  const Icon: IconType = active ? activeIcon : icon;

  const handleButtonClick = (): void => {
    router.navigate({ to: pathname });
    onClick?.();
  };

  return (
    <Button
      variant={success ? ButtonVariant.SUCCESS : ButtonVariant.TEXT}
      size={ButtonSize.SMALL}
      className={clsx(active && (success ? 'bg-emerald-100' : 'bg-indigo-100'))}
      onClick={handleButtonClick}
    >
      <Icon className="text-xl" />
      {children}
    </Button>
  );
}
