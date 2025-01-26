import { PropsWithChildren, ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import { DropdownSide } from '@/enums/dropdown.ts';

interface DropdownProps extends PropsWithChildren {
  trigger: ReactNode;
  side?: DropdownSide;
}

export default function Dropdown({ trigger, side = DropdownSide.LEFT, children }: DropdownProps) {
  return (
    <Primitive.Root modal={false}>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          data-testid="dropdown-content"
          align={side === DropdownSide.LEFT ? 'start' : 'end'}
          className="z-40 flex flex-col rounded-2xl border border-indigo-200 bg-white p-2 text-sm shadow-lg"
        >
          {children}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
