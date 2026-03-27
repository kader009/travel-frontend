'use client';

import {
  Check,
  CreditCard,
  History,
  Crown,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useInitializeSubscriptionMutation,
  useGetPaymentHistoryQuery,
} from '@/src/redux/store/api/endApi';

const SubscriptionPage = () => {
  const [initPayment, { isLoading: isInitializing }] =
    useInitializeSubscriptionMutation();
  const { data: historyData, isLoading: isHistoryLoading } =
    useGetPaymentHistoryQuery();

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    try {
      const baseUrl =
        typeof window !== 'undefined' ? window.location.origin : '';
      const res = await initPayment({
        planType,
        successUrl: `${baseUrl}/payment/success`,
        failUrl: `${baseUrl}/payment/fail`,
        cancelUrl: `${baseUrl}/payment/cancel`,
      }).unwrap();
      if (res.success && res.data && typeof res.data === 'string') {
        window.location.assign(res.data); // Redirect to SSLCommerz
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to initialize payment');
    }
  };

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Pass',
      price: '499',
      currency: 'BDT',
      icon: Calendar,
      features: [
        'Full access for 1 month',
        'Verified traveler badge',
        'Unlimited connections',
        'Priority support',
      ],
      color: 'blue',
      period: 'per month',
    },
    {
      id: 'yearly',
      name: 'Yearly Premium',
      price: '4999',
      currency: 'BDT',
      icon: Crown,
      features: [
        'Full year access',
        'Verified traveler badge',
        'Unlimited connections',
        'Priority support',
        'Best value - Save 17%',
      ],
      color: 'primary',
      popular: true,
      period: 'per year',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          Choose Your Journey
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-semibold">
          Elevate your travel experience with our premium coordination tools and
          verified community status.
        </p>
      </section>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative group bg-white dark:bg-slate-900 rounded-[3rem] border-2 transition-all p-10 flex flex-col ${
              plan.popular
                ? 'border-primary ring-4 ring-primary/5 shadow-2xl scale-105 z-10'
                : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-slate-900 px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                Most Popular
              </span>
            )}

            <div
              className={`size-16 rounded-4xl flex items-center justify-center mb-8 ${
                plan.id === 'yearly'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              <plan.icon className="size-8" strokeWidth={2.5} />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                ৳{plan.price}
              </span>
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                {plan.period}
              </span>
            </div>

            <ul className="space-y-4 mb-10 grow">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400"
                >
                  <div className="size-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="size-3" strokeWidth={4} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id as 'monthly' | 'yearly')}
              disabled={isInitializing}
              className={`w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 border-none cursor-pointer ${
                plan.popular
                  ? 'bg-primary text-slate-900 shadow-xl shadow-primary/20 hover:shadow-primary/40'
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
              }`}
            >
              {isInitializing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Upgrade Now <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Payment History Table */}
      <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <History className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1">
                Billing Legend
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Your transaction history and logs
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <DollarSign className="size-4 text-emerald-500" />
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">
                  Total Spent
                </p>
                <p className="text-sm font-black text-slate-900 dark:text-white leading-none">
                  ৳
                  {historyData?.data
                    ?.filter((tx) => tx.status === 'paid')
                    .reduce((acc, curr) => acc + curr.amount, 0) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Transaction ID
                </th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Plan Details
                </th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Amount
                </th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Executed At
                </th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {isHistoryLoading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 className="size-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Retrieving ledger...
                    </p>
                  </td>
                </tr>
              ) : historyData?.data && historyData.data.length > 0 ? (
                historyData.data.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-10 py-6 font-mono text-[11px] text-slate-500 font-bold">
                      {tx.transactionId}
                    </td>
                    <td className="px-10 py-6">
                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                        {tx.planType}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-center text-sm font-black text-slate-900 dark:text-white">
                      ৳{tx.amount}
                    </td>
                    <td className="px-10 py-6 text-center font-bold text-slate-400 text-xs flex items-center justify-center gap-2">
                      <Calendar className="size-3.5" />
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <span
                        className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                          tx.status === 'paid'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : tx.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-500'
                              : tx.status === 'failed'
                                ? 'bg-rose-500/10 text-rose-500'
                                : 'bg-slate-500/10 text-slate-500'
                        }`}
                      >
                        <div
                          className={`size-1.5 rounded-full ${
                            tx.status === 'paid'
                              ? 'bg-emerald-500'
                              : tx.status === 'pending'
                                ? 'bg-amber-500'
                                : tx.status === 'failed'
                                  ? 'bg-rose-500'
                                  : 'bg-slate-500'
                          }`}
                        />
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <CreditCard className="size-16 text-slate-200 dark:text-slate-800 mx-auto mb-6 opacity-40" />
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      No Transactions Recorded
                    </h4>
                    <p className="text-slate-400 text-sm font-bold mt-2">
                      Activate a subscription to start your journey.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-10 bg-slate-50/50 dark:bg-slate-800/20 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center justify-center gap-4">
            <ShieldCheck className="size-4 text-primary" />
            Secured & Encrypted Payments via SSLCommerz
          </p>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
