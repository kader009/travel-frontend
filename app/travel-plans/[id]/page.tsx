'use client';

import { useState } from 'react';
import Container from '@/src/components/ui/Container';
import {
  useGetTravelPlanDetailsQuery,
  useCreateJoinRequestMutation,
  useGetMyJoinRequestsQuery,
  useCreateReviewMutation,
} from '@/src/redux/store/api/endApi';
import { IJoinRequest } from '@/src/types/joinRequest';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { toast } from 'sonner';
import {
  setRating,
  setComment,
  resetReview,
} from '@/src/redux/store/features/reviewSlice';
import {
  DollarSign,
  Info,
  MapPin,
  Users,
  Loader2,
  Clock,
  Navigation,
  Globe,
  Eye,
  X,
  Send,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TravelPlanDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { rating: reviewRating, comment: reviewComment } = useSelector(
    (state: RootState) => state.review,
  );
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  const {
    data: planData,
    isLoading,
    isError,
  } = useGetTravelPlanDetailsQuery(id);
  const trip = planData?.data;

  const [createJoinRequest, { isLoading: isJoining }] =
    useCreateJoinRequestMutation();
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();

  // Fetch user's existing join requests to prevent duplicates
  const { data: myRequestsData } = useGetMyJoinRequestsQuery(undefined, {
    skip: !currentUser,
  });
  const hasAlreadyRequested =
    myRequestsData?.data?.some((req: IJoinRequest) => {
      const planId =
        typeof req.travelPlan === 'string'
          ? req.travelPlan
          : req.travelPlan?._id;
      return planId === id;
    }) ?? false;

  const handleOpenModal = () => {
    if (!currentUser) {
      toast.error('Identity required. Please sign in to join expeditions.', {
        description: 'You need to be a verified traveler to request entry.',
        action: {
          label: 'Sign In',
          onClick: () => router.push('/login'),
        },
      });
      return;
    }

    if (trip?.user?._id === currentUser._id) {
      toast.error('Mission Conflict', {
        description: 'You are the commanding officer of this expedition.',
      });
      return;
    }

    if (hasAlreadyRequested) {
      toast.error('Duplicate Request', {
        description:
          'You have already sent a join request for this expedition.',
      });
      return;
    }

    setRequestMessage('');
    setIsModalOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!requestMessage.trim()) {
      toast.error('Message Required', {
        description: 'Please write a message for your join request.',
      });
      return;
    }

    try {
      const response = await createJoinRequest({
        travelPlan: id,
        message: requestMessage.trim(),
      }).unwrap();

      if (response.success) {
        toast.success('Request Transmitted', {
          description: 'Your join request has been sent to the mission lead.',
        });
        setIsModalOpen(false);
        setRequestMessage('');
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Uplink Failed', {
        description: 'Unable to transmit join request. Please try again later.',
      });
    }
  };

  const handleSubmitReview = async () => {
    if (!currentUser) {
      toast.error('Identity required', {
        description: 'Sign in to review travelers.',
      });
      return;
    }
    if (reviewComment.trim().length < 10) {
      toast.error('Evaluation required', {
        description: 'Your debriefing must be at least 10 characters long.',
      });
      return;
    }

    // Get reviewee ID - try multiple field names
    const revieweeId =
      typeof trip?.user === 'string'
        ? trip.user
        : trip?.user?._id || trip?.userId;

    if (!revieweeId) {
      toast.error('Travel plan creator not found', {
        description:
          'Unable to identify the traveler. Please refresh and try again.',
      });
      return;
    }

    try {
      const response = await createReview({
        reviewer: currentUser?._id as string,
        reviewee: revieweeId as string,
        rating: reviewRating,
        comment: reviewComment.trim(),
        travelPlan: id,
      }).unwrap();

      if (response.success) {
        toast.success('Review Transmitted', {
          description: 'Your feedback has been recorded.',
        });
        dispatch(resetReview());
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Uplink Failed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <Loader2 className="size-16 animate-spin text-primary mb-6" />
        <div className="space-y-2 text-center">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] animate-pulse">
            Establishing Uplink
          </p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Downloading Expedition Data...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-8">
        <div className="bg-rose-500/10 p-12 rounded-[3rem] border border-rose-500/20 text-center max-w-md shadow-2xl shadow-rose-500/10">
          <div className="size-20 bg-white dark:bg-slate-900 rounded-4xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Info className="size-10 text-rose-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            Expedition Lost
          </h2>
          <p className="text-slate-500 font-bold mb-8 leading-relaxed">
            The journey coordinates you are tracing appear to be offline or the
            expedition was decommissioned.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
          >
            Return to Base
          </button>
        </div>
      </div>
    );
  }

  const durationDays =
    trip.startDate && trip.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const isPastPlan = trip.endDate ? new Date(trip.endDate) < new Date() : false;

  return (
    <main className="min-h-screen py-10">
      <Container>
        {/* Navigation Breadcrumb removed for focus */}

        {/* Hero Section */}
        <div className="relative w-full rounded-[3rem] overflow-hidden aspect-video lg:aspect-21/9 mb-10 group animate-in fade-in duration-1000">
          <Image
            alt={trip.destination}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            src={
              trip.images?.[0] ||
              'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
            }
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 lg:p-16 w-full">
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-primary px-6 py-2 rounded-full shadow-2xl shadow-primary/20 flex items-center gap-2">
                <div className="size-2 bg-slate-900 rounded-full animate-pulse"></div>
                <span className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em]">
                  {trip.travelType} MISSION
                </span>
              </div>
              <div className="px-6 py-2 rounded-full flex items-center gap-2">
                <Clock className="size-3.5 text-primary" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest">
                  {durationDays} DAY WINDOW
                </span>
              </div>
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase drop-shadow-2xl max-w-4xl">
              {trip.destination}
            </h1>
            <div className="flex items-center gap-4 text-primary font-black text-[10px] uppercase tracking-[0.4em] w-fit px-6 py-3 rounded-2xl border border-white/10">
              <MapPin className="size-4" strokeWidth={3} />
              {trip.coordinates?.lat?.toFixed(4) || '0.0000'} N /{' '}
              {trip.coordinates?.lng?.toFixed(4) || '0.0000'} E
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-16">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all">
                <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                  <Info className="size-6 text-primary" strokeWidth={3} />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">
                  Mission Intel
                </h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-slate-50 dark:border-slate-800 pb-4">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      Temporal Frame
                    </span>
                    <span className="font-black text-slate-900 dark:text-blue-50">
                      {new Date(trip.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      —{' '}
                      {new Date(trip.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-50 dark:border-slate-800 pb-4">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      Operation Status
                    </span>
                    {isPastPlan ? (
                      <span className="font-black text-slate-500 uppercase tracking-widest text-xs flex items-center gap-2">
                        <div className="size-2 bg-slate-500 rounded-full"></div>{' '}
                        Completed
                      </span>
                    ) : (
                      <span className="font-black text-emerald-500 uppercase tracking-widest text-xs flex items-center gap-2">
                        <div className="size-2 bg-emerald-500 rounded-full animate-ping"></div>{' '}
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </section>

              <section className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <DollarSign className="size-64" />
                </div>
                <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <DollarSign className="size-6 text-primary" strokeWidth={3} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                  Budget Range
                </h2>
                <div className="text-5xl font-black tracking-tighter mb-2">
                  ${trip.budget?.min} — ${trip.budget?.max}
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  Estimated Resource Load
                </p>
              </section>
            </div>

            {/* Briefing */}
            <section className="space-y-8 px-4">
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] shrink-0">
                  Mission Briefing
                </h2>
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight text-center max-w-3xl mx-auto opacity-90 underline decoration-primary decoration-4 underline-offset-8">
                &quot;{trip.description}&quot;
              </p>
            </section>

            {/* Tactical Itinerary */}
            <section className="space-y-10">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase px-4">
                Tactical Itinerary
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 lg:p-16 border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:rotate-12 transition-transform duration-1000">
                  <Navigation className="size-80" />
                </div>
                <div className="prose prose-xl prose-slate dark:prose-invert max-w-none font-bold text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed relative z-10 first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  {trip.itinerary}
                </div>
              </div>
            </section>

            {/* Gallery */}
            {trip.images && trip.images.length > 1 && (
              <section className="space-y-10">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase px-4">
                  Spatial Captures
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {trip.images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="group relative rounded-[3rem] overflow-hidden aspect-square md:aspect-auto md:h-[400px] border-8 border-white dark:border-slate-800 shadow-2xl"
                    >
                      <Image
                        fill
                        src={img}
                        alt={`Expedition View ${i}`}
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye
                          className="size-12 text-white animate-pulse"
                          strokeWidth={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            {/* Recruitment Card */}
            <section className="bg-primary text-slate-900 p-12 rounded-[4rem] shadow-2xl shadow-primary/30 text-center sticky top-24 transform hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-slate-900/10"></div>
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] mb-6 opacity-60">
                Expedition Status
              </h4>
              <div className="text-7xl font-black tracking-tighter mb-2 leading-none">
                02
              </div>
              <p className="font-black uppercase tracking-widest text-xs mb-10 opacity-60">
                Slots Remaining
              </p>

              <div className="space-y-4 relative z-10">
                {currentUser && trip?.user?._id === currentUser?._id ? (
                  <Link
                    href="/dashboard/user/travel-plans"
                    className="w-full py-6 bg-primary text-slate-900 rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-opacity-90 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  >
                    Manage Expedition
                  </Link>
                ) : isPastPlan ? (
                  <button
                    disabled
                    className="w-full py-6 bg-slate-800 text-slate-500 rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl cursor-not-allowed border border-slate-700/50"
                  >
                    Expedition Closed
                  </button>
                ) : hasAlreadyRequested ? (
                  <button
                    disabled
                    className="w-full py-6 bg-slate-600 text-white/70 rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl cursor-not-allowed"
                  >
                    ✓ Already Requested
                  </button>
                ) : (
                  <button
                    onClick={handleOpenModal}
                    className="w-full py-6 bg-slate-900 text-white rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
                  >
                    Join Request
                  </button>
                )}

                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">
                  Verification Protocol Required
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-900/10 flex flex-col items-center">
                <div className="flex -space-x-4 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="size-12 rounded-full border-4 border-primary bg-slate-900 flex items-center justify-center text-white font-black text-[10px] shadow-xl"
                    >
                      <Users className="size-4" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  Verified Team Members
                </p>
              </div>
            </section>

            {/* Coordinates Log */}
            <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Globe className="size-4 text-primary" strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Navigational Log
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Latitude
                  </p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                    {trip.coordinates?.lat?.toFixed(6) || '0.000000'}
                  </p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Longitude
                  </p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                    {trip.coordinates?.lng?.toFixed(6) || '0.000000'}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Review Section */}
        <section className="mt-20 max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-10 lg:p-16 shadow-sm hover:shadow-2xl transition-all">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-10">
              Transmit Evaluation
            </h3>

            <div className="space-y-10">
              {/* Rating Component */}
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
                        className={`size-10 group-active:scale-90 transition-all ${
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

              {/* Comment Field */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Detailed Debriefing
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => dispatch(setComment(e.target.value))}
                  className="w-full rounded-3xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all text-lg font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none min-h-[200px]"
                  placeholder={`Tell others about your mission experience with ${trip?.user?.name || 'this traveler'}...`}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitReview}
                disabled={isReviewing}
                className="w-full md:w-max px-12 py-5 rounded-full bg-slate-900 dark:bg-primary text-white dark:text-slate-900 font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-primary hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 border-none cursor-pointer"
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
      </Container>
      {/* Join Request Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />

          {/* Modal */}
          <div
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 fade-in duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 dark:bg-slate-800 p-8 pb-10 text-center relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-5 text-white" />
              </button>
              <div className="size-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Send className="size-7 text-primary" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-[0.15em]">
                Join Request
              </h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                Send your request to the expedition lead
              </p>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              {/* Plan ID - Read Only */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Expedition ID
                </label>
                <div className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide select-all cursor-default border border-slate-200 dark:border-slate-700">
                  {id}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Your Message
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder={`Hi! I'd love to join your trip to ${trip?.destination}. Let me know if there's room!`}
                  rows={4}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 pb-8 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                disabled={isJoining || !requestMessage.trim()}
                className="flex-1 py-4 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
              >
                {isJoining ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TravelPlanDetails;
