import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { mockUser } from '@test/mocks/user.ts';
import { render } from '@test/render.ts';
import { User } from '@/interfaces/auth.ts';
import Profile from '@/components/Profile/Profile.tsx';
import { ProfileFormProps } from '@/components/Profile/ProfileForm.tsx';

const mutate: Mock = vi.fn();
vi.mock('@/hooks/auth/useUpdateUser.ts', () => ({
  useUpdateUser: () => ({
    mutate,
  }),
}));

const user: User = mockUser();
vi.mock('@/components/Profile/ProfileForm.tsx', () => ({
  default: ({ onSubmit }: ProfileFormProps) => (
    <div data-testid="submit" onClick={() => onSubmit({ email: user.email, name: user.name })} />
  ),
}));

let component: RenderResult;

beforeEach(() => {
  component = render(<Profile user={user} />);
});

test('should render user email', () => {
  expect(component.getByText(user.email)).toBeInTheDocument();
});

test('should call useUpdateUser when submitted', () => {
  fireEvent.click(component.getByTestId('submit'));

  expect(mutate).toHaveBeenCalledOnce();
  expect(mutate).toHaveBeenCalledWith({ email: user.email, name: user.name });
});
