import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import ProfileItem from '@/components/Profile/ProfileItem.tsx';

const title: string = 'Title';
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(<ProfileItem title={title}>{children}</ProfileItem>);
});

test('should render title', () => {
  expect(component.getByText(title)).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});
