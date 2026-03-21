'use client';

import Link from 'next/link';
import { MinusCircle, ArrowLeft, RotateCcw, AlertCircle } from 'lucide-react';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-700">
        <div className="size-24 bg-amber-500/10 rounded-4xl flex items-center justify-center text-amber-500 mx-auto">
          <MinusCircle className="size-12" strokeWidth={2.5} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="size-4 text-amber-500" strokeWidth={3} />
            <span className="text-xs font-black text-amber-500 uppercase tracking-widest leading-none">Process Stopped</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter shrink-0">Payment Aborted</h1>
          <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-xs mx-auto">
            You cancelled the expedition activation process. Your travel budget remains untouched.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href="/dashboard/user/subscription"
            className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-decoration-none"
          >
            Restart Activation <RotateCcw className="size-4" />
          </Link>
          <Link 
            href="/dashboard/user/travel-plans"
            className="w-full py-5 bg-transparent border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-2 text-decoration-none"
          >
            Go back to Expeditions <ArrowLeft className="size-4" />
          </Link>
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Session identity: SSL_SESS_CXL_009</p>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
