const AdminOverviewSkeleton = () => {
  return (
    <div className="animate-pulse fade-in duration-700">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <div className="h-9 w-64 bg-slate-200/50 dark:bg-background-dark rounded-lg mb-3" />
          <div className="h-4 w-80 bg-slate-200/50 dark:bg-background-dark rounded-md" />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-background-dark p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-2xl bg-slate-200/50 dark:bg-background-dark shrink-0" />
              <div className="h-6 w-16 bg-slate-200/50 dark:bg-background-dark rounded-lg" />
            </div>
            <div className="h-3 w-32 bg-slate-200/50 dark:bg-background-dark rounded-md mb-3" />
            <div className="h-8 w-24 bg-slate-200/50 dark:bg-background-dark rounded-xl" />
          </div>
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Area Chart Skeleton */}
        <div className="lg:col-span-2 bg-white dark:bg-background-dark p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm h-96">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="h-5 w-48 bg-slate-200/50 dark:bg-background-dark rounded-md mb-3" />
              <div className="h-3 w-36 bg-slate-200/50 dark:bg-background-dark rounded-sm" />
            </div>
            <div className="h-4 w-24 bg-slate-200/50 dark:bg-background-dark rounded-md" />
          </div>
          <div className="h-[200px] w-full bg-slate-200/30 dark:bg-background-dark rounded-2xl" />
        </div>

        {/* Popular Destinations Skeleton */}
        <div className="bg-white dark:bg-background-dark p-6 sm:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-start h-96">
          <div className="h-5 w-48 bg-slate-200/50 dark:bg-background-dark rounded-md mb-8" />
          <div className="space-y-6 w-full mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 w-full">
                <div className="size-12 rounded-xl bg-slate-200/50 dark:bg-background-dark shrink-0" />
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="h-3 w-28 bg-slate-200/50 dark:bg-background-dark rounded-md" />
                    <div className="h-3 w-8 bg-slate-200/50 dark:bg-background-dark rounded-md" />
                  </div>
                  <div className="w-full bg-slate-200/50 dark:bg-background-dark h-2 rounded-full overflow-hidden" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Registered Personnel Skeleton */}
      <div className="bg-white dark:bg-background-dark rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="h-5 w-56 bg-slate-200/50 dark:bg-background-dark rounded-md" />
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="size-9 rounded-full bg-slate-200/80 dark:bg-background-dark border-2 border-white dark:border-slate-900"
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4"
            >
              <div className="size-12 rounded-full bg-slate-200/50 dark:bg-background-dark shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-4 w-24 bg-slate-200/50 dark:bg-background-dark rounded-md mb-2.5" />
                <div className="h-3 w-32 bg-slate-200/50 dark:bg-background-dark rounded-sm" />
              </div>
              <div className="size-5 bg-slate-200/50 dark:bg-background-dark rounded-sm shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewSkeleton;
