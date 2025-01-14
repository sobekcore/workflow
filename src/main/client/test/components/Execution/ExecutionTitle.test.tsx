import { RenderResult } from '@testing-library/react';
import { mockExecution } from '@test/mocks/execution.ts';
import { render } from '@test/render.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import ExecutionTitle from '@/components/Execution/ExecutionTitle.tsx';

const execution: Execution = mockExecution();
let component: RenderResult;

beforeEach(() => {
  component = render(<ExecutionTitle execution={execution} icon />);
});

test('should render icon', () => {
  expect(component.getByTestId('execution-title-icon')).toBeInTheDocument();
});

test('should render execution name', () => {
  expect(component.getByText(`${execution.process.name} Execution`)).toBeInTheDocument();
});
