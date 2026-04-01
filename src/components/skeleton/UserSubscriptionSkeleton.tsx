export const UserSubscriptionSkeleton = () => {
  return (
    <div className="space-y-12 animate-pulse w-full">
      {/* Header Skeleton */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="h-12 w-80 bg-slate-200/50 dark:bg-slate-800 rounded-xl mx-auto" />
        <div className="h-4 w-full bg-slate-200/50 dark:bg-slate-800 rounded mx-auto" />
      </section>

      {/* Pricing Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 p-10 flex flex-col h-[600px]"
          >
            <div className="size-16 rounded-4xl bg-slate-200/50 dark:bg-slate-800 mb-8" />
            <div className="h-8 w-40 bg-slate-200/50 dark:bg-slate-800 rounded-lg mb-4" />
            <div className="h-10 w-32 bg-slate-200/50 dark:bg-slate-800 rounded-lg mb-8" />
            <div className="space-y-4 grow">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="size-5 rounded-full bg-slate-200/50 dark:bg-slate-800 shrink-0" />
                  <div className="h-3 w-48 bg-slate-200/50 dark:bg-slate-800 rounded" />
                </div>
              ))}
            </div>
            <div className="h-16 w-full bg-slate-200/50 dark:bg-slate-800 rounded-3xl mt-10" />
          </div>
        ))}
      </div>

      {/* Payment History Skeleton */}
      <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-slate-200/50 dark:bg-slate-800 shrink-0" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-slate-200/50 dark:bg-slate-800 rounded" />
              <div className="h-3 w-32 bg-slate-200/50 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="h-12 w-32 bg-slate-200/50 dark:bg-slate-800 rounded-2xl" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                {[1, 2, 3, 4, 5].map((i) => (
                  <th key={i} className="px-10 py-6">
                    <div className="h-3 w-20 bg-slate-200/50 dark:bg-slate-700 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  {[1, 2, 3, 4, 5].map((j) => (
                    <td key={j} className="px-10 py-6">
                      <div className="h-4 w-24 bg-slate-100/50 dark:bg-slate-800/50 rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
