import { ReactNode } from 'react';
import { MdCheck, MdPriorityHigh } from 'react-icons/md';
import { IconProps, ToastContainerProps, TypeOptions } from 'react-toastify';

const icons: Partial<Record<TypeOptions, ReactNode>> = {
  success: <MdCheck />,
  error: <MdPriorityHigh />,
};

export const toastifyConfig: ToastContainerProps = {
  autoClose: 3000,
  closeButton: false,
  icon: ({ type }: IconProps): ReactNode => icons[type],
};
