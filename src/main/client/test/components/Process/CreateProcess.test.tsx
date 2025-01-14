import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { Process } from '@/interfaces/process.ts';
import CreateProcess from '@/components/Process/CreateProcess.tsx';
import { ProcessFormProps } from '@/components/Process/ProcessForm.tsx';

const mutate: Mock = vi.fn();
vi.mock('@/hooks/processes/useCreateProcesses.ts', () => ({
  useCreateProcesses: () => ({
    mutate,
  }),
}));

const process: Process = mockProcess();
vi.mock('@/components/Process/ProcessForm.tsx', () => ({
  default: ({ onSubmit }: ProcessFormProps) => (
    <div data-testid="submit" onClick={() => onSubmit({ name: process.name })} />
  ),
}));

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <CreateProcess />
    </MockQueryClientProvider>,
  );
});

test('should open dialog when clicked', () => {
  fireEvent.click(component.getByRole('button'));

  expect(component.getByRole('dialog')).toBeInTheDocument();
});

test('should call useCreateProcesses and close dialog when submitted', () => {
  fireEvent.click(component.getByRole('button'));
  fireEvent.click(component.getByTestId('submit'));

  expect(mutate).toHaveBeenCalledOnce();
  expect(mutate).toHaveBeenCalledWith([{ name: process.name }]);
  expect(component.queryByRole('dialog')).not.toBeInTheDocument();
});
