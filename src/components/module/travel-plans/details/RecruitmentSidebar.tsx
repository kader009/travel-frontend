import Image from 'next/image';
import Link from 'next/link';
import { Users, Globe } from 'lucide-react';
import { RecruitmentSidebarProps } from '@/src/types/props';

const RecruitmentSidebar = ({
  trip,
  planCreator,
  currentUser,
  isPastPlan,
  hasAlreadyRequested,
  handleOpenModal,
}: RecruitmentSidebarProps) => {
  return (
    <div className="lg:col-span-4 space-y-10">
      {/* Recruitment Card */}
      <section className="bg-primary text-slate-900 p-12 rounded-[4rem] shadow-2xl shadow-primary/30 text-center sticky top-24 transform hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-900/10"></div>
        <div className="flex flex-col items-center mb-10">
          <h4 className="font-black uppercase tracking-[0.4em] text-[10px] mb-6 opacity-60">
            Travel Host
          </h4>
          <div className="relative size-32 rounded-full border-4 border-slate-900/10 overflow-hidden mb-6 shadow-2xl mx-auto">
            <Image
              src={planCreator?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop'}
              alt={planCreator?.name || 'Traveler'}
              fill
              sizes="(max-width: 768px) 100vw, 128px"
              className="object-cover"
              priority
            />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none mb-2">
            {planCreator?.name || 'Unknown Agent'}
          </h3>
          <p className="text-[10px] font-black text-slate-900/60 tracking-widest">
            {planCreator?.currentLocation || 'Dhaka, Bangladesh'}
          </p>
        </div>

        <div className="space-y-4 relative z-10">
          {currentUser && trip?.user?._id === currentUser?._id ? (
            <Link
              href="/dashboard/user/travel-plans"
              className="w-full py-6 bg-primary text-slate-900 rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-opacity-90 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              Manage Expedition
            </Link>
          ) : isPastPlan ? (
            <button
              disabled
              className="w-full py-6 bg-slate-800 text-slate-500 rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl cursor-not-allowed border border-slate-700/50"
            >
              Expedition Closed
            </button>
          ) : hasAlreadyRequested ? (
            <button
              disabled
              className="w-full py-6 bg-slate-600 text-white/70 rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl cursor-not-allowed"
            >
              ✓ Already Requested
            </button>
          ) : (
            <button
              onClick={handleOpenModal}
              className="w-full py-6 bg-slate-900 text-white rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            >
              Join Request
            </button>
          )}

          <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
            Verification Protocol Required
          </p>
        </div>

        <div className="mt-12 pt-10 border-t border-slate-900/10 flex flex-col items-center">
          <div className="flex -space-x-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="size-12 rounded-full border-4 border-primary bg-slate-900 flex items-center justify-center text-white font-black text-[10px] shadow-xl"
              >
                <Users className="size-4" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
            Verified Team Members
          </p>
        </div>
      </section>

      {/* Coordinates Log */}
      <section className="bg-white dark:bg-background-dark rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Globe className="size-4 text-primary" strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Navigational Log
          </span>
        </div>
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 dark:bg-background-dark rounded-3xl">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Latitude
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {trip.coordinates?.lat?.toFixed(6) || '0.000000'}
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-background-dark rounded-3xl">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Longitude
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {trip.coordinates?.lng?.toFixed(6) || '0.000000'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecruitmentSidebar;
