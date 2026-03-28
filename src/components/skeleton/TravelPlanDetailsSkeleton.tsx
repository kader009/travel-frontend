import Container from '@/src/components/ui/Container';

const TravelPlanDetailsSkeleton = () => {
  return (
    <main className="min-h-screen py-10 animate-pulse">
      <Container>
        {/* Hero Skeleton */}
        <div className="relative h-[60vh] rounded-[3rem] bg-slate-100 dark:bg-slate-800 border border-primary/10 dark:border-primary/5 mb-10 overflow-hidden" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-16">
            {/* Intel Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 border border-primary/10 dark:border-primary/5" />
              <div className="h-48 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 border border-primary/10 dark:border-primary/5" />
            </div>

            {/* Briefing Skeleton */}
            <section className="space-y-8 px-4">
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
                <div className="h-6 w-48 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-full"></div>
                <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-5/6 mx-auto"></div>
              </div>
            </section>

            {/* Itinerary Skeleton */}
            <div className="space-y-6">
              <div className="h-10 w-64 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-white/5"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 h-[500px] rounded-[3rem] bg-slate-100 dark:bg-slate-800 border border-primary/10 dark:border-primary/5 p-8 space-y-8">
              <div className="h-10 bg-primary/20 rounded-full w-full"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-4/6"></div>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-24"></div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-lg w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section Skeleton */}
        <div className="mt-20 space-y-8">
          <div className="h-10 w-48 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-white/5"
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default TravelPlanDetailsSkeleton;
