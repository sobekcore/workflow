import { PropsWithChildren } from 'react';
import { ButtonVariant } from '@/enums/button.ts';
import Button from '@/components/Common/Button.tsx';

interface LoginOAuth2ItemProps extends PropsWithChildren {
  src: string;
  onClick(): void;
}

export default function LoginOAuth2Item({ src, onClick, children }: LoginOAuth2ItemProps) {
  return (
    <Button
      variant={ButtonVariant.TEXT}
      className="justify-center text-default-900 ring-1 ring-inset ring-brand-100"
      onClick={onClick}
    >
      <img src={src} alt="Logo" className="h-5" />
      {children}
    </Button>
  );
}
