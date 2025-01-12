import { QueryClient } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { mockUser } from '@test/mocks/user.ts';
import { act, cleanup, render } from '@testing-library/react';
import { User } from '@/interfaces/auth.ts';
import { router } from '@/router/router.ts';

const { readUser } = vi.hoisted(() => ({
  readUser: vi.fn((): User | null => mockUser()),
}));
vi.mock('@/api/auth/read-user.ts', () => ({
  readUser,
}));

beforeEach(async () => {
  await act(async () =>
    render(
      <MockQueryClientProvider>
        <RouterProvider router={router} context={{ queryClient: new QueryClient() }} />
      </MockQueryClientProvider>,
    ),
  );
});

test('should redirect to protected route when authorized', async () => {
  await act(async () => {
    await router.navigate({ to: '/processes' });
  });

  expect(router.state.location.pathname).toBe('/processes');
});

test('should not redirect to protected route when unauthorized', async () => {
  readUser.mockImplementation(() => null);

  await act(async () => {
    cleanup();
    render(
      <MockQueryClientProvider>
        <RouterProvider router={router} context={{ queryClient: new QueryClient() }} />
      </MockQueryClientProvider>,
    );
  });

  await act(async () => {
    await router.navigate({ to: '/processes' });
  });

  expect(router.state.location.pathname).toBe('/');
});
