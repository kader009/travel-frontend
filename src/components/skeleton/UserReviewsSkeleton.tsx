export const UserReviewsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse w-full">
      {/* Header Skeleton */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-slate-200/50 dark:bg-slate-800 rounded-xl" />
          <div className="h-4 w-80 bg-slate-200/50 dark:bg-slate-800 rounded-lg" />
        </div>
        <div className="h-16 w-48 bg-slate-200/50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800" />
      </header>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Analytics Column Skeleton */}
        <div className="space-y-6">
          <div className="h-64 w-full bg-slate-200/50 dark:bg-slate-800 rounded-[2.5rem]" />
          
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 space-y-6 shadow-sm">
            <div className="h-5 w-40 bg-slate-200/50 dark:bg-slate-800 rounded" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 w-full bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List Column Skeleton */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            {/* Tabs Skeleton */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 h-14">
              <div className="flex-1 bg-slate-50/50 dark:bg-slate-800/20" />
              <div className="flex-1 bg-slate-50/50 dark:bg-slate-800/20" />
            </div>

            {/* List Skeleton */}
            <div className="p-8 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center w-full">
                      <div className="size-12 rounded-full bg-slate-200/50 dark:bg-slate-800 shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-32 bg-slate-200/50 dark:bg-slate-800 rounded" />
                        <div className="h-2 w-24 bg-slate-200/50 dark:bg-slate-800 rounded" />
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((j) => (
                            <div key={j} className="size-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-15 space-y-2">
                    <div className="h-3 w-full bg-slate-200/50 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-4/5 bg-slate-200/50 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
