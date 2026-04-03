export const UpcomingTripsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse fade-in duration-500">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-background-dark rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <div className="relative h-48 w-full bg-slate-200/50 dark:bg-background-dark">
            <div className="absolute top-4 right-4 px-3 py-2 bg-white/90 dark:bg-background-dark backdrop-blur-md rounded-full border border-white/20">
              <div className="w-12 h-2 bg-slate-300 dark:bg-background-dark rounded" />
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 w-3/5 bg-slate-200/50 dark:bg-background-dark rounded" />
              <div className="h-5 w-16 bg-slate-200/50 dark:bg-background-dark rounded-full" />
            </div>
            <div className="h-3 w-4/5 bg-slate-200/50 dark:bg-background-dark rounded mb-5" />
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2].map((j) => (
                  <div
                    key={j}
                    className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200/50 dark:bg-background-dark"
                  />
                ))}
              </div>
              <div className="size-4 rounded bg-slate-200/50 dark:bg-background-dark" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const NewMatchesSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse fade-in duration-500">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-slate-50 dark:bg-background-dark p-3 rounded-2xl"
        >
          <div className="relative">
            <div className="size-[52px] rounded-full bg-slate-200/50 dark:bg-background-dark border-2 border-primary/20" />
            <div className="absolute bottom-0 right-0 size-3.5 bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-4 w-24 bg-slate-200/50 dark:bg-background-dark rounded mb-1.5" />
            <div className="h-2 w-36 bg-slate-200/50 dark:bg-background-dark rounded" />
          </div>
          <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <div className="size-5 bg-primary/30 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
