import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Rocket,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Container from '@/src/components/ui/Container';

const HelpCenter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <main className="flex-1">
      {/* Hero Search Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary/10 dark:bg-primary/5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#99e60066_0%,transparent_50%)]"></div>
        </div>
        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                How can we help you?
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Search for articles, guides, and tips to make your next journey
                unforgettable.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Popular Categories
            </h2>
            <Link
              className="text-primary font-semibold flex items-center gap-1 hover:underline"
              href="#"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-6 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
              <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                Getting Started
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                New to Travel Buddy? Learn the basics and set up your profile.
              </p>
            </div>
            <div className="group p-6 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
              <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                Account & Safety
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your privacy settings and keep your account secure.
              </p>
            </div>
            <div className="group p-6 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
              <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                Booking & Trips
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Everything about reservations, payments, and itinerary
                management.
              </p>
            </div>
            <div className="group p-6 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
              <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                Community
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                How to join meetups and follow community guidelines.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Articles */}
      <section className="bg-slate-50 dark:bg-background-dark py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Article 1 */}
            <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-background-dark p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <div className="w-full md:w-40 h-32 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="Scenic mountain lake during sunset"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOC_KeGCatc_Ib00NtRY8XjctViZnXPg1ONhZ1iPg4oJdUKXO9pQnyrOK4YS9NHhkZQ4K4N98_0Tk63QS6Dbx3mAvtyRPt5BFzpCvJGtMslrrVZxQftrPmJSyAkzSflb_g9zTTAFUh5TaNLCaHbloP-LLyvDqE8WR8cu0rIQgGMHbCUlJQfJZy-BnkmQPRkLJxPtkiSG3PlWXvKb0_Quh3ggM8pd22pdGSt_M5259p8s1ymHevhGCsaqZn1TJM9ipFjumqTNPWSA"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Safety
                </span>
                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  How to verify a Travel Buddy before meeting
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2">
                  Our comprehensive guide on staying safe and verifying
                  identities within the community.
                </p>
              </div>
            </div>

            {/* Article 2 */}
            <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-background-dark p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <div className="w-full md:w-40 h-32 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="Traveler looking at map in city"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKtjSrnabuLOGQVI-Q_b-pruC413bPb-qUrKwumWkuD-nvagYyYmu2AKcgzguAhZ_-ygidx-dmHmADQkasTWYrST92QmbZuyvpwMsVt4WzVA6PpUhMqK-bzsJ-LXkssf3PHKMyF2zB6PJSQ-0qOUuh6iyC4qYX0-GTf4t_RQUY17pzoZ4qyZxFvR5r4JmxzTQf1wH28la77qMkemAeoMvnMPAEKbzYUZhK8Msu6OH5LhXrGjbJkBiTJLlcKUyvHI4G-ri-qM0xLA"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Planning
                </span>
                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  Top 10 group destinations for {currentYear}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2">
                  Discover the trending spots where solo travelers are gathering
                  this year.
                </p>
              </div>
            </div>

            {/* Article 3 */}
            <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-background-dark p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <div className="w-full md:w-40 h-32 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="Financial data dashboard on laptop"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUNmT0dkDvpuaxcMdNrNN7xZYuSyvJlGZMYMm20ix6Bah1UhBizgLyLM3g0xew2_vfU5ErvOVGTnOm09NRWL8r_vuvuxUPp3BOMtXhwJSRef9qj0tDn8YM3ea02XvcijwUnWfxItgEqlBqOfmG497IJlSTbCKbjhiBXwuS-LR_EWxpEpBOrhMk6mPfjBl9dG3ZloPCz6XwR0abn1keSoIOGU55wLnXwCGIlI-YXv-Ue8gGhNO0A1nilgBrD2dfM-v0-Lecx0En3g"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Billing
                </span>
                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  Understanding split-payment for group bookings
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2">
                  Learn how our platform handles payments between different
                  travel buddies.
                </p>
              </div>
            </div>

            {/* Article 4 */}
            <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-background-dark p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md cursor-pointer group">
              <div className="w-full md:w-40 h-32 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="People sitting around a campfire together"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgV8AtfqsR9McMZWLD1EdWqaA0dgZosMYJMEMItY80moWducnRWW817F4LoZJhvBtEoHgFxLUJCHMZI6-DYU88yEwjgVo9N1oFYfbgJYwm6CKPQDMGFOQcoJyrD1qL1RQ6xWd1CRpIVI9CxbjbY5zuf9zRXVWYFBNIGu2c5AJ5Lh-5YW-7YuvVXZIy95U9LQbgu5uw4l3f5fYoKntejp4tEX8ZVquyqMHDbVO7tcKDv4PPnxHR7y41akiajjnAX0eY3fufG_9q4w"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Community
                </span>
                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  Hosting your first local meetup event
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2">
                  A step-by-step guide to becoming a local community leader.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Still need help */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="bg-slate-900 dark:bg-background-dark rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Can&apos;t find what you&apos;re looking for? Our support team
                and community are here to support your journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-primary text-background-dark font-bold py-4 px-10 rounded-full hover:bg-secondary transition-colors">
                  Contact Support
                </button>
                <button className="w-full sm:w-auto bg-white/10 text-white border border-white/20 font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-colors">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default HelpCenter;
