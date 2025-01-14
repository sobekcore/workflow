import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import Button from '@/components/Common/Button.tsx';

test('should add different styles for each variant', () => {
  const classNames: string[] = [];

  for (const variant of Object.values(ButtonVariant)) {
    const component: RenderResult = render(<Button variant={variant} />);

    classNames.push(component.getByRole('button').className);
  }

  expect(classNames.length === new Set(classNames).size).toBeTruthy();
});

test('should add different styles for each size', () => {
  const classNames: string[] = [];

  for (const size of Object.values(ButtonSize)) {
    const component: RenderResult = render(<Button size={size} />);

    classNames.push(component.getByRole('button').className);
  }

  expect(classNames.length === new Set(classNames).size).toBeTruthy();
});
