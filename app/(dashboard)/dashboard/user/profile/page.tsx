'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/src/redux/store/store';
import {
  CheckCircle,
  MapPin,
  Edit,
  Target,
  Calendar,
  Globe,
  Star,
  UserCircle,
  Loader2,
  Compass,
} from 'lucide-react';
import { useState } from 'react';
import EditProfileModal from '@/src/components/module/dashboard/EditProfileModal';
import { useGetMyTravelPlansQuery } from '@/src/redux/store/api/endApi';
import Link from 'next/link';

const UserProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: plansData, isLoading: plansLoading } =
    useGetMyTravelPlansQuery();

  const myPlans = plansData?.data || [];
  // Sort by start date and show upcoming ones
  const upcomingPlans = [...myPlans]
    .filter((plan) => new Date(plan.startDate) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );

  return (
    <>
      <EditProfileModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <main className="max-w-7xl mx-auto w-full px-0 sm:px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Section */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="relative mb-6">
              <div className="size-32 rounded-full overflow-hidden border-4 border-primary bg-primary/10 flex items-center justify-center relative">
                {user?.image ? (
                  <Image
                    alt={user.name || 'Profile'}
                    fill
                    className="object-cover"
                    src={user.image}
                  />
                ) : (
                  <UserCircle
                    className="size-20 text-primary"
                    strokeWidth={1}
                  />
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-primary size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm">
                <CheckCircle
                  className="size-4 text-slate-900 fill-primary"
                  strokeWidth={3}
                />
              </div>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {user?.name || 'Traveler'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 justify-center">
              <MapPin className="size-4 text-primary" />{' '}
              {user?.currentLocation || 'Lisbon, Portugal'}
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-semibold">
              {user?.bio ||
                'Digital Nomad & Adventure Seeker. On a mission to explore every hidden waterfall in the world'}
            </p>
            <div className="grid grid-cols-3 w-full mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight">
                  {user?.visitedCountries?.length || '42'}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  Countries
                </span>
              </div>
              <div className="flex flex-col border-x border-slate-100 dark:border-slate-800">
                <span className="text-lg font-black tracking-tight">128</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  Buddies
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight">4.9</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  Rating
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-8 bg-primary hover:bg-opacity-90 text-slate-900 font-black py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Edit className="size-4" strokeWidth={3} /> Edit Profile
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
              <Target className="size-5 text-primary" strokeWidth={3} /> Travel
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {(user?.travelInterests?.length
                ? user.travelInterests
                : [
                    'Solo Travel',
                    'Hiking',
                    'Street Photography',
                    'Local Cuisine',
                    'Sustainable Travel',
                    'Beach Life',
                  ]
              ).map((interest) => (
                <span
                  key={interest}
                  className="px-3.5 py-1.5 bg-primary/10 text-slate-700 dark:text-slate-300 rounded-full text-[11px] font-black uppercase tracking-tight border border-primary/5"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
                <Calendar className="size-5 text-primary" strokeWidth={3} />{' '}
                Upcoming Plans
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {plansLoading ? (
                <div className="col-span-full py-12 flex flex-col items-center gap-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Retrieving Journeys...
                  </p>
                </div>
              ) : upcomingPlans.length > 0 ? (
                upcomingPlans.map((plan) => (
                  <Link
                    key={plan._id}
                    href={`/travel-plans/${plan._id}`}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-5 flex gap-5 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group"
                  >
                    <div className="size-16 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 relative">
                      <Image
                        alt={plan.destination}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        src={
                          plan.images?.[0] ||
                          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
                        }
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-black text-slate-900 dark:text-white leading-tight capitalize">
                        {plan.destination}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase">
                        {new Date(plan.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        -{' '}
                        {new Date(plan.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <span className="text-[10px] font-black text-primary mt-2.5 uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded w-fit border border-primary/10">
                        {plan.travelType}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                  <Compass className="size-12 text-slate-200 dark:text-slate-800 mb-4" />
                  <p className="text-slate-500 font-bold max-w-xs px-4">
                    No upcoming adventures planned yet. Start your next journey
                    today!
                  </p>
                  <Link
                    href="/explore"
                    className="mt-4 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                  >
                    Find Buddies
                  </Link>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight px-1">
              <Globe className="size-5 text-primary" strokeWidth={3} /> Recently
              Visited
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1">
              {[
                {
                  country: 'France',
                  city: 'Paris',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIumrjc8oHIR8cO1JC3rnv_3jtcwd5yveCB4bDRXRo8VJCN3t2wZ6iWkVfegcBs-5pP1vvMnkQ2AdaBXb05j7WFKJEL96KYfjRyvRtZ5pfJylnURsBV_ZFFBg81PbG4KCjEr8yFFPimDNKrFBgwfo271OJ1fr0RQfKAGlJEgRoJ7OArVgecEvGuByOwgM3tqLpaN2OOsdtoAcg4fVrLnKD-Fg7OD7Js5ODW-laO-1KmX5bbU-IopW8k97jpcYZi-yN_XnJcWJ6-A',
                },
                {
                  country: 'Indonesia',
                  city: 'Bali',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAueTz_dARtS6902OuK9QQpK_lGbb3zIrfTILehiK8F1qrliZiKubw7MqxSHk4N532jwarcvCFtaSDMIV6N2mxiGyLtBmvoLUG7eU69UdaSVD9bNfiqog9r9uvDvPVDEdpCpsfMOOlUN_n0Fg-CwM3n47GADEh3VME3whNJAiBQ-kpEOp1WtT7hij56PoelY1P2grsUyccQTEyL6LrU6yv4rQ2dRWf6F-6Hi9dhVtfHEzkwKKTm9ZQU--f8posH_hE9H--2_HXxRA',
                },
                {
                  country: 'Morocco',
                  city: 'Marrakech',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc0j0PM54YjRwX0Sgx1Qecdu2Dj0g5XmCQii5hyRXsC0V3gNCY6gSNSrYsNnWcXLtv-ZY71KEoSkrgbaa3gd1tZ-qq3ar8yEVKYZpQTKeermxqbt88N9veF4iOWcb_PuGlkrV4-vQl_wmJxPC4gi_v3mM5yYA8WeCbFsk8AytQyJUoHmg6u9fAIRjoT0Nuxc2RhM4LXLLG9RRLYWvwtBaz0VToI4qc55OW2gL_bK-phS1uF41kM8tivk6EbtqzXuaCUWOkzadhMA',
                },
                {
                  country: 'UAE',
                  city: 'Dubai',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO00sGwsR0QUl7MLmMO2KsRFQhudC5zkH5Uqu4R0ZHwaKMS76xDeyGkeZ5PDTCkiYizZMo7BM4ejBmgU2VLZTbGkW5S4PhCLFR_6pdOib4Kdh3IsUj1iTolAvJzFJYTkywQhBdhG1e8tB-BnoWN3nek1wuK0eidEV1RsmnFpPoc3LlzlpVh33iEYWRbvnFwRPWnOcWoUYuSpepwUxOZPZG0wP6Ul8SryJHo4GL3Ep1FBnB_D0LtM-BrT-Omh9kuT6u6QcBKwLx0g',
                },
              ].map((v) => (
                <div
                  key={v.city}
                  className="flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="aspect-4/3 rounded-2xl overflow-hidden relative border border-slate-100 dark:border-slate-800 shadow-sm">
                    <Image
                      alt={v.city}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      src={v.img}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <span className="absolute bottom-2 left-3 text-white font-black text-[10px] tracking-widest uppercase">
                      {v.country}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
                <Star className="size-5 text-primary" strokeWidth={3} /> Reviews
                (48)
              </h3>
              <div className="flex items-center gap-1 text-primary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`size-3.5 fill-primary text-primary`}
                  />
                ))}
                <span className="text-sm font-black ml-1 text-slate-900 dark:text-white font-mono">
                  4.9
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-1">
              {[
                {
                  name: 'Maria Silva',
                  meta: 'Met in Lisbon • 2 months ago',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGg4IdBssWvk3UVy-PH4VZe_8TdIWUaaq-m8nSPOetsaEnC-y4qVz8TlgzJaHZ8xbCcceb2gfkLdQh222k0JXcuuxxdnIoMGzuSVbIKASSV60ZYySAezjDTkIMvFFQWyJEJViSo702GRJ6osoPGJ1BRe1ZDYbUrKrEzhPMoFt8JeRo6T1qcSxS6vU-cQ99NUofqU2stnhYl_HqUEgy9s79ORoCQFcfDGfrjFfHJBQNlyR_pLV6_UdEdP2W55pS9b4AcDWSZ_H9Kg',
                  text: 'Alex is an incredible travel buddy! He knows all the best coffee spots in Lisbon and has some amazing stories from his time in Southeast Asia. Very respectful and organized traveler. Highly recommended!',
                },
                {
                  name: 'David Kim',
                  meta: 'Hiked in Madeira • 5 months ago',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEYIV2G-PKiV0cag_AdVLcpk8rREpHJLHhwLIP8eXj6fDmmIfRkvsuFOLAG8upHK2Faa8Mhaj8gNJvGYgkXVYzvmtMVmoPyRl5U_R9tTIovIWIDuxxJvkxfpXbfIrdMVq8iQbPhYR3dfMhb_rAvnOCHv1G45Jieyzla_0eO0VRe-e_BoAkSfzOIsKTxnWTIfHeBEqpA-fUGHSayaeogBvy9A-QMTdtej2-whYSY8-p0jhRy9zYjB4YwHD5sEoGLFI_wPVYhHM4ew',
                  text: 'Super energetic and positive. We did a 3-day trek together and Alex kept the vibes high even when it rained. Great photographer too!',
                },
              ].map((review) => (
                <div
                  key={review.name}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="size-11 rounded-full overflow-hidden bg-slate-200 border-2 border-primary/10 relative">
                      <Image
                        alt={review.name}
                        fill
                        className="object-cover"
                        src={review.img}
                      />
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 dark:text-white text-[15px]">
                        {review.name}
                      </h5>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                        {review.meta}
                      </p>
                    </div>
                    <div className="ml-auto flex gap-0.5 text-primary">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="size-3 fill-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic font-bold">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserProfilePage;
