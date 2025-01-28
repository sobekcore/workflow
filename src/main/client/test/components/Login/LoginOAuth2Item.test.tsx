import { RenderResult, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { render } from '@test/render.ts';
import LoginOAuth2Item from '@/components/Login/LoginOAuth2Item.tsx';

const src: string = '/icon.svg';
const onClick: Mock = vi.fn();
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(
    <LoginOAuth2Item src={src} onClick={onClick}>
      {children}
    </LoginOAuth2Item>,
  );
});

test('should render image', () => {
  expect(component.getByRole('img')).toHaveAttribute('src', src);
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});

test('should call onClick', () => {
  fireEvent.click(component.getByRole('button'));

  expect(onClick).toHaveBeenCalledOnce();
});
