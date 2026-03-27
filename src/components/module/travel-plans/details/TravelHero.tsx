import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';
import { TravelHeroProps } from '@/src/types/props';

const TravelHero = ({ trip, durationDays }: TravelHeroProps) => {
  return (
    <div className="relative w-full rounded-[3rem] overflow-hidden aspect-video lg:aspect-21/9 mb-10 group animate-in fade-in duration-1000">
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
      <div className="absolute bottom-0 left-0 p-8 lg:p-16 w-full">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="bg-primary px-6 py-2 rounded-full shadow-2xl shadow-primary/20 flex items-center gap-2">
            <div className="size-2 bg-slate-900 rounded-full animate-pulse"></div>
            <span className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em]">
              {trip.travelType} MISSION
            </span>
          </div>
          <div className="px-6 py-2 rounded-full flex items-center gap-2">
            <Clock className="size-3.5 text-primary" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">
              {durationDays} DAY WINDOW
            </span>
          </div>
        </div>
        <h1 className="text-5xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase drop-shadow-2xl max-w-4xl">
          {trip.destination}
        </h1>
        <div className="flex items-center gap-4 text-primary font-black text-[10px] uppercase tracking-[0.4em] w-fit px-6 py-3 rounded-2xl border border-white/10">
          <MapPin className="size-4" strokeWidth={3} />
          {trip.coordinates?.lat?.toFixed(4) || '0.0000'} N /{' '}
          {trip.coordinates?.lng?.toFixed(4) || '0.0000'} E
        </div>
      </div>
    </div>
  );
};

export default TravelHero;
