import Link from 'next/link';
import Container from '../components/ui/Container';
import { Compass, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-background-dark">
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-1/2 lg:h-full z-0">
        <img
          alt="Stunning mountain lake landscape with a lone traveler"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmPbWZ5T8qVf-HXNiPgmVrRsPEbCJIL8kDj8PJNw45WIv3c293Em_ceP-RRD9q0nnt-RlW2ijhNmTpBiDHNytV7ImTsgZ0q6acaSXAsVSHKjo2-w0YSydXZSmhbWS5laf7k4-FOzFVQp7PDVPHxBZJI3rrYe_lNxzE5KI-bCCumV4kmou5r0CEKBtFEOvI_5IBnBPhJ2R7BWTjkf0wqK9CmqfiXCPWYRa04pMjWVJ4V0_LJqCsC6hiCP4rsQMXG2p8M6K6HMyTNw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/50 to-transparent dark:from-background-dark dark:via-background-dark/50 hidden lg:block"></div>
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent dark:from-background-dark lg:hidden"></div>
      </div>
      <Container className="relative z-10 py-12 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary mb-8">
            <Sparkles className="w-4 h-4" />
            <span>The #1 Travel Community</span>
          </div>
          <h1 className="text-6xl font-black leading-[0.95] tracking-tighter text-slate-900 dark:text-white lg:text-8xl mb-8">
            Find Your Perfect <br />
            <span className="bg-linear-to-r from-primary to-green-600 bg-clip-text text-transparent">
              Travel Buddy
            </span>
          </h1>
          <p className="max-w-lg text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10">
            Connect with like-minded adventurers, share experiences, and explore
            the world together. Your next great journey starts with the right
            companion.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/find-buddy" className="flex h-16 items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-background-dark shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95">
              Find Buddy
            </Link>
            <Link href="/create-plan" className="flex h-16 items-center justify-center rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-10 text-lg font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95">
              Create Travel Plan
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              <img
                alt="User"
                className="h-12 w-12 rounded-full border-4 border-white dark:border-background-dark object-cover shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4pkkpRe3WdZwzla0FGq0p9K37yW8-nSNnAxI6mUOhc4aQ56kJDaMqXZ4go9DAbi2ki4phFqlCg28FNccQo0MBVWJbVMdkzt4s6fQA7M7Z72GWWg-fuQpWAFSBVXnwYICWiRSTd2tsovHz_bTMlLZJKJRdGiVCZfMNmlUDyHxUtAQ9HTRG8LLkmJcXU0KNNLOUy2u_35V14iT-579KMf60kLFf3OwXf6k-2KIZnRJj2aFyyrgsj65bK5LjlW2mlXrMMH2-72KILQ"
              />
              <img
                alt="User"
                className="h-12 w-12 rounded-full border-4 border-white dark:border-background-dark object-cover shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5FxR-14Pak355u8AmsW7Tx6cOFaKERVz6_scGZn1HIvNA5FGnnOSmgAFqTu8AfVbCyyX3ElGP2YThr4Le4X8WO6Hujbgbyp3i9ch0jQ35W90XHOpw8xV0lbgoSkZpZ75vX74zydEY7fERpzFRjj_ofLoK6L0_NI3NciNgvL9v_cW-LozSfzvtYAY_GVGaU74Nj3jpMxGVrfNqIxRXOk5L_N2URydNEMuIZk95sM3hY6FQorKY0ESmfZXJuc5Bl1kJeaGInXtfA"
              />
              <img
                alt="User"
                className="h-12 w-12 rounded-full border-4 border-white dark:border-background-dark object-cover shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr96WJg7XR6Ho9ej7-vcMf9V-tN0Dyi1gxpv7IZ2JoLODIj1uZ4IcDbD0CbUj7oyL95fNxVLoMiUdeXosRcGjHOSW4ZDgNJyqAKnvjNWgBAyrnnP717LBitq_ukcSeAKxRsz9Nds2OPCuOby3h5Ie9dI6xjRW22TiPvor5YkAyIfSMvG-gMU1KEPkOE87LJ95C-l7S1SPdhKREGLIUZ5sxr29JVKBA1DTUVyZtsTy0BI4tiHfe5cPIssaesbAHWf_h8Jy_syA3dw"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white dark:border-background-dark bg-slate-100 dark:bg-slate-700 text-xs font-bold shadow-sm">
                +10k
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Join our global community
              </p>
              <p className="text-xs text-slate-500">
                Active travelers in 120+ countries
              </p>
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
        <div className="rounded-2xl bg-white/80 p-6 backdrop-blur-xl dark:bg-background-dark/80 shadow-2xl border border-white/20">
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
            <div className="ml-4 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase">
              4 Days Left
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
