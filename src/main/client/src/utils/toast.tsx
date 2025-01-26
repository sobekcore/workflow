import { toast } from 'react-toastify';
import { ToastType } from '@/enums/toast.ts';
import Toast from '@/components/Common/Toast.tsx';

const titles: Record<ToastType, string> = {
  [ToastType.SUCCESS]: 'Success',
  [ToastType.ERROR]: 'Error',
};

export function createToast(type: ToastType, content: string): void {
  toast(<Toast title={titles[type]}>{content}</Toast>, { type });
}
