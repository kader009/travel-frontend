const AdminUsersSkeleton = () => {
  return (
    <div className="overflow-x-auto w-full animate-pulse fade-in duration-500">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 dark:bg-slate-800/50">
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">User</th>
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Email</th>
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Role</th>
            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="size-11 rounded-full bg-slate-200/50 dark:bg-slate-700 shrink-0" />
                  <div className="h-4 w-32 bg-slate-200/50 dark:bg-slate-700 rounded" />
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                  <div className="size-3.5 rounded-sm bg-slate-200/50 dark:bg-slate-700 shrink-0" />
                  <div className="h-3 w-40 bg-slate-200/50 dark:bg-slate-700 rounded" />
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="h-5 w-16 bg-slate-200/50 dark:bg-slate-700 rounded" />
              </td>
              <td className="px-8 py-5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="size-8 rounded-lg bg-slate-200/50 dark:bg-slate-700" />
                  <div className="size-8 rounded-lg bg-slate-200/50 dark:bg-slate-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersSkeleton;
