import { Map } from 'lucide-react';
import Link from 'next/link';

const UserTravelPlansPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Travel Plans</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your upcoming & past travel plans.</p>
      </div>
      <Link href="/travel-plans/add" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-slate-900 font-bold rounded-full text-sm hover:bg-primary/90 active:scale-95 transition">
        + New Plan
      </Link>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 text-center">
      <Map className="size-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
      <p className="font-black text-slate-700 dark:text-slate-300 text-lg">No plans yet</p>
      <p className="text-slate-400 text-sm mt-1">Start by creating your first travel plan.</p>
    </div>
  </div>
);

export default UserTravelPlansPage;
