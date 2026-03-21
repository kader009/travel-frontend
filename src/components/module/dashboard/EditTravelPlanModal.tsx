'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planSchema, PlanFormValues } from '@/src/validation/travelPlan.validation';
import { 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Trash2,
  Loader2,
  Navigation,
  Search,
  DollarSign,
  Save,
  Compass
} from 'lucide-react';
import { toast } from 'sonner';
import { useUpdateTravelPlanMutation } from '@/src/redux/store/api/endApi';
import { ITravelPlan } from '@/src/types/travelPlan';

interface EditTravelPlanModalProps {
  plan: ITravelPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditTravelPlanModal: React.FC<EditTravelPlanModalProps> = ({ plan, isOpen, onClose }) => {
  const [updateTravelPlan, { isLoading }] = useUpdateTravelPlanMutation();
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isFetchingCoords, setIsFetchingCoords] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      destination: '',
      startDate: '',
      endDate: '',
      budget: { min: 0, max: 0 },
      travelType: 'Friends',
      description: '',
      itinerary: '',
      coordinates: { lat: 0, lng: 0 },
      images: []
    }
  });

  useEffect(() => {
    if (plan && isOpen) {
      reset({
        destination: plan.destination,
        startDate: plan.startDate ? new Date(plan.startDate).toISOString().split('T')[0] : '',
        endDate: plan.endDate ? new Date(plan.endDate).toISOString().split('T')[0] : '',
        budget: plan.budget,
        travelType: plan.travelType,
        description: plan.description,
        itinerary: plan.itinerary,
        coordinates: plan.coordinates,
        images: plan.images
      });
    }
  }, [plan, isOpen, reset]);

  const images = watch('images') || [];

  const addImage = () => {
    const trimmed = newImageUrl.trim();
    if (trimmed && !images.includes(trimmed)) {
      try {
        new URL(trimmed); // Validate URL
        setValue('images', [...images, trimmed]);
        setNewImageUrl('');
      } catch (e) {
        toast.error('Invalid image URL');
      }
    }
  };

  const removeImage = (url: string) => {
    setValue('images', images.filter(i => i !== url));
  };

  const fetchCoords = async () => {
    const destination = getValues('destination');
    if (!destination || destination.trim().length < 3) {
      toast.error('Please enter a valid destination name (at least 3 characters)');
      return;
    }

    setIsFetchingCoords(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&limit=1`
      );
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setValue('coordinates.lat', parseFloat(lat));
        setValue('coordinates.lng', parseFloat(lon));
        toast.success(`Coordinates found for "${destination}"!`);
      } else {
        toast.error('Could not find coordinates for this destination');
      }
    } catch (error) {
      toast.error('Error fetching data from map service');
    } finally {
      setIsFetchingCoords(false);
    }
  };

  const onSubmit = async (data: PlanFormValues) => {
    if (!plan?._id) return;

    try {
      const result = await updateTravelPlan({ id: plan._id, data }).unwrap();
      if (result.success) {
        toast.success('Travel plan updated successfully!');
        onClose();
      }
    } catch (error: unknown) {
      const errorMessage = (error as { data?: { message?: string } })?.data?.message || 'Failed to update travel plan';
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-none md:rounded-[2.5rem] shadow-2xl border-none md:border md:border-white/20 dark:md:border-slate-800 animate-in fade-in zoom-in duration-300 transition-all flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Compass className="size-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Modify Expedition</h2>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                Refine your journey details and maps
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
        <div className="overflow-y-auto p-8 custom-scrollbar">
          <form id="edit-plan-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Destination Section */}
              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="size-3.5" strokeWidth={3} /> Destination
                </label>
                <div className="relative">
                  <input
                    {...register('destination')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        fetchCoords();
                      }
                    }}
                    placeholder="e.g. Cox's Bazar, Bangladesh"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-5 pr-14 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={fetchCoords}
                    disabled={isFetchingCoords}
                    title="Find Coordinates"
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-all cursor-pointer active:scale-90 disabled:opacity-50 z-10"
                  >
                    {isFetchingCoords ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Search className="size-4" strokeWidth={3} />
                    )}
                  </button>
                </div>
                {errors.destination && <p className="text-[10px] font-black text-red-500 uppercase tracking-tight pl-2">{errors.destination.message}</p>}
              </div>

              {/* Dates & Budget Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                    <Calendar className="size-3.5" strokeWidth={3} /> Dates
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      {...register('startDate')}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                    />
                    <input
                      type="date"
                      {...register('endDate')}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                    <DollarSign className="size-3.5" strokeWidth={3} /> Budget Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      {...register('budget.min', { valueAsNumber: true })}
                      placeholder="Min"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                    />
                    <input
                      type="number"
                      {...register('budget.max', { valueAsNumber: true })}
                      placeholder="Max"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Type & Coordinates Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                    <Users className="size-3.5" strokeWidth={3} /> Travel Type
                  </label>
                  <select
                    {...register('travelType')}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="Friends">Friends</option>
                    <option value="Solo">Solo</option>
                    <option value="Family">Family</option>
                    <option value="Couple">Couple</option>
                    <option value="Group">Group</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div className="space-y-2 group">
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

              {/* Description & Itinerary Section */}
              <div className="space-y-6">
                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                    <FileText className="size-3.5" strokeWidth={3} /> Description
                  </label>
                  <textarea
                    {...register('description')}
                    placeholder="Tell us about the plan..."
                    rows={3}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white resize-none"
                  />
                  {errors.description && <p className="text-[10px] font-black text-red-500 uppercase tracking-tight pl-2">{errors.description.message}</p>}
                </div>

                <div className="space-y-2 group">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                    <FileText className="size-3.5" strokeWidth={3} /> Itinerary
                  </label>
                  <textarea
                    {...register('itinerary')}
                    placeholder="Day-by-day activities..."
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white resize-none"
                  />
                  {errors.itinerary && <p className="text-[10px] font-black text-red-500 uppercase tracking-tight pl-2">{errors.itinerary.message}</p>}
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <ImageIcon className="size-3.5" strokeWidth={3} /> Visual Memories (URLs)
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
                  {images.map((url, idx) => (
                    <div key={idx} className="relative group shrink-0 size-20">
                      <Image 
                        src={url} 
                        alt="Preview" 
                        fill
                        className="rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-800 shadow-sm" 
                      />
                      <button 
                        type="button" 
                        onClick={() => removeImage(url)}
                        className="absolute -top-1.5 -right-1.5 z-10 size-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 className="size-3" strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }}
                    placeholder="Paste image URL here..."
                    className="flex-1 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    Append
                  </button>
                </div>
                {errors.images && <p className="text-[10px] font-black text-red-500 uppercase tracking-tight pl-2">{errors.images.message}</p>}
              </div>
            </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-4 shrink-0 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="flex-2 bg-primary text-slate-900 px-8 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-95 border-none"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Save className="size-4" strokeWidth={3} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTravelPlanModal;
