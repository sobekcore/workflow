import { MdLabel, MdLabelOutline } from 'react-icons/md';
import { Process } from '@/interfaces/process.ts';
import NavbarItem from '@/components/Navbar/NavbarItem.tsx';
import ProcessTitle from '@/components/Process/ProcessTitle.tsx';

interface ProcessLinkProps {
  process: Process;
}

export default function ProcessLink({ process }: ProcessLinkProps) {
  const handleNavbarItemClick = (): void => {
    localStorage.setItem('/processes/$processId:processId', process.id);
  };

  return (
    <NavbarItem
      pathname={`/processes/${process.id}`}
      icon={MdLabelOutline}
      activeIcon={MdLabel}
      onClick={handleNavbarItemClick}
    >
      <ProcessTitle process={process} icon={false} />
    </NavbarItem>
  );
}
