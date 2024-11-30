import { PropsWithChildren } from 'react';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import Button from '@/components/Common/Button.tsx';

interface DropdownItemProps extends PropsWithChildren {
  onClick?(): void;
}

export default function DropdownItem({ onClick, children }: DropdownItemProps) {
  return (
    <Primitive.Item asChild>
      <Button variant={ButtonVariant.TEXT} size={ButtonSize.SMALL} onClick={onClick}>
        {children}
      </Button>
    </Primitive.Item>
  );
}
