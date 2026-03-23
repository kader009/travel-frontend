'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import Container from '@/src/components/ui/Container';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background-light dark:bg-background-dark px-6">
      <Container className="text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            Something went wrong!
          </h1>
          <p className="text-lg leading-7 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            We encountered an unexpected turbulence during your journey.
            Don&apos;t worry, our team has been notified.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button
              onClick={() => reset()}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-background-dark shadow-xs shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 text-lg font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white"
            >
              Back Home
            </Link>
          </div>
          {error.digest && (
            <p className="text-xs text-slate-400 mt-8">
              Error ID: <span className="font-mono">{error.digest}</span>
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
