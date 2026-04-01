import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';
import { TravelHeroProps } from '@/src/types/props';

const TravelHero = ({ trip, durationDays }: TravelHeroProps) => {
  return (
    <div className="relative w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden aspect-square sm:aspect-video lg:aspect-21/9 mb-10 group animate-in fade-in duration-1000">
      <Image
        alt={trip.destination}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
        src={
          trip.images?.[0] ||
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
        }
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 sm:p-10 lg:p-16 w-full">
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className="bg-primary px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-2xl shadow-primary/20 flex items-center gap-2">
            <div className="size-1.5 sm:size-2 bg-slate-900 rounded-full animate-pulse"></div>
            <span className="text-slate-900 text-[8px] sm:text-[10px] font-black uppercase tracking-widest sm:tracking-[0.2em]">
              {trip.travelType} MISSION
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex items-center gap-2">
            <Clock className="size-3 sm:size-3.5 text-primary" />
            <span className="text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
              {durationDays} DAY WINDOW
            </span>
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-[0.9] uppercase drop-shadow-2xl max-w-4xl truncate">
          {trip.destination}
        </h1>
        <div className="flex items-center gap-3 sm:gap-4 text-primary font-black text-[8px] sm:text-[10px] uppercase tracking-widest sm:tracking-[0.4em] w-fit px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
          <MapPin className="size-3.5 sm:size-4" strokeWidth={3} />
          {trip.coordinates?.lat?.toFixed(4) || '0.0000'} N /{' '}
          {trip.coordinates?.lng?.toFixed(4) || '0.0000'} E
        </div>
      </div>
    </div>
  );
};

export default TravelHero;
