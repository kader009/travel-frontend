'use client';

import Link from 'next/link';
import Container from '../components/ui/Container';
import { Compass, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useState, useRef, useEffect } from 'react';
import { logout } from '../redux/store/features/userSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { navLinks } from '@/src/data/navLinks';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    toast.success('Disconnected', {
      description: 'You have been safely logged out of the network.',
    });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        {/* Logo and Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1 md:hidden text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-background-dark">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 font-bold" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              TravelBuddy
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap"
              href="/dashboard"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center rounded-full border border-slate-200 dark:border-slate-800 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
                <span className="text-sm font-bold truncate max-w-20 sm:max-w-25 hidden sm:block ml-2 mr-2 sm:mr-3">
                  {user.name}
                </span>
              </button>

              {/* Desktop Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
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
            <div className="flex items-center gap-3 sm:gap-6">
              <Link
                href="/login"
                className="hidden sm:block text-sm font-extrabold hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-black text-background-dark hover:scale-105 transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </Container>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-100 transition-all duration-300 md:hidden ${isMenuOpen ? 'visible bg-black/60 backdrop-blur-sm' : 'invisible bg-transparent'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Drawer Content */}
        <div
          className={`fixed left-0 top-0 h-screen w-[300px] shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full bg-white dark:bg-slate-950">
            {/* Header Area */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-background-dark">
                  <Compass className="w-5 h-5 font-bold" />
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white">TravelBuddy</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-500 hover:text-primary transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 px-6 py-5 text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 px-6 py-5 text-base font-bold text-primary hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  <LayoutDashboard className="size-5" />
                  Dashboard
                </Link>
              )}
            </nav>

            {/* Bottom Actions */}
            <div className="p-6 space-y-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center rounded bg-slate-100 dark:bg-background-dark px-4 py-3.5 text-sm font-bold text-slate-900 dark:text-white transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center rounded bg-primary px-4 py-3.5 text-sm font-bold text-background-dark transition-all"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded bg-red-500/10 px-4 py-4 text-base font-bold text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20"
                >
                  <LogOut className="size-5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
