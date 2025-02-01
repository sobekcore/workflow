import { PropsWithChildren } from 'react';

interface ToastProps extends PropsWithChildren {
  title: string;
}

export default function Toast({ title, children }: ToastProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="Toastify__title font-bold">{title}</h2>
      <span className="text-sm text-slate-900">{children}</span>
    </div>
  );
}
