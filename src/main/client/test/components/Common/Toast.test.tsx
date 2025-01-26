import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import Toast from '@/components/Common/Toast.tsx';

const title: string = 'Title';
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(<Toast title={title}>{children}</Toast>);
});

test('should render title', () => {
  expect(component.getByText(title)).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});
