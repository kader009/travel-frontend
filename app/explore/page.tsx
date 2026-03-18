'use client';

import Container from '@/src/components/ui/Container';
import {
  Calendar,
  ChevronDown,
  MapPin,
  Search,
  Star,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const travelers = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    location: 'Madrid, Spain',
    rating: '4.9',
    tags: ['Hiking', 'Vegan Food', 'Yoga'],
    nextDest: 'Bali, Indonesia',
    nextDates: 'Oct 12 - Nov 05',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsf0oPhudtvPwzq9VY325EATcHkzj8uszKnzFcJsDLmxTGJ7iJ5S-LsSPKdQ3NtC97JNbewGtIwoUfpeYu70mMH1RX_G1Kce7OKjWCcpy6Op0zfFSkMnc_6Go-SXXF-Th9Gg54ExDNqfk_3Gszh0_SZ00HrvsXL_w9BNPcRKaQ3j3tRNUMwzehsLAo-wEi67csgd-DBtxYoIR6J-dyKRY_Y5u4j4LoJ-Ne4pauXM-4ebSejk0bXnsniACUhkKzJzAJ1XuSpGAZBA',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    location: 'London, UK',
    rating: '4.7',
    tags: ['Photography', 'Surfing'],
    nextDest: 'Cape Town, SA',
    nextDates: 'Dec 20 - Jan 15',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIVjf9q4VcDOpOv_-40tDzcIQWuoeAutx0zi7Ilak-jcLPP0wpRcIas7SMc6OQKVNgXNwOT_erwJfrdSRKd5_ao0TkKsiPZCrKY_vyb1nGynAk7hWJ1CRKyCR0RqitQxv7OxdtbfCeg0F9APEu7tGRn98Bz-RZ9D0WVsK9FaCZtDWn0lBOq-xv9t4lcsCRqn1_zgGqnuLbWVT6vFDfl96Y3YLuQEZt-UnsQFkziaPxbz4X4b0jhS4CkJ8_4eoqnuynWofv7GE61Q',
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    location: 'Melbourne, AU',
    rating: '5.0',
    tags: ['Backpacking', 'Museums'],
    nextDest: 'Tokyo, Japan',
    nextDates: 'Oct 25 - Nov 10',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0omlkGfxDvrMGtr2eJLHTF5ZFWYI5JIMZ7-oXY7ip483m0jhUwtx0ch4V9gBI40L8SbWN7jBz07EuiP5QMrBOMOVHjp3_obvax7rA1M6GZZ_1yWFg2YEg3B6oJzXqn7c_Ipqvqw0HTB5ZVsAK4JQx4TkcC2HjVOiYAS4KZP6jIpC-iEdtED6BCCXCtV6xsCsSywG2Y5sxDwOP3NfQ38MAybORieqfAzWC0wq2PpeypV-hk71yvRAwH-QcNUoOt1DsoYVvv8K4ZQ',
  },
  {
    id: 4,
    name: 'David Chen',
    location: 'San Francisco, USA',
    rating: '4.8',
    tags: ['Coding', 'Coffee', 'Skiing'],
    nextDest: 'Zermatt, Swiss',
    nextDates: 'Jan 05 - Jan 18',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9JWl76xkSAOo887QYUayQWp8w6Eb_MH1EJcz-POaidMiJirpMPFaKigWOf1OySwPPvIR2ayhnGFMEqNFIJ8UXUw_gAcTTRQsC0SC8MBdxcLQqZjyQ6PWcACwRefW2SEfq8xR3oBOhCE-ZzecB7E9ueSACrgUEFy1mHQOWZkVjD0hfCEIgU_uYp3U3ZJFn_0I_mUliAyh1Yb2dqN1C9Y9kXoWCXQXMkLN8y1OSXFET9icWR55CPkifD79cT7rU5MHVP3FiSsfXeQ',
  },
];

const interests = [
  'All Travelers',
  'Hiking',
  'Food Photography',
  'Backpacking',
  'Luxury Stay',
  'Surfing',
  'Digital Nomad',
];

const ExplorePage = () => {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-12">
      <Container>
        {/* Search & Filter Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Explore Travelers & Match
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
              Discover 2,400+ active travelers ready for their next adventure.
            </p>
          </div>

          {/* Horizontal Search Bar */}
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row gap-2">
            <div className="flex-1 flex items-center px-6 py-4 gap-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
              <MapPin className="text-primary w-5 h-5" />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                  Destination
                </span>
                <input
                  className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white placeholder:text-slate-400 font-bold text-lg"
                  placeholder="Where to?"
                  type="text"
                />
              </div>
            </div>
            <div className="flex-1 lg:flex-initial flex flex-col sm:flex-row gap-0 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
              <div
                className="flex items-center px-6 py-4 gap-4 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 flex-1 cursor-pointer group/date"
                onClick={(e) => {
                  const input = e.currentTarget.querySelector('input');
                  if (input && 'showPicker' in input) {
                    (input as any).showPicker();
                  }
                }}
              >
                <Calendar className="text-primary w-5 h-5 shrink-0 transition-transform group-hover/date:scale-110" />
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                    Start Date
                  </span>
                  <input
                    className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white font-bold text-lg cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                    type="date"
                  />
                </div>
              </div>
              <div
                className="flex items-center px-6 py-4 gap-4 flex-1 cursor-pointer group/date"
                onClick={(e) => {
                  const input = e.currentTarget.querySelector('input');
                  if (input && 'showPicker' in input) {
                    (input as any).showPicker();
                  }
                }}
              >
                <Calendar className="text-primary w-5 h-5 shrink-0 transition-transform group-hover/date:scale-110" />
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                    End Date
                  </span>
                  <input
                    className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white font-bold text-lg cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                    type="date"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center px-6 py-4 gap-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
              <Users className="text-primary w-5 h-5" />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                  Travel Type
                </span>
                <select className="w-full border-none focus:ring-0 bg-transparent p-0 text-slate-900 dark:text-white font-bold text-lg appearance-none cursor-pointer">
                  <option>Solo</option>
                  <option>Family</option>
                  <option>Friends</option>
                  <option>Couple</option>
                  <option>Alone</option>
                </select>
              </div>
            </div>
            <div className="lg:w-auto p-1">
              <button className="w-full lg:w-16 h-16 bg-primary hover:bg-primary/90 text-background-dark rounded-xl flex items-center justify-center transition-all group cursor-pointer shadow-lg shadow-primary/20">
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Interest Tags */}
          <div className="flex flex-wrap gap-3 mt-8 overflow-x-auto pb-4 custom-scrollbar">
            {interests.map((interest, index) => (
              <span
                key={index}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs ${interest === 'All Travelers' ? 'bg-primary text-background-dark' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'}`}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {travelers.map((traveler) => (
            <div
              key={traveler.id}
              className="group bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="relative h-56 lg:h-64 overflow-hidden">
                <Image
                  alt={`A portrait of ${traveler.name}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  fill
                  src={traveler.image}
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                  <Star className="text-yellow-400 w-4 h-4 fill-current" />
                  <span className="text-xs font-black text-slate-900 dark:text-white">
                    {traveler.rating}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-5">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {traveler.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary" />{' '}
                    {traveler.location}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {traveler.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary dark:text-primary text-[10px] font-black rounded-lg uppercase tracking-wider border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Next Destination
                  </p>
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {traveler.nextDest}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {traveler.nextDates}
                    </span>
                  </div>
                  <Link
                    href={`/profile/${traveler.id}`}
                    className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-background-dark text-slate-700 dark:text-slate-200 text-sm font-black rounded-full transition-all cursor-pointer shadow-xs active:scale-95 leading-none flex items-center justify-center"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination or Load More */}
        <div className="mt-16 flex flex-col items-center">
          <button className="px-10 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-full font-black text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary transition-all flex items-center gap-3 cursor-pointer active:scale-95 shadow-xl">
            Show more travelers
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </Container>
    </main>
  );
};

export default ExplorePage;
