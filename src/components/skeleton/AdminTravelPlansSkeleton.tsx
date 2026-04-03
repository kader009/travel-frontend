const AdminTravelPlansSkeleton = () => {
  return (
    <div className="overflow-x-auto w-full animate-pulse fade-in duration-500">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 dark:bg-background-dark">
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
              Destination
            </th>
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
              Creator
            </th>
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
              Date Range
            </th>
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
              Budget
            </th>
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="size-11 rounded-xl bg-slate-200/50 dark:bg-background-dark shrink-0" />
                  <div>
                    <div className="h-4 w-32 bg-slate-200/50 dark:bg-background-dark rounded mb-2" />
                    <div className="h-2 w-16 bg-slate-200/50 dark:bg-background-dark rounded" />
                  </div>
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                  <div className="size-3.5 rounded-full bg-slate-200/50 dark:bg-background-dark shrink-0" />
                  <div className="h-3 w-24 bg-slate-200/50 dark:bg-background-dark rounded" />
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                  <div className="size-3.5 rounded-sm bg-slate-200/50 dark:bg-background-dark shrink-0" />
                  <div className="h-3 w-28 bg-slate-200/50 dark:bg-background-dark rounded" />
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-1.5">
                  <div className="size-3.5 rounded-sm bg-slate-200/50 dark:bg-background-dark shrink-0" />
                  <div className="h-3 w-16 bg-slate-200/50 dark:bg-background-dark rounded" />
                </div>
              </td>
              <td className="px-8 py-5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="size-8 rounded-lg bg-slate-200/50 dark:bg-background-dark" />
                  <div className="size-8 rounded-lg bg-slate-200/50 dark:bg-background-dark" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTravelPlansSkeleton;
