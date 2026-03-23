'use client';

import Link from 'next/link';
import Container from '../components/ui/Container';
import { Compass, LogOut, LayoutDashboard } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useState, useRef, useEffect } from 'react';
import { logout } from '../redux/store/features/userSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    toast.success('Disconnected', {
      description: 'You have been safely logged out of the network.',
    });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-background-dark">
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
          {user && (
            <Link
              className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
              href="/dashboard"
            >
              Dashboard
            </Link>
          )}
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
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 p-1 pr-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-bold truncate max-w-25">
                  {user.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-xs text-slate-500 font-semibold">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
