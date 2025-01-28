import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import LoginRoute from '@/routes/Login.tsx';

let component: RenderResult;

beforeEach(() => {
  component = render(<LoginRoute />);
});

test('should render application name', () => {
  expect(component.getByText('Workflow')).toBeInTheDocument();
});
