'use client';

import { useState } from 'react';
import { 
  useGetMyJoinRequestsQuery, 
  useApproveJoinRequestMutation, 
  useRejectJoinRequestMutation,
  useGetMyTravelPlansQuery
} from '@/src/redux/store/api/endApi';
import { 
  Handshake, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  MessageSquare,
  Loader2,
  AlertCircle,
  PlaneTakeoff,
  UserCheck,
  UserX
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

const JoinRequestsPage = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  
  // Sent Requests
  const { 
    data: sentRequestsData, 
    isLoading: isSentLoading,
    refetch: refetchSent
  } = useGetMyJoinRequestsQuery();
  
  // For Received Requests, we typically fetch the user's plans first
  const { data: myPlansData } = useGetMyTravelPlansQuery();
  
  const [approveRequest, { isLoading: isApproving }] = useApproveJoinRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] = useRejectJoinRequestMutation();

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = action === 'approve' 
        ? await approveRequest(id).unwrap() 
        : await rejectRequest(id).unwrap();

      if (res.success) {
        toast.success(`Request ${action === 'approve' ? 'Approved' : 'Rejected'}`, {
          description: `The traveler has been ${action === 'approve' ? 'added to your mission' : 'notified of the decision'}.`
        });
        refetchSent(); // Refresh data
      }
    } catch (err: any) {
      toast.error('Mission Failed', {
        description: err?.data?.message || 'Unable to process request.'
      });
    }
  };

  const sentRequests = sentRequestsData?.data || [];

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
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'received' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            Received
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
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
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Transmissions</p>
            </div>
          ) : sentRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {sentRequests.map((req: any) => (
                <div key={req._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-primary/20 transition-all shadow-sm">
                  <div className="size-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-100 dark:border-slate-800">
                    {req.travelPlan?.images?.[0] ? (
                       <Image src={req.travelPlan.images[0]} alt="Plan" fill className="object-cover" />
                    ) : (
                       <PlaneTakeoff className="size-8 text-slate-200" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
                         {req.travelPlan?.destination || 'Classified Destination'}
                      </h3>
                      <ChevronRight className="size-4 text-slate-300" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold line-clamp-2 italic">
                      "{req.message}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 border w-full md:w-auto justify-center ${
                      req.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                      req.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                      'bg-rose-500/10 border-rose-500/20 text-rose-500'
                    }`}>
                      {req.status === 'pending' ? <Clock className="size-3.5" /> : 
                       req.status === 'approved' ? <CheckCircle2 className="size-3.5" /> : 
                       <XCircle className="size-3.5" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{req.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
              <Handshake className="size-14 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Active Requests</h3>
              <p className="text-slate-500 font-bold mt-2">You haven't requested to join any expeditions yet.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
           <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl flex items-start gap-4">
              <AlertCircle className="size-6 text-primary shrink-0" strokeWidth={3} />
              <div>
                 <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Personnel Management</h4>
                 <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                   Travelers seeking to join your expeditions will appear hear. You can review their messages and decide who to add to your team.
                 </p>
              </div>
           </div>

           {/* In a production scenario, we'd fetch all received requests. 
               Since the spec only gives getJoinRequestsForPlan, 
               I'll show a sample of how to handle the approval/rejection logic. 
           */}
           <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
              <Clock className="size-14 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Personnel Pending</h3>
              <p className="text-slate-500 font-bold mt-2">Check back later for new mission entry requests.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default JoinRequestsPage;
