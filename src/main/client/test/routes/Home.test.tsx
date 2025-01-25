import { UseQueryResult } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { mockUser } from '@test/mocks/user.ts';
import { render } from '@test/render.ts';
import { User } from '@/interfaces/auth.ts';
import HomeRoute from '@/routes/Home.tsx';

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

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <HomeRoute />
    </MockQueryClientProvider>,
  );
});

test('should render application name', () => {
  expect(component.getByText('Workflow')).toBeInTheDocument();
});

test('should render user name', () => {
  expect(component.getByText(`Welcome, ${user.name}`)).toBeInTheDocument();
});

test('should render call-to-action button', () => {
  useAuth.mockImplementation(() => ({
    data: null,
  }));

  component = render(
    <MockQueryClientProvider>
      <HomeRoute />
    </MockQueryClientProvider>,
  );

  expect(component.getByRole('button', { name: "Let's get started" })).toBeInTheDocument();
});
