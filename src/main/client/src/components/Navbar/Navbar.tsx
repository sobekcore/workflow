import { MdMenu } from 'react-icons/md';
import { ButtonSize, ButtonVariant } from '@/enums/button.ts';
import { useAuth } from '@/hooks/auth/useAuth.ts';
import Button from '@/components/Common/Button.tsx';
import Dropdown from '@/components/Common/Dropdown/Dropdown.tsx';
import NavbarContent from '@/components/Navbar/NavbarContent.tsx';

export default function Navbar() {
  const { data: user } = useAuth();

  return (
    <div className="sticky top-0 z-10 mb-4 px-4 pt-4 backdrop-blur">
      <nav className="rounded-full border border-brand-100 bg-background p-2">
        <Dropdown
          trigger={
            <Button data-testid="navbar-menu" variant={ButtonVariant.TEXT} size={ButtonSize.ICON} className="sm:hidden">
              <MdMenu />
            </Button>
          }
        >
          <NavbarContent user={user} dropdown />
        </Dropdown>
        <div className="hidden gap-2 sm:flex">
          <NavbarContent user={user} />
        </div>
      </nav>
    </div>
  );
}
