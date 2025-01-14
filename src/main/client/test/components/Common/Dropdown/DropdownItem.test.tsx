import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { render } from '@test/render.ts';
import DropdownItem from '@/components/Common/Dropdown/DropdownItem.tsx';

const onClick: Mock = vi.fn();
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(
    <Dropdown.Root open>
      <Dropdown.Content>
        <DropdownItem onClick={onClick}>{children}</DropdownItem>
      </Dropdown.Content>
    </Dropdown.Root>,
  );
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});

test('should call onClick', () => {
  fireEvent.click(component.getByText(children));

  expect(onClick).toHaveBeenCalledOnce();
});
