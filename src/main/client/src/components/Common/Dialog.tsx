import { PropsWithChildren, ReactNode } from 'react';
import * as Primitive from '@radix-ui/react-dialog';

interface DialogProps extends PropsWithChildren {
  title: string;
  open: boolean;
  content: ReactNode;
}

export default function Dialog({ title, open, content, children }: DialogProps) {
  return (
    <Primitive.Root open={open}>
      {children}
      <Primitive.Portal>
        <Primitive.Overlay className="fixed inset-0 z-20 bg-black/30" />
        <Primitive.Content className="fixed left-[50%] top-[50%] z-30 max-h-[90vh] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-xl focus:outline-none">
          <Primitive.Title className="sticky top-0 z-40 bg-white p-6 text-xl font-bold">{title}</Primitive.Title>
          <Primitive.Description hidden />
          <div className="flex flex-col gap-4 p-6 pt-0">{content}</div>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
