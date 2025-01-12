import { QueryClient } from '@tanstack/react-query';
import { mockUser } from '@test/mocks/user.ts';
import { QueryKey } from '@/enums/query.ts';
import { handleAuth } from '@/router/auth.ts';

const { redirect } = vi.hoisted(() => ({
  redirect: vi.fn(),
}));
vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal()),
  redirect,
}));

test('should not call redirect when authorized', () => {
  const queryClient: QueryClient = new QueryClient();
  queryClient.setQueryData([QueryKey.AUTH], mockUser());

  handleAuth({ queryClient });

  expect(redirect).not.toHaveBeenCalledOnce();
});

test('should call redirect when unauthorized', () => {
  expect(() => handleAuth({ queryClient: new QueryClient() })).toThrow();

  expect(redirect).toHaveBeenCalledOnce();
  expect(redirect).toHaveBeenCalledWith({ to: '/' });
});
