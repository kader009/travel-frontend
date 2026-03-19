'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/src/redux/store/store';

const DashboardIndexPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (user.role === 'admin') {
      router.replace('/dashboard/admin');
    } else {
      router.replace('/dashboard/user');
    }
  }, [user, router]);

  return null;
};

export default DashboardIndexPage;