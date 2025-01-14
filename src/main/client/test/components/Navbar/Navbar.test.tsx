import { UseQueryResult } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { mockUser } from '@test/mocks/user.ts';
import { render } from '@test/render.ts';
import { User } from '@/interfaces/auth.ts';
import Navbar from '@/components/Navbar/Navbar.tsx';

const user: User = mockUser();
const { useAuth } = vi.hoisted(() => ({
  useAuth: vi.fn(
    (): Partial<UseQueryResult> => ({
      data: user,
    }),
  ),
}));
vi.mock('@/hooks/useAuth.ts', () => ({
  useAuth,
}));

Object.defineProperty(window, 'location', {
  value: {
    href: '/',
  },
});

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <Navbar />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );
});

test('should set location to /logout', async () => {
  await userEvent.click(component.getByRole('button', { name: 'Sign Out' }));

  expect(window.location.href).toContain('/logout');
});

test('should set location to /login', async () => {
  useAuth.mockImplementation(() => ({
    data: null,
  }));

  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <Navbar />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );

  await userEvent.click(component.getByRole('button', { name: 'Sign In' }));

  expect(window.location.href).toContain('/login');
});
