'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { 
  Search, 
  Bell, 
  Calendar as CalendarIcon, 
  Utensils, 
  Mountain, 
  History, 
  Palmtree, 
  Music, 
  MessageCircle, 
  Ticket, 
  UserPlus, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const UserOverviewPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex-1 space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}!
          </h1>
          <p className="text-slate-500 mt-1 font-medium">You have 3 upcoming adventures and 5 new traveler matches.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search and Notification button removed */}
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Column: Upcoming Trips */}
        <div className="xl:col-span-8 space-y-10">
          <section>
            <div className="flex justify-between items-end mb-6 px-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Upcoming Trips</h2>
              <Link className="text-primary font-black text-xs hover:underline uppercase tracking-widest" href="/dashboard/user/travel-plans">View all trips</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trip Card 1 */}
              <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 hover:border-primary/20 cursor-pointer">
                <div 
                  className="h-48 w-full bg-cover bg-center transition-transform group-hover:scale-105" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClWIY957MZ36UMxP9Uy7qywD5VHXf4to-7_bWKq3tDyYPKAXHNYRmaRBY9-pgukYK-5uCoRGdfREJ1OwNTN1x78zoOFUXXx7p95-jYiRYWFIcWWkQr3MCRkMzuvK9aUr7dX7p5Z92XnAeUbjJtUspQdVWgzbXqDEX8tS341zhB9ee73aV6Vyi5EteVsJL3i_NDIn-MqRsCouGsU7bn5nH2gYE8lVmWKFmqjwYBOr_Jv1udSj9qfNfQUwhNLE113vuVyVjw182SXQ')" }}
                >
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Summer in Bali</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/10">In 12 days</span>
                  </div>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5 mb-5 font-bold uppercase tracking-tight">
                    <CalendarIcon className="size-3.5 text-primary" strokeWidth={3} /> July 15 - July 22, 2024
                  </p>
                  <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                      <img 
                        key={i}
                        alt={`Traveler ${i}`} 
                        className="size-9 rounded-full border-2 border-white dark:border-slate-900 shadow-sm object-cover" 
                        src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCeA32sC7xPSfG0taHXKUeSh_FySs0HQqaTIG0tEOg9NpJsAnnhTTBBHEIxamDc912w3JxaLVpDVV4EEKAXp1yGJXfOmG5pQgKmQJiJR3iZvxXSBn8f3iB_Nq96-msvdZZJNVK-JwCIO1advjbzHEbRArtV_KxTYoDWaFMHbcsI8PHYYniujsdBLzWOzd6AUQ34ivxRXpj72foV1D6x4bBxWhGN9chn3DTezUmHrNpul4Azx9kKRnNZo1H740m2czTF2oXbZZpeBw`} 
                      />
                    ))}
                    <div className="size-9 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-sm">+2</div>
                  </div>
                </div>
              </div>
              {/* Trip Card 2 */}
              <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 hover:border-primary/20 cursor-pointer">
                <div 
                  className="h-48 w-full bg-cover bg-center transition-transform group-hover:scale-105" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSD6hjIGf3JAnpTbXmUjDFucym2px5OaOKUIplZIWCSt_uMUWdieAw6JfDoPWfiIQgfj59hHBGqQnu0pb125hShv6zvxGYMx-3bykEhyBwkctTmp0FKGIOmNKTvLfvcVQ_qoXE_64MGg8k30niYmhQbBf5O1dbmA6fOdgwHBxwDcLwzgyjKd_jK-gs-HoqscTqTatrzx1yXoabEtD42SDK6MoEDptuZvP34irnspc2BApPrGdF_Ud2Psa5yX6t9aBVj6VA0bw4Hg')" }}
                >
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Skiing in Zermatt</h3>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">Winter Trip</span>
                  </div>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5 mb-5 font-bold uppercase tracking-tight">
                    <CalendarIcon className="size-3.5 text-primary" strokeWidth={3} /> Dec 10 - Dec 18, 2024
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-primary font-black uppercase tracking-widest animate-pulse">Looking for buddies...</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 px-1">Explore Destinations</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {[
                { label: 'Foodie Tours', icon: Utensils, color: 'text-rose-500' },
                { label: 'Hiking', icon: Mountain, color: 'text-emerald-500' },
                { label: 'Culture', icon: History, color: 'text-amber-500' },
                { label: 'Relaxing', icon: Palmtree, color: 'text-primary' },
                { label: 'Nightlife', icon: Music, color: 'text-indigo-500' },
              ].map((item) => (
                <button key={item.label} className="flex-shrink-0 px-8 py-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm flex flex-col items-center gap-3 border-2 border-transparent hover:border-primary transition-all cursor-pointer group hover:scale-105 active:scale-95 shadow-primary/5">
                  <item.icon className={`${item.color} size-8 group-hover:scale-110 transition-transform`} strokeWidth={2.5} />
                  <span className="font-black text-xs uppercase tracking-tight text-slate-700 dark:text-slate-300">{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Side Column: Matches & Activity */}
        <div className="xl:col-span-4 space-y-8">
          {/* Traveler Matches */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-7 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">New Matches</h2>
              <span className="size-7 bg-primary text-slate-900 text-xs font-black rounded-full flex items-center justify-center shadow-lg shadow-primary/20">5</span>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Sarah Jenkins', sub: 'Matches Bali Trip (92%)' },
                { name: 'Marcus Chen', sub: 'Solo traveler in Tokyo' },
                { name: 'Elena Rodriguez', sub: 'Matches Zermatt Trip (85%)' },
              ].map((match) => (
                <div key={match.name} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative">
                    <img 
                      alt={match.name} 
                      className="size-13 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors" 
                      src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCuEEKnZ9E7froBFsN-k4S-zqtAAEg8JPNTnAoDByvgK6TPC9h1L6HhSqKMrugEiIIvS5rXwje991b6GMKhNRi4DxQ_uXAArHiwJRu_PB6WdWFiB1wBS4vwXk3lq7QPHtPGjqgQma9c5ZrrYVW0e_ut1WCCHo6LpKEDCNb7eGuF_HSxCdvFnKdJx8cjczEAO29IZP-B2hEQUZ26El9gmpzUZwDNcodgPpyPlKRqNLSgpF9JPd3VmCJEUq-fLrzbzKrkei3kXixa7Q`} 
                    />
                    <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-sm text-slate-900 dark:text-white truncate">{match.name}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">{match.sub}</p>
                  </div>
                  <button className="size-10 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-all active:scale-90 cursor-pointer">
                    <MessageCircle className="size-5" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border-2 border-slate-50 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:border-primary/30 hover:text-primary transition-all text-xs uppercase tracking-widest cursor-pointer">
              See All Matches
            </button>
          </section>

          {/* Recent Updates Section removed */}
        </div>
      </div>
    </div>
  );
};

export default UserOverviewPage;
