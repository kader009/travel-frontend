'use client';

import React, { useState } from 'react';
import { Map, Plus, Loader2, RefreshCcw, AlertCircle, Trash2 } from 'lucide-react';
import { useGetMyTravelPlansQuery, useDeleteTravelPlanMutation } from '@/src/redux/store/api/endApi';
import CreateTravelPlanModal from '@/src/components/module/dashboard/CreateTravelPlanModal';
import EditTravelPlanModal from '@/src/components/module/dashboard/EditTravelPlanModal';
import TravelPlanCard from '@/src/components/module/dashboard/TravelPlanCard';
import { ITravelPlan } from '@/src/types/travelPlan';
import { toast } from 'sonner';

const UserTravelPlansPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ITravelPlan | null>(null);

  const { data: plansData, isLoading, isFetching, isError, refetch } = useGetMyTravelPlansQuery(undefined);
  const [deleteTravelPlan] = useDeleteTravelPlanMutation();
  const plans = (plansData?.data as ITravelPlan[]) || [];

  const handleEdit = (plan: ITravelPlan) => {
    setEditingPlan(plan);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    toast(
      <div className="flex flex-col gap-2 p-1">
        <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter flex items-center gap-2">
          <Trash2 className="size-4 text-rose-500" strokeWidth={3} /> Delete Expedition?
        </p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
          This will permanently remove this journey from your records.
        </p>
      </div>,
      {
        duration: 5000,
        action: {
          label: 'Delete Log',
          onClick: async () => {
            try {
              const response = await deleteTravelPlan(id).unwrap();
              if (response.success) {
                toast.success('Travel plan deleted successfully.');
              }
            } catch (error: any) {
              toast.error(error?.data?.message || 'Failed to delete travel plan.');
            }
          },
        },
        cancel: { label: 'Keep Log', onClick: () => {} },
      },
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">My Travel Plans</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold truncate max-w-[200px] sm:max-w-none">Manage your upcoming and past adventures.</span>
            {!isLoading && !isError && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md shrink-0">{plans.length} Logs</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => refetch()}
            disabled={isFetching || isLoading}
            className="flex items-center justify-center p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary rounded-full transition-all cursor-pointer active:scale-95 disabled:opacity-50 group"
            title="Refresh logs"
          >
            <RefreshCcw className={`size-4 ${isFetching ? 'animate-spin text-primary' : ''}`} strokeWidth={3} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-slate-900 font-black rounded-full text-[11px] uppercase tracking-widest hover:bg-opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="size-4" strokeWidth={3} /> Add Plan
          </button>
        </div>
      </div>

      <CreateTravelPlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <EditTravelPlanModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        plan={editingPlan}
      />

      {isError ? (
        <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 p-20 rounded-[2.5rem] text-center shadow-sm">
          <div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-6 text-rose-500">
            <AlertCircle className="size-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Error Retrieving logs</h2>
          <p className="text-slate-400 text-sm mt-2 font-bold max-w-xs mx-auto mb-8">
            We're having trouble connecting to your expedition database.
          </p>
          <button 
            onClick={() => refetch()} 
            className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-full text-[11px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            Try Again
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="size-10 text-primary animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Retrieving travel logs...</p>
        </div>
      ) : plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan: ITravelPlan, idx: number) => (
            <TravelPlanCard 
              key={plan._id || idx} 
              plan={plan} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
