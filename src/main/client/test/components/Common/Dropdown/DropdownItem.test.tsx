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

test('should render children and button', () => {
  expect(component.getByText(children)).toBeInTheDocument();
  expect(component.getByRole('menuitem')).toHaveProperty('localName', 'button');
});

test('should render children and no button when primitive', () => {
  component = render(
    <Dropdown.Root open>
      <Dropdown.Content>
        <DropdownItem primitive onClick={onClick}>
          <div>{children}</div>
        </DropdownItem>
      </Dropdown.Content>
    </Dropdown.Root>,
  );

  expect(component.getByText(children)).toBeInTheDocument();
  expect(component.getByRole('menuitem')).not.toHaveProperty('localName', 'button');
});

test('should call onClick', () => {
  fireEvent.click(component.getByText(children));

  expect(onClick).toHaveBeenCalledOnce();
});
