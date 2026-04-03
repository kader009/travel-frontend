export const ReviewUsersListSkeleton = () => {
  return (
    <div className="space-y-2 max-h-100 pr-2 w-full animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="w-full flex items-center gap-3 p-3 rounded-2xl">
          <div className="size-8 rounded-full bg-slate-200/50 dark:bg-background-dark shrink-0" />
          <div className="min-w-0 w-full animate-pulse">
            <div className="h-3 w-32 bg-slate-200/50 dark:bg-background-dark rounded mb-1" />
            <div className="h-2 w-24 bg-slate-200/50 dark:bg-background-dark rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ReviewListSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse fade-in duration-500 w-full">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white dark:bg-background-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 w-40">
            <div className="size-10 rounded-xl bg-slate-200/50 dark:bg-background-dark shrink-0" />
            <div className="w-full">
              <div className="h-2 w-16 bg-slate-200/50 dark:bg-background-dark rounded mb-2" />
              <div className="h-5 w-10 bg-slate-200/50 dark:bg-background-dark rounded" />
            </div>
          </div>
        </div>
        <div className="h-3 w-32 bg-slate-200/50 dark:bg-background-dark rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-background-dark border border-slate-100 dark:border-slate-800 p-6 rounded-4xl shadow-sm h-48 w-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3 items-center w-full">
                <div className="size-10 rounded-full bg-slate-200/50 dark:bg-background-dark shrink-0" />
                <div className="w-full">
                  <div className="h-3 w-24 bg-slate-200/50 dark:bg-background-dark rounded mb-2" />
                  <div className="h-2 w-16 bg-slate-200/50 dark:bg-background-dark rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="size-8 rounded-lg bg-slate-200/50 dark:bg-background-dark" />
                <div className="size-8 rounded-lg bg-slate-200/50 dark:bg-background-dark" />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="h-2 w-full bg-slate-200/50 dark:bg-background-dark rounded" />
              <div className="h-2 w-5/6 bg-slate-200/50 dark:bg-background-dark rounded" />
              <div className="h-2 w-4/6 bg-slate-200/50 dark:bg-background-dark rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
