import { CreditCard } from 'lucide-react';

const AdminSubscriptionsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Subscriptions</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">View and manage all active subscriber details.</p>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 text-center">
      <CreditCard className="size-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
      <p className="font-black text-slate-700 dark:text-slate-300 text-lg">No subscriptions yet</p>
      <p className="text-slate-400 text-sm mt-1">Subscriber data will appear here once payments are active.</p>
    </div>
  </div>
);

export default AdminSubscriptionsPage;
