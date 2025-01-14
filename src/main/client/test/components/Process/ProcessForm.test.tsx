import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { render } from '@test/render.ts';
import ProcessForm from '@/components/Process/ProcessForm.tsx';

const onSubmit: Mock = vi.fn();
const onCancel: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(<ProcessForm onSubmit={onSubmit} onCancel={onCancel} />);
});

test('should call onSubmit', async () => {
  await userEvent.type(component.getByLabelText('Name'), 'Process');
  await userEvent.click(component.getByRole('button', { name: 'Create' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});

test('should call onCancel', async () => {
  await userEvent.click(component.getByRole('button', { name: 'Cancel' }));

  expect(onCancel).toHaveBeenCalledOnce();
});
