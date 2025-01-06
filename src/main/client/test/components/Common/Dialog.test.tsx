import { RenderResult, cleanup, render } from '@testing-library/react';
import Dialog from '@/components/Common/Dialog.tsx';

const title: string = 'Title';
let component: RenderResult;

beforeEach(() => {
  component = render(<Dialog title={title} open />);
});

test('should render title', () => {
  expect(component.getByText(title)).toBeInTheDocument();
});

test('should not render dialog when closed', () => {
  cleanup();
  component = render(<Dialog title={title} open={false} />);

  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});
