'use client';

import Container from '@/src/components/ui/Container';
import { Calendar, DollarSign, Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const plans = [
  {
    id: 1,
    location: 'Tokyo, Japan',
    date: 'Oct 12 - Oct 20, 2024',
    budget: '$2,500',
    type: 'Solo Trip',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARoFi_s-xMqA6eL9c2NBW_N2xYBAxYtMY64nclMlu8M-sgpkjmoSERCDvkeyMibLHVT0-e-C9RPwnDNwITw0teYQeTLvB4tChVSduhBqNktXklQLcJLTdDy3isvKYcT7U-megHj98eRpPMI2oDQ00iRXOxd03daI2WrKS6be4skoX3_62OUYjsdiAbqkm8TSGo4byq8tQTF1AbzcuD2QEChBbUrqDHHB5GKAqw6P_OXUn2LKPQhN_bWlIxQjT7y0hx_C7kwx9p3A',
  },
  {
    id: 2,
    location: 'Venice, Italy',
    date: 'Dec 22 - Jan 02, 2025',
    budget: '$4,200',
    type: 'Couples',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUm50disLfGZ9BOzP7oc859q-4ZEnXjVTLSZDmBw5KxO0hWKYBIiCPqgSaWTF95oOu9y_NnrnT3EhAuyN_RGMdw0OH8vvjEGvezvaqmGaJerT7sg7g9jso6PB8bXQA-J4lLNjIU1vAy5Uc0uIKvKU5TgSZT3_YXNahSI4Gi4zZZNq7rRXs6XuX27JsMdgkj-o7ON2Jlw9mULtRZfMNjjxvgaWJfnCoPfGMSma16wwy4pVAA3mA_kfhteskNa2Mw-yCHRW209uDnw',
  },
  {
    id: 3,
    location: 'Bali, Indonesia',
    date: 'Feb 15 - Feb 28, 2025',
    budget: '$1,800',
    type: 'Friends',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkQS2DB0sXXoObUIkDFlhKK7Tlr9kvwTozZnqGqvEZuPxrNLghCEo1mYmLC5MgfopD2CjvntWBmzoFRcCOVGHRy8xIYGub7DyKaFZmouw3M3HiGtGBaFnFUEno7-4evzUj2pielRKziY5o0cVkB9UiSOXaepng2mZknch5G6xyqND_ZGwctFIW8V3qWmZKUIp7f5LxQE3P2EUYebeCyHM9yVDjbmYWIw8Hbq7B1Hefi8OjVxWgVKzn-3g38-omNJNTjCzsJWSfsg',
  },
  {
    id: 4,
    location: 'Swiss Alps',
    date: 'Mar 05 - Mar 12, 2025',
    budget: '$3,100',
    type: 'Adventure',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHFiTMvRJOa0SCGCoM6C44xVSE0lZy8PjEv-fpAfkNN4kC7XWX4MrXe_R7lvO0SvP0Ge0VfMAhZ4tuaFCBPoOCQJ44DWS_O9a9PHQF47mJ_cHk-8wMjybxGwbdSf4_3juHHX_2qg21gzJZd7n28esVIU_Ow0GnY7NAHUsf71XPJzh29xCHP5Ju0z-9D_xYLlwgSp8lpfWpyy62vx2_lYQ8yw4fkdWAYtN9_NKj5UPZR-qLLNR03g2nQbHS9aq-1JVFRxah3UzK6Q',
  },
];

const TravelPlans = () => {
  return (
    <main className="min-h-screen py-10 bg-background-light dark:bg-background-dark">
      <Container>
        <section className="flex flex-col gap-8">
          {/* Header Area */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">
                Travel Plans
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                You have {plans.length} upcoming trips planned
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-slate-900 rounded-full font-bold hover:scale-[1.02] transition-transform cursor-pointer active:scale-95">
              <Plus className="w-5 h-5" />
              <span>Add Plan</span>
            </button>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col sm:flex-row rounded-xl overflow-hidden bg-primary/5 dark:bg-primary/10 border border-primary/20 hover:shadow-xl transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {/* Image Container */}
                <div className="w-full sm:w-64 h-64 sm:h-auto relative overflow-hidden shrink-0">
                  <Image
                    alt={plan.location}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    fill
                    src={plan.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent sm:hidden"></div>
                  <div className="absolute bottom-4 left-4 sm:hidden">
                    <span className="px-2 py-1 bg-primary text-slate-900 text-[10px] font-bold rounded uppercase tracking-widest">
                      {plan.type}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-slate-900 dark:text-white text-2xl font-bold group-hover:text-primary transition-colors">
                        {plan.location}
                      </h3>
                      <span className="hidden sm:inline-block px-2 py-1 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded uppercase tracking-widest border border-slate-900/10 dark:border-white/10">
                        {plan.type}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-slate-700/80 dark:text-slate-400">
                      <div className="flex items-center gap-3 text-base">
                        <Calendar className="w-5 h-5 opacity-60 text-slate-900 dark:text-white" />
                        <span>{plan.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-base">
                        <DollarSign className="w-5 h-5 opacity-60 text-slate-900 dark:text-white" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Budget: {plan.budget}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <Link
                      href={`/travel-plans/${plan.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-slate-900 rounded-full text-sm font-bold hover:scale-[1.02] transition-all cursor-pointer active:scale-95 shadow-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Details
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer active:scale-95">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default TravelPlans;
