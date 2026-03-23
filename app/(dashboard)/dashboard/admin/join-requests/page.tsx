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
  Search,
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

// Component to render requests for a single travel plan (Matching User Dashboard Style)
const PlanRequests = ({
  planId,
  planName,
  planImage,
}: {
  planId: string;
  planName: string;
  planImage?: string;
}) => {
  const { data: requestsData, isLoading } = useGetJoinRequestsForPlanQuery(planId);
  const [approveRequest] = useApproveJoinRequestMutation();
  const [rejectRequest] = useRejectJoinRequestMutation();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const requests = requestsData?.data || [];

  if (isLoading) return (
    <div className="py-8 flex justify-center">
      <Loader2 className="size-6 animate-spin text-primary" />
    </div>
  );

  if (requests.length === 0) return null;

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessingId(id);
    try {
      const response = action === 'approve' 
        ? await approveRequest(id).unwrap() 
        : await rejectRequest(id).unwrap();

      if (response.success) {
        toast.success(`Request ${action === 'approve' ? 'Approved' : 'Rejected'} successfully`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Unable to update request status');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Plan Header */}
      <div className="flex items-center gap-3 px-2">
        <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-200 dark:border-slate-700">
          {planImage ? <img src={planImage} alt={planName} className="size-full object-cover" /> : <MapPin className="size-5 text-slate-300" />}
        </div>
        <div>
          <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">{planName}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{requests.length} requests</p>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {requests.map((request: IJoinRequest) => (
          <div key={request._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl flex flex-col md:flex-row items-start md:items-center gap-5 group hover:border-primary/20 transition-all shadow-sm">
            <div className="size-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-200 dark:border-slate-700">
              {request.user?.image ? <img src={request.user.image} alt="User" className="size-full object-cover" /> : <span className="text-xl font-black text-slate-300">{request.user?.name?.charAt(0) || '?'}</span>}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-black text-slate-900 dark:text-white tracking-tight truncate">{request.user?.name || 'Unknown'}</h4>
                <ChevronRight className="size-4 text-slate-300" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{request.user?.email}</p>
              {request.message && <p className="text-slate-500 text-xs font-bold line-clamp-2 italic">&quot;{request.message}&quot;</p>}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              {request.status === 'pending' ? (
                <>
                  <button onClick={() => handleAction(request._id, 'approve')} disabled={processingId === request._id} className="flex-1 md:flex-none px-5 py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
                     {processingId === request._id ? <Loader2 className="size-3.5 animate-spin" /> : <UserCheck className="size-3.5" />} Approve
                  </button>
                  <button onClick={() => handleAction(request._id, 'reject')} disabled={processingId === request._id} className="flex-1 md:flex-none px-5 py-3 bg-rose-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
                    {processingId === request._id ? <Loader2 className="size-3.5 animate-spin" /> : <UserX className="size-3.5" />} Reject
                  </button>
                </>
              ) : (
                <div className={`px-4 py-2.5 rounded-full flex items-center gap-2 border ${request.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                  {request.status === 'approved' ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{request.status}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminJoinRequestsPage = () => {
  const [activeTab, setActiveTab ] = useState<'received' | 'sent'>('received');

  // Requests Sent by Admin
  const { data: sentRequestsData, isLoading: isSentLoading } = useGetMyJoinRequestsQuery();

  // Plans owned by Admin (to get received requests)
  const { data: myPlansData, isLoading: isPlansLoading } = useGetMyTravelPlansQuery();

  const sentRequests = sentRequestsData?.data || [];
  const myPlans = useMemo(() => myPlansData?.data || [], [myPlansData]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Expedition Requests</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">Manage personnel requests and mission status.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'received'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            Received
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
              activeTab === 'sent'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            Sent
          </button>
        </div>
      </header>

      {activeTab === 'sent' ? (
        <div className="space-y-4">
          {isSentLoading ? (
            <div className="py-24 flex flex-col items-center gap-4">
              <Loader2 className="size-10 animate-spin text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Transmissions...</p>
            </div>
          ) : sentRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {sentRequests.map((request: IJoinRequest) => {
                const plan = typeof request.travelPlan === 'string' ? null : request.travelPlan;
                return (
                  <div key={request._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-primary/20 transition-all shadow-sm">
                    <div className="size-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-100 dark:border-slate-800">
                      {plan?.images?.[0] ? <img src={plan.images[0]} alt="Plan" className="size-full object-cover" /> : <PlaneTakeoff className="size-8 text-slate-200" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{plan?.destination || 'Classified'}</h3>
                        <ChevronRight className="size-4 text-slate-300" />
                      </div>
                      <p className="text-slate-500 text-xs font-bold line-clamp-2 italic">&quot;{request.message}&quot;</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 border ${request.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : request.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                      {request.status === 'pending' ? <Clock className="size-3.5" /> : request.status === 'approved' ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{request.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
              <Handshake className="size-14 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Active Requests</h3>
              <p className="text-slate-500 font-bold mt-2">You haven&apos;t requested to join any expeditions yet.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {isPlansLoading ? (
            <div className="py-24 flex flex-col items-center gap-4">
              <Loader2 className="size-10 animate-spin text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Your Expeditions...</p>
            </div>
          ) : myPlans.length > 0 ? (
            myPlans.map((plan) => (
              <PlanRequests
                key={plan._id}
                planId={plan._id || ''}
                planName={plan.destination}
                planImage={plan.images?.[0]}
              />
            ))
          ) : (
            <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
              <PlaneTakeoff className="size-14 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Expeditions Yet</h3>
              <p className="text-slate-500 font-bold mt-2">Create a travel plan first to receive join requests.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminJoinRequestsPage;
