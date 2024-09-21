import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { useLocation, useRouter } from '@tanstack/react-router';
import clsx from 'clsx';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import Button from '@/components/Common/Button.tsx';

interface NavbarItemProps extends PropsWithChildren {
  pathname: string;
  icon: IconType;
  activeIcon: IconType;
}

export default function NavbarItem({ pathname, icon, activeIcon, children }: NavbarItemProps) {
  const router = useRouter();
  const location = useLocation();

  const Icon: IconType = location.pathname === pathname ? activeIcon : icon;

  return (
    <Button
      variant={ButtonVariant.TEXT}
      size={ButtonSize.SMALL}
      className={clsx(location.pathname === pathname && 'bg-indigo-100')}
      onClick={() => router.navigate({ to: pathname })}
    >
      <Icon className="text-xl" />
      {children}
    </Button>
  );
}
