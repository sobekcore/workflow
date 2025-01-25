import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { User, UserToUpdate } from '@/interfaces/auth.ts';
import { useUpdateUser } from '@/hooks/auth/useUpdateUser.ts';
import ProfileForm from '@/components/Profile/ProfileForm.tsx';
import ProfileItem from '@/components/Profile/ProfileItem.tsx';

interface ProfileProps extends HTMLAttributes<HTMLDivElement> {
  user: User;
}

export default function Profile({ user, className }: ProfileProps) {
  const { mutate: updateUser } = useUpdateUser();

  const handleUpdateUser = (data: UserToUpdate): void => {
    updateUser(data);
  };

  return (
    <div className={clsx('flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-white p-6', className)}>
      <h1 className="mb-2 text-xl font-bold">Profile</h1>
      <ProfileItem title="Email">{user.email}</ProfileItem>
      <ProfileItem title="Registration Date">{user.createdAt.toUTCString()}</ProfileItem>
      <ProfileForm user={user} onSubmit={handleUpdateUser} />
    </div>
  );
}
