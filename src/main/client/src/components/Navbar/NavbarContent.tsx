import { ComponentType, Fragment } from 'react';
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
import clsx from 'clsx';
import { User } from '@/interfaces/auth.ts';
import ApplicationIcon from '@/components/ApplicationIcon.tsx';
import DropdownItem, { DropdownItemProps } from '@/components/Common/Dropdown/DropdownItem.tsx';
import NavbarItem from '@/components/Navbar/NavbarItem.tsx';
import { navigateToLogin, navigateToLogout } from '@/utils/auth.ts';

interface NavbarContentProps {
  user?: User;
  dropdown?: boolean;
}

export default function NavbarContent({ user, dropdown }: NavbarContentProps) {
  const Item: ComponentType<DropdownItemProps> = dropdown ? DropdownItem : Fragment;
  const props: DropdownItemProps = dropdown ? { primitive: true } : {};

  return (
    <>
      <Item {...props}>
        <NavbarItem icon={() => <ApplicationIcon className="h-4 w-5" />} pathname="/">
          Home
        </NavbarItem>
      </Item>
      {user && (
        <>
          <Item {...props}>
            <NavbarItem icon={MdLabelOutline} activeIcon={MdLabel} pathname="/processes">
              Processes
            </NavbarItem>
          </Item>
          <Item {...props}>
            <NavbarItem icon={MdOutlineNotifications} activeIcon={MdNotifications} pathname="/executions">
              Executions
            </NavbarItem>
          </Item>
        </>
      )}
      {!dropdown && <div className="flex-grow" />}
      {user ? (
        <>
          <Item {...props}>
            <NavbarItem
              icon={MdPersonOutline}
              activeIcon={MdPerson}
              pathname="/profile"
              className={clsx(!dropdown && 'flex-row-reverse')}
            >
              Profile
            </NavbarItem>
          </Item>
          <Item {...props}>
            <NavbarItem icon={MdLogout} onClick={navigateToLogout} className={clsx(!dropdown && 'flex-row-reverse')}>
              Sign Out
            </NavbarItem>
          </Item>
        </>
      ) : (
        <Item {...props}>
          <NavbarItem icon={MdLogin} onClick={navigateToLogin} className={clsx(!dropdown && 'flex-row-reverse')}>
            Sign In
          </NavbarItem>
        </Item>
      )}
    </>
  );
}
