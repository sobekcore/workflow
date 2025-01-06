import { MdCheck, MdNotifications, MdOutlineNotifications } from 'react-icons/md';
import { Execution } from '@/interfaces/execution/execution.ts';
import ExecutionTitle from '@/components/Execution/ExecutionTitle.tsx';
import NavbarItem from '@/components/Navbar/NavbarItem.tsx';

interface ExecutionLinkProps {
  execution: Execution;
}

export default function ExecutionLink({ execution }: ExecutionLinkProps) {
  const isExecutionCompleted: boolean = !execution.processStep;

  const handleNavbarItemClick = (): void => {
    localStorage.setItem('/executions/$executionId:executionId', execution.id);
  };

  return (
    <NavbarItem
      icon={MdOutlineNotifications}
      activeIcon={MdNotifications}
      pathname={`/executions/${execution.id}`}
      success={isExecutionCompleted}
      onClick={handleNavbarItemClick}
    >
      <ExecutionTitle execution={execution} icon={false} />
      {isExecutionCompleted && <MdCheck data-testid="execution-link-check" />}
    </NavbarItem>
  );
}
