import { Star, Send, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setRating, setComment } from '@/src/redux/store/features/reviewSlice';
import { ReviewSectionProps } from '@/src/types/props';

const ReviewSection = ({
  trip,
  reviewRating,
  reviewComment,
  isReviewing,
  handleSubmitReview,
}: ReviewSectionProps) => {
  const dispatch = useDispatch();

  return (
    <section className="mt-20 max-w-4xl mx-auto w-full px-4 sm:px-0">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] border border-slate-100 dark:border-slate-800 p-6 sm:p-10 lg:p-16 shadow-sm hover:shadow-2xl transition-all">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
          Review Evaluation
        </h1>

        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Mission Experience Rating
            </label>
            <div className="flex gap-2 text-primary">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => dispatch(setRating(star))}
                  className="transition-transform hover:scale-125 cursor-pointer active:scale-95 group"
                >
                  <Star
                    className={`size-8 sm:size-10 group-active:scale-90 transition-all ${
                      star <= reviewRating
                        ? 'fill-primary text-primary'
                        : 'text-slate-200 dark:text-slate-800'
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Detailed Debriefing
            </label>
            <textarea
              value={reviewComment}
              onChange={(e) => dispatch(setComment(e.target.value))}
              className="w-full rounded-[1.5rem] sm:rounded-3xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 sm:p-6 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-base sm:text-lg font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none min-h-40 sm:min-h-50"
              placeholder={`Tell others about your mission experience with ${trip?.user?.name || 'this traveler'}...`}
            />
          </div>

          <button
            onClick={handleSubmitReview}
            disabled={isReviewing}
            className="w-full md:w-max px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-slate-900 dark:bg-primary text-white dark:text-slate-900 font-black text-[10px] sm:text-xs uppercase tracking-widest sm:tracking-[0.3em] hover:bg-primary hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 border-none cursor-pointer"
          >
            {isReviewing ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <Send className="size-5" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
