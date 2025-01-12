import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { mockUser } from '@test/mocks/user.ts';
import { renderHook } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth.ts';

const { readUser } = vi.hoisted(() => ({
  readUser: vi.fn(() => mockUser()),
}));
vi.mock('@/api/auth/read-user.ts', () => ({
  readUser,
}));

beforeEach(() => {
  renderHook(() => useAuth(), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call readUser', () => {
  expect(readUser).toHaveBeenCalledOnce();
});
