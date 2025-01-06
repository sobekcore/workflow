import { ReactNode } from 'react';
import { RenderResult, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Dropdown from '@/components/Common/Dropdown/Dropdown.tsx';

const trigger: ReactNode = <div data-testid="trigger" />;
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(<Dropdown trigger={trigger}>{children}</Dropdown>);
});

test('should render trigger', () => {
  expect(component.getByTestId('trigger')).toBeInTheDocument();
});

test('should render children when opened', async () => {
  await userEvent.click(component.getByTestId('trigger'));

  expect(component.getByText(children));
});
