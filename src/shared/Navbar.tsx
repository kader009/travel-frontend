import { Compass } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-background-dark">
            <Compass className="w-6 h-6 font-bold" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            TravelBuddy
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#"
          >
            Destinations
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#"
          >
            How It Works
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#"
          >
            Community
          </a>
          <a
            className="text-sm font-semibold hover:text-primary transition-colors"
            href="#"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-bold hover:text-primary">
            Login
          </button>
          <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-background-dark shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Sign Up Free
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
