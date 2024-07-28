import { IconType } from 'react-icons';

interface StatusProps {
  icon: IconType;
  label: string;
}

export default function Status({ icon, label }: StatusProps) {
  const Icon: IconType = icon;

  return (
    <div className="flex items-center gap-2 rounded-md border-2 border-dashed border-indigo-500 px-1.5 py-0.5 text-sm text-indigo-500">
      <Icon className="text-lg" />
      {label}
    </div>
  );
}
