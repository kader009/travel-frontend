'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-700">
        <div className="relative mx-auto size-24 bg-emerald-500/10 rounded-4xl flex items-center justify-center text-emerald-500">
          <CheckCircle className="size-12" strokeWidth={2.5} />
          <div className="absolute inset-0 bg-emerald-500/20 rounded-4xl animate-ping" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Expedition Activated</h1>
          <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            Your premium subscription is now active. Get ready to explore the world with enhanced tools and elite status.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
              <Zap className="size-5 text-primary mb-2 mx-auto" strokeWidth={3} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase">Premium</p>
           </div>
           <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
              <ShieldCheck className="size-5 text-emerald-500 mb-2 mx-auto" strokeWidth={2.5} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Security</p>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase">Verified</p>
           </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href="/dashboard/user/subscription"
            className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-decoration-none"
          >
            Check History <ArrowRight className="size-4" />
          </Link>
          <Link 
            href="/dashboard/user/travel-plans"
            className="w-full py-5 bg-transparent border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition-all text-decoration-none"
          >
            Go to My Expeditions
          </Link>
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receipt sent to your inbox</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
