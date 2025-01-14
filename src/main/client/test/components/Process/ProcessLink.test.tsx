import { RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { mockProcess } from '@test/mocks/process.ts';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { render } from '@test/render.ts';
import { Process } from '@/interfaces/process.ts';
import ProcessLink from '@/components/Process/ProcessLink.tsx';

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: vi.fn(),
  },
});

const process: Process = mockProcess();
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockRouterProvider>
      <ProcessLink process={process} />
    </MockRouterProvider>,
  );
});

test('should render process name', () => {
  expect(component.getByText(process.name)).toBeInTheDocument();
});

test('should set localStorage item', async () => {
  await userEvent.click(component.getByRole('button'));

  expect(localStorage.setItem).toHaveBeenCalledOnce();
  expect(localStorage.setItem).toHaveBeenCalledWith(expect.any(String), process.id);
});
