import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import ApplicationLogo from '@/components/ApplicationLogo.tsx';
import LoginOAuth2Item from '@/components/Login/LoginOAuth2Item.tsx';
import { navigateToOAuth2GitHub, navigateToOAuth2Google } from '@/utils/auth.ts';

interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export default function Login({ className }: LoginProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-6 rounded-2xl border border-brand-100 bg-background p-12 shadow-lg',
        className,
      )}
    >
      <ApplicationLogo />
      <h2 className="text-2xl">Sign In to continue</h2>
      <span className="text-center">
        The application is currently in trial-only mode. Access duration is permanent, but is subject to change.
      </span>
      <div className="flex w-full flex-col gap-2">
        <LoginOAuth2Item src="/login/google.svg" onClick={navigateToOAuth2Google}>
          Google
        </LoginOAuth2Item>
        <LoginOAuth2Item src="/login/github.svg" onClick={navigateToOAuth2GitHub}>
          GitHub
        </LoginOAuth2Item>
      </div>
    </div>
  );
}
