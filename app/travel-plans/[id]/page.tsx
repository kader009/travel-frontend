'use client';

import Container from '@/src/components/ui/Container';
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Info,
  MapPin,
  Users,
} from 'lucide-react';
import Image from 'next/image';

const TravelPlanDetails = () => {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-10">
      <Container>
        {/* Hero Section */}
        <div className="relative w-full rounded-2xl overflow-hidden aspect-video lg:aspect-21/9 mb-10 group shadow-2xl">
          <Image
            alt="Scenic aerial view of tropical Bali coastline and turquoise water"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            fill
            priority
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgcLVBiwOcmYPWMyavtYHqrsk6Uy25G9vP0y59y35lWv-Zuo5ZkdjzAS9TFj0rGUzNT2uy9RjcCBaomrCQuy7vFLETVwz-xJa8ewbOUniJEKOFzJh27OUQDl4QqNZNpJMUYXETcmxoit373FGq02dPKewt57cEoX86_0HIxrR4Ejvd7udfNngwqgHbdliiO16SefFoBLTTeOhus5MAFR0LqxtlxBMSr9EyFSiWaWI4iJSiKyEloomLf6fZdfx1C6qZk2v5Ma2Vkg"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full">
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="bg-primary text-background-dark text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Adventure
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                7 Days
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-3 tracking-tight">
              Bali Adventure: Surfing & Temples
            </h1>
            <p className="text-slate-200 flex items-center gap-2 font-medium">
              <MapPin className="w-5 h-5 text-primary" />
              Uluwatu & Ubud, Indonesia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Stats */}
            <section className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-primary/10 shadow-sm transition-all hover:shadow-md">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <Info className="w-6 h-6 text-primary" /> Overview
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-black tracking-widest">
                    Dates
                  </p>
                  <p className="font-bold text-lg">Oct 12 - Oct 19</p>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-black tracking-widest">
                    Group Size
                  </p>
                  <p className="font-bold text-lg">4/6 Slots filled</p>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-black tracking-widest">
                    Language
                  </p>
                  <p className="font-bold text-lg">English, Balinese</p>
                </div>
              </div>
            </section>

            {/* Itinerary */}
            <section className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Trip Itinerary
              </h2>
              <div className="space-y-0">
                {/* Day 1 */}
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-black text-background-dark shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <div className="w-1 h-full bg-slate-200 dark:bg-slate-800 my-2 rounded-full"></div>
                  </div>
                  <div className="pb-10 pt-2">
                    <h3 className="font-black text-2xl text-slate-900 dark:text-white">
                      Arrival & Sunset Dinner
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg leading-relaxed">
                      Arrival at Ngurah Rai International Airport, transfer to
                      Uluwatu villas, and welcome seafood dinner at Jimbaran
                      Bay.
                    </p>
                    <div className="mt-5 flex gap-3">
                      <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-md">
                        <Image
                          alt="Traditional Balinese welcome dinner on the beach"
                          className="object-cover"
                          fill
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB10c5Ygs6SACvXvdbsJL4eIR0MB9FOp8joesC-9qtyJ72zziHnmzvQk14Fwes3iDgVKq4-8NyInMqmjlMMUXLWJC4QzCUryddohV6S38-6e_aHCKNFZAlmsbIHQDizzVIyy3SCcdiyk9SEDFXvFSlp4VPr5b0ly2GQ9G0suqmbsoZtx8k4PHs_51y_KLMkg5mXzb2ouXv3RD0hnGnbAfJ9Zy0m-1EF_cbklOetHOdSVa-x10_QpPHy0231r4XFORp0NGmYvaE-tA"
                        />
                      </div>
                      <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-md">
                        <Image
                          alt="Beautiful sunset over Uluwatu cliffs"
                          className="object-cover"
                          fill
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2oJKWfG8ZEmhsEX6V26XxA5ecXP02qeqfQNJm8SgPlHPNk38zSRCypm5tfl1IbF80IFbfOLdw-xkj3VThUw76biyySuCELwCvQJgeTPX60CIyMB54oZ2z6MV_ly01rzR9HkpMIelZzyF64gLun04Gd_toMM_xtjxjtWofRo_bS0PYxJk4cRm-_P4uKT8gqGKWcMxNqf6n8AX565xEMKsf5dAo7ZZ79Z_gipGY4Giq6KKg-1lbKTsjzc_srAKclREfbfPn8vbjBA"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Day 2 */}
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-black shrink-0 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      2
                    </div>
                    <div className="w-1 h-full bg-slate-200 dark:bg-slate-800 my-2 rounded-full"></div>
                  </div>
                  <div className="pb-10 pt-2">
                    <h3 className="font-black text-2xl text-slate-900 dark:text-white">
                      Surfing & Uluwatu Temple
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg leading-relaxed">
                      Morning surf lesson at Padang Padang beach followed by a
                      sunset visit to the famous Uluwatu Temple and Kecak Dance.
                    </p>
                  </div>
                </div>
                {/* Day 3 */}
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-black shrink-0 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      3
                    </div>
                  </div>
                  <div className="pb-10 pt-2">
                    <h3 className="font-black text-2xl text-slate-900 dark:text-white">
                      Cultural Ubud Discovery
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg leading-relaxed">
                      Transfer to Ubud, visit Tegalalang Rice Terrace and Sacred
                      Monkey Forest Sanctuary.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Budget Info */}
            <section className="bg-primary/5 dark:bg-primary/10 p-8 rounded-2xl border border-primary/20 shadow-xs">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <DollarSign className="w-6 h-6 text-primary" /> Estimated Budget
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-primary/10">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Accommodation (Shared Villa)
                  </span>
                  <span className="font-bold text-lg">$450</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-primary/10">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Activities & Transfers
                  </span>
                  <span className="font-bold text-lg">$280</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-slate-900 dark:text-slate-100 font-black text-xl">
                    Total Base Cost
                  </span>
                  <span className="text-3xl font-black text-primary">$730</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-3">
                  *Excluding international flights and personal expenses.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Host Profile */}
            <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-black tracking-widest mb-6">
                Your Host
              </h3>
              <div className="flex items-center gap-5 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-lg shrink-0">
                  <Image
                    alt="Portrait of the trip host"
                    className="object-cover"
                    fill
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWpMjkYmPA40gaIyoKVHXWjcPZAnQfV_Yn8bKDlTDX3mXsJYaQyc2w5q_x1F1SdLvFzcPj_Q6fyT-BUYmK5-BOA23R2MOa-60RFe0LBm-pTNkSY-okH93Rr09fmpMSHz4UgKKSCcx0KoSg9iLR1sUw1qNrqAE7o-Rp01vU1bTvmflMr3VW9fTReEjKvX1gKYyH9yUPwW0HVcPMew0eNLOt5zrzHsJ1_68xz4u_zYoBf--GTYfNyTWn9qLF04r-DHnfZubKLt6LKw"
                  />
                </div>
                <div>
                  <p className="font-black text-xl text-slate-900 dark:text-white">
                    Marco Rossi
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Verified Explorer
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 italic leading-relaxed">
                "I've lived in Bali for 2 years and know all the secret surf
                spots. Let's make this epic!"
              </p>
              <div className="flex gap-4">
                <div className="flex-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] text-slate-500 uppercase font-black">
                    Trips
                  </p>
                  <p className="font-black text-lg">12</p>
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] text-slate-500 uppercase font-black">
                    Rating
                  </p>
                  <p className="font-black text-lg">4.9/5</p>
                </div>
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="bg-slate-900 dark:bg-slate-900/80 p-8 rounded-2xl border border-primary/30 sticky top-24 shadow-2xl">
              <div className="mb-6">
                <p className="text-slate-400 text-sm font-medium mb-1">
                  Base price per person
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">$730</span>
                  <span className="text-slate-400 font-bold">/ 7 days</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                  <Users className="w-5 h-5 text-primary" />
                  <span>2 spots left! Join Sarah & Leo</span>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 hover:scale-[1.02] text-background-dark font-black py-4 rounded-xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 leading-none">
                  Request to Join
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full border-2 border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 font-bold py-3.5 rounded-xl transition-all cursor-pointer active:scale-95">
                  Message Host
                </button>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-800">
                <h4 className="text-white font-black mb-4 text-xs uppercase tracking-widest opacity-60">
                  Who's going?
                </h4>
                <div className="flex -space-x-3">
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmFfZWtRAEjUqeVBKDbjzBPWqnP7e4aY6o3pUQ63tGFDkpY4wKbtQ_esPYVDjy0eqZ-dE8qzLkK868zATuggrag2JizIpvRLz4W60ya5ulUa3CFJcO_s8VztwHB_ASzdy-pE8Ojh-3J5UCUF0ppQRLUOpUfhaDknA1Rk_t3eucJ7ryk4Z_ERJfSHGBFs8zMDoJZ4O5xprEM-p5EZeAEuljcBfYS_GN2yc_5WjSLobR5niDFTRY5U9rGdLnEtNRkmTnK2ae0r0psg',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBx8MeNWXkVy7qFKkMxJYy1qiTSsH937LyJeWVXV9oVUQxL4K0TVMolNVkOksKncy5FO2Cmua2_-TLQPHU4m8XeEYumBb7iWSLdG20smc6slrvUPlkGp_QYR-wm6KY7M5wZjupPlIcqVHdjHZ6Z_zFS_7BL_cSlwTy8jZgNntZ2KYkULTy2UB9s6OolkoOYCN6qY8xAVS1gDedEhJBQz4MKCMqcBpoTYHJkHPiT6yxYB3BR_WNAbVBiY0d1w1vEO7Y59ozLsSfAZQ',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBCR5HxSXX9Spgi-eID0d0Dtx8xmBrRUCDqwhdp76Ta1_4RnognGagXjPcN354G62ejxp1kPuIeKxCxgCZDr9gboqRSVja9Xj9w4iDG0KbEWS2gfZvSOfgw7GXFO86HWYpNdwgnJ7GRH53u-5DbizfhxTW2zsfgQIz7Vkj3RaTee5k6EvMgX7j00TOMbxE8xCpm_cFyu-xea--dXpwwmvF7_gXdpn7_lwUKq71rktfWPQaYn1-RI3UOB1zISJ5pAGM7DWgoP9wR_g',
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-11 h-11 rounded-full border-2 border-slate-900 overflow-hidden shadow-md"
                    >
                      <Image
                        alt="Profile photo"
                        className="object-cover"
                        fill
                        src={src}
                      />
                    </div>
                  ))}
                  <div className="w-11 h-11 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs text-white font-black shadow-md">
                    +1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Map Preview */}
        <section className="mt-16 mb-16">
          <h2 className="text-3xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
            Location
          </h2>
          <div className="w-full h-80 rounded-2xl overflow-hidden grayscale contrast-125 brightness-75 border-2 border-slate-200 dark:border-slate-800 shadow-xl transition-all hover:grayscale-0 duration-700">
            <Image
              alt="Stylized map showing Bali island and travel route"
              className="object-cover"
              fill
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb86OPUAeOAV015F524mP3mdCrOxgsulITfyRpb0WEoeyKRmzQEFkMy7CAcF7EmwwR6P3M9dhYADCSgHVTVLj0WGE7-KpMJV7sJqhxjsffW9ZKjvcnyZXCpqC7D53kkd_uiXzHWbYugyxXH4Ld4TX3IyXJLRh9BT-Q19SepV-HNxN-eehEV8abGDUP4vD4qEUCjMryo3LEbRP_PISvDo5ufsNoyJFYFwq4MTEhtwhb-ORQLw7YtUvIwN0HqzXFD1vLB91XgpIy1g"
            />
          </div>
        </section>
      </Container>
    </main>
  );
};

export default TravelPlanDetails;
