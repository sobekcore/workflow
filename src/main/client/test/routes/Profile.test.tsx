import { RenderResult } from '@testing-library/react';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { mockUser } from '@test/mocks/user.ts';
import { render } from '@test/render.ts';
import { User } from '@/interfaces/auth.ts';
import ProfileRoute from '@/routes/Profile.tsx';

const user: User = mockUser();
vi.mock('@/hooks/auth/useAuth.ts', () => ({
  useAuth: () => ({
    data: user,
  }),
}));

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ProfileRoute />
    </MockQueryClientProvider>,
  );
});

test('should render user email', () => {
  expect(component.getByText(user.email)).toBeInTheDocument();
});
