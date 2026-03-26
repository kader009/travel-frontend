import {
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Gift,
  Lock,
  MessageCircle,
  Minus,
  ShieldCheck,
  Star,
  UserCheck,
  Wallet,
  Zap,
} from 'lucide-react';
import Container from '@/src/components/ui/Container';

const PricingPage = () => {
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
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 items-stretch md:grid-cols-3">
            {/* Free Plan */}
            <div className="flex flex-col gap-8 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-md transition-shadow shadow-xs">
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">
                  Free
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
                    $0
                  </span>
                  <span className="text-slate-500 text-lg font-bold">/mo</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Perfect for beginners exploring the community.
                </p>
              </div>
              <button className="flex w-full cursor-pointer items-center justify-center rounded-full h-12 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Get Started
              </button>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Basic member profile
                </div>
                <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Join public meetups
                </div>
                <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  View trip calendars
                </div>
              </div>
            </div>

            {/* Premium Monthly */}
            <div className="flex flex-col gap-8 rounded-xl border-2 border-primary bg-secondary p-8 shadow-xs relative scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                Most Popular
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-800 text-sm font-bold uppercase tracking-widest">
                  Premium Monthly
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-900 text-5xl font-black leading-tight tracking-tighter">
                    $14.99
                  </span>
                  <span className="text-slate-700 text-lg font-bold">/mo</span>
                </div>
                <p className="text-slate-800 text-sm font-medium">
                  Unlock full power and priority networking.
                </p>
              </div>
              <button className="flex w-full cursor-pointer items-center justify-center rounded-full h-12 bg-primary text-slate-900 text-sm font-bold hover:brightness-95 shadow-xs shadow-primary/20 transition-all">
                Upgrade Now
              </button>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 text-sm font-bold text-slate-900">
                  <ShieldCheck className="w-5 h-5 text-slate-900" />
                  Verified Member Badge
                </div>
                <div className="flex gap-3 text-sm font-bold text-slate-900">
                  <MessageCircle className="w-5 h-5 text-slate-900" />
                  Unlimited Direct Messages
                </div>
                <div className="flex gap-3 text-sm font-bold text-slate-900">
                  <Zap className="w-5 h-5 text-slate-900" />
                  Priority Matching
                </div>
                <div className="flex gap-3 text-sm font-bold text-slate-900">
                  <UserCheck className="w-5 h-5 text-slate-900" />
                  Incognito browsing
                </div>
              </div>
            </div>

            {/* Premium Yearly */}
            <div className="flex flex-col gap-8 rounded-xl border border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-md transition-shadow shadow-xs">
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">
                  Premium Yearly
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tighter">
                    $9.99
                  </span>
                  <span className="text-slate-500 text-lg font-bold">/mo</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Best for frequent travelers. Save 33% yearly.
                </p>
              </div>
              <button className="flex w-full cursor-pointer items-center justify-center rounded-full h-12 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Get Started
              </button>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Star className="w-5 h-5 text-primary" />
                  All Premium Features
                </div>
                <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Gift className="w-5 h-5 text-primary" />
                  Exclusive Partner Discounts
                </div>
                <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CalendarCheck className="w-5 h-5 text-primary" />
                  VIP Invitations to Global Events
                </div>
              </div>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="w-full mt-10">
            <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight mb-8 text-center">
              Compare our plans
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
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
