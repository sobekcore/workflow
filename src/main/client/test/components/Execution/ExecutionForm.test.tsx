import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { RenderResult, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { Process } from '@/interfaces/process.ts';
import ExecutionForm from '@/components/Execution/ExecutionForm.tsx';

const process: Process = mockProcess();
vi.mock('@/hooks/processes/useReadProcesses.ts', () => ({
  useReadProcesses: () => ({
    data: [process],
  }),
}));

const onSubmit: Mock = vi.fn();
const onCancel: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ExecutionForm onSubmit={onSubmit} onCancel={onCancel} />
    </MockQueryClientProvider>,
  );
});

test('should call onSubmit', async () => {
  await userEvent.selectOptions(component.getByLabelText('Process'), process.id);
  await userEvent.selectOptions(component.getByLabelText('Process Step'), process.steps[0].id);
  await userEvent.click(component.getByRole('button', { name: 'Create' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onCancel', async () => {
  await userEvent.click(component.getByRole('button', { name: 'Cancel' }));

  expect(onCancel).toHaveBeenCalledOnce();
});
