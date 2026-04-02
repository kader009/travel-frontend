'use client';

import { useMemo} from 'react';
import { 
  useGetAllUsersQuery, 
  useGetAllTravelPlansAdminQuery, 
  useGetPaymentAnalyticsQuery 
} from '@/src/redux/store/api/endApi';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Map as MapIcon, 
  Handshake, 
  CreditCard, 
  MoreVertical,
  UserCircle,
  Globe,
  Activity
} from 'lucide-react';
import Image from 'next/image';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ITravelPlan } from '@/src/types/travelPlan';
import { IUser } from '@/src/types/user';
import { IPaymentAnalytics } from '@/src/types/payment';
import AdminOverviewSkeleton from '@/src/components/skeleton/AdminOverviewSkeleton';

const AdminOverviewPage = () => {
  // Queries
  const { data: usersData, isLoading: isUsersLoading } = useGetAllUsersQuery(undefined);
  const { data: plansData, isLoading: isPlansLoading } = useGetAllTravelPlansAdminQuery(undefined);
  const { data: analyticsData, isLoading: isAnalyticsLoading } = useGetPaymentAnalyticsQuery(undefined);

  const analytics = analyticsData?.data as IPaymentAnalytics | undefined;

  // Derive Stats
  const stats = useMemo(() => {
    const users = Array.isArray(usersData?.data) ? (usersData?.data as IUser[]) : [];
    const plans = Array.isArray(plansData?.data) ? (plansData?.data as ITravelPlan[]) : [];

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000));

    // 1. Total & Growth: Users
    const totalUsers = users.length;
    const usersLast30 = users.filter(user => user.createdAt && new Date(user.createdAt) > thirtyDaysAgo).length;
    const usersPrev30 = users.filter(user => user.createdAt && new Date(user.createdAt) > sixtyDaysAgo && new Date(user.createdAt) <= thirtyDaysAgo).length;
    const userGrowth = usersPrev30 > 0 ? ((usersLast30 - usersPrev30) / usersPrev30) * 100 : (usersLast30 > 0 ? 100 : 0);

    // 2. Total & Growth: Trips
    const totalTrips = plans.length;
    const tripsLast30 = plans.filter(plan => plan.createdAt && new Date(plan.createdAt) > thirtyDaysAgo).length;
    const tripsPrev30 = plans.filter(plan => plan.createdAt && new Date(plan.createdAt) > sixtyDaysAgo && new Date(plan.createdAt) <= thirtyDaysAgo).length;
    const tripGrowth = tripsPrev30 > 0 ? ((tripsLast30 - tripsPrev30) / tripsPrev30) * 100 : (tripsLast30 > 0 ? 100 : 0);

    // 3. Total & Growth: Revenue
    const payments = analytics?.recentPayments || [];
    const revenueLast30 = payments
      .filter(payment => payment.createdAt && new Date(payment.createdAt) > thirtyDaysAgo)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const revenuePrev30 = payments
      .filter(payment => payment.createdAt && new Date(payment.createdAt) > sixtyDaysAgo && new Date(payment.createdAt) <= thirtyDaysAgo)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const revenueGrowth = revenuePrev30 > 0 ? ((revenueLast30 - revenuePrev30) / revenuePrev30) * 100 : (revenueLast30 > 0 ? 100 : 0);

    // 4. Meetup Success
    const completedPlans = plans.filter(plan => plan.status === 'ongoing' || plan.status === 'completed').length; 
    const meetupSuccess = totalTrips > 0 ? Math.min(100, Math.round((completedPlans / totalTrips) * 100)) : 88;

    const recentUsers = [...users].reverse().slice(0, 4);
    
    // 5. Popular Destinations
    const destinationDataMap: Record<string, { count: number; image?: string }> = {};
    plans.forEach(plan => {
      const destinationName = plan.destination || 'Unknown';
      if (!destinationDataMap[destinationName]) {
        destinationDataMap[destinationName] = { count: 1, image: plan.images?.[0] };
      } else {
        destinationDataMap[destinationName].count += 1;
        if (!destinationDataMap[destinationName].image && plan.images?.[0]) {
          destinationDataMap[destinationName].image = plan.images[0];
        }
      }
    });
    
    const popularDestinations = Object.entries(destinationDataMap)
      .sort((itemA, itemB) => itemB[1].count - itemA[1].count)
      .map(([name, data]) => ({
        name,
        image: data.image,
        val: `${totalTrips > 0 ? Math.min(100, Math.round((data.count / totalTrips) * 100)) : 0}%`,
        color: 'bg-primary'
      }));

    // 6. Chart Data: Trips by Month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyActivityData = monthNames.map(month => ({ month, trips: 0 }));
    plans.forEach(plan => {
      if (plan.createdAt) {
        const monthIndex = new Date(plan.createdAt).getMonth();
        monthlyActivityData[monthIndex].trips += 1;
      }
    });

    return {
      totalUsers,
      userGrowth: userGrowth.toFixed(1),
      totalTrips,
      tripGrowth: tripGrowth.toFixed(1),
      recentUsers,
      popularDestinations,
      totalRevenue: analytics?.totalEarnings || 0,
      revenueGrowth: revenueGrowth.toFixed(1),
      meetupSuccess,
      chartData: monthlyActivityData
    };
  }, [usersData, plansData, analytics]);

  const isLoading = isUsersLoading || isPlansLoading || isAnalyticsLoading;

  if (isLoading) {
    return <AdminOverviewSkeleton />;
  }

  return (
    <div className="animate-in fade-in duration-700 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Platform Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">Reviewing real-time growth and engagement metrics.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Users Stat */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Users className="size-6" />
            </div>
            <span className={`${Number(stats.userGrowth) >= 0 ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'} text-[10px] font-black flex items-center gap-1 dark:bg-opacity-10 px-2 py-1 rounded-lg uppercase tracking-widest`}>
              {stats.userGrowth}% {Number(stats.userGrowth) >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Active Users</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{stats.totalUsers.toLocaleString()}</h3>
        </div>

        {/* Trips Stat */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
              <MapIcon className="size-6" />
            </div>
            <span className={`${Number(stats.tripGrowth) >= 0 ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'} text-[10px] font-black flex items-center gap-1 dark:bg-opacity-10 px-2 py-1 rounded-lg uppercase tracking-widest`}>
              {stats.tripGrowth}% {Number(stats.tripGrowth) >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Created Trips</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{stats.totalTrips.toLocaleString()}</h3>
        </div>

        {/* Success Stat */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Handshake className="size-6" />
            </div>
            <span className="text-emerald-500 text-[10px] font-black flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg uppercase tracking-widest">
              +4.2% <TrendingUp className="size-3" />
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Meetup Success</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{stats.meetupSuccess}%</h3>
        </div>

        {/* Revenue Stat */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 text-violet-600 rounded-2xl group-hover:scale-110 transition-transform">
              <CreditCard className="size-6" />
            </div>
            <span className={`${Number(stats.revenueGrowth) >= 0 ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'} text-[10px] font-black flex items-center gap-1 dark:bg-opacity-10 px-2 py-1 rounded-lg uppercase tracking-widest`}>
              {stats.revenueGrowth}% {Number(stats.revenueGrowth) >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Revenue</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">${(stats.totalRevenue || 0).toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5">
          <div className="flex items-center justify-between mb-12">
            <div>
               <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                 <Activity className="size-5 text-primary" /> Trip Growth Analytics
               </h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Platform Expansion Index</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="size-2 rounded-full bg-primary/20 border border-primary"></span> Volume Log
              </span>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis hide domain={[0, 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 900 }}
                  labelStyle={{ display: 'none' }}
                  cursor={{ stroke: '#1e293b', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="trips" 
                  stroke="#1e293b" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorTrips)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-112">
          <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Popular Destinations</h4>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {stats.popularDestinations.length > 0 ? stats.popularDestinations.map((destination, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden border border-slate-100 dark:border-slate-700 flex items-center justify-center relative">
                   {destination.image ? (
                     <Image src={destination.image} alt={destination.name} width={48} height={48} className="size-full object-cover" />
                   ) : (
                     <Globe className="size-5 text-slate-300" />
                   )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{destination.name}</p>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{destination.val}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${destination.color} h-full rounded-full transition-all duration-1000`} style={{ width: destination.val }}></div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 font-black uppercase text-[10px] tracking-widest">No trip data available</div>
            )}
          </div>
        </div>
      </div>


      <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">New Registered Personnel</h4>
          <div className="flex -space-x-3">
            {stats.recentUsers.map((recentUser, index) => (
              <div key={index} className="size-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                {recentUser.image ? <Image src={recentUser.image} alt="User" width={36} height={36} className="size-full object-cover" /> : <UserCircle className="size-full text-slate-300" />}
              </div>
            ))}
            {stats.totalUsers > 4 && <div className="size-9 rounded-full border-2 border-white dark:border-slate-900 bg-primary text-slate-900 text-[10px] font-black flex items-center justify-center uppercase">+{stats.totalUsers - 4}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {stats.recentUsers.map((userProfile, index) => (
            <div key={index} className="p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:border-primary/20 transition-all group">
              <div className="size-12 rounded-full bg-slate-50 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                {userProfile.image ? <Image src={userProfile.image} alt={userProfile.name} width={48} height={48} className="size-full object-cover" /> : <UserCircle className="size-full text-slate-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-slate-900 dark:text-white truncate tracking-tight capitalize">{userProfile.name || 'Anonymous'}</p>
                <p className="text-[10px] font-black text-slate-400 tracking-widest truncate">{userProfile.email || 'Unregistered'}</p>
              </div>
              <button className="text-slate-300 hover:text-primary transition-colors cursor-pointer shrink-0">
                <MoreVertical className="size-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
