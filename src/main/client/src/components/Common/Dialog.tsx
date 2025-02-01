import { PropsWithChildren } from 'react';
import * as Primitive from '@radix-ui/react-dialog';

interface DialogProps extends PropsWithChildren {
  title: string;
  open: boolean;
}

export default function Dialog({ title, open, children }: DialogProps) {
  return (
    <Primitive.Root open={open}>
      <Primitive.Portal>
        <Primitive.Overlay className="fixed inset-0 z-20 bg-black/30" />
        <Primitive.Content className="fixed left-[50%] top-[50%] z-30 max-h-[90vh] w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-brand-200 bg-background shadow-xl outline-none">
          <Primitive.Title className="sticky top-0 z-40 bg-background p-6 text-xl font-bold">{title}</Primitive.Title>
          <Primitive.Description hidden />
          <div className="gap-4 p-6 pt-0">{children}</div>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
