export const SentJoinRequestsSkeleton = () => {
  return (
    <div className="space-y-4 w-full animate-pulse fade-in duration-500">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-4xl flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm"
        >
          <div className="size-16 rounded-2xl bg-slate-200/50 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 min-w-0 w-full">
            <div className="h-4 w-48 bg-slate-200/50 dark:bg-slate-800 rounded mb-2" />
            <div className="h-3 w-full max-w-md bg-slate-200/50 dark:bg-slate-800 rounded" />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="h-10 w-24 rounded-full bg-slate-200/50 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ReceivedJoinRequestsSkeleton = () => {
  return (
    <div className="space-y-12 w-full animate-pulse fade-in duration-500">
      <div className="space-y-12">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-6 w-full">
            <div className="flex items-center gap-3 px-2">
              <div className="size-10 rounded-xl bg-slate-200/50 dark:bg-slate-800 shrink-0" />
              <div>
                <div className="h-3 w-32 bg-slate-200/50 dark:bg-slate-800 rounded mb-1.5" />
                <div className="h-2 w-16 bg-slate-200/50 dark:bg-slate-800 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col gap-5 shadow-sm w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-2xl bg-slate-200/50 dark:bg-slate-800 shrink-0" />
                    <div className="flex-1 w-full">
                      <div className="h-4 w-32 bg-slate-200/50 dark:bg-slate-800 rounded mb-2" />
                      <div className="h-2 w-24 bg-slate-200/50 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-3 w-full">
                    <div className="flex-1 h-12 rounded-xl bg-slate-200/50 dark:bg-slate-800" />
                    <div className="flex-1 h-12 rounded-xl bg-slate-200/50 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
