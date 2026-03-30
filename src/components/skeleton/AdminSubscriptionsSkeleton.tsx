export const AdminSubscriptionsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="h-8 w-64 bg-slate-200/50 dark:bg-slate-800 rounded-lg mb-2" />
          <div className="h-4 w-72 bg-slate-200/50 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="size-10 rounded-xl bg-slate-200/50 dark:bg-slate-800 shrink-0" />
          <div>
            <div className="h-3 w-20 bg-slate-200/50 dark:bg-slate-800 rounded-md mb-1" />
            <div className="h-5 w-24 bg-slate-200/50 dark:bg-slate-800 rounded-md" />
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
            <div className="size-14 rounded-2xl bg-slate-200/50 dark:bg-slate-800 shrink-0" />
            <div>
              <div className="h-3 w-24 bg-slate-200/50 dark:bg-slate-800 rounded-md mb-2" />
              <div className="h-6 w-16 bg-slate-200/50 dark:bg-slate-800 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="size-10 bg-slate-200/50 dark:bg-slate-800 rounded-xl shrink-0" />
          <div className="h-5 w-48 bg-slate-200/50 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-5"><div className="h-3 w-16 bg-slate-200/50 dark:bg-slate-700 rounded" /></th>
                <th className="px-8 py-5"><div className="h-3 w-24 bg-slate-200/50 dark:bg-slate-700 rounded" /></th>
                <th className="px-8 py-5"><div className="h-3 w-16 bg-slate-200/50 dark:bg-slate-700 rounded" /></th>
                <th className="px-8 py-5"><div className="h-3 w-16 bg-slate-200/50 dark:bg-slate-700 rounded" /></th>
                <th className="px-8 py-5"><div className="h-3 w-20 bg-slate-200/50 dark:bg-slate-700 rounded" /></th>
                <th className="px-8 py-5 text-right"><div className="h-3 w-16 bg-slate-200/50 dark:bg-slate-700 rounded ml-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-slate-200/50 dark:bg-slate-700 shrink-0" />
                      <div>
                        <div className="h-3 w-24 bg-slate-200/50 dark:bg-slate-700 rounded mb-1.5" />
                        <div className="h-2 w-32 bg-slate-200/50 dark:bg-slate-700 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-3 w-32 bg-slate-200/50 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-5 w-16 bg-slate-200/50 dark:bg-slate-700 rounded-lg" />
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-4 w-12 bg-slate-200/50 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-3 w-24 bg-slate-200/50 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="h-5 w-20 bg-slate-200/50 dark:bg-slate-700 rounded-lg ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionsSkeleton;
