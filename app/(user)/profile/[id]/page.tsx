'use client';

import Container from '@/src/components/ui/Container';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Compass,
  Edit2,
  Globe,
  MapPin,
  Star,
} from 'lucide-react';
import Image from 'next/image';

const ProfileDetailPage = () => {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar / Left Column */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-white dark:bg-background-dark rounded-2xl p-10 flex flex-col items-center text-center shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="relative mb-8">
                <div className="size-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                  <Image
                    alt="Alex Johnson"
                    className="w-full h-full object-cover"
                    height={160}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBPWLEx188d1gOGw2TOzY9G9taTHPQziUs81Pbn8XP78WA_IlwxE__DXlIquQiinhY2rV_jUNA5w6mn2KUV5ph8jw5HA6ZLEvyeqv5sa5IpXzW4bYW4ct3IZt_P1LqiMLxq6F4xl5urDkWN4ZbFgH5BgjXBgD6WHWyGwIQno1p8VFD5dWArqjVb3sCfEYUSf9_nz7MsArglaK0YpvTHbJmWdaMzKVPnZAuUKc6G9_iM7l1hrK-tU0fXDYb9dIP1aXL5F5XUKN9sw"
                    width={160}
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-primary size-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
                  <BadgeCheck className="text-slate-900 w-6 h-6" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Alex Johnson
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2 justify-center font-bold">
                <MapPin className="text-primary w-5 h-5" /> Lisbon, Portugal
              </p>
              <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Digital Nomad & Adventure Seeker. On a mission to explore every
                hidden waterfall in the world. 🌍✈️
              </p>
              <div className="grid grid-cols-3 w-full mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    42
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black mt-1">
                    Countries
                  </span>
                </div>
                <div className="flex flex-col border-x border-slate-100 dark:border-slate-800">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    128
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black mt-1">
                    Buddies
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    4.9
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black mt-1">
                    Rating
                  </span>
                </div>
              </div>
              <button className="w-full mt-10 bg-primary hover:bg-primary/90 text-slate-900 font-black py-4 rounded-full flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95">
                <Edit2 className="w-5 h-5" /> Edit Profile
              </button>
            </div>

            <div className="bg-white dark:bg-background-dark rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-left-6 duration-700">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <Compass className="text-primary w-6 h-6" /> Travel Interests
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Solo Travel',
                  'Hiking',
                  'Street Photography',
                  'Local Cuisine',
                  'Sustainable Travel',
                  'Beach Life',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-primary/5 dark:bg-primary/10 text-slate-700 dark:text-slate-300 rounded-full text-xs font-black border border-primary/10 tracking-tight"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area / Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Upcoming Plans */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
                  <CalendarDays className="text-primary w-7 h-7" /> Upcoming Plans
                </h3>
                <button className="text-primary text-sm font-black flex items-center gap-2 hover:underline tracking-tight cursor-pointer">
                  View Calendar <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-background-dark rounded-2xl p-5 flex gap-5 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all group cursor-pointer active:scale-[0.98]">
                  <div className="size-20 rounded-xl bg-slate-200 overflow-hidden shrink-0 relative shadow-md">
                    <Image
                      alt="Italy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      fill
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4GOEMd8n703mdJ5jOY75ZXaEXgxD_vXScoCWTsNDS_n27R_GfRRbIA7Y2XrZI2R2LWfj2HY_mbiqb635W1ft4ZuHfvevRLxo_MsBaIzNSwPPpHvVk8XZRzR-z8cPprwu9dY_MXbW41TrsiYsLfxp_gnMtEXm9ZT_AnX-3rWIH_-A9mba8dag0DEUmT0ml-OACD2cXBxpWAc_kh9UH6IiT6qFlr2zXoRbAjRlsm8bi5Owo3H_uKoKNSgXcXf-B3dWEftkG4nau3g"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-black text-slate-900 dark:text-white text-lg leading-tight">
                      Amalfi Coast, Italy
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">
                      Oct 12 - Oct 20, 2024
                    </p>
                    <div className="flex mt-3 -space-x-2">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="size-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-sm relative"
                        >
                          <Image
                            alt="Companion"
                            className="w-full h-full object-cover"
                            fill
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuABw5hNw0JNrVRXfoSs3_BXA9DrBnKZFVwWjOmiATQ2m5DR5HC3jEy50ZxxjV4VoV1coSAIMVb8ZwxiPW2Pd8BKE-wgW_i3ed41nnbIsaGu_9X80oI8Hh6tv0wky391b7vI11d373bnKgu9SjgXXpYQEUk-wkQ5FZhDBJ7C24AN9NuBsELxOqUzCM3gTnCW3zrJ2LmfCUX-GFWnF8pQxNBdiCwSjlzf1Zwy383vNxAwA50hxtLb5EgT4rXU1CaJbZwSahZXSrd03A"
                          />
                        </div>
                      ))}
                      <div className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-primary flex items-center justify-center text-[10px] font-black text-slate-900 shadow-sm relative">
                        +2
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-background-dark rounded-2xl p-5 flex gap-5 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all group cursor-pointer active:scale-[0.98]">
                  <div className="size-20 rounded-xl bg-slate-200 overflow-hidden shrink-0 relative shadow-md">
                    <Image
                      alt="Japan"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      fill
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLg4pddFgU2R_pBr7qhsapMPnqS8VdVj-akonq0zwBEqPoQ3alCsaHHD8mdVHZvq4qopFYrN-6nL8Vanxume44M9y4gtIqCY_9W8_Lq87bHHS1wHZPoz1aTn1IDEpsk_oG7Cr4KwF-lbct7pS-VFxZRp0wgh_Z5uNiHFz0BT4T7HyBVLRRi12SqElfjjV83Y6xaoRqi8lp1rX68ZvOjiEr0fIT1ChA1yGfuXCfdtPdLBCJJQ3Vuuhi38KH5DlgV0nN8yITC4RxSA"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-black text-slate-900 dark:text-white text-lg leading-tight">
                      Kyoto, Japan
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">
                      Dec 01 - Dec 15, 2024
                    </p>
                    <span className="text-[10px] font-black text-primary mt-3 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Looking for buddy
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Recently Visited */}
            <section tabIndex={0}>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
                <Globe className="text-primary w-7 h-7" /> Recently Visited
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: 'Paris',
                    country: 'France',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIumrjc8oHIR8cO1JC3rnv_3jtcwd5yveCB4bDRXRo8VJCN3t2wZ6iWkVfegcBs-5pP1vvMnkQ2AdaBXb05j7WFKJEL96KYfjRyvRtZ5pfJylnURsBV_ZFFBg81PbG4KCjEr8yFFPimDNKrFBgwfo271OJ1fr0RQfKAGlJEgRoJ7OArVgecEvGuByOwgM3tqLpaN2OOsdtoAcg4fVrLnKD-Fg7OD7Js5ODW-laO-1KmX5bbU-IopW8k97jpcYZi-yN_XnJcWJ6-A',
                  },
                  {
                    name: 'Bali',
                    country: 'Indonesia',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAueTz_dARtS6902OuK9QQpK_lGbb3zIrfTILehiK8F1qrliZiKubw7MqxSHk4N532jwarcvCFtaSDMIV6N2mxiGyLtBmvoLUG7eU69UdaSVD9bNfiqog9r9uvDvPVDEdpCpsfMOOlUN_n0Fg-CwM3n47GADEh3VME3whNJAiBQ-kpEOp1WtT7hij56PoelY1P2grsUyccQTEyL6LrU6yv4rQ2dRWf6F-6Hi9dhVtfHEzkwKKTm9ZQU--f8posH_hE9H--2_HXxRA',
                  },
                  {
                    name: 'Marrakech',
                    country: 'Morocco',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBc0j0PM54YjRwX0Sgx1Qecdu2Dj0g5XmCQii5hyRXsC0V3gNCY6gSNSrYsNnWcXLtv-ZY71KEoSkrgbaa3gd1tZ-qq3ar8yEVKYZpQTKeermxqbt88N9veF4iOWcb_PuGlkrV4-vQl_wmJxPC4gi_v3mM5yYA8WeCbFsk8AytQyJUoHmg6u9fAIRjoT0Nuxc2RhM4LXLLG9RRLYWvwtBaz0VToI4qc55OW2gL_bK-phS1uF41kM8tivk6EbtqzXuaCUWOkzadhMA',
                  },
                  {
                    name: 'Dubai',
                    country: 'UAE',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDO00sGwsR0QUl7MLmMO2KsRFQhudC5zkH5Uqu4R0ZHwaKMS76xDeyGkeZ5PDTCkiYizZMo7BM4ejBmgU2VLZTbGkW5S4PhCLFR_6pdOib4Kdh3IsUj1iTolAvJzFJYTkywQhBdhG1e8tB-BnoWN3nek1wuK0eidEV1RsmnFpPoc3LlzlpVh33iEYWRbvnFwRPWnOcWoUYuSpepwUxOZPZG0wP6Ul8SryJHo4GL3Ep1FBnB_D0LtM-BrT-Omh9kuT6u6QcBKwLx0g',
                  },
                ].map((place) => (
                  <div
                    key={place.name}
                    className="flex flex-col gap-2 group cursor-pointer"
                  >
                    <div className="aspect-4/3 rounded-2xl overflow-hidden relative shadow-md">
                      <Image
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        fill
                        src={place.image}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="absolute bottom-3 left-3 text-white font-black text-xs drop-shadow-md">
                        {place.country}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
                  <Star className="text-primary w-7 h-7" /> Reviews (48)
                </h3>
                <div className="flex items-center gap-1.5 text-primary">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <Star className="w-5 h-5 opacity-50" />
                  <span className="text-lg font-black ml-2 text-slate-900 dark:text-white">
                    4.9
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  {
                    name: 'Maria Silva',
                    desc: 'Met in Lisbon • 2 months ago',
                    content:
                      '"Alex is an incredible travel buddy! He knows all the best coffee spots in Lisbon and has some amazing stories from his time in Southeast Asia. Very respectful and organized traveler. Highly recommended!"',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGg4IdBssWvk3UVy-PH4VZe_8TdIWUaaq-m8nSPOetsaEnC-y4qVz8TlgzJaHZ8xbCcceb2gfkLdQh222k0JXcuuxxdnIoMGzuSVbIKASSV60ZYySAezjDTkIMvFFQWyJEJViSo702GRJ6osoPGJ1BRe1ZDYbUrKrEzhPMoFt8JeRo6T1qcSxS6vU-cQ99NUofqU2stnhYl_HqUEgy9s79ORoCQFcfDGfrjFfHJBQNlyR_pLV6_UdEdP2W55pS9b4AcDWSZ_H9Kg',
                  },
                  {
                    name: 'David Kim',
                    desc: 'Hiked in Madeira • 5 months ago',
                    content:
                      '"Super energetic and positive. We did a 3-day trek together and Alex kept the vibes high even when it rained. Great photographer too!"',
                    image:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEYIV2G-PKiV0cag_AdVLcpk8rREpHJLHhwLIP8eXj6fDmmIfRkvsuFOLAG8upHK2Faa8Mhaj8gNJvGYgkXVYzvmtMVmoPyRl5U_R9tTIovIWIDuxxJvkxfpXbfIrdMVq8iQbPhYR3dfMhb_rAvnOCHv1G45Jieyzla_0eO0VRe-e_BoAkSfzOIsKTxnWTIfHeBEqpA-fUGHSayaeogBvy9A-QMTdtej2-whYSY8-p0jhRy9zYjB4YwHD5sEoGLFI_wPVYhHM4ew',
                  },
                ].map((testimonial, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-background-dark p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="size-12 rounded-full overflow-hidden bg-slate-200 relative shadow-sm">
                        <Image
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          fill
                          src={testimonial.image}
                        />
                      </div>
                      <div>
                        <h5 className="font-black text-slate-900 dark:text-white text-base">
                          {testimonial.name}
                        </h5>
                        <p className="text-xs text-slate-500 font-bold mt-0.5">
                          {testimonial.desc}
                        </p>
                      </div>
                      <div className="ml-auto flex gap-1 text-primary">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed italic font-medium">
                      {testimonial.content}
                    </p>
                  </div>
                ))}
                <button className="py-4 text-sm font-black text-slate-500 hover:text-primary transition-colors text-center w-full uppercase tracking-widest cursor-pointer active:scale-95 leading-none">
                  Read all 48 reviews
                </button>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProfileDetailPage;
