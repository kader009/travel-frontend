'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { logout } from '@/src/redux/store/features/userSlice';
import { useRouter } from 'next/navigation';
import { LogOut, Compass, X, UserCircle } from 'lucide-react';
import { userLinks, adminLinks } from '@/src/data/dashboard';
import { NavItem } from '@/src/types/dashboard';
import { toast } from 'sonner';

import { DashboardSidebarProps } from '@/src/types/props';

const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  const links: NavItem[] = user?.role === 'admin' ? adminLinks : userLinks;

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Disconnected', {
      description: 'You have been safely logged out of the network.',
    });
    router.push('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-transform duration-300 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <Compass className="size-5 text-slate-900" />
            </div>
            <span className="font-black text-slate-900 dark:text-white tracking-tight">
              Travel Buddy
            </span>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>



        {/* Nav Links */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-bold transition-all group ${
                  isActive
                    ? 'bg-primary text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon
                  className={`size-4.5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-900' : ''}`}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User Info + Logout */}
        <div className="px-3 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
          {user && (
            <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt={user.name} className="size-9 object-cover rounded-full" />
                ) : (
                  <UserCircle className="size-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-slate-400 truncate max-w-[100px]">{user.email}</p>
                  <span className="text-[9px] font-black uppercase tracking-tighter bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded leading-none shrink-0 border border-slate-300 dark:border-slate-600">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer"
          >
            <LogOut className="size-4.5 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
