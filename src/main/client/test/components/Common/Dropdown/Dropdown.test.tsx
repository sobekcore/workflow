import { ReactNode } from 'react';
import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { render } from '@test/render.ts';
import { DropdownSide } from '@/enums/dropdown.ts';
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

test('should add data-align attribute to dropdown', async () => {
  await userEvent.click(component.getByTestId('trigger'));

  expect(component.getByTestId('dropdown-content')).toHaveAttribute('data-align', 'start');
});

test('should add data-align attribute to dropdown when dropdown side right', async () => {
  component = render(
    <Dropdown trigger={trigger} side={DropdownSide.RIGHT}>
      {children}
    </Dropdown>,
  );

  await userEvent.click(component.getByTestId('trigger'));

  expect(component.getByTestId('dropdown-content')).toHaveAttribute('data-align', 'end');
});
