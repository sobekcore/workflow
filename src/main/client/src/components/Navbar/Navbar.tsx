import {
  MdLabel,
  MdLabelOutline,
  MdLogin,
  MdLogout,
  MdNotifications,
  MdOutlineNotifications,
  MdPerson,
  MdPersonOutline,
} from 'react-icons/md';
import { useAuth } from '@/hooks/auth/useAuth.ts';
import ApplicationIcon from '@/components/ApplicationIcon.tsx';
import NavbarItem from '@/components/Navbar/NavbarItem.tsx';
import { navigateToLogin, navigateToLogout } from '@/utils/auth.ts';

export default function Navbar() {
  const { data: user } = useAuth();

  return (
    <div className="sticky top-0 z-10 mb-4 px-4 pt-4 backdrop-blur">
      <nav className="flex gap-2 rounded-full border border-indigo-100 bg-white p-2">
        <NavbarItem icon={() => <ApplicationIcon className="w-4" />} pathname="/">
          Home
        </NavbarItem>
        {user && (
          <>
            <NavbarItem icon={MdLabelOutline} activeIcon={MdLabel} pathname="/processes">
              Processes
            </NavbarItem>
            <NavbarItem icon={MdOutlineNotifications} activeIcon={MdNotifications} pathname="/executions">
              Executions
            </NavbarItem>
          </>
        )}
        <div className="flex-grow" />
        {user ? (
          <>
            <NavbarItem icon={MdPersonOutline} activeIcon={MdPerson} pathname="/profile" className="flex-row-reverse">
              Profile
            </NavbarItem>
            <NavbarItem icon={MdLogout} onClick={navigateToLogout} className="flex-row-reverse">
              Sign Out
            </NavbarItem>
          </>
        ) : (
          <NavbarItem icon={MdLogin} onClick={navigateToLogin} className="flex-row-reverse">
            Sign In
          </NavbarItem>
        )}
      </nav>
    </div>
  );
}
