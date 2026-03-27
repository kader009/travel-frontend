'use client';

import { useState } from 'react';
import Container from '@/src/components/ui/Container';
import {
  useGetTravelPlanDetailsQuery,
  useCreateJoinRequestMutation,
  useGetMyJoinRequestsQuery,
  useCreateReviewMutation,
  useGetAllTravelPlansQuery,
} from '@/src/redux/store/api/endApi';
import { IJoinRequest } from '@/src/types/joinRequest';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { toast } from 'sonner';
import { resetReview } from '@/src/redux/store/features/reviewSlice';
import { Info, Loader2 } from 'lucide-react';
import { ITravelPlan } from '@/src/types/travelPlan';
import { IUser, TMaybeUser, IApiError } from '@/src/types/user';

// Extracted Components
import TravelHero from '@/src/components/module/travel-plans/details/TravelHero';
import { MissionIntel, BudgetCard } from '@/src/components/module/travel-plans/details/IntelCards';
import { TacticalItinerary, SpatialCaptures } from '@/src/components/module/travel-plans/details/MissionDetails';
import RecruitmentSidebar from '@/src/components/module/travel-plans/details/RecruitmentSidebar';
import ReviewSection from '@/src/components/module/travel-plans/details/ReviewSection';
import JoinRequestModal from '@/src/components/module/travel-plans/details/JoinRequestModal';

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
  const { data: allPlansData } = useGetAllTravelPlansQuery();
  
  const trip = planData?.data;
  
  const getUserId = (u: TMaybeUser) => {
    if (!u) return null;
    if (typeof u === 'string') return u;
    const userObj = u as { _id?: string; $oid?: string; id?: string };
    return userObj._id || userObj.$oid || userObj.id;
  };

  const currentUserId = getUserId(currentUser);
  const creatorId = getUserId(trip?.user as TMaybeUser) || trip?.userId;
  const isMe = !!(currentUserId && creatorId && String(currentUserId) === String(creatorId));
  const tripFromList = allPlansData?.data?.find((p: ITravelPlan) => String(p._id) === String(id));
  
  const planCreator = isMe 
    ? currentUser 
    : (trip?.user && typeof trip?.user === 'object' && ('email' in trip.user || 'name' in (trip.user as object))) 
      ? (trip.user as IUser)
      : (tripFromList?.user && typeof tripFromList.user === 'object') ? (tripFromList.user as IUser) : null;

  const [createJoinRequest, { isLoading: isJoining }] = useCreateJoinRequestMutation();
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();

  const { data: myRequestsData } = useGetMyJoinRequestsQuery(undefined, {
    skip: !currentUser,
  });

  const hasAlreadyRequested =
    myRequestsData?.data?.some((req: IJoinRequest) => {
      const planId = typeof req.travelPlan === 'string' ? req.travelPlan : req.travelPlan?._id;
      return planId === id;
    }) ?? false;

  const handleOpenModal = () => {
    if (!currentUser) {
      toast.error('Identity required. Please sign in to join expeditions.', {
        action: { label: 'Sign In', onClick: () => router.push('/login') },
      });
      return;
    }
    if (getUserId(trip?.user as TMaybeUser) === currentUserId) {
      toast.error('Mission Conflict', { description: 'You are the mission lead.' });
      return;
    }
    if (hasAlreadyRequested) {
      toast.error('Duplicate Request', { description: 'Request already transmitted.' });
      return;
    }
    setRequestMessage('');
    setIsModalOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!requestMessage.trim()) return;
    try {
      const response = await createJoinRequest({ travelPlan: id, message: requestMessage.trim() }).unwrap();
      if (response.success) {
        toast.success('Request Transmitted');
        setIsModalOpen(false);
      }
    } catch (error: unknown) {
      const err = error as IApiError;
      toast.error(err?.data?.message || 'Uplink Failed');
    }
  };

  const handleSubmitReview = async () => {
    if (!currentUser) return;
    if (reviewComment.trim().length < 10) {
      toast.error('Evaluation too short');
      return;
    }
    const revieweeId = typeof trip?.user === 'string' ? trip.user : trip?.user?._id || trip?.userId;
    try {
      const response = await createReview({
        reviewer: currentUser?._id as string,
        reviewee: revieweeId as string,
        rating: reviewRating,
        comment: reviewComment.trim(),
        travelPlan: id,
      }).unwrap();
      if (response.success) {
        toast.success('Review Transmitted');
        dispatch(resetReview());
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      toast.error(error?.data?.message || 'Uplink Failed');
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="size-16 animate-spin text-primary mb-6" />
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] animate-pulse">Establishing Uplink</p>
    </div>
  );

  if (isError || !trip) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-rose-500/10 p-12 rounded-[3rem] border border-rose-500/20 text-center">
        <Info className="size-10 text-rose-500 mx-auto mb-8" />
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase mb-4">Expedition Lost</h2>
        <button onClick={() => window.history.back()} className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-[10px] uppercase">Return to Base</button>
      </div>
    </div>
  );

  const durationDays = trip.startDate && trip.endDate ? Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const isPastPlan = trip.endDate ? new Date(trip.endDate) < new Date() : false;

  return (
    <main className="min-h-screen py-10">
      <Container>
        <TravelHero trip={trip} durationDays={durationDays} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MissionIntel trip={trip} isPastPlan={isPastPlan} />
              <BudgetCard trip={trip} />
            </div>

            <section className="space-y-8 px-4">
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] shrink-0">Mission Briefing</h2>
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight text-center max-w-3xl mx-auto opacity-90 underline decoration-primary decoration-4 underline-offset-8">
                &quot;{trip.description}&quot;
              </p>
            </section>

            <TacticalItinerary itinerary={trip.itinerary} />
            {trip.images && trip.images.length > 1 && <SpatialCaptures images={trip.images} />}
          </div>

          <RecruitmentSidebar 
            trip={trip} 
            planCreator={planCreator} 
            currentUser={currentUser} 
            isPastPlan={isPastPlan} 
            hasAlreadyRequested={hasAlreadyRequested} 
            handleOpenModal={handleOpenModal} 
          />
        </div>

        <ReviewSection 
          trip={trip} 
          reviewRating={reviewRating} 
          reviewComment={reviewComment} 
          isReviewing={isReviewing} 
          handleSubmitReview={handleSubmitReview} 
        />
      </Container>
      
      <JoinRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        id={id} 
        trip={trip} 
        requestMessage={requestMessage} 
        setRequestMessage={setRequestMessage} 
        handleSubmitRequest={handleSubmitRequest} 
        isJoining={isJoining} 
      />
    </main>
  );
};

export default TravelPlanDetails;
