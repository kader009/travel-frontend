import { Info, DollarSign } from 'lucide-react';
import { ITravelPlan } from '@/src/types/travelPlan';
import { MissionIntelProps } from '@/src/types/props';

export const MissionIntel = ({ trip, isPastPlan }: MissionIntelProps) => (
  <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all">
    <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
      <Info className="size-6 text-primary" strokeWidth={3} />
    </div>
    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">
      Mission Intel
    </h2>
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-slate-50 dark:border-slate-800 pb-4">
        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          Temporal Frame
        </span>
        <span className="font-black text-slate-900 dark:text-blue-50">
          {new Date(trip.startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}{' '}
          —{' '}
          {new Date(trip.endDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className="flex justify-between items-end border-b border-slate-50 dark:border-slate-800 pb-4">
        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          Operation Status
        </span>
        {isPastPlan ? (
          <span className="font-black text-slate-500 uppercase tracking-widest text-xs flex items-center gap-2">
            <div className="size-2 bg-slate-500 rounded-full"></div> Completed
          </span>
        ) : (
          <span className="font-black text-emerald-500 uppercase tracking-widest text-xs flex items-center gap-2">
            <div className="size-2 bg-emerald-500 rounded-full animate-ping"></div>{' '}
            Active
          </span>
        )}
      </div>
    </div>
  </section>
);

export const BudgetCard = ({ trip }: { trip: ITravelPlan }) => (
  <section className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
      <DollarSign className="size-64" />
    </div>
    <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
      <DollarSign className="size-6 text-primary" strokeWidth={3} />
    </div>
    <h2 className="text-xl font-black uppercase tracking-tight mb-8">
      Budget Range
    </h2>
    <div className="text-5xl font-black tracking-tighter mb-2">
      ${trip.budget?.min} — ${trip.budget?.max}
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
      Estimated Resource Load
    </p>
  </section>
);
