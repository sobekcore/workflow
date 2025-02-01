import { UseQueryResult } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { render } from '@test/render.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import ProcessesRoute from '@/routes/Processes.tsx';

const process: Process = mockProcess();
const { useReadProcesses } = vi.hoisted(() => ({
  useReadProcesses: vi.fn(
    (): Partial<UseQueryResult> => ({
      data: [process],
    }),
  ),
}));
vi.mock('@/hooks/processes/useReadProcesses.ts', () => ({
  useReadProcesses,
}));

const anotherProcess: Process = {
  ...mockProcess(),
  id: 'process-2',
  name: 'Process 2',
};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: () => anotherProcess.id,
  },
});

const processStep: ProcessStep = mockProcessStep();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <ProcessesRoute />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );
});

test('should render create process button', async () => {
  expect(await component.findByRole('button', { name: 'Create Process' })).toBeInTheDocument();
});

test('should render process link and name', async () => {
  expect(await component.findAllByText(process.name)).toHaveLength(2);
});

test('should render process step name', async () => {
  expect(await component.findByText(processStep.name)).toBeInTheDocument();
});

test('should not render workflow list when empty', () => {
  useReadProcesses.mockImplementation(() => ({
    data: [],
  }));

  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <ProcessesRoute />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );

  expect(component.queryByTestId('workflow-list')).not.toBeInTheDocument();
});

test('should select process using localStorage item', async () => {
  useReadProcesses.mockImplementation(() => ({
    data: [process, anotherProcess],
  }));

  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <ProcessesRoute />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );

  expect(await component.findAllByText(anotherProcess.name)).toHaveLength(2);
});

test('should render alert when process is not editable', async () => {
  const process: Process = {
    ...mockProcess(),
    editable: false,
  };
  useReadProcesses.mockImplementation(() => ({
    data: [process],
  }));

  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <ProcessesRoute />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );

  expect(await component.findByRole('alert')).toBeInTheDocument();
});
