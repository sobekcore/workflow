import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import ErrorRoute from '@/routes/Error.tsx';

let component: RenderResult;

beforeEach(() => {
  component = render(<ErrorRoute />);
});

test('should render application name', () => {
  expect(component.getByText('Workflow')).toBeInTheDocument();
});
