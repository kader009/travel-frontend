'use client';

import Image from 'next/image';
import { 
  TrendingUp, 
  Calendar, 
  Crown, 
  Users, 
  Activity,
  History,
  FileText,
  UserCircle
} from 'lucide-react';
import { useGetPaymentAnalyticsQuery } from '@/src/redux/store/api/endApi';
import AdminSubscriptionsSkeleton from '@/src/components/skeleton/AdminSubscriptionsSkeleton';

const AdminSubscriptionsPage = () => {
  const { data: analyticsData, isLoading, isError } = useGetPaymentAnalyticsQuery();

  if (isLoading) {
    return <AdminSubscriptionsSkeleton />;
  }

  if (isError || !analyticsData?.data) {
    return (
      <div className="bg-red-50 dark:bg-red-500/10 text-red-500 p-6 rounded-2xl border border-red-100 dark:border-red-500/20 text-center font-bold">
        Failed to load subscription analytics.
      </div>
    );
  }

  const { totalEarnings, planBreakdown, recentPayments } = analyticsData.data;

  const monthlyStats = planBreakdown.find(p => p._id === 'monthly');
  const yearlyStats = planBreakdown.find(p => p._id === 'yearly');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Subscriptions Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">Monitor revenue and active premium members.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <TrendingUp className="size-5" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Earnings</p>
            <p className="text-xl font-black text-slate-900 dark:text-white leading-none">৳{totalEarnings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <Calendar className="size-7" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Plans</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {monthlyStats?.count || 0} <span className="text-xs text-slate-400 font-bold tracking-tight lowercase">Active</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Crown className="size-7" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yearly Plans</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {yearlyStats?.count || 0} <span className="text-xs text-slate-400 font-bold tracking-tight lowercase">Active</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="size-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
            <Users className="size-7" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Subscribers</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {(monthlyStats?.count || 0) + (yearlyStats?.count || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="size-8 sm:size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <History className="size-4 sm:size-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Recent Transactions</h2>
        </div>
        
        {recentPayments && recentPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
                  <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                  <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Plan</th>
                  <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th className="px-4 sm:px-8 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <div className="flex items-center gap-3">
                        <div className="size-9 sm:size-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 relative shrink-0">
                          {payment.user?.image ? (
                            <Image src={payment.user.image} alt={payment.user.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <UserCircle className="size-5 sm:size-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white capitalize truncate max-w-[120px] sm:max-w-none">{payment.user?.name || 'Unknown'}</p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate max-w-[120px] sm:max-w-none">{payment.user?.email || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <FileText className="size-3 text-slate-400" />
                        <span className="text-[10px] sm:text-xs font-mono font-bold">{payment.transactionId}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${
                        payment.planType === 'yearly' 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {payment.planType}
                      </span>
                    </td>
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">৳{payment.amount}</p>
                    </td>
                    <td className="px-4 sm:px-8 py-4 sm:py-5">
                      <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                        {new Date(payment.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </td>
                    <td className="px-4 sm:px-8 py-4 sm:py-5 text-right">
                      <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-nowrap">
                        <span className="size-1 rounded-full bg-emerald-500"></span>
                        {payment.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <Activity className="size-16 text-slate-200 dark:text-slate-800 mb-4" />
            <p className="text-lg font-black text-slate-700 dark:text-slate-300">No transactions recorded</p>
            <p className="text-slate-400 font-medium mt-1">Once users subscribe, their payment history will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscriptionsPage;
