'use client';

import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/src/redux/store/store';
import {
  useGetReviewsForUserQuery,
  useGetReviewsGivenQuery,
  useGetReviewsReceivedQuery,
} from '@/src/redux/store/api/endApi';
import {
  Star,
  MessageSquare,
  Shield,
  Loader2,
  TrendingUp,
  Award,
  Compass,
  Pencil,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import { IUser } from '@/src/types/user';
import { IReview } from '@/src/types/review';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from '@/src/redux/store/api/endApi';


const UserReviewsPage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  // Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<IReview | null>(null);
  const [editForm, setEditForm] = useState({
    rating: 5,
    comment: '',
  });

  const [activeTab, setActiveTab] = useState<'posted' | 'received'>('posted');

  // Fetch reviews given by user (posted)
  const { data: givenReviewsData, isLoading: isLoadingGiven } =
    useGetReviewsGivenQuery();

  // Fetch reviews received by user
  const { data: receivedReviewsData, isLoading: isLoadingReceived } =
    useGetReviewsReceivedQuery();

  // Fetch user's overall stats (for profile overview)
  const { isLoading: isLoadingStats } = useGetReviewsForUserQuery(
    user?._id || '',
  );

  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  // Extract reviews from API responses
  const postedReviews = Array.isArray(givenReviewsData?.data)
    ? givenReviewsData.data
    : [];
  const receivedReviews = Array.isArray(receivedReviewsData?.data)
    ? receivedReviewsData.data
    : [];

  // Calculate average rating from received reviews
  const averageRating =
    receivedReviews.length > 0
      ? +(
          receivedReviews.reduce((sum, review) => sum + review.rating, 0) /
          receivedReviews.length
        ).toFixed(1)
      : 0;

  // Create stats object from response
  const stats = {
    averageRating: averageRating,
    totalReviews: receivedReviews.length,
  };

  // Calculate trusted stats from received reviews
  const coordinationRating =
    receivedReviews.length > 0
      ? Math.round(
          (receivedReviews.reduce((sum, review) => {
            // Assume coordination is 90% of rating
            return sum + review.rating * 0.9;
          }, 0) /
            receivedReviews.length) *
            10,
        ) + '%'
      : '0%';

  const communicationRating =
    receivedReviews.length > 0
      ? Math.round(
          (receivedReviews.reduce((sum, review) => {
            // Assume communication is 85% of rating
            return sum + review.rating * 0.85;
          }, 0) /
            receivedReviews.length) *
            10,
        ) + '%'
      : '0%';

  const safetyRating =
    receivedReviews.length > 0
      ? Math.round(
          (receivedReviews.reduce((sum, review) => {
            // Assume safety is 95% of rating
            return sum + review.rating * 0.95;
          }, 0) /
            receivedReviews.length) *
            10,
        ) + '%'
      : '0%';

  const isLoading = isLoadingGiven || isLoadingReceived || isLoadingStats;

  const handleDeleteClick = async (id: string) => {
    toast(
      <div className="flex flex-col gap-2 p-1">
        <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-sm">
          Delete Review?
        </p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
          Are you sure you want to permanently remove this feedback?
        </p>
      </div>,
      {
        duration: 5000,
        action: {
          label: 'Yes, Delete',
          onClick: async () => {
            try {
              const res = await deleteReview(id).unwrap();
              if (res.success) toast.success('Review deleted successfully');
            } catch (err: unknown) {
              const error = err as { data?: { message?: string } };
              toast.error(error?.data?.message || 'Failed to delete review');
            }
          },
        },
        cancel: { label: 'Cancel', onClick: () => {} },
      },
    );
  };

  const handleEditClick = (review: IReview) => {
    setEditingReview(review);
    setEditForm({
      rating: review.rating,
      comment: review.comment,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?._id) return;
    try {
      const res = await updateReview({
        id: editingReview._id,
        data: editForm,
      }).unwrap();
      if (res.success) {
        toast.success('Review updated successfully');
        setIsEditModalOpen(false);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to update review');
    }
  };

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
                {
                  label: 'Coordination',
                  val: coordinationRating,
                  icon: Compass,
                },
                {
                  label: 'Communication',
                  val: communicationRating,
                  icon: MessageSquare,
                },
                { label: 'Safety First', val: safetyRating, icon: Shield },
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
            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <button
                onClick={() => setActiveTab('posted')}
                className={`flex-1 px-6 py-4 font-black text-sm uppercase tracking-tight transition-all border-b-2 ${activeTab === 'posted' ? 'border-primary text-primary bg-white dark:bg-slate-900' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Reviews You Posted ({postedReviews.length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`flex-1 px-6 py-4 font-black text-sm uppercase tracking-tight transition-all border-b-2 ${activeTab === 'received' ? 'border-primary text-primary bg-white dark:bg-slate-900' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Reviews You Received ({receivedReviews.length})
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'posted' ? (
                <>
                  {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                      <Loader2 className="size-10 animate-spin text-primary" />
                      <p className="text-[10px] font-black uppercase tracking-widest">
                        Loading your reviews...
                      </p>
                    </div>
                  ) : postedReviews.length === 0 ? (
                    <div className="py-24 text-center">
                      <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Star className="size-8 text-slate-200 dark:text-slate-700" />
                      </div>
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        No Reviews Found
                      </h4>
                      <p className="text-slate-400 text-sm font-bold max-w-xs mx-auto mt-2 italic">
                        Start reviewing your travel companions to see them here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {postedReviews.map((review) => {
                        const travelPlan = (
                          review as IReview & {
                            travelPlan?: { title?: string };
                          }
                        )?.travelPlan;
                        const revieweeData = (
                          review as IReview & { reviewee?: IUser | string }
                        )?.reviewee;
                        const reviewee =
                          typeof revieweeData === 'object' && revieweeData
                            ? (revieweeData as IUser)
                            : null;

                        return (
                          <div
                            key={review._id}
                            className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex gap-3 items-start flex-1">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                                  {reviewee?.image ? (
                                    <Image
                                      src={reviewee.image}
                                      alt={reviewee.name || 'User'}
                                      width={48}
                                      height={48}
                                      className="size-full object-cover rounded-full"
                                    />
                                  ) : (
                                    reviewee?.name?.charAt(0) || '?'
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">
                                    {reviewee?.name || 'User'}
                                  </h4>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">
                                    {travelPlan?.title || 'Travel Plan'}
                                  </p>
                                  <div className="flex gap-0.5 mt-1">
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
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => handleEditClick(review)}
                                  className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                                  title="Edit review"
                                >
                                  <Pencil className="size-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteClick(review._id || '')
                                  }
                                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                                  title="Delete review"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed italic ml-15">
                              &quot;{review.comment}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-3 font-semibold">
                              {review.createdAt
                                ? new Date(
                                    review.createdAt,
                                  ).toLocaleDateString()
                                : 'Recent'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                      <Loader2 className="size-10 animate-spin text-primary" />
                      <p className="text-[10px] font-black uppercase tracking-widest">
                        Synchronizing reviews...
                      </p>
                    </div>
                  ) : receivedReviews.length > 0 ? (
                    <div className="space-y-4">
                      {receivedReviews.map((review) => {
                        const reviewerData = (
                          review as IReview & { reviewer?: IUser | string }
                        )?.reviewer;
                        const reviewer =
                          typeof reviewerData === 'object' && reviewerData
                            ? (reviewerData as IUser)
                            : null;
                        const travelPlan = (
                          review as IReview & {
                            travelPlan?: { title?: string };
                          }
                        )?.travelPlan;
                        return (
                          <div
                            key={review._id}
                            className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex gap-3 items-start flex-1">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0 overflow-hidden">
                                  {reviewer?.image ? (
                                    <Image
                                      src={reviewer.image}
                                      alt={reviewer.name || 'Reviewer'}
                                      width={48}
                                      height={48}
                                      className="size-full object-cover"
                                    />
                                  ) : (
                                    reviewer?.name?.charAt(0) || '?'
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">
                                    {reviewer?.name || 'Traveler'}
                                  </h4>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">
                                    {travelPlan?.title || 'Travel Plan'}
                                  </p>
                                  <div className="flex gap-0.5 mt-1">
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
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed ml-15">
                              {review.comment}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-3 font-semibold">
                              {review.createdAt
                                ? new Date(
                                    review.createdAt,
                                  ).toLocaleDateString()
                                : 'Recent'}
                            </p>
                          </div>
                        );
                      })}
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
                        Finish an expedition to receive your first traveler
                        badge.
                      </p>
                    </div>
                  )}
                </>
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

      {/* Edit Review Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isUpdating && setIsEditModalOpen(false)}
          ></div>
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Pencil className="size-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Update Feedback
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">
                  Expedition Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setEditForm({ ...editForm, rating: num })}
                      className={`size-10 rounded-xl transition-all flex items-center justify-center cursor-pointer ${editForm.rating >= num ? 'bg-primary text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                    >
                      <Star
                        className={`size-5 ${editForm.rating >= num ? 'fill-current' : ''}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Traveler Observation / Comment
                </label>
                <textarea
                  rows={4}
                  required
                  value={editForm.comment}
                  onChange={(e) =>
                    setEditForm({ ...editForm, comment: e.target.value })
                  }
                  className="w-full px-5 py-4 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all resize-none"
                  placeholder="Enter the updated review content..."
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl text-xs uppercase tracking-widest"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 px-6 py-4 bg-primary text-slate-900 font-black rounded-2xl shadow-lg shadow-primary/20 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {isUpdating ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" strokeWidth={3} />
                  )}{' '}
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviewsPage;
