'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2,
} from 'lucide-react';
import { useGetPaymentHistoryQuery } from '@/src/redux/store/api/endApi';

const PaymentSuccessPage = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    'verifying' | 'paid' | 'pending' | 'failed'
  >('verifying');

  const { refetch } = useGetPaymentHistoryQuery();

  useEffect(() => {
    // Verify payment status by checking payment history
    const verifyPayment = async () => {
      try {
        // Check every 3 seconds for max 45 seconds (15 attempts)
        let attempts = 0;
        const maxAttempts = 15;

        const interval = setInterval(async () => {
          attempts++;

          try {
            const result = await refetch();
            const payments = result.data?.data || [];

            if (payments.length > 0) {
              const latestPayment = payments[0];

              if (latestPayment.status === 'paid') {
                setPaymentStatus('paid');
                clearInterval(interval);
                setIsVerifying(false);
                return;
              } else if (
                latestPayment.status === 'failed' ||
                latestPayment.status === 'cancelled'
              ) {
                setPaymentStatus('failed');
                clearInterval(interval);
                setIsVerifying(false);
                return;
              }
            }

            // Max attempts reached, show pending message
            if (attempts >= maxAttempts) {
              setPaymentStatus('pending');
              clearInterval(interval);
              setIsVerifying(false);
            }
          } catch (error) {
            console.error('Verification attempt error:', error);
          }
        }, 3000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('failed');
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [refetch]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-500">
          <div className="relative mx-auto size-24 bg-primary/10 rounded-4xl flex items-center justify-center text-primary">
            <Loader2 className="size-12 animate-spin" strokeWidth={2.5} />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Verifying Payment
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              Processing your subscription with SSLCommerz. Please wait...
            </p>
          </div>

          <div className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
            This may take a few moments
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'paid') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-700">
          <div className="relative mx-auto size-24 bg-emerald-500/10 rounded-4xl flex items-center justify-center text-emerald-500">
            <CheckCircle className="size-12" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-emerald-500/20 rounded-4xl animate-ping" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Expedition Activated
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              Your premium subscription is now active. Get ready to explore the
              world with enhanced tools and elite status.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
              <Zap
                className="size-5 text-primary mb-2 mx-auto"
                strokeWidth={3}
              />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Status
              </p>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase">
                Premium
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
              <ShieldCheck
                className="size-5 text-emerald-500 mb-2 mx-auto"
                strokeWidth={2.5}
              />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Security
              </p>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase">
                Verified
              </p>
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

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Receipt sent to your inbox
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'pending') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-500">
          <div className="relative mx-auto size-24 bg-amber-500/10 rounded-4xl flex items-center justify-center text-amber-500">
            <Loader2 className="size-12 animate-spin" strokeWidth={2.5} />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Payment Processing
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              Your payment is still being processed. This can take a few minutes
              with SSLCommerz.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-500/10 border-2 border-amber-200 dark:border-amber-500/30 rounded-3xl p-4">
            <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest">
              ⚠️ Please don&apos;t close or refresh this page. Status is being
              verified...
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/user/subscription"
              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-decoration-none"
            >
              Check Status <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full py-5 bg-transparent border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition-all text-decoration-none"
            >
              Back to Dashboard
            </Link>
          </div>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            We&apos;ll keep checking...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-500">
        <div className="relative mx-auto size-24 bg-rose-500/10 rounded-4xl flex items-center justify-center text-rose-500">
          <span className="text-5xl">❌</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Payment Failed
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            There was an issue processing your payment. Please try again with a
            different payment method.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/user/subscription"
            className="w-full py-5 bg-rose-500 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-2 hover:bg-rose-600 active:scale-95 transition-all text-decoration-none"
          >
            Try Again <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full py-5 bg-transparent border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 transition-all text-decoration-none"
          >
            Back to Dashboard
          </Link>
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Contact support if needed
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
