import { IconType } from 'react-icons';
import { UseMatchRouteOptions } from '@tanstack/react-router';
import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { render } from '@test/render.ts';
import NavbarItem from '@/components/Navbar/NavbarItem.tsx';

const navigate: Mock = vi.fn();
vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal()),
  useRouter: () => ({
    navigate,
  }),
  useMatchRoute:
    () =>
    (options: UseMatchRouteOptions): boolean =>
      options.to === '/active',
}));

const icon: IconType = () => <div data-testid="icon" />;
const activeIcon: IconType = () => <div data-testid="active-icon" />;
const pathname: string = '/pathname';
const onClick: Mock = vi.fn();
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockRouterProvider>
      <NavbarItem icon={icon} activeIcon={activeIcon} pathname={pathname} onClick={onClick}>
        {children}
      </NavbarItem>
    </MockRouterProvider>,
  );
});

test('should render icon', () => {
  expect(component.getByTestId('icon')).toBeInTheDocument();
});

test('should render active icon', () => {
  const pathname: string = '/active';

  component = render(
    <MockRouterProvider>
      <NavbarItem icon={icon} activeIcon={activeIcon} pathname={pathname} onClick={onClick}>
        {children}
      </NavbarItem>
    </MockRouterProvider>,
  );

  expect(component.getByTestId('active-icon')).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});

test('should navigate to pathname when clicked', () => {
  fireEvent.click(component.getByRole('button'));

  expect(navigate).toHaveBeenCalledOnce();
  expect(navigate).toHaveBeenCalledWith({ to: pathname });
});

test('should call onClick', () => {
  fireEvent.click(component.getByRole('button'));

  expect(onClick).toHaveBeenCalledOnce();
});
