'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useInitializeSubscriptionMutation } from '@/src/redux/store/api/endApi';
import {
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Lock,
  Minus,
  ShieldCheck,
  UserCheck,
  Wallet,
  Crown,
  Loader2
} from 'lucide-react';
import Container from '@/src/components/ui/Container';

const PricingPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [initializeSubscription, { isLoading }] = useInitializeSubscriptionMutation();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      currency: 'BDT',
      icon: UserCheck,
      features: [
        'Basic member profile',
        'Join public meetups',
        'View trip calendars',
      ],
      color: 'slate',
      period: 'per month',
      popular: false,
    },
    {
      id: 'monthly',
      name: 'Premium Monthly',
      price: '499',
      currency: 'BDT',
      icon: CalendarCheck,
      features: [
        'Full access for 1 month',
        'Verified traveler badge',
        'Unlimited connections',
        'Priority support',
      ],
      color: 'blue',
      period: 'per month',
      popular: false,
    },
    {
      id: 'yearly',
      name: 'Premium Yearly',
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

  const handleGetStarted = async (planId: string) => {
    if (!user) {
      toast.error('Identity required', {
        description: 'You must sign in to upgrade your access.',
      });
      router.push('/login');
      return;
    }

    if (user.role === 'admin') {
      toast.error('Access Denied', {
        description: 'Administrators cannot purchase standard user subscriptions.',
      });
      return;
    }

    if (planId === 'free') {
      router.push('/dashboard/user');
      return;
    }

    setProcessingPlan(planId);
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const res = await initializeSubscription({
        planType: planId as 'monthly' | 'yearly',
        successUrl: `${baseUrl}/payment/success`,
        failUrl: `${baseUrl}/payment/fail`,
        cancelUrl: `${baseUrl}/payment/cancel`,
      }).unwrap();

      if (res.success && res.data) {
        window.location.assign(res.data);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error('Payment Initialization Failed', {
        description: error?.data?.message || 'Unable to connect to the payment gateway.'
      });
    } finally {
      if (planId !== 'free') {
        setProcessingPlan(null);
      }
    }
  };

  return (
    <main className="py-12">
      <Container>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Find your tribe anywhere in the world.
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-8">
              Choose a plan that fits your travel style. From casual weekenders
              to <br />
              global digital nomads.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative group bg-white dark:bg-background-dark rounded-[3rem] border-2 transition-all p-10 flex flex-col ${
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
                    plan.popular
                      ? 'bg-primary/10 text-primary'
                      : 'bg-slate-100 dark:bg-background-dark text-slate-400'
                  }`}
                >
                  <plan.icon className="size-8" strokeWidth={2.5} />
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {plan.price === '0' ? 'Free' : `৳${plan.price}`}
                  </span>
                  {plan.price !== '0' && (
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-10 grow">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400"
                    >
                      <div className="size-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="size-3" strokeWidth={4} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(plan.id)}
                  disabled={isLoading && processingPlan === plan.id}
                  className={`w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 border-none cursor-pointer disabled:opacity-70 disabled:pointer-events-none ${
                    plan.popular
                      ? 'bg-primary text-slate-900 shadow-xl shadow-primary/20 hover:shadow-primary/40'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
                  }`}
                >
                  {isLoading && processingPlan === plan.id ? (
                    <Loader2 className="size-4 animate-spin shrink-0" />
                  ) : null}
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="w-full mt-10">
            <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight mb-8 text-center">
              Compare our plans
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-background-dark">
                    <th className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">
                      Features
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">
                      Free
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      Unlimited Meetups
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      Join only
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Create & Join
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      Advanced Filters
                    </td>
                    <td className="px-6 py-4">
                      <Minus className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                    </td>
                    <td className="px-6 py-4">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      Profile Boost
                    </td>
                    <td className="px-6 py-4">
                      <Minus className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                      1 per month
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      Verified Badge
                    </td>
                    <td className="px-6 py-4">
                      <Minus className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                    </td>
                    <td className="px-6 py-4">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      Community Support
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      Standard
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      24/7 Priority
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      Ad-Free Experience
                    </td>
                    <td className="px-6 py-4">
                      <Minus className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                    </td>
                    <td className="px-6 py-4">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Section */}
          <div className="w-full bg-slate-900 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="flex flex-col gap-4 max-w-lg">
              <h2 className="text-white text-3xl font-bold">
                Safe & Secure Community
              </h2>
              <p className="text-slate-400">
                All members go through a verification process. Your data and
                payments are encrypted and protected by enterprise-grade
                security standards.
              </p>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  PCI Compliant
                </div>
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-5 h-5 text-primary" />
                  256-bit SSL
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full py-12">
            <div className="flex flex-col gap-2">
              <h4 className="text-slate-900 dark:text-slate-100 font-bold">
                Can I cancel my subscription anytime?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Yes, you can cancel your subscription from your account settings
                at any time. You will continue to have access to your premium
                features until the end of your billing cycle.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-slate-900 dark:text-slate-100 font-bold">
                Are meetups organized by Travel Buddy?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Meetups are organized by community members. However, we have a
                &quot;Travel Buddy Certified&quot; badge for meetups that follow
                our safety and quality guidelines.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-slate-900 dark:text-slate-100 font-bold">
                What payment methods do you accept?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We accept all major credit cards, PayPal, Apple Pay, and Google
                Pay for all our premium plans.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-slate-900 dark:text-slate-100 font-bold">
                Is there a student discount?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Yes! Verified students can get 50% off the Premium Yearly plan.
                Please reach out to our support team with your student ID.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default PricingPage;
