import { Users } from 'lucide-react';

const ManageUsersPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Manage Users</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">View and manage all registered users.</p>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <p className="font-black text-slate-900 dark:text-white">All Users</p>
        <input type="text" placeholder="Search users..." className="px-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div className="text-center py-16 text-slate-400 dark:text-slate-600">
        <Users className="size-12 mx-auto mb-4 opacity-40" />
        <p className="font-bold">No users found</p>
        <p className="text-sm mt-1">Users will appear here once they register.</p>
      </div>
    </div>
  </div>
);

export default ManageUsersPage;
