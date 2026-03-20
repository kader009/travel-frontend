'use client';

import React, { useState } from 'react';
import { Map, Plus, Loader2 } from 'lucide-react';
import { useGetMyTravelPlansQuery } from '@/src/redux/store/api/endApi';
import CreateTravelPlanModal from '@/src/components/module/dashboard/CreateTravelPlanModal';
import TravelPlanCard from '@/src/components/module/dashboard/TravelPlanCard';
import { ITravelPlan } from '@/src/types/travelPlan';

const UserTravelPlansPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: plansData, isLoading } = useGetMyTravelPlansQuery({});

  const plans = plansData?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">My Travel Plans</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-bold">Manage your upcoming and past adventures.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-slate-900 font-black rounded-full text-[11px] uppercase tracking-widest hover:bg-opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="size-4" strokeWidth={3} /> Add Plan
        </button>
      </div>

      <CreateTravelPlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="size-10 text-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Retrieving travel logs...</p>
        </div>
      ) : plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan: ITravelPlan) => (
            <TravelPlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-16 text-center shadow-sm">
          <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Map className="size-8 text-slate-300 dark:text-slate-600" />
          </div>
          <h2 className="font-black text-slate-900 dark:text-white text-xl uppercase tracking-tight">No Expeditions Found</h2>
          <p className="text-slate-400 text-sm mt-2 font-bold max-w-xs mx-auto">
            Your travel history is currently blank. Start by creating your first journey to explore the world.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserTravelPlansPage;
