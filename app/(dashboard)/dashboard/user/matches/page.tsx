import { Users } from 'lucide-react';

const UserMatchesPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Matched Travelers</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Travelers who match your upcoming plans.</p>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 text-center">
      <Users className="size-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
      <p className="font-black text-slate-700 dark:text-slate-300 text-lg">No matches yet</p>
      <p className="text-slate-400 text-sm mt-1">Create a travel plan to start getting matched with travelers.</p>
    </div>
  </div>
);

export default UserMatchesPage;
