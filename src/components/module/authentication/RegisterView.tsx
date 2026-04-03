'use client';

import { useState } from 'react';
import { Compass, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpMutation } from '@/src/redux/store/api/endApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setName,
  setEmail,
  setPassword,
  setImage,
  setRole,
} from '@/src/redux/store/features/registerSlice';
import { TUserRole } from '@/src/types/user';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '@/src/redux/store/store';
import { useEffect } from 'react';

import { registerSchema } from '@/src/validation/register.validation';
import { RegisterFormValues } from '@/src/types/forms';

const RegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'user',
    },
  });

  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const res = await signUp(data);

    if (res.error) {
      const errorData = (res.error as FetchBaseQueryError).data as { message?: string };
      toast.error(errorData?.message || 'Registration failed. Please try again.');
      return;
    }

    if (res.data?.success) {
      toast.success('Registered successfully');
      reset();
      router.push('/login');
    }
  };

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
        <div className="p-8 sm:p-12 flex flex-col justify-center dark:bg-background-dark">
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
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Enter your full name"
                  type="text"
                  {...register('name', {
                    onChange: (e) => dispatch(setName(e.target.value)),
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="example@mail.com"
                  type="email"
                  {...register('email', {
                    onChange: (e) => dispatch(setEmail(e.target.value)),
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Profile Image Link */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Profile Image Link
              </label>
              <div className="relative">
                <Compass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  {...register('image', {
                    onChange: (e) => dispatch(setImage(e.target.value)),
                  })}
                />
              </div>
              {errors.image && (
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.image.message}
                </p>
              )}
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
                    value="user"
                    className="sr-only peer"
                    {...register('role', {
                      onChange: (e) =>
                        dispatch(setRole(e.target.value as TUserRole)),
                    })}
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 peer-checked:text-primary">
                    User
                  </span>
                </label>
                <label className="relative flex items-center justify-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all has-checked:border-primary has-checked:bg-primary/5">
                  <input
                    type="radio"
                    value="admin"
                    className="sr-only peer"
                    {...register('role', {
                      onChange: (e) =>
                        dispatch(setRole(e.target.value as TUserRole)),
                    })}
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 peer-checked:text-primary">
                    Admin
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1 text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  className="w-full pl-12 pr-12 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    onChange: (e) => dispatch(setPassword(e.target.value)),
                  })}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
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
                <p className="text-xs text-red-500 font-bold ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-4 bg-primary text-background-dark font-bold rounded-full shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
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
