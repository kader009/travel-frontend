import Container from '../components/ui/Container';
import { Map, MessageCircle, UserPlus } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black lg:text-5xl">How It Works</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Three simple steps to start your next adventure with a new friend.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-accent text-slate-900 transition-transform group-hover:scale-110">
              <UserPlus className="w-10 h-10" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Create a Profile</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tell us about your travel style, favorite destinations, and bucket
              list interests.
            </p>
          </div>
          <div className="group flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-slate-900 transition-transform group-hover:scale-110">
              <Map className="w-10 h-10" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Find Destinations</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Browse upcoming trips posted by others or share your own itinerary
              to find companions.
            </p>
          </div>
          <div className="group flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-accent text-slate-900 transition-transform group-hover:scale-110">
              <MessageCircle className="w-10 h-10" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Connect & Go</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
