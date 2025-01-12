import { RenderResult, render } from '@testing-library/react';
import HomeRoute from '@/routes/Home.tsx';

let component: RenderResult;

beforeEach(() => {
  component = render(<HomeRoute />);
});

test('should render application name', () => {
  expect(component.getByText('Workflow')).toBeInTheDocument();
});
