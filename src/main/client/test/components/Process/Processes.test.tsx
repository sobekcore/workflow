import { mockProcess } from '@test/mocks/process.ts';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { RenderResult, render } from '@testing-library/react';
import { Process } from '@/interfaces/process.ts';
import Processes from '@/components/Process/Processes.tsx';

const processes: Process[] = [
  mockProcess(),
  {
    ...mockProcess(),
    id: 'process-2',
    name: 'Process 2',
  },
];
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockRouterProvider>
      <Processes processes={processes} />
    </MockRouterProvider>,
  );
});

test('should render processes names', () => {
  for (const process of processes) {
    expect(component.getByText(process.name)).toBeInTheDocument();
  }
});
