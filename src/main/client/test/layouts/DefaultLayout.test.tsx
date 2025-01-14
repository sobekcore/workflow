import { RenderResult } from '@testing-library/react';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { render } from '@test/render.ts';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';

vi.mock('@tanstack/react-router', async (importOriginal) => ({
  ...(await importOriginal()),
  Outlet: () => <div data-testid="outlet" />,
}));

vi.mock('@/hooks/useAuth.ts', () => ({
  useAuth: () => ({
    data: undefined,
  }),
}));

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <DefaultLayout />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );
});

test('should render navigation', () => {
  expect(component.getByRole('navigation')).toBeInTheDocument();
});

test('should render outlet', () => {
  expect(component.getByTestId('outlet')).toBeInTheDocument();
});
