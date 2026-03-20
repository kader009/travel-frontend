'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  X, 
  User, 
  Image as ImageIcon, 
  MapPin, 
  Globe, 
  Compass, 
  Trash2,
  Loader2,
  Save,
  Navigation
} from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '@/src/redux/store/features/userSlice';
import { useUpdateProfileMutation } from '@/src/redux/store/api/endApi';
import { IUser } from '@/src/types/user';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  image: z.string().optional(),
  bio: z.string().optional(),
  currentLocation: z.string().optional(),
  travelInterests: z.array(z.string()).optional(),
  visitedCountries: z.array(z.string()).optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  user: IUser | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [newInterest, setNewInterest] = useState('');
  const [newCountry, setNewCountry] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      image: user?.image || '',
      bio: user?.bio || '',
      currentLocation: user?.currentLocation || '',
      travelInterests: user?.travelInterests || [],
      visitedCountries: user?.visitedCountries || [],
      coordinates: {
        lat: user?.coordinates?.lat || 0,
        lng: user?.coordinates?.lng || 0
      }
    }
  });

  const travelInterests = watch('travelInterests') || [];
  const visitedCountries = watch('visitedCountries') || [];

  useEffect(() => {
    if (user && isOpen) {
      reset({
        name: user.name,
        image: user.image || '',
        bio: user.bio || '',
        currentLocation: user.currentLocation || '',
        travelInterests: user.travelInterests || [],
        visitedCountries: user.visitedCountries || [],
        coordinates: {
          lat: user.coordinates?.lat || 0,
          lng: user.coordinates?.lng || 0
        }
      });
    }
  }, [user, isOpen, reset]);

  const addInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !travelInterests.includes(trimmed)) {
      setValue('travelInterests', [...travelInterests, trimmed]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setValue('travelInterests', travelInterests.filter(i => i !== interest));
  };

  const addCountry = () => {
    const trimmed = newCountry.trim();
    if (trimmed && !visitedCountries.includes(trimmed)) {
      setValue('visitedCountries', [...visitedCountries, trimmed]);
      setNewCountry('');
    }
  };

  const removeCountry = (country: string) => {
    setValue('visitedCountries', visitedCountries.filter(c => c !== country));
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const result = await updateProfile(data).unwrap();
      if (result.success) {
        dispatch(updateUserDetails(data as Partial<IUser>));
        toast.success('Profile updated successfully!');
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-800 animate-in fade-in zoom-in duration-300 transition-all">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Compass className="size-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Edit Exploration Profile</h2>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                <span className="size-1 bg-primary rounded-full animate-pulse" /> Customize your travel buddy identity
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all group cursor-pointer active:scale-90"
          >
            <X className="size-5 text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-8 custom-scrollbar max-h-[calc(90vh-180px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                  <User className="size-3.5" strokeWidth={3} /> Full Name
                </label>
                <input
                  {...register('name')}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white"
                />
                {errors.name && <p className="text-[10px] font-black text-red-500 uppercase tracking-tight pl-2">{errors.name.message}</p>}
              </div>

              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                  <ImageIcon className="size-3.5" strokeWidth={3} /> Avatar URL
                </label>
                <input
                  {...register('image')}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white"
                />
                {errors.image && <p className="text-[10px] font-black text-red-500 uppercase tracking-tight pl-2">{errors.image.message}</p>}
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-2 group">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors">
                Your Story (Bio)
              </label>
              <textarea
                {...register('bio')}
                placeholder="Share your travel experiences and what kind of buddy you are..."
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white resize-none"
              />
            </div>

            {/* Location Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="size-3.5" strokeWidth={3} /> Current Location
                </label>
                <input
                  {...register('currentLocation')}
                  placeholder="Dhaka, Bangladesh"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Navigation className="size-3.5" strokeWidth={3} /> Coordinates
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    step="any"
                    {...register('coordinates.lat', { valueAsNumber: true })}
                    placeholder="Lat"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                  />
                  <input
                    type="number"
                    step="any"
                    {...register('coordinates.lng', { valueAsNumber: true })}
                    placeholder="Lng"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Interests Section */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Compass className="size-3.5" strokeWidth={3} /> Travel Interests
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {travelInterests.map((interest) => (
                  <div key={interest} className="group/tag flex items-center gap-2 bg-primary/10 border border-primary/20 text-slate-900 dark:text-white px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tight transition-all hover:bg-primary/20">
                    {interest}
                    <button 
                      type="button" 
                      onClick={() => removeInterest(interest)}
                      className="transition-colors cursor-pointer text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="size-3" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterest(); } }}
                  placeholder="e.g. Scuba Diving"
                  className="flex-1 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white font-mono"
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all cursor-pointer border border-transparent shadow-sm"
                >
                  Append
                </button>
              </div>
            </div>

            {/* Visited Countries Section */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Globe className="size-3.5" strokeWidth={3} /> Countries Explored
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {visitedCountries.map((country) => (
                  <div key={country} className="group/tag flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tight transition-all hover:border-primary/50">
                    {country}
                    <button 
                      type="button" 
                      onClick={() => removeCountry(country)}
                      className="transition-colors cursor-pointer text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="size-3" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCountry(); } }}
                  placeholder="e.g. Iceland"
                  className="flex-1 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white font-mono"
                />
                <button
                  type="button"
                  onClick={addCountry}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all cursor-pointer border border-transparent shadow-sm"
                >
                  Append
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="flex-2 bg-primary text-slate-900 px-8 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-95 border-none"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Save className="size-4" strokeWidth={3} />
                Save Exploration Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
