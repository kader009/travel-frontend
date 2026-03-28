import Image from 'next/image';
import Container from '../components/ui/Container';
import { Star } from 'lucide-react';
import { IApiResponse } from '@/src/types/dashboard';
import { IUserReviewStats } from '@/src/types/review';

const TopRatedTravelers = async () => {
  let topTravelers: IUserReviewStats[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/v1/reviews/all-stats`,
      {
        next: { revalidate: 3600 }, // Cache and revalidate every hour
      }
    );

    if (res.ok) {
      const reviewStatsData: IApiResponse<IUserReviewStats[]> = await res.json();
      const stats = reviewStatsData?.data || [];

      // Get top 3 rated travelers
      topTravelers = stats
        .filter((stat) => stat.averageRating > 0)
        .sort((currentTravelerStat, nextTravelerStat) => {
          if (nextTravelerStat.averageRating !== currentTravelerStat.averageRating) {
            return nextTravelerStat.averageRating - currentTravelerStat.averageRating;
          }
          return nextTravelerStat.totalReviews - currentTravelerStat.totalReviews;
        })
        .slice(0, 3);
    }
  } catch (error) {
    console.error('Error fetching top rated travelers:', error);
  }

  // Fallback if no travelers (empty list or error)
  if (topTravelers.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black lg:text-5xl">
            Top Rated Travelers
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Expert companions with high safety and experience ratings.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topTravelers.map((traveler) => (
            <div
              key={traveler.user._id}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-xs transition-shadow hover:shadow-sm dark:border-slate-800 dark:bg-background-dark"
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
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold truncate">{traveler.user.name}</h2>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-bold ml-1 text-primary-text">
                    {traveler.averageRating.toFixed(1)} ({traveler.totalReviews}{' '}
                    {traveler.totalReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 truncate">
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
