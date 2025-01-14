import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import WorkflowItem from '@/components/Common/Workflow/WorkflowItem.tsx';

const title: string = 'Title';
const actions: string = 'Actions';
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(
    <WorkflowItem title={title} actions={actions}>
      {children}
    </WorkflowItem>,
  );
});

test('should render title', () => {
  expect(component.getByText(title)).toBeInTheDocument();
});

test('should render actions', () => {
  expect(component.getByText(actions)).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByTestId('workflow-item-children')).toBeInTheDocument();
});

test('should not render empty children', () => {
  component = render(<WorkflowItem title={title} />);

  expect(component.queryByTestId('workflow-item-children')).not.toBeInTheDocument();
});
