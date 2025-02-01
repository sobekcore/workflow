import { IconType } from 'react-icons';
import clsx from 'clsx';
import { StatusVariant } from '@/enums/status.ts';

const variants: Record<StatusVariant, string> = {
  [StatusVariant.DEFAULT]: 'border-brand-500 text-brand-500',
  [StatusVariant.SUCCESS]: 'border-success-500 text-success-500',
};

interface StatusProps {
  icon: IconType;
  label: string;
  variant?: StatusVariant;
}

export default function Status({ icon, label, variant = StatusVariant.DEFAULT }: StatusProps) {
  const Icon: IconType = icon;

  return (
    <div
      role="status"
      className={clsx(
        'flex items-center gap-2 rounded-full border-2 border-dashed px-1.5 py-0.5 text-sm',
        variants[variant],
      )}
    >
      <Icon className="text-xl" />
      {label}
    </div>
  );
}
