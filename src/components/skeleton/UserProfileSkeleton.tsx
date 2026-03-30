export const UpcomingPlansProfileSkeleton = () => {
  return (
    <>
      {[1, 2].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex gap-5 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse fade-in duration-500">
          <div className="size-16 rounded-xl bg-slate-200/50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-800" />
          <div className="flex flex-col justify-center w-full space-y-2">
            <div className="h-4 w-32 bg-slate-200/50 dark:bg-slate-800 rounded" />
            <div className="h-2 w-24 bg-slate-200/50 dark:bg-slate-800 rounded" />
            <div className="h-4 w-16 bg-primary/20 dark:bg-primary/10 rounded mt-1" />
          </div>
        </div>
      ))}
    </>
  );
};

export const CompletedPlansProfileSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1 w-full animate-pulse fade-in duration-500">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="aspect-4/3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm bg-slate-200/50 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
};

export const ReviewsProfileSkeleton = () => {
  return (
    <>
      {[1, 2].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse fade-in duration-500">
          <div className="flex items-center gap-3 mb-5">
            <div className="size-11 rounded-full bg-slate-200/50 dark:bg-slate-800 border-2 border-primary/10 shrink-0" />
            <div className="space-y-2 flex-1 min-w-0">
              <div className="h-3 w-32 bg-slate-200/50 dark:bg-slate-800 rounded" />
              <div className="h-2 w-20 bg-slate-200/50 dark:bg-slate-800 rounded" />
            </div>
            <div className="ml-auto flex gap-1">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="size-3 rounded-full bg-slate-200/50 dark:bg-slate-800" />
              ))}
            </div>
          </div>
          <div className="space-y-2.5">
             <div className="h-3 w-full bg-slate-200/50 dark:bg-slate-800 rounded" />
             <div className="h-3 w-5/6 bg-slate-200/50 dark:bg-slate-800 rounded" />
             <div className="h-3 w-3/4 bg-slate-200/50 dark:bg-slate-800 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};
