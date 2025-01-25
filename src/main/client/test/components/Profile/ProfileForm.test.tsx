import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Mock } from 'vitest';
import { mockUser } from '@test/mocks/user.ts';
import { render } from '@test/render.ts';
import { User } from '@/interfaces/auth.ts';
import ProfileForm from '@/components/Profile/ProfileForm.tsx';

const user: User = mockUser();
const onSubmit: Mock = vi.fn();
let component: RenderResult;

beforeEach(() => {
  component = render(<ProfileForm user={user} onSubmit={onSubmit} />);
});

test('should call onSubmit', async () => {
  await userEvent.click(component.getByRole('button', { name: 'Update' }));

  expect(onSubmit).toHaveBeenCalledOnce();
});
