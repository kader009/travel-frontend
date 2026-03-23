'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Star, Send, Loader2, User, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateReviewMutation } from '@/src/redux/store/api/endApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';

import { CreateReviewModalProps } from '@/src/types/props';
import { ReviewFormValues } from '@/src/types/forms';

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({ isOpen, onClose }) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ReviewFormValues>({
    defaultValues: {
      userId: '',
      rating: 5,
      comment: ''
    }
  });

  const rating = watch('rating');

  const onSubmit = async (data: ReviewFormValues) => {
    if (!currentUser?._id) return;
    
    try {
      const result = await createReview({
        ...data,
        reviewerId: currentUser._id
      }).unwrap();

      if (result.success) {
        toast.success('Experience shared successfully!');
        reset();
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to submit review');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Star className="size-5 fill-primary" />
             </div>
             <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Post Review</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="size-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Target User ID */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <User className="size-3" /> Traveler ID
            </label>
            <input 
              {...register('userId', { required: 'Traveler ID is required' })}
              placeholder="Paste the unique ID of the traveler..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white"
            />
            {errors.userId && <p className="text-[10px] font-black text-rose-500 uppercase tracking-tight pl-2">{errors.userId.message}</p>}
          </div>

          {/* Rating Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center block">Rate your experience</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setValue('rating', num)}
                  className="p-1 transition-transform active:scale-90"
                >
                  <Star 
                    className={`size-8 ${num <= (hoverRating || rating) ? 'text-primary fill-primary' : 'text-slate-200 dark:text-slate-700'}`} 
                    strokeWidth={3}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] font-black uppercase tracking-widest text-primary">
              {rating === 5 ? 'Excellent' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MessageCircle className="size-3" /> Your Feedback
            </label>
            <textarea 
              {...register('comment', { required: 'Please tell us about your experience' })}
              rows={4}
              placeholder="How was your trip with this traveler? Be detailed..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-4xl px-6 py-5 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-slate-900 dark:text-white resize-none"
            />
            {errors.comment && <p className="text-[10px] font-black text-rose-500 uppercase tracking-tight pl-2">{errors.comment.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-2 bg-primary text-slate-900 px-8 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 border-none"
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" strokeWidth={3} />}
              Share Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReviewModal;
