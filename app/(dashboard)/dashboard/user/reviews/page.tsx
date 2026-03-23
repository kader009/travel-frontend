'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { useGetReviewsForUserQuery } from '@/src/redux/store/api/endApi';
import {
  Star,
  MessageSquare,
  Shield,
  Clock,
  Loader2,
  TrendingUp,
  Award,
  Users,
  Plus,
  Compass,
} from 'lucide-react';
import { IReview } from '@/src/types/review';
import { IUser } from '@/src/types/user';
import { useState } from 'react';
import CreateReviewModal from '@/src/components/module/dashboard/CreateReviewModal';

const ReviewCard = ({ review }: { review: IReview }) => (
  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 transition-all hover:border-primary/20 group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3 items-center">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
          {(review.reviewer as IUser)?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">
            {(review.reviewer as IUser)?.name || 'Anonymous Traveler'}
          </h4>
          <div className="flex gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${i < review.rating ? 'text-primary fill-primary' : 'text-slate-300 dark:text-slate-700'}`}
                strokeWidth={3}
              />
            ))}
          </div>
        </div>
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {review.createdAt
          ? new Date(review.createdAt).toLocaleDateString()
          : 'Recent'}
      </span>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed italic">
      &quot;{review.comment}&quot;
    </p>
  </div>
);

const UserReviewsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useGetReviewsForUserQuery(user?._id || '');

  const stats = reviewsData?.data;
  const reviews = stats?.reviews || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Review Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">
            Your expedition feedback and community reputation.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-primary text-slate-900 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Plus className="size-4" strokeWidth={3} /> Post Review
          </button>
        </div>

        {stats && (
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-primary/30 transition-all">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Star className="size-5 fill-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Avg Rating
                </p>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  {(stats?.averageRating || 0).toFixed(1)}
                </p>
              </div>
            </div>
            <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-primary/30 transition-all">
              <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="size-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Total Logs
                </p>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                  {stats.totalReviews}
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Analytics Column */}
        <div className="space-y-6">
          <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 size-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
            <Award className="size-12 text-primary mb-6" strokeWidth={2.5} />
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">
              Expedition Elite
            </h3>
            <p className="text-white/60 text-sm font-bold leading-relaxed mb-6">
              Your ratings help travelers trust your coordination skills.
              Maintain 4.5+ for elite status.
            </p>
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-1000"
                style={{ width: `${(stats?.averageRating || 0) * 20}%` }}
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              Progress to Tier 1: 85%
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 space-y-6 shadow-sm">
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
              <TrendingUp className="size-4 text-primary" strokeWidth={3} />{' '}
              Trusted Stats
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Coordination', val: '92%', icon: Compass },
                { label: 'Communication', val: '88%', icon: MessageSquare },
                { label: 'Safety First', val: '96%', icon: Shield },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="size-4 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-950 dark:group-hover:text-white">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs font-black text-primary">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List Column */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                <Users className="size-5 text-primary" strokeWidth={3} />{' '}
                Expedition Feedback
              </h3>
              <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-800">
                Latest first
              </span>
            </div>

            <div className="p-8">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                  <Loader2 className="size-10 animate-spin text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Synchronizing reviews...
                  </p>
                </div>
              ) : isError ? (
                <div className="py-20 text-center text-rose-500">
                  <Star className="size-12 mx-auto mb-4 opacity-20" />
                  <p className="font-black uppercase tracking-tight">
                    Error connecting to feedback logs
                  </p>
                </div>
              ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Star className="size-8 text-slate-200 dark:text-slate-700" />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    No Feedback Logs Yet
                  </h4>
                  <p className="text-slate-400 text-sm font-bold max-w-xs mx-auto mt-2 italic">
                    Finish an expedition to receive your first traveler badge.
                  </p>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Trusted by the worldwide traveler community
              </p>
            </div>
          </div>
        </div>
      </div>
      <CreateReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserReviewsPage;
