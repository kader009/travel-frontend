'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import {
  Calendar as CalendarIcon,
  Utensils,
  Mountain,
  History,
  Palmtree,
  Music,
  MessageCircle,
  UserPlus,
  ArrowRight,
  Compass,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import {
  useGetMyTravelPlansQuery,
  useGetMatchedTravelPlansQuery,
} from '@/src/redux/store/api/endApi';
import { ITravelPlan } from '@/src/types/travelPlan';
import { useMemo } from 'react';

const UserOverviewPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { data: plansData, isLoading: plansLoading } =
    useGetMyTravelPlansQuery(undefined);

  const allPlans = (plansData?.data as ITravelPlan[]) || [];
  const upcomingTrips = allPlans
    .filter(
      (plan) =>
        new Date(plan.startDate).getTime() >= new Date().setHours(0, 0, 0, 0),
    )
    .sort(
      (planA, planB) =>
        new Date(planA.startDate).getTime() -
        new Date(planB.startDate).getTime(),
    );

  const displayTrips = upcomingTrips.slice(0, 2);

  // Get first upcoming trip for matching
  const firstTrip = upcomingTrips[0];
  const { data: matchesData, isLoading: matchesLoading } =
    useGetMatchedTravelPlansQuery(
      {
        destination: firstTrip?.destination,
        startDate: firstTrip?.startDate,
        endDate: firstTrip?.endDate,
        travelType: firstTrip?.travelType,
        limit: 10,
      },
      { skip: !firstTrip?.destination },
    );

  // Process matches to get unique travelers
  const processedMatches = useMemo(() => {
    if (!matchesData?.data) return [];

    const uniqueTravelers = new Map();
    matchesData.data.forEach((plan: ITravelPlan) => {
      const userId = typeof plan.user === 'string' ? plan.user : plan.user?._id;
      const userName =
        typeof plan.user === 'string' ? 'Traveler' : plan.user?.name;
      const userImage =
        typeof plan.user === 'string' ? undefined : plan.user?.image;

      // Skip if it's current user or already added
      if (userId !== user?._id && !uniqueTravelers.has(userId)) {
        // Calculate deterministic match percentage based on user ID
        const hashCode = (userId || '').split('').reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0);
        const matchPercentage = Math.abs(hashCode % 30) + 70;

        uniqueTravelers.set(userId, {
          _id: userId,
          name: userName,
          image: userImage,
          destination: plan.destination,
          matchPercentage,
        });
      }
    });

    return Array.from(uniqueTravelers.values()).slice(0, 5);
  }, [matchesData, user?._id]);

  return (
    <div className="flex-1 space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.name || 'Traveler'}!
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            {plansLoading
              ? 'Updating your agenda...'
              : `You have ${upcomingTrips.length} upcoming adventures and 5 new traveler matches.`}
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search and Notification button removed */}
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Column: Upcoming Trips */}
        <div className="xl:col-span-8 space-y-10">
          <section>
            <div className="flex justify-between items-end mb-6 px-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Upcoming Trips
              </h2>
              <Link
                className="text-primary font-black text-xs hover:underline uppercase tracking-widest"
                href="/dashboard/user/travel-plans"
              >
                View all trips
              </Link>
            </div>

            {plansLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-72 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse"
                  />
                ))}
              </div>
            ) : displayTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayTrips.map((trip) => {
                  const daysToTrip = Math.ceil(
                    (new Date(trip.startDate).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  );

                  return (
                    <Link
                      key={trip._id}
                      href="/dashboard/user/travel-plans"
                      className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 hover:border-primary/20 cursor-pointer block"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          fill
                          src={
                            trip.images?.[0] ||
                            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
                          }
                          alt={trip.destination}
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black rounded-full uppercase tracking-widest text-slate-900 dark:text-white border border-white/20">
                          {trip.travelType}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-black text-slate-900 dark:text-white truncate max-w-37.5 capitalize">
                            {trip.destination}
                          </h3>
                          <span
                            className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest border ${
                              daysToTrip <= 7
                                ? 'bg-rose-500/10 text-rose-500 border-rose-500/10'
                                : 'bg-primary/10 text-primary border-primary/10'
                            }`}
                          >
                            {daysToTrip === 0
                              ? 'Today'
                              : daysToTrip === 1
                                ? 'Tomorrow'
                                : `In ${daysToTrip} days`}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[10px] flex items-center gap-1.5 mb-5 font-black uppercase tracking-widest">
                          <CalendarIcon
                            className="size-3.5 text-primary"
                            strokeWidth={3}
                          />
                          {new Date(trip.startDate).toLocaleDateString(
                            undefined,
                            { month: 'short', day: 'numeric' },
                          )}{' '}
                          -{' '}
                          {new Date(trip.endDate).toLocaleDateString(
                            undefined,
                            { month: 'short', day: 'numeric', year: 'numeric' },
                          )}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[1, 2].map((i) => (
                              <div
                                key={i}
                                className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400"
                              >
                                <UserPlus className="size-3" />
                              </div>
                            ))}
                          </div>
                          <ArrowRight className="size-4 text-slate-300 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-12 text-center group hover:border-primary/30 transition-all">
                <div className="size-16 bg-white dark:bg-slate-900 rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Compass className="size-8 text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  No Expeditions Planned
                </h3>
                <p className="text-slate-400 text-xs font-bold mt-2 max-w-xs mx-auto mb-8">
                  Ready for a new adventure? Start planning your next journey
                  and find your buddy.
                </p>
                <Link
                  href="/dashboard/user/travel-plans"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-slate-900 font-black rounded-full text-[10px] uppercase tracking-widest hover:bg-opacity-90 active:scale-95 transition-all"
                >
                  Start Planning
                </Link>
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 px-1">
              Explore Destinations
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {[
                {
                  label: 'Foodie Tours',
                  icon: Utensils,
                  color: 'text-rose-500',
                },
                { label: 'Hiking', icon: Mountain, color: 'text-emerald-500' },
                { label: 'Culture', icon: History, color: 'text-amber-500' },
                { label: 'Relaxing', icon: Palmtree, color: 'text-primary' },
                { label: 'Nightlife', icon: Music, color: 'text-indigo-500' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="shrink-0 px-8 py-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm flex flex-col items-center gap-3 border-2 border-transparent hover:border-primary transition-all cursor-pointer group hover:scale-105 active:scale-95 shadow-primary/5"
                >
                  <item.icon
                    className={`${item.color} size-8 group-hover:scale-110 transition-transform`}
                    strokeWidth={2.5}
                  />
                  <span className="font-black text-xs uppercase tracking-tight text-slate-700 dark:text-slate-300">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Side Column: Matches & Activity */}
        <div className="xl:col-span-4 space-y-8">
          {/* Traveler Matches */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-7 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                New Matches
              </h2>
              <span className="size-7 bg-primary text-slate-900 text-xs font-black rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                {processedMatches.length}
              </span>
            </div>
            {matchesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            ) : processedMatches.length > 0 ? (
              <>
                <div className="space-y-6">
                  {processedMatches.map((match) => (
                    <Link
                      key={match._id}
                      href={`/profile/${match._id}`}
                      className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-3 rounded-2xl transition-colors"
                    >
                      <div className="relative">
                        <Image
                          alt={match.name || 'traveler'}
                          width={52}
                          height={52}
                          className="rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
                          src={
                            match.image ||
                            'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
                          }
                        />
                        <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-sm text-slate-900 dark:text-white truncate">
                          {match.name}
                        </h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
                          Matches {match.destination} ({match.matchPercentage}%)
                        </p>
                      </div>
                      <button className="size-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-all active:scale-90 cursor-pointer">
                        <MessageCircle className="size-5" />
                      </button>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/explore"
                  className="w-full mt-8 py-4 border-2 border-slate-50 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:border-primary/30 hover:text-primary transition-all text-xs uppercase tracking-widest cursor-pointer block text-center"
                >
                  See All Matches
                </Link>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  {firstTrip
                    ? 'No matches found for your trip'
                    : 'Plan a trip to see matches'}
                </p>
              </div>
            )}
          </section>

          {/* Recent Updates Section removed */}
        </div>
      </div>
    </div>
  );
};

export default UserOverviewPage;
