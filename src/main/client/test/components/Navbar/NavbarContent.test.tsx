import { RenderResult } from '@testing-library/react';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { mockUser } from '@test/mocks/user.ts';
import { render } from '@test/render.ts';
import { User } from '@/interfaces/auth.ts';
import NavbarContent from '@/components/Navbar/NavbarContent.tsx';

const user: User = mockUser();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockRouterProvider>
      <NavbarContent user={user} />
    </MockRouterProvider>,
  );
});

test('should render navbar items', () => {
  expect(component.getByRole('button', { name: 'Processes' })).toBeInTheDocument();
  expect(component.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument();
});

test('should render navbar items when user is empty', () => {
  component = render(
    <MockRouterProvider>
      <NavbarContent />
    </MockRouterProvider>,
  );

  expect(component.queryByRole('button', { name: 'Processes' })).not.toBeInTheDocument();
  expect(component.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
});
