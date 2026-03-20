'use client';

import React from 'react';
import Image from 'next/image';
import { ITravelPlan } from '@/src/types/travelPlan';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Navigation, 
  DollarSign, 
  FileText
} from 'lucide-react';

interface TravelPlanCardProps {
  plan: ITravelPlan;
}

const TravelPlanCard: React.FC<TravelPlanCardProps> = ({ plan }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden group">
      {/* Image Swiper / Preview */}
      <div className="relative aspect-16/10 overflow-hidden">
        {plan.images && plan.images.length > 0 ? (
          <Image 
            src={plan.images[0]} 
            alt={plan.destination} 
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <MapPin className="size-12 text-slate-300 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-white/20">
            {plan.travelType}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-950/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <h3 className="text-white font-black text-lg leading-tight uppercase tracking-tight">{plan.destination}</h3>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
              <Calendar className="size-3 text-primary" strokeWidth={3} /> {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="size-4" strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase leading-none">Budget Range</span>
              <span className="text-xs font-black text-slate-900 dark:text-white mt-0.5">
                 ৳{plan.budget.min.toLocaleString()} - ৳{plan.budget.max.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
              <Navigation className="size-4" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase leading-none">Coordinates</span>
              <span className="text-xs font-black text-slate-900 dark:text-white mt-0.5 font-mono">
                {plan.coordinates.lat.toFixed(2)}, {plan.coordinates.lng.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <FileText className="size-3.5" strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">Description</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold leading-relaxed line-clamp-3">
            {plan.description}
          </p>
        </div>

        {/* Tags / Meta */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
          {plan.itinerary.split('\n').slice(0, 2).map((line, idx) => (
             line.length > 5 && (
               <span key={idx} className="px-3 py-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-[9px] font-black uppercase text-slate-400 tracking-tight border border-slate-100 dark:border-slate-800 truncate max-w-[120px]">
                 {line}
               </span>
             )
          ))}
          <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-[9px] font-black uppercase text-primary tracking-tight ml-auto">
            {plan.images.length} Photos
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanCard;
