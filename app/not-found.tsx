import Link from 'next/link';
import { Home, MoveLeft } from 'lucide-react';
import Container from '@/src/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background-light dark:bg-background-dark px-6">
      <Container className="text-center">
        <div className="space-y-6">
          <h1 className="text-9xl font-black text-primary animate-pulse">
            404
          </h1>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            Lost in Paradise?
          </h2>
          <p className="text-lg leading-7 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            The destination you're looking for doesn't exist or has been moved
            to a new secret location. Let's get you back on track!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-background-dark shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 text-lg font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white"
            >
              <MoveLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
