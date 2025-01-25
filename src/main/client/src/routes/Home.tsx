import { MdArrowForward } from 'react-icons/md';
import { useAuth } from '@/hooks/auth/useAuth.ts';
import ApplicationLogo from '@/components/ApplicationLogo.tsx';
import Button from '@/components/Common/Button.tsx';
import { navigateToLogin } from '@/utils/auth.ts';

export default function HomeRoute() {
  const { data: user } = useAuth();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4 pb-4 text-center">
      <ApplicationLogo />
      {user ? (
        <h2 className="text-xl">Welcome, {user.name}</h2>
      ) : (
        <>
          <span className="max-w-sm">
            The application is currently in trial-only mode. Access duration is permanent, but is subject to change.
          </span>
          <span className="max-w-xs text-xs text-slate-500">
            Data persistence and system stability are not guaranteed, until the full version is released.
          </span>
          <Button onClick={navigateToLogin}>
            Let's get started
            <MdArrowForward className="text-xl" />
          </Button>
        </>
      )}
    </div>
  );
}
