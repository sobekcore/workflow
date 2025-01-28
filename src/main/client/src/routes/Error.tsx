import Error from '@/components/Error/Error.tsx';

export default function ErrorRoute() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <Error className="w-full max-w-lg" />
    </div>
  );
}
