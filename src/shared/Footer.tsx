import Link from 'next/link';
import Container from '../components/ui/Container';
import {
  Compass,
  Facebook,
  Instagram,
  Linkedin,
  SendHorizontal,
  Twitter,
} from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-background-dark">
      <Container>
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-background-dark">
                <Compass className="w-5 h-5 font-bold" />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight">
                TravelBuddy
              </h1>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Connecting travelers around the world. Your adventure companion is
              just a click away.
            </p>
            <div className="flex gap-4">
              <Link
                className="text-slate-400 hover:text-primary transition-colors"
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                className="text-slate-400 hover:text-primary transition-colors"
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                className="text-slate-400 hover:text-primary transition-colors"
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                className="text-slate-400 hover:text-primary transition-colors"
                href="https://linkedin.com"
                target="_blank"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              support
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/help-center"
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/safety-tips"
                >
                  Safety tips
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/privacy-policy"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              Platform
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/about"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/contact"
                >
                  contact us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
              Get weekly travel tips and new trip alerts.
            </p>
            <div className="flex overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
              <input
                className="w-full bg-transparent px-4 py-2 text-sm focus:outline-none"
                placeholder="Your email"
                type="email"
              />
              <button className="bg-primary px-5 py-2 text-sm font-bold text-background-dark hover:opacity-90 transition-opacity">
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-sm text-slate-500 dark:border-slate-800">
          <p>
            © {year} TravelBuddy Inc. All rights reserved. Nature-inspired for
            global explorers.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
