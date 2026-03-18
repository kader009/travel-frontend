import Link from 'next/link';
import Container from '../components/ui/Container';
import { Compass } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-background-dark">
            <Compass className="w-6 h-6 font-bold" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            TravelBuddy
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
            href="/about"
          >
            About us
          </Link>
          <Link
            className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
            href="/travel-plans"
          >
            Travel Plans
          </Link>
          <Link
            className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
            href="/explore"
          >
            Explore Travelers
          </Link>
          <Link
            className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
            href="/pricing"
          >
            Pricing
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-bold hover:text-primary"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-background-dark hover:scale-105 transition-transform"
          >
            Sign Up
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
