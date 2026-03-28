'use client';

import { useState } from 'react';
import Container from '@/src/components/ui/Container';
import { useGetAllTravelPlansQuery } from '@/src/redux/store/api/endApi';
import { ITravelPlan } from '@/src/types/travelPlan';
import { IUser } from '@/src/types/user';
import {
  Calendar,
  ChevronDown,
  MapPin,
  Search,
  Star,
  Users,
  Compass,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TravelerCardSkeleton from '@/src/components/skeleton/TravelerCardSkeleton';

const ExplorePage = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelType, setTravelType] = useState('All');

  // Fetch all travel plans
  const {
    data: plansData,
    isLoading,
    isError,
  } = useGetAllTravelPlansQuery(undefined);

  let allPlans = (plansData?.data as ITravelPlan[]) || [];

  // Apply client-side filters
  if (destination || startDate || endDate || travelType !== 'All') {
    allPlans = allPlans.filter((plan) => {
      const matchDestination =
        !destination ||
        plan.destination.toLowerCase().includes(destination.toLowerCase());

      const matchStartDate =
        !startDate || new Date(plan.startDate) >= new Date(startDate);

      const matchEndDate =
        !endDate || new Date(plan.endDate) <= new Date(endDate);

      const matchTravelType =
        travelType === 'All' || plan.travelType === travelType;

      return (
        matchDestination && matchStartDate && matchEndDate && matchTravelType
      );
    });
  }

  // Group plans by user to find unique travelers
  const travelerMap = new Map<string, { user: IUser; nextPlan: ITravelPlan }>();

  allPlans.forEach((plan) => {
    // Skip if user is missing, or if the plan has already ended.
    const isPastPlan = plan.endDate
      ? new Date(plan.endDate) < new Date()
      : false;
    const userObj = plan.user;

    if (userObj && typeof userObj !== 'string' && userObj._id && !isPastPlan) {
      // Only add or update if it's the latest plan (upcoming)
      const existing = travelerMap.get(userObj._id);
      if (
        !existing ||
        new Date(plan.startDate) > new Date(existing.nextPlan.startDate)
      ) {
        travelerMap.set(userObj._id, { user: userObj, nextPlan: plan });
      }
    }
  });

  const travelers = Array.from(travelerMap.values());

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-10">
      <Container>
        {/* Search & Filter Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
              Explore Travelers
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
              Connect with {isLoading ? '...' : travelers.length} explorers
              sharing their journeys.
            </p>
          </div>

          {/* Horizontal Search Bar */}
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row gap-2">
            <div className="flex-1 flex items-center px-6 py-4 gap-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
              <MapPin className="text-primary w-5 h-5" />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                  Destination
                </span>
                <input
                  className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white placeholder:text-slate-400 font-bold text-lg"
                  placeholder="Where to?"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 lg:flex-initial flex flex-col sm:flex-row gap-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
              <div className="flex items-center px-6 py-4 gap-4 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 flex-1 cursor-pointer group/date">
                <Calendar className="text-primary w-5 h-5 shrink-0" />
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                    Start Date
                  </span>
                  <input
                    className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white font-bold text-lg cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onClick={(e) =>
                      (e.target as HTMLInputElement).showPicker?.()
                    }
                  />
                </div>
              </div>
              <div className="flex items-center px-6 py-4 gap-4 flex-1 cursor-pointer group/date">
                <Calendar className="text-primary w-5 h-5 shrink-0" />
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                    End Date
                  </span>
                  <input
                    className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white font-bold text-lg cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onClick={(e) =>
                      (e.target as HTMLInputElement).showPicker?.()
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center px-6 py-4 gap-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 focus-within:border-primary/50 transition-colors">
              <Users className="text-primary w-5 h-5" />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                  Travel Type
                </span>
                <select
                  className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white font-bold text-lg appearance-none cursor-pointer"
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Solo">Solo</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Couple">Couple</option>
                  <option value="Alone">Alone</option>
                </select>
              </div>
            </div>
            <div className="lg:w-auto p-1">
              <button
                type="button"
                className="w-full lg:w-16 h-16 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-xl flex items-center justify-center transition-all group cursor-pointer hover:scale-105 active:scale-95"
                title="Search filters apply automatically"
              >
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <TravelerCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-24 text-center bg-rose-500/10 border border-rose-500/20 rounded-[3rem] p-12">
            <p className="text-rose-500 font-black uppercase tracking-widest text-xs">
              Failed to retrieve traveler uplink. Please retry later.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && travelers.length === 0 && (
          <div className="py-32 text-center">
            <Compass className="size-20 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              No Travelers Detected
            </h3>
            <p className="text-slate-500 font-bold mt-2">
              The explorer network is currently silent. Be the first to start a
              journey!
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && !isError && travelers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {travelers.map(({ user, nextPlan }) => (
              <div
                key={user._id}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-700"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    alt={user.name}
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    fill
                    src={
                      user.image ||
                      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop'
                    }
                  />
                  <div className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/20">
                    <Star className="text-primary w-4 h-4 fill-primary" />
                    <span className="text-[10px] font-black text-slate-900 dark:text-white">
                      4.9
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
                      {user.name}
                    </h3>
                    {/* Location field removed as per user request */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-bold line-clamp-2">
                      {user.bio ||
                        'Explorer seeking new horizons and sharing global experiences.'}{' '}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.travelInterests
                      ?.slice(0, 3)
                      .map((interestTag, interestIndex) => (
                        <span
                          key={interestIndex}
                          className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[9px] font-black rounded-full uppercase tracking-widest border border-slate-100 dark:border-slate-800"
                        >
                          {interestTag}
                        </span>
                      )) ||
                      ['Hiking', 'Photography'].map(
                        (interestTag, interestIndex) => (
                          <span
                            key={interestIndex}
                            className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[9px] font-black rounded-full uppercase tracking-widest border border-slate-100 dark:border-slate-800"
                          >
                            {interestTag}
                          </span>
                        ),
                      )}
                  </div>
                  <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      Current Objective
                    </p>
                    <div className="flex flex-col gap-1 mb-4">
                      <span className="text-base font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                        {nextPlan.destination}
                      </span>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                        {new Date(nextPlan.startDate).toLocaleDateString(
                          'en-US',
                          { month: 'short', day: 'numeric' },
                        )}{' '}
                        —{' '}
                        {new Date(nextPlan.endDate).toLocaleDateString(
                          'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' },
                        )}
                      </span>
                    </div>
                    <Link
                      href={`/travel-plans/${nextPlan._id}`}
                      className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all cursor-pointer active:scale-95 flex items-center justify-center hover:bg-primary hover:text-slate-900"
                    >
                      Intercept Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {!isLoading && !isError && travelers.length > 4 && (
          <div className="mt-20 flex flex-col items-center">
            <button className="px-12 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-full font-black text-[10px] uppercase tracking-[0.3em] text-slate-900 dark:text-white hover:border-primary hover:text-primary hover:scale-105 transition-all flex items-center gap-4 cursor-pointer active:scale-95 shadow-2xl">
              Load More Explorers
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </Container>
    </main>
  );
};

export default ExplorePage;
