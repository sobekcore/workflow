import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import ApplicationLogo from '@/components/ApplicationLogo.tsx';

let component: RenderResult;

beforeEach(() => {
  component = render(<ApplicationLogo />);
});

test('should render link', () => {
  expect(component.getByRole('link')).toHaveAttribute('href', '/');
});
