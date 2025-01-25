import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, UserToUpdate } from '~/src/interfaces/auth';
import { updateUser } from '@/api/auth/update-user.ts';
import { QueryKey } from '@/enums/query.ts';

export function useUpdateUser() {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(user: UserToUpdate): Promise<User> {
      return updateUser(user);
    },
    onMutate(userToUpdate: UserToUpdate): void {
      queryClient.setQueryData<User>([QueryKey.AUTH], (user?: User): User | undefined => {
        if (!user) {
          return;
        }

        return {
          ...user,
          name: userToUpdate.name,
        };
      });
    },
  });
}
