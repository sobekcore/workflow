import { PropsWithChildren, ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-dropdown-menu';

interface DropdownProps extends PropsWithChildren {
  content: ReactNode;
}

export default function Dropdown({ content, children }: DropdownProps) {
  return (
    <Primitive.Root modal={false}>
      <Primitive.Trigger asChild>{children}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content className="rounded-2xl border border-indigo-200 bg-white p-2 text-sm shadow-lg">
          {content}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
