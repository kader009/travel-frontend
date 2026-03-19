import { Star } from 'lucide-react';

const UserReviewsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Reviews</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Reviews you&apos;ve given and received.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
        <h2 className="font-black text-slate-900 dark:text-white mb-4">Reviews Given</h2>
        <div className="text-center py-8 text-slate-400">
          <Star className="size-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-bold">No reviews given yet</p>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
        <h2 className="font-black text-slate-900 dark:text-white mb-4">Reviews Received</h2>
        <div className="text-center py-8 text-slate-400">
          <Star className="size-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-bold">No reviews received yet</p>
        </div>
      </div>
    </div>
  </div>
);

export default UserReviewsPage;
