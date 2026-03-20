'use client';

import React, { useState } from 'react';
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
  Save,
  Navigation,
  DollarSign,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { useCreateTravelPlanMutation } from '@/src/redux/store/api/endApi';

interface CreateTravelPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTravelPlanModal: React.FC<CreateTravelPlanModalProps> = ({ isOpen, onClose }) => {
  const [createTravelPlan, { isLoading }] = useCreateTravelPlanMutation();
  const [newImageUrl, setNewImageUrl] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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

  const onSubmit = async (data: PlanFormValues) => {
    try {
      const result = await createTravelPlan(data).unwrap();
      if (result.success) {
        toast.success('Travel plan created successfully!');
        reset();
        onClose();
      }
    } catch (error: unknown) {
      const errorMessage = (error as { data?: { message?: string } })?.data?.message || 'Failed to create travel plan';
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
        
        {/* Header - Just Close Button */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 py-4 flex items-center justify-end shrink-0">
          <button 
            onClick={onClose}
            className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all group cursor-pointer active:scale-90"
          >
            <X className="size-5 text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-8 custom-scrollbar">
          <form id="create-plan-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Destination Section */}
              <div className="space-y-2 group">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="size-3.5" strokeWidth={3} /> Destination
                </label>
                <input
                  {...register('destination')}
                  placeholder="e.g. Cox's Bazar, Bangladesh"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-slate-900 dark:text-white"
                />
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
            className="flex-2 bg-primary text-slate-900 px-8 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-95 border-none"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Create Travel Plan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTravelPlanModal;
