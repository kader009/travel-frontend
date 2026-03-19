'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { Map, Users, Star, CreditCard, ArrowRight } from 'lucide-react';
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

const UserOverviewPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here&apos;s a summary of your travel activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Map} label="My Travel Plans" value="0" sub="Create your first plan" color="bg-primary/10 text-primary" href="/dashboard/user/travel-plans" />
        <StatCard icon={Users} label="Matched Travelers" value="0" sub="Based on your plans" color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" href="/dashboard/user/matches" />
        <StatCard icon={Star} label="My Reviews" value="0" sub="Reviews given & received" color="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600" href="/dashboard/user/reviews" />
        <StatCard icon={CreditCard} label="Subscription" value="Free" sub="Upgrade for more" color="bg-violet-100 dark:bg-violet-900/30 text-violet-600" href="/dashboard/user/subscription" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Recent Travel Plans</h2>
          <Link href="/dashboard/user/travel-plans" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="text-center py-12 text-slate-400 dark:text-slate-600">
          <Map className="size-10 mx-auto mb-3 opacity-40" />
          <p className="font-bold">No travel plans yet</p>
          <p className="text-sm mt-1">Create your first plan to start matching!</p>
          <Link href="/travel-plans/add" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-slate-900 font-bold rounded-full text-sm hover:bg-primary/90 transition">
            Create Plan <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOverviewPage;
