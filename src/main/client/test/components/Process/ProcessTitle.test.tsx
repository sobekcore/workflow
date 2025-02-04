import { RenderResult } from '@testing-library/react';
import { mockProcess } from '@test/mocks/process';
import { render } from '@test/render.ts';
import { Process } from '@/interfaces/process.ts';
import ProcessTitle from '@/components/Process/ProcessTitle.tsx';

const process: Process = mockProcess();
let component: RenderResult;

beforeEach(() => {
  component = render(<ProcessTitle process={process} icon />);
});

test('should render icon', () => {
  expect(component.getByTestId('process-title-icon')).toBeInTheDocument();
});

test('should render process name', () => {
  expect(component.getByText(process.name)).toBeInTheDocument();
});
