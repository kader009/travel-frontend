import Container from '../components/ui/Container';
import { Map, MessageCircle, UserPlus } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-12">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black lg:text-5xl">Three Simple Steps to Adventure</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            We take the stress out of finding compatible travel partners. Our platform <br/> ensuring you find people who share your rhythm.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group flex flex-col items-start text-left p-8 rounded-2xl bg-white dark:bg-background-dark border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:rotate-6">
              <UserPlus className="w-8 h-8" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">Create a Profile</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Tell us about your travel style, favorite destinations, and bucket
              list interests.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group flex flex-col items-start text-left p-8 rounded-2xl bg-white dark:bg-background-dark border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:rotate-6">
              <Map className="w-8 h-8" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">Find Destinations</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Browse upcoming trips posted by others or share your own itinerary
              to find companions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group flex flex-col items-start text-left p-8 rounded-2xl bg-white dark:bg-background-dark border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:rotate-6">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">Connect & Go</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Message potential buddies, plan the logistics, and hit the road
              safely.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
