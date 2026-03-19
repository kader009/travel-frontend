'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Map as MapIcon, 
  Handshake, 
  CreditCard, 
  Download, 
  Calendar,
  MoreVertical,
  UserCircle,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { IUser } from '@/src/types/user';

const AdminOverviewPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Dashboard Content Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Platform Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">Reviewing real-time growth and engagement metrics.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Active Users */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Users className="size-6" />
            </div>
            <span className="text-emerald-500 text-[10px] font-black flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg uppercase tracking-widest">
              +12.5% <TrendingUp className="size-3" />
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Active Users</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">12,840</h3>
        </div>

        {/* Created Trips */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform">
              <MapIcon className="size-6" />
            </div>
            <span className="text-emerald-500 text-[10px] font-black flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg uppercase tracking-widest">
              +8.2% <TrendingUp className="size-3" />
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Created Trips</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">3,420</h3>
        </div>

        {/* Meetup Success */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Handshake className="size-6" />
            </div>
            <span className="text-rose-500 text-[10px] font-black flex items-center gap-1 bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-lg uppercase tracking-widest">
              -2.1% <TrendingDown className="size-3" />
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Meetup Success</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">1,120</h3>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 text-violet-600 rounded-2xl group-hover:scale-110 transition-transform">
              <CreditCard className="size-6" />
            </div>
            <span className="text-emerald-500 text-[10px] font-black flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg uppercase tracking-widest">
              +15.4% <TrendingUp className="size-3" />
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Monthly Revenue</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">$42,500</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Engagement Graph Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">User Engagement Growth</h4>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="size-2 rounded-full bg-primary"></span> New Users
              </span>
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="size-2 rounded-full bg-slate-200 dark:bg-slate-700"></span> Active
              </span>
            </div>
          </div>
          <div className="h-72 flex items-end gap-3 px-2">
            {[
              { day: 'MON', h1: '40%', h2: '60%' },
              { day: 'TUE', h1: '60%', h2: '75%' },
              { day: 'WED', h1: '85%', h2: '45%' },
              { day: 'THU', h1: '55%', h2: '90%' },
              { day: 'FRI', h1: '95%', h2: '70%' },
              { day: 'SAT', h1: '70%', h2: '55%' },
              { day: 'SUN', h1: '50%', h2: '40%' },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl relative overflow-hidden" style={{ height: item.h1 }}>
                  <div className="absolute bottom-0 w-full bg-primary/40 group-hover:bg-primary transition-all rounded-2xl" style={{ height: item.h2 }}></div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
          <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Popular Destinations</h4>
          <div className="space-y-6 flex-1">
            {[
              { name: 'Tokyo, Japan', val: '85%', color: 'bg-primary' },
              { name: 'Bali, Indonesia', val: '72%', color: 'bg-primary' },
              { name: 'Paris, France', val: '64%', color: 'bg-primary' },
              { name: 'New York, USA', val: '48%', color: 'bg-primary' },
            ].map((dest, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden border border-slate-100 dark:border-slate-700">
                   <div className="size-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{dest.name}</p>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{dest.val}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${dest.color} h-full rounded-full transition-all duration-1000`} style={{ width: dest.val }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-primary text-[10px] font-black uppercase tracking-widest text-center py-4 bg-primary/5 hover:bg-primary/10 rounded-2xl transition-all cursor-pointer">
            View All Locations
          </button>
        </div>
      </div>

      {/* Grid: Recent Activities & New Users */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Recent Activities</h4>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline cursor-pointer">View History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Action</th>
                  <th className="px-8 py-4">Location</th>
                  <th className="px-8 py-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {[
                  { name: 'Sarah J.', action: 'NEW TRIP', color: 'text-emerald-600 bg-emerald-50', loc: 'London, UK', time: '2 mins ago' },
                  { name: 'Marco P.', action: 'JOINED MEETUP', color: 'text-blue-600 bg-blue-50', loc: 'Rome, Italy', time: '15 mins ago' },
                  { name: 'Elena R.', action: 'VERIFIED', color: 'text-amber-600 bg-amber-50', loc: 'Madrid, Spain', time: '1 hr ago' },
                  { name: 'Tom H.', action: 'REPORT FILED', color: 'text-rose-600 bg-rose-50', loc: 'Dubai, UAE', time: '3 hrs ago' },
                ].map((act, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-4 flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                        <UserCircle className="size-full text-slate-300" />
                      </div>
                      <span className="text-xs font-black text-slate-900 dark:text-white">{act.name}</span>
                    </td>
                    <td className="px-8 py-4">
                      <span className={`px-2 py-0.5 ${act.color} text-[8px] font-black uppercase tracking-widest rounded transition-all`}>
                        {act.action}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-xs font-bold text-slate-500">{act.loc}</td>
                    <td className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-tighter">{act.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Registered Users */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">New Registered Users</h4>
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="size-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <UserCircle className="size-full text-slate-300" />
                </div>
              ))}
              <div className="size-9 rounded-full border-2 border-white dark:border-slate-900 bg-primary text-slate-900 text-[10px] font-black flex items-center justify-center uppercase">+42</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {[
              { name: 'Jessica Smith', country: 'USA' },
              { name: 'Ahmed Mansour', country: 'UAE' },
              { name: 'Li Wei', country: 'China' },
              { name: 'Karla Schmidt', country: 'Germany' },
            ].map((usr, i) => (
              <div key={i} className="p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:border-primary/20 transition-all group">
                <div className="size-12 rounded-full bg-slate-50 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                  <UserCircle className="size-full text-slate-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-slate-900 dark:text-white truncate tracking-tight">{usr.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined from {usr.country}</p>
                </div>
                <button className="text-slate-300 hover:text-primary transition-colors cursor-pointer">
                  <MoreVertical className="size-5" />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-8 text-primary text-[10px] font-black uppercase tracking-widest text-center py-4 bg-primary/5 hover:bg-primary/10 rounded-2xl transition-all cursor-pointer">
            Explore All Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
