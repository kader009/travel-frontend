'use client';

import { useState } from 'react';
import Container from '@/src/components/ui/Container';
import { useGetAllTravelPlansQuery } from '@/src/redux/store/api/endApi';
import { ITravelPlan } from '@/src/types/travelPlan';
import {
  Calendar,
  DollarSign,
  Edit2,
  Eye,
  Plus,
  Compass,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CreateTravelPlanModal from '@/src/components/module/dashboard/CreateTravelPlanModal';
import { useAppSelector } from '@/src/redux/hook';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import TravelPlanSkeleton from '@/src/components/skeleton/TravelPlanSkeleton';

const TravelPlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: plansData, isLoading, isError } = useGetAllTravelPlansQuery();
  const plans = (plansData?.data as ITravelPlan[]) || [];
  
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  const handleCreatePlanClick = () => {
    if (!user) {
      toast.error('Authentication Required', {
        description: 'Please login to create a travel plan.',
        action: {
          label: 'Login',
          onClick: () => router.push('/login'),
        },
      });
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen py-10 bg-background-light dark:bg-background-dark">
      <Container>
        <section className="flex flex-col gap-8">
          {/* Header Area */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight uppercase">
                Global Expeditions
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-bold">
                {isLoading
                  ? 'Scanning horizons...'
                  : `Discover ${plans.length} journeys shared by the community`}
              </p>
            </div>
            <button
              onClick={handleCreatePlanClick}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              <span>Create Plan</span>
            </button>
          </div>

          {/* Loading Skeleton Grid */}
          {isLoading && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <TravelPlanSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-4xl text-center">
              <p className="text-rose-500 font-black uppercase tracking-widest text-xs">
                Failed to fetch expeditions. Please check your link.
              </p>
            </div>
          )}

          {/* Plan Cards Grid */}
          {!isLoading && plans.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden bg-white dark:bg-background-dark border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:shadow-2xl transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  {/* Image Container */}
                  <div className="w-full md:w-72 h-72 md:h-auto relative overflow-hidden shrink-0">
                    <Image
                      alt={plan.destination}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      src={
                        plan.images?.[0] ||
                        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
                      }
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 dark:bg-background-dark backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-slate-100/20">
                        {plan.travelType}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-8 flex flex-col justify-between gap-6">
                    <div>
                      <h3 className="text-slate-900 dark:text-white text-2xl font-black group-hover:text-primary transition-colors tracking-tight capitalize">
                        {plan.destination}
                      </h3>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                          <div className="size-8 rounded-xl bg-slate-50 dark:bg-background-dark flex items-center justify-center">
                            <Calendar className="w-4 h-4 opacity-70" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-tight">
                            {new Date(plan.startDate).toLocaleDateString('en-US')} -{' '}
                            {new Date(plan.endDate).toLocaleDateString('en-US')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                          <div className="size-8 rounded-xl bg-slate-50 dark:bg-background-dark flex items-center justify-center">
                            <DollarSign className="w-4 h-4 opacity-70" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-tight">
                            Budget:{' '}
                            <span className="text-slate-900 dark:text-white">
                              ${plan.budget?.min} - ${plan.budget?.max}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        href={`/travel-plans/${plan._id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer active:scale-95"
                      >
                        <Eye className="w-4 h-4" strokeWidth={3} />
                        Explore
                      </Link>
                      <Link
                        href={`/dashboard/user/travel-plan`}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer active:scale-95"
                      >
                        <Edit2 className="w-4 h-4" />
                        Manage
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="py-24 text-center">
                <Compass className="size-16 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Horizon is Empty
                </h3>
                <p className="text-slate-400 text-sm font-bold mt-2">
                  No expeditions have been shared yet. Be the first one!
                </p>
              </div>
            )
          )}
        </section>
      </Container>

      {/* Create Plan Modal */}
      <CreateTravelPlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
};

export default TravelPlans;
