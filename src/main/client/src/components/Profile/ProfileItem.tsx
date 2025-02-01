import { PropsWithChildren } from 'react';

interface ProfileItemProps extends PropsWithChildren {
  title: string;
}

export default function ProfileItem({ title, children }: ProfileItemProps) {
  return (
    <div className="flex flex-col gap-2">
      {title}
      <div className="rounded-xl bg-default-100 px-3 py-2 text-default-700 ring-1 ring-inset ring-default-300">
        {children}
      </div>
    </div>
  );
}
