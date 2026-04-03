import { Navigation, Eye } from 'lucide-react';
import Image from 'next/image';

export const TacticalItinerary = ({ itinerary }: { itinerary: string }) => (
  <section className="space-y-10">
    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase px-4">
      Tactical Itinerary
    </h2>
    <div className="bg-white dark:bg-background-dark rounded-[4rem] p-12 lg:p-16 border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:rotate-12 transition-transform duration-1000">
        <Navigation className="size-80" />
      </div>
      <div className="prose prose-xl prose-slate dark:prose-invert max-w-none font-bold text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed relative z-10 first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
        {itinerary}
      </div>
    </div>
  </section>
);

export const SpatialCaptures = ({ images }: { images: string[] }) => (
  <section className="space-y-10">
    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase px-4">
      Spatial Captures
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {images.slice(1).map((img, i) => (
        <div
          key={i}
          className="group relative rounded-[3rem] overflow-hidden aspect-square md:aspect-auto md:h-100 border-8 border-white dark:border-slate-800 shadow-2xl"
        >
          <Image
            fill
            src={img}
            alt={`Expedition View ${i}`}
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Eye className="size-12 text-white animate-pulse" strokeWidth={3} />
          </div>
        </div>
      ))}
    </div>
  </section>
);
