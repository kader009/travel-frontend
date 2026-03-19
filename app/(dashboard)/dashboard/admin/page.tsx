'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { Users, Map, Star, CreditCard, ArrowRight, TrendingUp, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const StatCard = ({ icon: Icon, label, value, sub, color, href }: {
  icon: React.ElementType; label: string; value: string; sub: string; color: string; href: string;
}) => (
  <Link href={href} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex items-start gap-5 hover:shadow-xl hover:shadow-primary/5 transition-all">
    <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="size-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
    <ArrowRight className="size-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 shrink-0" />
  </Link>
);

const AdminOverviewPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Panel</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, {user?.name?.split(' ')[0]}. Here&apos;s the platform overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Users} label="Total Users" value="—" sub="Registered users" color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" href="/dashboard/admin/users" />
        <StatCard icon={Map} label="Travel Plans" value="—" sub="All active plans" color="bg-primary/10 text-primary" href="/dashboard/admin/travel-plans" />
        <StatCard icon={Star} label="Reviews" value="—" sub="Platform reviews" color="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600" href="/dashboard/admin/reviews" />
        <StatCard icon={CreditCard} label="Subscriptions" value="—" sub="Active subscribers" color="bg-violet-100 dark:bg-violet-900/30 text-violet-600" href="/dashboard/admin/subscriptions" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" /> Platform Analytics
          </h2>
          <Link href="/dashboard/admin/analytics" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Full report <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="text-center py-12 text-slate-400 dark:text-slate-600">
          <BarChart3 className="size-10 mx-auto mb-3 opacity-40" />
          <p className="font-bold">Analytics coming soon</p>
          <p className="text-sm mt-1">Charts and metrics will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
