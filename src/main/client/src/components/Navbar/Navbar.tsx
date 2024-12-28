import {
  MdHome,
  MdLabel,
  MdLabelOutline,
  MdLogin,
  MdLogout,
  MdNotifications,
  MdOutlineHome,
  MdOutlineNotifications,
  MdPerson,
  MdPersonOutline,
} from 'react-icons/md';
import { useAuth } from '@/hooks/useAuth.ts';
import NavbarItem from '@/components/Navbar/NavbarItem.tsx';

export default function Navbar() {
  const { data: user } = useAuth();

  const handleLogin = (): void => {
    window.location.href = `${import.meta.env.VITE_API_URL}/login`;
  };

  const handleLogout = (): void => {
    window.location.href = `${import.meta.env.VITE_API_URL}/logout`;
  };

  return (
    <div className="sticky top-0 z-10 mb-4 px-4 pt-4 backdrop-blur">
      <nav className="flex gap-2 rounded-full border border-indigo-100 bg-white p-2">
        <NavbarItem icon={MdOutlineHome} activeIcon={MdHome} pathname="/">
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
            <NavbarItem icon={MdLogout} onClick={handleLogout} className="flex-row-reverse">
              Sign Out
            </NavbarItem>
          </>
        ) : (
          <NavbarItem icon={MdLogin} onClick={handleLogin} className="flex-row-reverse">
            Sign In
          </NavbarItem>
        )}
      </nav>
    </div>
  );
}
