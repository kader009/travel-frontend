import { Users } from 'lucide-react';
import React from 'react';

const PopularDestinations = () => {
  return (
    <section className="bg-slate-50 dark:bg-background-dark px-6 py-20">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black lg:text-5xl">
              Popular Destinations
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Trending spots where people are looking for buddies right now.
            </p>
          </div>
          <button className="hidden font-bold text-primary sm:block">
            View All Destinations →
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative aspect-3/4 overflow-hidden rounded-xl shadow-lg">
            <img
              alt="Lush green landscape in Bali"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7hROuYujRQkRyUW4WV5TE1CoYLApQNVeNExZ26iDPvxVUOo4moX3zkv5CsUaFBajcqezfMFjLaBqzae1_oX1Zbekv2D0HgJUyR-SKWCvy-jQ-A057H1W4XBTbl7-1IHm4U2RA-EwJ_KB0xNCv4P5is4iRN4K9-5jpAcbFoH34-rlwzOwyCwEJabm2aYo4c1AZ4OJZ-yeCYGv4qok_2zXvi0nJ1utu2w87uISmPA0vSiVZo07R9kA0ma3FBmdyb7ycCpoo55gOFQ"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-sm font-semibold opacity-80">Indonesia</p>
              <h4 className="text-xl font-bold">Bali</h4>
              <div className="mt-2 flex items-center gap-1 text-primary">
                <Users className="w-3 h-3" />
                <span className="text-xs font-bold uppercase">124 Plans</span>
              </div>
            </div>
          </div>
          <div className="group relative aspect-3/4 overflow-hidden rounded-xl shadow-lg">
            <img
              alt="Eiffel Tower in Paris"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGsyJEcP5Md2lKeYVkxy55TxTgT4D6e41IXZCPblfcVb99OohRHlcWi0HQfqe0oWFRU2w465RuUnsgE9U4XaTjoWSYSbEi2r3yUHgOMv3lVGF7ImgiyDaTWwuN_qWiHpDKGQBtIiRQ4v-BYql2j506QtaVsnYtMZzypRzwVOLAogs3A7FoG6nA14z2Wga1tXkIGM49i96Z16NWS6td0BvPz7Squb5WxLvVvmDB9d3F3mIVB-FCDT5-WfhBdtJVsh3VDIO5qjD8Yw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-sm font-semibold opacity-80">France</p>
              <h4 className="text-xl font-bold">Paris</h4>
              <div className="mt-2 flex items-center gap-1 text-primary">
                <Users className="w-3 h-3" />
                <span className="text-xs font-bold uppercase">89 Plans</span>
              </div>
            </div>
          </div>
          <div className="group relative aspect-3/4 overflow-hidden rounded-xl shadow-lg">
            <img
              alt="Traditional pagoda in Kyoto Japan"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG3xxISkMBWHQz1TPDwVsYfMP9TA_iY3MNVDYceG6Fq0WuN0kcZVeeA5qYuElXTP7JOH6YJImgwBWSu7zj6EVgkUc3PL84DnWnbFxTqDia6uTibk6Bpsh4ynlnjN2PmlSCNIA2vOPeX1kh0h5cChlwoioUkpuCo-2_tR0i5g0uoS_ooNep-2ieZgg3xNcKtrI8E1W8MBweaHxWt_6yzt3aMrdo7qWJF0TJpj_ArUUmKMQTkFV9OTZjLj45837azO35dGZQi70hKA"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-sm font-semibold opacity-80">Japan</p>
              <h4 className="text-xl font-bold">Kyoto</h4>
              <div className="mt-2 flex items-center gap-1 text-primary">
                <Users className="w-3 h-3" />
                <span className="text-xs font-bold uppercase">56 Plans</span>
              </div>
            </div>
          </div>
          <div className="group relative aspect-3/4 overflow-hidden rounded-xl shadow-lg">
            <img
              alt="Blue water and mountains in Swiss Alps"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfHzNMe5s9fymXsDFy8Uqsuw1XlCnSzAKWZIK02mOgkRKjVjQOXTk0QCmPmqOg9nFMlCv_fEx5yZBPFWgEmm2m-pkYcWsqwC2l0gPu6icxP9UroqbdzeOWTya3KociG0JzFv_BI0L1lOL71xq47mzFE7vwCnIp5rnYdB6JldVgX_CV_S3nAlhlTpHD6e0aNSCCq67rTJbLyLY3bhsOF7N_n1Ctm5fO-5wTvqlUrfTFvEuRUxI3708Uygq3GAdevaSiE9hLTwov7A"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-sm font-semibold opacity-80">Switzerland</p>
              <h4 className="text-xl font-bold">Swiss Alps</h4>
              <div className="mt-2 flex items-center gap-1 text-primary">
                <Users className="w-3 h-3" />
                <span className="text-xs font-bold uppercase">42 Plans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
