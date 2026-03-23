'use client';

import { useState } from 'react';
import {
  useGetAllUsersQuery,
  useGetReviewsForUserQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from '@/src/redux/store/api/endApi';
import {
  Star,
  Loader2,
  Search,
  Trash2,
  Pencil,
  User,
  Check,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { IReview } from '@/src/types/review';
import { IUser } from '@/src/types/user';

const AdminReviewsPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<IReview | null>(null);
  const [editForm, setEditForm] = useState({
    rating: 5,
    comment: '',
  });

  // Queries
  const { data: usersData, isLoading: isUsersLoading } =
    useGetAllUsersQuery(undefined);
  const { data: reviewsData, isLoading: isReviewsLoading } =
    useGetReviewsForUserQuery(selectedUserId, {
      skip: !selectedUserId,
    });

  // Mutations
  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const users = (usersData?.data as IUser[]) || [];
  const reviews = reviewsData?.data?.reviews || [];
  const averageRating = reviewsData?.data?.averageRating || 0;

  // Filter users for selection
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
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
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Moderate Reviews
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">
            Oversee traveler feedback and maintain community integrity.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* User Selection Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm flex flex-col h-fit sticky top-8">
            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3 mb-6">
              <User className="size-4 text-primary" strokeWidth={3} /> Select
              Traveler
            </h3>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search travelers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-5 py-3 text-sm border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-bold"
              />
            </div>

            <div className="space-y-2 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
              {isUsersLoading ? (
                <div className="py-10 flex justify-center">
                  <Loader2 className="size-6 animate-spin text-primary" />
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => setSelectedUserId(user._id || '')}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${selectedUserId === user._id ? 'bg-primary text-slate-900' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <div
                      className={`size-8 rounded-full flex items-center justify-center overflow-hidden font-black text-xs ${selectedUserId === user._id ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}
                    >
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || 'User'}
                          width={32}
                          height={32}
                          className="size-full object-cover"
                        />
                      ) : (
                        user.name?.charAt(0) || '?'
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-xs uppercase tracking-tight truncate">
                        {user.name}
                      </p>
                      <p
                        className={`text-[9px] font-bold uppercase tracking-widest truncate ${selectedUserId === user._id ? 'text-slate-900/60' : 'text-slate-400'}`}
                      >
                        {user.email}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="xl:col-span-2">
          {!selectedUserId ? (
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-20 text-center flex flex-col items-center justify-center">
              <Star className="size-16 text-slate-100 dark:text-slate-800 mb-6" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Start Moderating
              </h3>
              <p className="text-slate-400 font-bold mt-2 max-w-xs">
                Select a traveler from the sidebar to view and manage their
                expedition feedback.
              </p>
            </div>
          ) : isReviewsLoading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-4">
              <Loader2 className="size-10 animate-spin text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Loading feedback logs...
              </p>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Star className="size-5 fill-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                        Reputation
                      </p>
                      <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                        {averageRating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  {reviews.length} total reviews found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-4xl hover:border-primary/20 transition-all shadow-sm group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3 items-center">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden text-primary font-black text-sm">
                            {(review.reviewer as IUser)?.image ? (
                              <Image
                                src={(review.reviewer as IUser).image as string}
                                alt="Reviewer"
                                width={40}
                                height={40}
                                className="size-full object-cover"
                              />
                            ) : (
                              (review.reviewer as IUser)?.name?.charAt(0) || 'U'
                            )}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-tight">
                              {(review.reviewer as IUser)?.name || 'Anonymous'}
                            </h4>
                            <div className="flex gap-0.5 mt-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`size-2.5 ${i < review.rating ? 'text-primary fill-primary' : 'text-slate-200 dark:text-slate-800'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditClick(review)}
                            className="p-2 text-slate-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          >
                            <Pencil className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(review._id || '')}
                            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic">
                        &quot;{review.comment}&quot;
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 py-20 text-center text-slate-300 uppercase font-black text-xs tracking-widest">
                    No feedback found for this user
                  </div>
                )}
              </div>
            </div>
          )}
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
                  Staff Observation / Comment
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

export default AdminReviewsPage;
