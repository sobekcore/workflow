import { PropsWithChildren } from 'react';

interface ProfileItemProps extends PropsWithChildren {
  title: string;
}

export default function ProfileItem({ title, children }: ProfileItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="leading-6">{title}</div>
      <div className="rounded-xl bg-slate-100 px-3 py-2 text-slate-700 ring-1 ring-inset ring-slate-300">
        {children}
      </div>
    </div>
  );
}
