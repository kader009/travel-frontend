import { CheckCircle2, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Browse travelers', 'Basic profile', '3 travel plans/month'],
    cta: 'Current Plan',
    active: true,
  },
  {
    name: 'Monthly',
    price: '$9.99',
    period: 'per month',
    features: ['Unlimited travel plans', 'Verified badge', 'Priority matching', 'Chat with travelers'],
    cta: 'Upgrade',
    active: false,
  },
  {
    name: 'Yearly',
    price: '$79.99',
    period: 'per year',
    features: ['Everything in Monthly', '2 months free', 'Premium badge', 'Featured profile'],
    cta: 'Best Value',
    active: false,
    highlight: true,
  },
];

const UserSubscriptionPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white">Subscription</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your plan and unlock premium features.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {plans.map((plan) => (
        <div key={plan.name} className={`bg-white dark:bg-slate-900 rounded-2xl border-2 p-6 flex flex-col gap-4 transition-all ${plan.highlight ? 'border-primary shadow-2xl shadow-primary/10' : 'border-slate-100 dark:border-slate-800'}`}>
          {plan.highlight && (
            <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-slate-900 px-3 py-1 rounded-full w-fit flex items-center gap-1">
              <Zap className="size-3" /> Best Value
            </span>
          )}
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">{plan.name}</h2>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.price}</span>
              <span className="text-sm text-slate-400 mb-1">/{plan.period}</span>
            </div>
          </div>
          <ul className="space-y-2 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="size-4 text-primary shrink-0" />{f}
              </li>
            ))}
          </ul>
          <button disabled={plan.active} className={`w-full py-3 rounded-full font-bold text-sm transition active:scale-95 cursor-pointer ${plan.active ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default' : 'bg-primary text-slate-900 hover:bg-primary/90 shadow-lg shadow-primary/20'}`}>
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default UserSubscriptionPage;
