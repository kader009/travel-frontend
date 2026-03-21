'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCcw, Headphones, AlertTriangle } from 'lucide-react';

const PaymentFailPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-700">
        <div className="size-24 bg-rose-500/10 rounded-[2rem] flex items-center justify-center text-rose-500 mx-auto">
          <XCircle className="size-12" strokeWidth={2.5} />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="size-4 text-rose-500" />
            <span className="text-xs font-black text-rose-500 uppercase tracking-widest leading-none">Transaction Incomplete</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter shrink-0">Authorization Denied</h1>
          <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-xs mx-auto">
            Your expedition activation was unsuccessful. Please check your card balance or contact your provider.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href="/dashboard/user/subscription"
            className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-decoration-none"
          >
            Retry Payment <RefreshCcw className="size-4" />
          </Link>
          <button className="w-full py-5 bg-transparent border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition-all flex items-center justify-center gap-2">
            Contact Support <Headphones className="size-4" />
          </button>
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic opacity-60 italic">Error Code: TLS_ERR_402</p>
      </div>
    </div>
  );
};

export default PaymentFailPage;
