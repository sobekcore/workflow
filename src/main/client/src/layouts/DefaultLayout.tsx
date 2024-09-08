import { Outlet } from '@tanstack/react-router';
import Navbar from '@/components/Navbar/Navbar.tsx';

export default function DefaultLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <div className="grid flex-grow">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
