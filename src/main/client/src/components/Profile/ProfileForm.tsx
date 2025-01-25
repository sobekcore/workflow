import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSync } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserToUpdate } from '@/interfaces/auth.ts';
import { userToUpdateSchema } from '@/schemas/auth.ts';
import Button from '@/components/Common/Button.tsx';
import Input from '@/components/Field/Input.tsx';

export interface ProfileFormProps {
  user: User;
  onSubmit: SubmitHandler<UserToUpdate>;
}

export default function ProfileForm({ user, onSubmit }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserToUpdate>({
    resolver: zodResolver(userToUpdateSchema),
  });

  useEffect((): void => {
    setValue('email', user.email);
    setValue('name', user.name);
  }, [setValue, user]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input name="name" label="Name" register={register} errors={errors} />
      <div className="flex justify-end">
        <Button type="submit">
          <MdSync className="text-xl" />
          Update
        </Button>
      </div>
    </form>
  );
}
