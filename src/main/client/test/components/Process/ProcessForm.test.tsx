import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { mockProcess } from '@test/mocks/process.ts';
import { render } from '@test/render.ts';
import ProcessForm from '@/components/Process/ProcessForm.tsx';

const onSubmit: Mock = vi.fn();
const onCancel: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(<ProcessForm onSubmit={onSubmit} onCancel={onCancel} />);
});

test('should call onSubmit when create', async () => {
  await userEvent.type(component.getByLabelText('Name'), 'Process');
  await userEvent.click(component.getByRole('button', { name: 'Create' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onSubmit when update', async () => {
  component = render(<ProcessForm process={mockProcess()} onSubmit={onSubmit} onCancel={onCancel} />);

  await userEvent.click(component.getByRole('button', { name: 'Edit' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onCancel', async () => {
  await userEvent.click(component.getByRole('button', { name: 'Cancel' }));

  expect(onCancel).toHaveBeenCalledOnce();
});
