import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import HomeRoute from '@/routes/Home.tsx';

let component: RenderResult;

beforeEach(() => {
  component = render(<HomeRoute />);
});

test('should render application name', () => {
  expect(component.getByText('Workflow')).toBeInTheDocument();
});
