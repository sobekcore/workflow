import { IconType } from 'react-icons';
import clsx from 'clsx';
import { StatusType } from '@/enums/status.ts';

const types: Record<StatusType, string> = {
  [StatusType.DEFAULT]: 'border-indigo-500 text-indigo-500',
  [StatusType.SUCCESS]: 'border-emerald-500 text-emerald-500',
};

interface StatusProps {
  icon: IconType;
  label: string;
  type?: StatusType;
}

export default function Status({ icon, label, type = StatusType.DEFAULT }: StatusProps) {
  const Icon: IconType = icon;

  return (
    <div
      className={clsx('flex items-center gap-2 rounded-md border-2 border-dashed px-1.5 py-0.5 text-sm', types[type])}
    >
      <Icon className="text-lg" />
      {label}
    </div>
  );
}
