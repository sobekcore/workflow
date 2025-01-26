import { UseQueryResult } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock, expect } from 'vitest';
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
vi.mock('@/hooks/auth/useAuth.ts', () => ({
  useAuth,
}));

const assign: Mock = vi.fn();
Object.defineProperty(window, 'location', {
  value: {
    assign,
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
  await userEvent.click(component.getByTestId('navbar-menu'));
  await userEvent.click(component.getByRole('menuitem', { name: 'Sign Out' }));

  expect(assign).toHaveBeenCalledOnce();
  expect(assign).toHaveBeenCalledWith(expect.stringContaining('/logout'));
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

  await userEvent.click(component.getByTestId('navbar-menu'));
  await userEvent.click(component.getByRole('menuitem', { name: 'Sign In' }));

  expect(assign).toHaveBeenCalledOnce();
  expect(assign).toHaveBeenCalledWith(expect.stringContaining('/login'));
});
