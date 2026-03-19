import { BarChart3, TrendingUp, Users, Map } from 'lucide-react';

const StatBox = ({ label, icon: Icon, color }: { label: string; icon: React.ElementType; color: string }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 flex items-center gap-5">
    <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="size-5" />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">—</p>
    </div>
  </div>
);

const AnalyticsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Analytics</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Platform growth and engagement metrics.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatBox label="Total Users" icon={Users} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600" />
      <StatBox label="Travel Plans" icon={Map} color="bg-primary/10 text-primary" />
      <StatBox label="Active Matches" icon={TrendingUp} color="bg-green-100 dark:bg-green-900/30 text-green-600" />
      <StatBox label="Revenue" icon={BarChart3} color="bg-violet-100 dark:bg-violet-900/30 text-violet-600" />
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 text-center">
      <BarChart3 className="size-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
      <p className="font-black text-slate-700 dark:text-slate-300 text-lg">Charts coming soon</p>
      <p className="text-slate-400 text-sm mt-1">Visual analytics will be powered by real API data.</p>
    </div>
  </div>
);

export default AnalyticsPage;
