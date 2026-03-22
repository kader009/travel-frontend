import Link from 'next/link';
import Container from '../components/ui/Container';

const CTA = () => {
  return (
    <Container className="py-12">
      <div className="relative overflow-hidden rounded-xl bg-background-dark px-8 py-16 text-center text-white lg:px-16 lg:py-24">
        <div className="absolute inset-0 bg-primary/10 opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl font-black lg:text-5xl">
            Ready for your next adventure?
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Join thousands of travelers and find your companion for your dream
            destination today.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/explore" className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-background-dark shadow-lg shadow-primary/20 transition-transform hover:scale-105">
              Find Travel Buddies
            </Link>
            <Link href="/travel-plans" className="rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-bold backdrop-blur transition-colors hover:bg-slate-800 dark:bg-background-dark">
              Explore Expeditions
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CTA;
