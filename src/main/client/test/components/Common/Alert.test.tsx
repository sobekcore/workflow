import { IconType } from 'react-icons';
import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import Alert from '@/components/Common/Alert.tsx';

const icon: IconType = () => <div data-testid="icon" />;
const label: string = 'Label';
let component: RenderResult;

beforeEach(() => {
  component = render(<Alert icon={icon} label={label} />);
});

test('should render icon', () => {
  expect(component.getByTestId('icon')).toBeInTheDocument();
});

test('should render label', () => {
  expect(component.getByText(label)).toBeInTheDocument();
});
