'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Plane,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/src/redux/store/api/endApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/src/redux/store/features/userSlice';
import { setEmail, setPassword } from '@/src/redux/store/features/loginSlice';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { loginSchema } from '@/src/validation/login.validation';
import { LoginFormValues } from '@/src/types/forms';

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (data: LoginFormValues) => {
    const res = await login(data);

    if (res.error) {
      const errorData = (res.error as FetchBaseQueryError).data as {
        message?: string;
      };
      toast.error(errorData?.message || 'Login failed. Please try again.');
      return;
    }

    if (res.data?.success) {
      const userRole = res.data.data.user.role;
      toast.success(
        `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} logged in successfully`,
      );
      dispatch(
        setUser({
          user: res.data.data.user,
          token: res.data.data.accessToken,
          refreshToken: res.data.data.refreshToken,
        }),
      );
      reset();
      router.push('/');
    }
  };

  const quickLogin = async (role: 'user' | 'admin') => {
    const email =
      role === 'admin'
        ? process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL!
        : process.env.NEXT_PUBLIC_DEMO_USER_EMAIL!;
    const password =
      role === 'admin'
        ? process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD!
        : process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD!;
    await handleLogin({ email, password });
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await handleLogin(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4 py-12">
      <div className="w-full max-w-250 grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden relative z-10 border border-slate-200 dark:border-slate-800">
        {/* Left Side: Visual/Branding (Hidden on mobile) */}
        <div className="hidden md:block relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHhJ1tqN-J3cvlca2PyPn7Tiso_YovURXpni7Z1IAycVfeDmISpbcYGJA9o2f7yNYfWpcLlZVNDZ24ZAA6dD0y-XRiH7UUaeAMzMV4iIzhavKzqNPoBVwCjz5EBKzVgYn4nErBlpKt_pjGsmTXXz1WT1bj0JYVm-USJ3YpNgKKbMeyDPELLStzVg4hciPIQb2S5nOVKDZ2u9h5qnKEiL9dQ549XmcTwelJaHkCdJZNncCGDlaRJxr-LgichBg2WO_RAVdwIpDp2A"
              alt="Scenic Travel Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
          <div className="relative h-full flex flex-col justify-end p-10 text-white">
            <div className="space-y-4">
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
                Explore Together
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Your next adventure begins here.
              </h2>
              <p className="text-slate-200 text-lg">
                Connect with travelers around the world and share unforgettable
                experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="size-8 bg-primary flex items-center justify-center rounded-lg">
              <Plane className="size-5 text-background-dark" />
            </div>
            <span className="font-bold text-lg">TravelBuddy</span>
          </div>

          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Welcome Back!
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Log in to start planning your next meetup.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  id="email"
                  placeholder="alex@example.com"
                  type="email"
                  {...register('email', {
                    onChange: (e) => dispatch(setEmail(e.target.value)),
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    onChange: (e) => dispatch(setPassword(e.target.value)),
                  })}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="w-full py-4 bg-primary text-slate-900 font-bold rounded-full hover:bg-primary/90 hover:scale-[1.01] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <ArrowRight className="size-5" />
              )}
            </button>
          </form>

          {/* Quick Login Buttons */}
          <div className="mt-6">
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Quick Demo Login
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => quickLogin('user')}
                className="py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <UserRound className="size-4" /> Login as User
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => quickLogin('admin')}
                className="py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="size-4" /> Login as Admin
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link
                className="font-bold text-primary hover:underline"
                href="/register"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
