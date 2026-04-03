const TravelPlanSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden bg-white dark:bg-background-dark border border-primary/10 dark:border-primary/5 transition-all w-full animate-pulse">
      {/* Image Container Skeleton */}
      <div className="w-full md:w-72 h-72 md:h-72 bg-slate-200/50 dark:bg-background-dark relative overflow-hidden shrink-0" />

      {/* Content Area Skeleton */}
      <div className="flex-1 p-8 flex flex-col justify-between gap-6 w-full">
        <div>
          {/* Title Skeleton */}
          <div className="h-8 bg-slate-200/50 dark:bg-background-dark rounded-xl w-3/4 mb-6" />

          {/* Info Lines Skeleton */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-slate-200/50 dark:bg-background-dark shrink-0" />
              <div className="h-3 bg-slate-200/50 dark:bg-background-dark rounded-lg w-1/2" />
            </div>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-slate-200/50 dark:bg-background-dark shrink-0" />
              <div className="h-3 bg-slate-200/50 dark:bg-background-dark rounded-lg w-1/3" />
            </div>
          </div>
        </div>

        {/* Actions Skeleton */}
        <div className="flex gap-3 mt-auto">
          <div className="flex-1 h-12 bg-primary/20 dark:bg-primary/10 rounded-full" />
          <div className="flex-1 h-12 bg-slate-100/30 dark:bg-background-dark rounded-full border border-slate-100 dark:border-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default TravelPlanSkeleton;
