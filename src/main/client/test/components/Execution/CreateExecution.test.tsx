import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import CreateExecution from '@/components/Execution/CreateExecution.tsx';

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <CreateExecution />
    </MockQueryClientProvider>,
  );
});

test('should open dialog when clicked', () => {
  fireEvent.click(component.getByRole('button'));

  expect(component.getByRole('dialog')).toBeInTheDocument();
});
