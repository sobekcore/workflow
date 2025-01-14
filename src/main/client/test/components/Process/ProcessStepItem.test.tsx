import { RenderResult } from '@testing-library/react';
import { PointerEventsCheckLevel, userEvent } from '@testing-library/user-event';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { render } from '@test/render.ts';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import ProcessStepItem from '@/components/Process/ProcessStepItem.tsx';

const process: Process = mockProcess();
const processStep: ProcessStep = {
  ...mockProcessStep(),
  condition: {
    type: ConditionType.VISIT,
    data: {
      link: 'https://example.com',
    },
  },
};
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <ProcessStepItem processStep={processStep} processId={process.id} />
    </MockQueryClientProvider>,
  );
});

test('should render process step name', () => {
  expect(component.getByText(processStep.name)).toBeInTheDocument();
});

test('should render process step dropdown', () => {
  expect(component.getByTestId('process-step-dropdown')).toBeInTheDocument();
});

test('should not be possible to click link', async () => {
  await expect(() =>
    userEvent.click(component.getByRole('link'), { pointerEventsCheck: PointerEventsCheckLevel.EachTarget }),
  ).rejects.toThrow();
});
