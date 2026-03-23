'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck,
  BadgeCheck,
  MapPin,
  MessageSquare,
  Users,
  Globe,
  Brain,
  Flag,
  Siren,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';
import Container from '@/src/components/ui/Container';

const SafetyTips = () => {
  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="py-8 md:py-12">
        <Container>
          <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary via-secondary to-accent p-8 md:p-12 min-h-80 flex flex-col justify-center">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold text-background-dark mb-4 uppercase tracking-wider">
                Safety First
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-background-dark leading-tight mb-4">
                Travel Safely with <br />
                Travel Buddy
              </h1>
              <p className="text-lg text-background-dark/80 font-medium max-w-md">
                Your security is our priority. Follow these guidelines to ensure
                a fun and safe adventure with your new buddies.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 top-0 hidden lg:flex items-center justify-end pr-12">
              <ShieldCheck className="w-50 h-50 text-white/30 select-none" />
            </div>
          </div>
        </Container>
      </section>

      {/* Section: Before You Go */}
      <section className="mb-16" id="before">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
              <span className="p-2 bg-primary/20 rounded-lg">
                <FileCheck className="text-primary w-6 h-6" />
              </span>
              Before You Go
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-primary/5 hover:border-primary/30 transition-all group">
              <div className="size-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BadgeCheck className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                Verify Profiles
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Look for the &quot;Identity Verified&quot; badge and read
                reviews from previous travel companions before committing.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-primary/5 hover:border-primary/30 transition-all group">
              <div className="size-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                Share Your Itinerary
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Always send your trip details, flight numbers, and buddy
                profiles to a trusted friend or family member at home.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-primary/5 hover:border-primary/30 transition-all group">
              <div className="size-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                Stay on Platform
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Communicate through the Travel Buddy chat until you&apos;ve met
                in person and feel comfortable moving elsewhere.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section: Meeting Your Buddy */}
      <section className="mb-16" id="meeting">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
              <span className="p-2 bg-primary/20 rounded-lg">
                <Users className="text-primary w-6 h-6" />
              </span>
              Meeting Your Buddy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-6 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-primary/5">
              <div className="shrink-0 size-14 bg-accent/30 rounded-xl flex items-center justify-center">
                <Globe className="text-primary w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                  Public First Meetings
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Always meet in a well-lit, busy public place like a café or
                  city square. Never agree to meet in private residences for the
                  first time.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-primary/5">
              <div className="shrink-0 size-14 bg-accent/30 rounded-xl flex items-center justify-center">
                <Brain className="text-primary w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                  Trust Your Gut
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  If something feels off, it probably is. You are never
                  obligated to go through with a trip if you feel uncomfortable
                  or unsafe.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action: Report */}
      <section className="mb-16">
        <Container>
          <div className="bg-slate-900 dark:bg-slate-900 rounded-xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                See something? Say something.
              </h2>
              <p className="text-slate-300 max-w-xl mx-auto mb-8 font-medium">
                Reporting suspicious behavior helps keep our entire community
                safe. Our safety team reviews every report within 24 hours.
              </p>
              <button className="bg-primary text-background-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-accent transition-colors shadow-xl shadow-primary/20 inline-flex items-center gap-3 cursor-pointer">
                <Flag className="w-6 h-6" /> Report a Concern
              </button>
            </div>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -left-10 -bottom-10 size-64 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute -right-10 -top-10 size-64 bg-accent rounded-full blur-3xl"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Resources and Emergency Contacts */}
      <section className="mb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                Emergency Resources
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-primary/5">
                  <div className="flex items-center gap-4">
                    <Siren className="text-red-500 w-6 h-6" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        Global Emergency Numbers
                      </p>
                      <p className="text-xs text-slate-500">
                        List of police and medical contacts worldwide
                      </p>
                    </div>
                  </div>
                  <Link
                    className="text-primary font-bold hover:underline"
                    href="#"
                  >
                    View List
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-primary/5">
                  <div className="flex items-center gap-4">
                    <HeartPulse className="text-primary w-6 h-6" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        Travel Insurance Partners
                      </p>
                      <p className="text-xs text-slate-500">
                        Exclusive safety coverage for members
                      </p>
                    </div>
                  </div>
                  <Link
                    className="text-primary font-bold hover:underline"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-accent/10 dark:bg-primary/5 p-6 rounded-xl border border-primary/20 h-full">
                <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                  Quick Tips
                </h3>
                <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    Save local embassy numbers.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    Keep digital copies of your passport.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    Download offline maps of your area.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default SafetyTips;
