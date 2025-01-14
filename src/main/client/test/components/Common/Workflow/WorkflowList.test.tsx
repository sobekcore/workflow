import { RenderResult } from '@testing-library/react';
import { render } from '@test/render.ts';
import WorkflowList from '@/components/Common/Workflow/WorkflowList.tsx';

const list: string = 'List';
const children: string = 'Children';
let component: RenderResult;

beforeEach(() => {
  component = render(<WorkflowList list={list}>{children}</WorkflowList>);
});

test('should render list', () => {
  expect(component.getByText(list)).toBeInTheDocument();
});

test('should render children', () => {
  expect(component.getByText(children)).toBeInTheDocument();
});
