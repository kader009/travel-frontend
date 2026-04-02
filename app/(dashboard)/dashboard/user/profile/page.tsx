'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/src/redux/store/store';
import {
  CheckCircle,
  MapPin,
  Edit,
  Target,
  Calendar,
  Globe,
  Star,
  UserCircle,
  Compass,
  MessageSquare,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import EditProfileModal from '@/src/components/module/dashboard/EditProfileModal';
import {
  useGetMyTravelPlansQuery,
  useGetReviewsReceivedQuery,
} from '@/src/redux/store/api/endApi';
import { IReview } from '@/src/types/review';
import { IUser } from '@/src/types/user';
import Link from 'next/link';
import { UpcomingPlansProfileSkeleton, CompletedPlansProfileSkeleton, ReviewsProfileSkeleton } from '@/src/components/skeleton/UserProfileSkeleton';

const UserProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: plansData, isLoading: plansLoading } =
    useGetMyTravelPlansQuery();

  // Fetch reviews received by the current user
  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetReviewsReceivedQuery();

  const reviews = useMemo(() => reviewsData?.data || [], [reviewsData]);
  const totalReviews = reviews.length;
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return +(sum / reviews.length).toFixed(1);
  }, [reviews]);

  const myPlans = plansData?.data || [];
  const upcomingPlans = [...myPlans]
    .filter((plan) => new Date(plan.startDate) >= new Date())
    .sort(
      (planA, planB) =>
        new Date(planA.startDate).getTime() -
        new Date(planB.startDate).getTime(),
    );

  // Get completed plans for "Recently Visited"
  const completedPlans = [...myPlans]
    .filter((plan) => new Date(plan.endDate) < new Date())
    .sort(
      (planA, planB) =>
        new Date(planB.endDate).getTime() - new Date(planA.endDate).getTime(),
    )
    .slice(0, 4); // Show last 4 completed trips

  const getReviewer = (review: IReview): IUser | null => {
    if (typeof review.reviewer === 'string') return null;
    return review.reviewer as IUser;
  };

  const getRelativeTime = (dateStr?: string) => {
    if (!dateStr) return '';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths < 12) return `${diffMonths} months ago`;
    const diffYears = Math.floor(diffMonths / 12);
    return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
  };

  return (
    <>
      <EditProfileModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <main className="max-w-7xl mx-auto w-full px-0 sm:px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Section */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="relative mb-6">
              <div className="size-32 rounded-full overflow-hidden border-4 border-primary bg-primary/10 flex items-center justify-center relative">
                {user?.image ? (
                  <Image
                    alt={user.name || 'Profile'}
                    fill
                    className="object-cover"
                    src={user.image}
                  />
                ) : (
                  <UserCircle
                    className="size-20 text-primary"
                    strokeWidth={1}
                  />
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-primary size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm">
                <CheckCircle
                  className="size-4 text-slate-900 fill-primary"
                  strokeWidth={3}
                />
              </div>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {user?.name || 'Traveler'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 justify-center">
              <MapPin className="size-4 text-primary" />{' '}
              {user?.currentLocation || 'Lisbon, Portugal'}
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-semibold">
              {user?.bio ||
                'Digital Nomad & Adventure Seeker. On a mission to explore every hidden waterfall in the world'}
            </p>
            <div className="grid grid-cols-3 w-full mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight">
                  {user?.visitedCountries?.length || '0'}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  Countries
                </span>
              </div>
              <div className="flex flex-col border-x border-slate-100 dark:border-slate-800">
                <span className="text-lg font-black tracking-tight">
                  {myPlans.length}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  Plans
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight">
                  {averageRating > 0 ? averageRating.toFixed(1) : '—'}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  Rating
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-8 bg-primary hover:bg-opacity-90 text-slate-900 font-black py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Edit className="size-4" strokeWidth={3} /> Edit Profile
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
              <Target className="size-5 text-primary" strokeWidth={3} /> Travel
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {(user?.travelInterests?.length
                ? user.travelInterests
                : [
                    'Solo Travel',
                    'Hiking',
                    'Street Photography',
                    'Local Cuisine',
                    'Sustainable Travel',
                    'Beach Life',
                  ]
              ).map((interest) => (
                <span
                  key={interest}
                  className="px-3.5 py-1.5 bg-primary/10 text-slate-700 dark:text-slate-300 rounded-full text-[11px] font-black uppercase tracking-tight border border-primary/5"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
                <Calendar className="size-5 text-primary" strokeWidth={3} />{' '}
                Upcoming Plans
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {plansLoading ? (
                <UpcomingPlansProfileSkeleton />
              ) : upcomingPlans.length > 0 ? (
                upcomingPlans.map((plan) => (
                  <Link
                    key={plan._id}
                    href={`/travel-plans/${plan._id}`}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex gap-5 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group"
                  >
                    <div className="size-16 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 relative">
                      <Image
                        alt={plan.destination}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        src={
                          plan.images?.[0] ||
                          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
                        }
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-black text-slate-900 dark:text-white leading-tight capitalize">
                        {plan.destination}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase">
                        {new Date(plan.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        -{' '}
                        {new Date(plan.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <span className="text-[10px] font-black text-primary mt-2.5 uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded w-fit border border-primary/10">
                        {plan.travelType}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                  <Compass className="size-12 text-slate-200 dark:text-slate-800 mb-4" />
                  <p className="text-slate-500 font-bold max-w-xs px-4">
                    No upcoming adventures planned yet. Start your next journey
                    today!
                  </p>
                  <Link
                    href="/explore"
                    className="mt-4 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                  >
                    Find Buddies
                  </Link>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight px-1">
              <Globe className="size-5 text-primary" strokeWidth={3} /> Recently
              Visited
            </h3>
            {plansLoading ? (
              <CompletedPlansProfileSkeleton />
            ) : completedPlans.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1">
                {completedPlans.map((plan) => (
                  <Link
                    key={plan._id}
                    href={`/travel-plans/${plan._id}`}
                    className="flex flex-col gap-2 group cursor-pointer"
                  >
                    <div className="aspect-4/3 rounded-2xl overflow-hidden relative border border-slate-100 dark:border-slate-800 shadow-sm">
                      <Image
                        alt={plan.destination}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        src={
                          plan.images?.[0] ||
                          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
                        }
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                      <span className="absolute bottom-2 left-3 text-white font-black text-[10px] tracking-widest uppercase">
                        {plan.destination}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed px-1">
                <Compass className="size-12 text-slate-200 dark:text-slate-800 mb-4" />
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  No Completed Trips Yet
                </h4>
                <p className="text-slate-500 font-bold mt-2 max-w-xs">
                  Your visited destinations will appear here once you complete a
                  journey.
                </p>
              </div>
            )}
          </section>

          {/* Dynamic Reviews Section */}
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
                <Star className="size-5 text-primary" strokeWidth={3} /> Reviews
                ({totalReviews})
              </h3>
              {totalReviews > 0 && (
                <div className="flex items-center gap-1 text-primary">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <Star
                      key={starIndex}
                      className={`size-3.5 ${
                        starIndex <= Math.round(averageRating)
                          ? 'fill-primary text-primary'
                          : 'text-slate-200 dark:text-slate-700'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-black ml-1 text-slate-900 dark:text-white font-mono">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5 px-1">
              {reviewsLoading ? (
                <ReviewsProfileSkeleton />
              ) : reviews.length > 0 ? (
                reviews.map((review: IReview) => {
                  const reviewer = getReviewer(review);
                  return (
                    <div
                      key={review._id}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="size-11 rounded-full overflow-hidden bg-slate-200 border-2 border-primary/10 relative flex items-center justify-center">
                          {reviewer?.image ? (
                            <Image
                              alt={reviewer.name || 'Reviewer'}
                              fill
                              className="object-cover"
                              src={reviewer.image}
                            />
                          ) : (
                            <span className="text-lg font-black text-slate-400">
                              {reviewer?.name?.charAt(0)?.toUpperCase() || '?'}
                            </span>
                          )}
                        </div>
                        <div>
                          <h5 className="font-black text-slate-900 dark:text-white text-[15px]">
                            {reviewer?.name || 'Anonymous Traveler'}
                          </h5>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                            {getRelativeTime(review.createdAt)}
                          </p>
                        </div>
                        <div className="ml-auto flex gap-0.5 text-primary">
                          {[1, 2, 3, 4, 5].map((starRating) => (
                            <Star
                              key={starRating}
                              className={`size-3 ${
                                starRating <= review.rating
                                  ? 'fill-primary text-primary'
                                  : 'text-slate-200 dark:text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-bold">
                        {review.comment}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                  <MessageSquare className="size-12 text-slate-200 dark:text-slate-800 mb-4" />
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    No Reviews Yet
                  </h4>
                  <p className="text-slate-500 font-bold mt-2 max-w-xs">
                    Reviews from fellow travelers will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserProfilePage;
