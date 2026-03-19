'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { UserCircle, MapPin, Globe, Mail } from 'lucide-react';

const UserProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your public traveler profile.</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8">
        <div className="flex items-start gap-6 mb-8">
          <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name} className="size-20 object-cover" />
            ) : (
              <UserCircle className="size-10 text-primary" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{user?.name}</h2>
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mt-2 inline-block bg-primary/10 text-primary">
              {user?.role}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-slate-400 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400">{user?.email}</span>
          </div>
          {user?.currentLocation && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 text-slate-400 shrink-0" />
              <span className="text-slate-600 dark:text-slate-400">{user.currentLocation}</span>
            </div>
          )}
          {user?.visitedCountries && user.visitedCountries.length > 0 && (
            <div className="flex items-start gap-3 text-sm">
              <Globe className="size-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-2">
                {user.visitedCountries.map((c) => (
                  <span key={c} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold">{c}</span>
                ))}
              </div>
            </div>
          )}
          {user?.travelInterests && user.travelInterests.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {user.travelInterests.map((interest) => (
                <span key={interest} className="px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-lg uppercase tracking-wider">{interest}</span>
              ))}
            </div>
          )}
          {user?.bio && (
            <p className="text-slate-600 dark:text-slate-400 text-sm pt-2 border-t border-slate-100 dark:border-slate-800">{user.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
