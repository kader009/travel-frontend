'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/src/shared/Navbar';
import Footer from '@/src/shared/Footer';

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
};

export default ConditionalLayout;
