import { ToastContainer } from 'react-toastify';
import { RenderResult, act } from '@testing-library/react';
import { render } from '@test/render.ts';
import { ToastType } from '@/enums/toast.ts';
import { createToast } from '@/utils/toast.tsx';

const content: string = 'Content';
let component: RenderResult;

beforeEach(() => {
  component = render(<ToastContainer />);
});

test('should render content', () => {
  act(() => {
    createToast(ToastType.SUCCESS, content);
  });

  expect(component.getByText(content)).toBeInTheDocument();
});
