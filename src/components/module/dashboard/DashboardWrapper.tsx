'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { RootState } from '@/src/redux/store/store';
import DashboardSidebar from '@/src/components/module/dashboard/DashboardSidebar';
import { Menu } from 'lucide-react';

import { DashboardWrapperProps } from '@/src/types/props';

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Not logged in → redirect to login
    if (!user) {
      router.replace('/login');
      return;
    }

    // Wrong role → redirect to correct section
    if (user.role === 'admin' && pathname.startsWith('/dashboard/user')) {
      router.replace('/dashboard/admin');
    } else if (user.role === 'user' && pathname.startsWith('/dashboard/admin')) {
      router.replace('/dashboard/user');
    }
  }, [user, pathname, router]);

  // Show nothing while redirecting
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex">
      {/* Sidebar */}
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        {/* Mobile Toggle Button (Visible only on mobile since header is removed) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-30 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
        >
          <Menu className="size-5 text-slate-600 dark:text-slate-300" />
        </button>

        <main className="flex-1 p-6 lg:p-8 pt-16 md:pt-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
