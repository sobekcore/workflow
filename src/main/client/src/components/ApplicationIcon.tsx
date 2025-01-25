import { ImgHTMLAttributes } from 'react';

interface ApplicationIconProps extends ImgHTMLAttributes<HTMLImageElement> {}

export default function ApplicationIcon({ alt = 'Workflow', ...props }: ApplicationIconProps) {
  return <img src="/icon.svg" alt={alt} {...props} />;
}
