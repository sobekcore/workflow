import { IconType } from 'react-icons';

interface AlertProps {
  icon: IconType;
  label: string;
}

export default function Alert({ icon, label }: AlertProps) {
  const Icon: IconType = icon;

  return (
    <div role="alert" className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-red-50 p-2">
      <Icon className="text-xl text-rose-500" />
      <h1 className="text-rose-500">{label}</h1>
    </div>
  );
}
