'use client';

import { Compass, Lock, Mail, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RegisterView = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4 py-12">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden relative z-10 border border-slate-200 dark:border-slate-800">
        {/* Left Side: Visual/Branding (Hidden on mobile) */}
        <div className="hidden md:block relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3j_cB_9ioHVEiIeihyOjSrjiB43k3VL_1sWaZQsuCikVgY7rbq1DzkJ-Nf1N_HjV0LLlo2JlqXQ8Qh7oUCB8Lc0--dB7J04xCvGgxzwVNDQiWQI_6HlZGfTeW2Vzo3yppGQ9uQ21YYRIgeEoJkC-uQ4_Z3PzbJXlcHwNz012KJ4xT1YeJog1iSdAP92NrazeNY3IzL39uzk2rAZAsRkIsjclojwRKU1e0s9F9qEPQjQ1i1WxazZ6Fs5YfI5DzvrzqJQ2L4Mz8Ww"
              alt="Travel journey"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10"></div>
          </div>
          <div className="relative z-20 flex flex-col justify-end p-10 h-full w-full text-white">
            <div className="max-w-md">
              <h1 className="text-4xl font-black leading-tight mb-4 italic tracking-tight">
                Start your journey today
              </h1>
              <p className="text-white/80 text-lg">
                Connect with travelers around the world and find your next
                adventure buddy.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          {/* Header/Logo (Mobile) */}
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-background-dark">
              <Compass className="size-6 font-bold" />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
              Travel Buddy & Meetup
            </h2>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2 tracking-tight text-slate-900 dark:text-slate-100">
              Create Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Join our community of world travelers.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Enter your full name"
                  type="text"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="example@mail.com"
                  type="email"
                />
              </div>
            </div>

            {/* Profile Image Link */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Profile Image Link
              </label>
              <div className="relative">
                <Compass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
              </div>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Register as
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex items-center justify-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all has-checked:border-primary has-checked:bg-primary/5">
                  <input
                    type="radio"
                    name="role"
                    value="USER"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 peer-checked:text-primary">
                    Traveler
                  </span>
                </label>
                <label className="relative flex items-center justify-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all has-checked:border-primary has-checked:bg-primary/5">
                  <input
                    type="radio"
                    name="role"
                    value="ADMIN"
                    className="sr-only peer"
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 peer-checked:text-primary">
                    Provider
                  </span>
                </label>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-4 bg-primary text-background-dark font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all cursor-pointer"
              type="submit"
            >
              Create Account
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                className="text-primary font-bold hover:underline"
                href="/login"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
