const TravelerCardSkeleton = () => {
  return (
    <div className="group bg-white dark:bg-background-dark rounded-[2.5rem] border border-primary/10 dark:border-primary/5 overflow-hidden flex flex-col animate-pulse">
      {/* Profile Image Skeleton */}
      <div className="relative h-72 overflow-hidden bg-slate-200/50 dark:bg-background-dark" />

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          {/* Name Skeleton */}
          <div className="h-7 w-3/4 bg-slate-200/50 dark:bg-background-dark rounded-xl mb-3" />
          {/* Bio Skeleton */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-100/50 dark:bg-background-dark rounded-lg" />
            <div className="h-3 w-5/6 bg-slate-100/50 dark:bg-background-dark rounded-lg" />
          </div>
        </div>

        {/* Interests Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="px-4 py-3 w-16 bg-slate-100 dark:bg-background-dark rounded-full border border-slate-100 dark:border-slate-800"
            />
          ))}
        </div>

        {/* Action & Objective Skeleton */}
        <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800/50">
          <div className="h-3 w-24 bg-slate-100 dark:bg-background-dark rounded-lg mb-3" />
          <div className="flex flex-col gap-2 mb-4">
            <div className="h-5 w-40 bg-slate-100 dark:bg-background-dark rounded-lg" />
            <div className="h-3 w-32 bg-slate-100 dark:bg-background-dark rounded-lg" />
          </div>
          {/* Button Skeleton */}
          <div className="w-full h-12 bg-slate-900/10 dark:bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default TravelerCardSkeleton;
