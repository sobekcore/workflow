import { MdLabelOutline, MdOutlineNotifications } from 'react-icons/md';
import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/Common/Button.tsx';

export function HomeRoute() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center gap-2">
      <Button onClick={() => router.navigate({ to: '/processes' })}>
        <MdLabelOutline className="text-xl" />
        Processes
      </Button>
      <Button onClick={() => router.navigate({ to: '/executions' })}>
        <MdOutlineNotifications className="text-xl" />
        Executions
      </Button>
    </div>
  );
}
