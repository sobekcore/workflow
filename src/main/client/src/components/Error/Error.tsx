import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import ApplicationLogo from '@/components/ApplicationLogo.tsx';

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {}

export default function Error({ className }: ErrorProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-6 rounded-2xl border border-indigo-100 bg-white p-12 shadow-lg',
        className,
      )}
    >
      <ApplicationLogo />
      <h2 className="text-2xl">Something went wrong</h2>
      <span className="text-center">
        Unexpected error has occurred during this action. Please try again, or continue your work later.
      </span>
    </div>
  );
}
