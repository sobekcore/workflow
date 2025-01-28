import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock, expect } from 'vitest';
import { render } from '@test/render.ts';
import Login from '@/components/Login/Login.tsx';

const assign: Mock = vi.fn();
Object.defineProperty(window, 'location', {
  value: {
    assign,
  },
});

let component: RenderResult;

beforeEach(() => {
  component = render(<Login />);
});

test('should render application name', () => {
  expect(component.getByText('Workflow')).toBeInTheDocument();
});

test('should set location to /google', () => {
  fireEvent.click(component.getByText('Google'));

  expect(assign).toHaveBeenCalledOnce();
  expect(assign).toHaveBeenCalledWith(expect.stringContaining('/google'));
});

test('should set location to /github', () => {
  fireEvent.click(component.getByText('GitHub'));

  expect(assign).toHaveBeenCalledOnce();
  expect(assign).toHaveBeenCalledWith(expect.stringContaining('/github'));
});
