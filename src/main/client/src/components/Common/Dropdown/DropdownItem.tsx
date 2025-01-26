import { PropsWithChildren } from 'react';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import Button from '@/components/Common/Button.tsx';

export interface DropdownItemProps extends PropsWithChildren {
  primitive?: boolean;
  onClick?(): void;
}

export default function DropdownItem({ primitive, onClick, children }: DropdownItemProps) {
  return (
    <Primitive.Item asChild>
      {primitive ? (
        children
      ) : (
        <Button variant={ButtonVariant.TEXT} size={ButtonSize.SMALL} onClick={onClick}>
          {children}
        </Button>
      )}
    </Primitive.Item>
  );
}
