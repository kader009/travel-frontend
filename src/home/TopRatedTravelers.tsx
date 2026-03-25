'use client';

import Image from 'next/image';
import Container from '../components/ui/Container';
import { Star, Loader2 } from 'lucide-react';
import { useGetAllReviewStatsQuery } from '@/src/redux/store/api/endApi';

const TopRatedTravelers = () => {
  const { data: reviewStatsData, isLoading } =
    useGetAllReviewStatsQuery(undefined);

  // Get top 3 rated travelers
  const topTravelers = (reviewStatsData?.data || [])
    .filter((stat) => stat.averageRating > 0)
    .sort((currentTravelerStat, nextTravelerStat) => {
      if (
        nextTravelerStat.averageRating !== currentTravelerStat.averageRating
      ) {
        return (
          nextTravelerStat.averageRating - currentTravelerStat.averageRating
        );
      }
      return nextTravelerStat.totalReviews - currentTravelerStat.totalReviews;
    })
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-12">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black lg:text-5xl">
              Top Rated Travelers
            </h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black lg:text-5xl">
            Top Rated Travelers
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Expert companions with high safety and experience ratings.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topTravelers.map((traveler) => (
            <div
              key={traveler.user._id}
              className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-xs transition-shadow hover:shadow-sm dark:border-slate-800 dark:bg-background-dark"
            >
              <div className="relative h-20 w-20 shrink-0">
                <Image
                  width={80}
                  height={80}
                  alt={`Profile of ${traveler.user.name}`}
                  className="h-full w-full rounded-full object-cover"
                  src={
                    traveler.user.image ||
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
                  }
                />
              </div>
              <div>
                <h4 className="text-lg font-bold">{traveler.user.name}</h4>
                <div className="flex items-center text-primary">
                  <Star className="w-4 h-4 fill-primary" />
                  <span className="text-sm font-bold ml-1">
                    {traveler.averageRating.toFixed(1)} ({traveler.totalReviews}{' '}
                    {traveler.totalReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {traveler.user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopRatedTravelers;
