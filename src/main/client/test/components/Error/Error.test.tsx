import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import Error from '@/components/Error/Error.tsx';

let component: RenderResult;

beforeEach(() => {
  component = render(<Error />);
});

test('should render application name', () => {
  expect(component.getByText('Workflow')).toBeInTheDocument();
});
