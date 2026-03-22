'use client';

import { useState, useMemo } from 'react';
import {
  useGetMyJoinRequestsQuery,
  useApproveJoinRequestMutation,
  useRejectJoinRequestMutation,
  useGetMyTravelPlansQuery,
  useGetJoinRequestsForPlanQuery,
} from '@/src/redux/store/api/endApi';
import { IJoinRequest } from '@/src/types/joinRequest';
import {
  Handshake,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Loader2,
  PlaneTakeoff,
  UserCheck,
  UserX,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

// Component to render requests for a single travel plan
const PlanRequests = ({
  planId,
  planName,
  planImage,
}: {
  planId: string;
  planName: string;
  planImage?: string;
}) => {
  const { data: requestsData, isLoading } =
    useGetJoinRequestsForPlanQuery(planId);
  const [approveRequest] = useApproveJoinRequestMutation();
  const [rejectRequest] = useRejectJoinRequestMutation();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const requests = requestsData?.data || [];

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (requests.length === 0) return null;

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessingId(id);
    try {
      const res =
        action === 'approve'
          ? await approveRequest(id).unwrap()
          : await rejectRequest(id).unwrap();

      if (res.success) {
        toast.success(
          `Request ${action === 'approve' ? 'Approved' : 'Rejected'}`,
          {
            description: `The traveler has been ${action === 'approve' ? 'added to your mission' : 'notified of the decision'}.`,
          },
        );
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error('Mission Failed', {
        description: error?.data?.message || 'Unable to process request.',
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Plan Header */}
      <div className="flex items-center gap-3 px-2">
        <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-200 dark:border-slate-700">
          {planImage ? (
            <Image
              src={planImage}
              alt={planName}
              fill
              className="object-cover"
            />
          ) : (
            <MapPin className="size-5 text-slate-300" />
          )}
        </div>
        <div>
          <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">
            {planName}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {requests.length} request{requests.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Requests List */}
      {requests.map((req: IJoinRequest) => (
        <div
          key={req._id}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-4xl flex flex-col md:flex-row items-start md:items-center gap-5 group hover:border-primary/20 transition-all shadow-sm"
        >
          {/* Plan Image */}
          {planImage && (
            <div className="size-14 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden relative border border-slate-200 dark:border-slate-700">
              <Image
                src={planImage}
                alt={planName}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* User Avatar */}
          <div className="size-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-200 dark:border-slate-700">
            {req.user?.image ? (
              <Image
                src={req.user.image}
                alt={req.user?.name || 'User'}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-xl font-black text-slate-300 dark:text-slate-600">
                {req.user?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-black text-slate-900 dark:text-white tracking-tight truncate">
                {req.user?.name || 'Unknown Traveler'}
              </h4>
              <ChevronRight className="size-4 text-slate-300 shrink-0" />
            </div>
            {req.user?.email && (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                {req.user.email}
              </p>
            )}
            {req.message && (
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold line-clamp-2 italic">
                &quot;{req.message}&quot;
              </p>
            )}
          </div>

          {/* Status Badge & Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {req.status === 'pending' ? (
              <>
                <button
                  onClick={() => handleAction(req._id, 'approve')}
                  disabled={processingId === req._id}
                  className="flex-1 md:flex-none px-5 py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {processingId === req._id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <UserCheck className="size-3.5" />
                  )}
                  Approve
                </button>
                <button
                  onClick={() => handleAction(req._id, 'reject')}
                  disabled={processingId === req._id}
                  className="flex-1 md:flex-none px-5 py-3 bg-rose-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {processingId === req._id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <UserX className="size-3.5" />
                  )}
                  Reject
                </button>
              </>
            ) : (
              <div
                className={`px-4 py-2.5 rounded-full flex items-center gap-2 border w-full md:w-auto justify-center ${
                  req.status === 'approved'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                }`}
              >
                {req.status === 'approved' ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <XCircle className="size-3.5" />
                )}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {req.status}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const JoinRequestsPage = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  // Sent Requests
  const { data: sentRequestsData, isLoading: isSentLoading } =
    useGetMyJoinRequestsQuery();

  // Fetch user's own plans to get received requests
  const { data: myPlansData, isLoading: isPlansLoading } =
    useGetMyTravelPlansQuery();

  const sentRequests = sentRequestsData?.data || [];
  const myPlans = useMemo(() => myPlansData?.data || [], [myPlansData]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Expedition Requests
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage personnel requests and mission status.
          </p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'received'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            Received
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'sent'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            Sent
          </button>
        </div>
      </div>

      {activeTab === 'sent' ? (
        <div className="space-y-4">
          {isSentLoading ? (
            <div className="py-24 flex flex-col items-center gap-4">
              <Loader2 className="size-10 animate-spin text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Syncing Transmissions
              </p>
            </div>
          ) : sentRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {sentRequests.map((req: IJoinRequest) => {
                const plan =
                  typeof req.travelPlan === 'string' ? null : req.travelPlan;
                return (
                  <div
                    key={req._id}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-4xl flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-primary/20 transition-all shadow-sm"
                  >
                    <div className="size-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-100 dark:border-slate-800">
                      {plan?.images?.[0] ? (
                        <Image
                          src={plan.images[0]}
                          alt="Plan"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <PlaneTakeoff className="size-8 text-slate-200" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
                          {plan?.destination || 'Classified Destination'}
                        </h3>
                        <ChevronRight className="size-4 text-slate-300" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-bold line-clamp-2 italic">
                        &quot;{req.message}&quot;
                      </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div
                        className={`px-4 py-2 rounded-full flex items-center gap-2 border w-full md:w-auto justify-center ${
                          req.status === 'pending'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                            : req.status === 'approved'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                              : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                        }`}
                      >
                        {req.status === 'pending' ? (
                          <Clock className="size-3.5" />
                        ) : req.status === 'approved' ? (
                          <CheckCircle2 className="size-3.5" />
                        ) : (
                          <XCircle className="size-3.5" />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {req.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
              <Handshake className="size-14 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                No Active Requests
              </h3>
              <p className="text-slate-500 font-bold mt-2">
                You haven&apos;t requested to join any expeditions yet.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* ===== RECEIVED TAB ===== */
        <div className="space-y-8">
          {isPlansLoading ? (
            <div className="py-24 flex flex-col items-center gap-4">
              <Loader2 className="size-10 animate-spin text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Loading Your Expeditions
              </p>
            </div>
          ) : myPlans.length > 0 ? (
            myPlans.map((plan) => {
              if (!plan._id) return null;
              return (
                <PlanRequests
                  key={plan._id}
                  planId={plan._id}
                  planName={plan.destination || 'Unknown Destination'}
                  planImage={plan.images?.[0]}
                />
              );
            })
          ) : (
            <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
              <PlaneTakeoff className="size-14 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                No Expeditions Yet
              </h3>
              <p className="text-slate-500 font-bold mt-2">
                Create a travel plan first to receive join requests.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinRequestsPage;
