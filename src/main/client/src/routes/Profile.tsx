import { useAuth } from '@/hooks/auth/useAuth.ts';
import Profile from '@/components/Profile/Profile.tsx';

export default function ProfileRoute() {
  const { data: user } = useAuth();

  if (user) {
    return (
      <div className="flex justify-center px-4 pb-4 pt-14">
        <Profile user={user} className="w-full max-w-xl" />
      </div>
    );
  }
}
