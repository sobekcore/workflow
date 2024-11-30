import { PropsWithChildren, ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-dropdown-menu';

interface DropdownProps extends PropsWithChildren {
  trigger: ReactNode;
}

export default function Dropdown({ trigger, children }: DropdownProps) {
  return (
    <Primitive.Root modal={false}>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content className="flex flex-col rounded-2xl border border-indigo-200 bg-white p-2 text-sm shadow-lg">
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
