import { IconType } from 'react-icons';
import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import { StatusVariant } from '@/enums/status.ts';
import Status from '@/components/Common/Status.tsx';

const icon: IconType = () => <div data-testid="icon" />;
const label: string = 'Label';
let component: RenderResult;

beforeEach(() => {
  component = render(<Status icon={icon} label={label} />);
});

test('should render icon', () => {
  expect(component.getByTestId('icon')).toBeInTheDocument();
});

test('should render label', () => {
  expect(component.getByText(label)).toBeInTheDocument();
});

test('should add different styles for each variant', () => {
  const classNames: string[] = [];

  for (const variant of Object.values(StatusVariant)) {
    component = render(<Status icon={icon} label={label} variant={variant} />);

    classNames.push(component.getByRole('status').className);
  }

  expect(classNames.length === new Set(classNames).size).toBeTruthy();
});
