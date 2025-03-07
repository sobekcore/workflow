import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { mockExecution } from '@test/mocks/execution.ts';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { render } from '@test/render.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import ExecutionLink from '@/components/Execution/ExecutionLink.tsx';

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: vi.fn(),
  },
});

const execution: Execution = mockExecution();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockRouterProvider>
      <ExecutionLink execution={execution} />
    </MockRouterProvider>,
  );
});

test('should render execution name', () => {
  expect(component.getByText(`${execution.process.name} Execution`)).toBeInTheDocument();
});

test('should render check when completed', async () => {
  const execution: Execution = {
    ...mockExecution(),
    processStep: undefined,
  };

  component = render(
    <MockRouterProvider>
      <ExecutionLink execution={execution} />
    </MockRouterProvider>,
  );

  expect(component.getByTestId('execution-link-check')).toBeInTheDocument();
});

test('should set localStorage item', async () => {
  await userEvent.click(component.getByRole('button'));

  expect(localStorage.setItem).toHaveBeenCalledOnce();
  expect(localStorage.setItem).toHaveBeenCalledWith(expect.any(String), execution.id);
});
