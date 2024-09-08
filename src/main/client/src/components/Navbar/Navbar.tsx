import {
  MdHome,
  MdLabel,
  MdLabelOutline,
  MdNotifications,
  MdOutlineHome,
  MdOutlineNotifications,
} from 'react-icons/md';
import NavbarItem from '@/components/Navbar/NavbarItem.tsx';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex gap-2 border-b border-indigo-100 bg-white p-2">
      <NavbarItem pathname="/" icon={MdOutlineHome} activeIcon={MdHome}>
        Home
      </NavbarItem>
      <NavbarItem pathname="/processes" icon={MdLabelOutline} activeIcon={MdLabel}>
        Processes
      </NavbarItem>
      <NavbarItem pathname="/executions" icon={MdOutlineNotifications} activeIcon={MdNotifications}>
        Executions
      </NavbarItem>
    </nav>
  );
}
