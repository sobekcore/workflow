import { RenderHookResult, renderHook } from '@testing-library/react';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { mockUser } from '@test/mocks/user.ts';
import { QueryKey } from '@/enums/query.ts';
import { User, UserToUpdate } from '@/interfaces/auth.ts';
import { useUpdateUser } from '@/hooks/auth/useUpdateUser.ts';

const userToUpdate: UserToUpdate = {
  email: 'user@test.com',
  name: 'User',
};

const user: User = {
  ...mockUser(),
  email: userToUpdate.email,
  name: userToUpdate.name,
};
const { updateUser } = vi.hoisted(() => ({
  updateUser: vi.fn(() => user),
}));
vi.mock('@/api/auth/update-user.ts', () => ({
  updateUser,
}));

let hook: RenderHookResult<ReturnType<typeof useUpdateUser>, void>;

beforeEach(() => {
  hook = renderHook(() => useUpdateUser(), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call updateUser', async () => {
  await hook.result.current.mutateAsync(userToUpdate);

  expect(updateUser).toHaveBeenCalledOnce();
});

test('should set query data', async () => {
  const user: User = {
    ...mockUser(),
    name: 'User 2',
  };
  queryClient.setQueryData([QueryKey.AUTH], user);

  await hook.result.current.mutateAsync(userToUpdate);

  expect(queryClient.getQueryData([QueryKey.AUTH])).toEqual({
    ...user,
    name: userToUpdate.name,
  });
});

test('should ignore query data when user is empty', async () => {
  await hook.result.current.mutateAsync(userToUpdate);

  expect(queryClient.getQueryData([QueryKey.AUTH])).toBeUndefined();
});
