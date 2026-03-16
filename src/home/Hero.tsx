import Link from 'next/link';
import Container from '../components/ui/Container';
import { Compass } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row items-center overflow-hidden bg-white dark:bg-background-dark">
      {/* Background/Side Image Container */}
      <div className="relative lg:absolute top-0 right-0 w-full lg:w-1/2 h-[40vh] sm:h-[50vh] lg:h-full z-0 order-1 lg:order-0">
        <Image
          alt="Two diverse travelers looking at a stunning mountain lake during golden hour"
          className="object-cover"
          fill
          priority
          src="/hero-travel.png"
        />
        {/* Desktop Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/50 to-transparent dark:from-background-dark dark:via-background-dark/50 hidden lg:block"></div>
        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent dark:from-background-dark lg:hidden"></div>
      </div>

      <Container className="relative z-10 py-12 sm:py-20 lg:py-24 order-2 lg:order-0">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.1] sm:leading-[0.95] tracking-tighter text-slate-900 dark:text-white mb-6 sm:mb-8">
            Find Your Perfect <br />
            <span className="bg-linear-to-r from-primary to-green-600 bg-clip-text text-transparent">
              Travel Buddy
            </span>
          </h1>

          <p className="max-w-lg mx-auto lg:mx-0 text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 sm:mb-12">
            Connect with like-minded adventurers, share experiences, and explore
            the world together. Your next great journey starts with the right
            companion.
          </p>

          <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-12">
            <Link
              href="/find-buddy"
              className="px-5 sm:px-10 flex h-12 sm:h-16 items-center justify-center rounded-full bg-primary text-[13px] sm:text-lg font-bold text-background-dark hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Find Buddy
            </Link>
            <Link
              href="/create-plan"
              className="px-5 sm:px-10 flex h-12 sm:h-16 items-center justify-center rounded-full bg-white dark:bg-background-dark border-2 border-slate-200 dark:border-slate-700 text-[13px] sm:text-lg font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white whitespace-nowrap"
            >
              Create Plan
            </Link>
          </div>
        </div>
      </Container>

      {/* Floating Card - Desktop Only */}
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
        <div className="rounded-2xl bg-white/80 p-6 backdrop-blur-xl dark:bg-background-dark/80 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Next Adventure
              </p>
              <p className="text-lg font-black">Patagonia Trekking</p>
            </div>
            <div className="ml-4 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase text-background-dark">
              4 Days Left
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
