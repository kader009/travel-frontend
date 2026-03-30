'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  useGetAllTravelPlansAdminQuery,
  useDeleteTravelPlanAdminMutation,
  useUpdateTravelPlanMutation, // Assuming admin can use standard update or it's allowed
} from '@/src/redux/store/api/endApi';
import {
  Map,
  Search,
  Trash2,
  Loader2,
  Calendar,
  DollarSign,
  User,
  Pencil,
  AlertTriangle,
  X,
  Check,
  Plane,
} from 'lucide-react';
import { toast } from 'sonner';
import { ITravelPlan, TTravelType } from '@/src/types/travelPlan';
import { format } from 'date-fns';
import AdminTravelPlansSkeleton from '@/src/components/skeleton/AdminTravelPlansSkeleton';

const AdminTravelPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Delete States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<{
    id: string;
    destination: string;
  } | null>(null);

  // Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ITravelPlan | null>(null);
  const [editForm, setEditForm] = useState({
    destination: '',
    travelType: '' as TTravelType,
    budget: { min: 0, max: 0 },
    description: '',
  });

  const {
    data,
    isLoading,
    error: fetchError,
  } = useGetAllTravelPlansAdminQuery(undefined);
  const [deleteTravelPlan, { isLoading: isDeleting }] =
    useDeleteTravelPlanAdminMutation();
  const [updateTravelPlan, { isLoading: isUpdating }] =
    useUpdateTravelPlanMutation();

  const travelPlans = (data?.data as ITravelPlan[]) || [];

  // Client-side filtering
  const filteredPlans = travelPlans.filter(
    (travelPlan: ITravelPlan) =>
      travelPlan.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      travelPlan.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- DELETE HANDLERS ---
  const handleDeleteClick = (plan: ITravelPlan) => {
    if (!plan._id) return;

    toast(
      <div className="flex flex-col gap-2 p-1">
        <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-sm">
          Delete Travel Plan?
        </p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
          Are you sure you want to delete the plan for {plan.destination}?
        </p>
      </div>,
      {
        duration: 5000,
        action: {
          label: 'Yes, Delete',
          onClick: () => {
            setPlanToDelete({ id: plan._id!, destination: plan.destination });
            setIsDeleteModalOpen(true);
          },
        },
        cancel: { label: 'Cancel', onClick: () => {} },
      },
    );
  };

  const confirmDelete = async () => {
    if (!planToDelete) return;
    try {
      const response = await deleteTravelPlan(planToDelete.id).unwrap();
      if (response.success) {
        toast.success(
          `Plan for "${planToDelete.destination}" deleted successfully.`,
        );
        setIsDeleteModalOpen(false);
        setPlanToDelete(null);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(
        error?.data?.message || 'An error occurred while deleting the plan.',
      );
    }
  };

  // --- EDIT HANDLERS ---
  const handleEditClick = (plan: ITravelPlan) => {
    setEditingPlan(plan);
    setEditForm({
      destination: plan.destination || '',
      travelType: plan.travelType || 'Solo',
      budget: {
        min: plan.budget?.min || 0,
        max: plan.budget?.max || 0,
      },
      description: plan.description || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingPlan?._id) return;

    try {
      const response = await updateTravelPlan({
        id: editingPlan._id,
        data: editForm,
      }).unwrap();

      if (response.success) {
        toast.success('Travel plan updated successfully!');
        setIsEditModalOpen(false);
        setEditingPlan(null);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to update travel plan.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            Manage Travel Plans
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">
            Monitor and manage all travel itineraries on the platform.
          </p>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Listed Plans
            </p>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md">
              {searchTerm ? filteredPlans.length : travelPlans.length} Total
            </span>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by destination or creator..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-11 pr-5 py-2.5 text-sm border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-bold shadow-sm"
            />
          </div>
        </div>

        {isLoading ? (
          <AdminTravelPlansSkeleton />
        ) : fetchError ? (
          <div className="text-center py-16 text-rose-500">
            <Map className="size-12 mx-auto mb-4 opacity-40" />
            <p className="font-black uppercase tracking-tight">
              Error loading travel plans
            </p>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="py-24 text-center">
            <Map className="size-12 mx-auto mb-4 text-slate-200 dark:text-slate-700" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">
              No plans found matching your criteria
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    Destination
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    Creator
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    Date Range
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    Budget
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredPlans.map((plan: ITravelPlan) => (
                  <tr
                    key={plan._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 transition-all shrink-0 relative">
                          {plan.images && plan.images[0] ? (
                            <Image
                              src={plan.images[0]}
                              alt={plan.destination}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Map className="size-5 text-primary opacity-60" />
                          )}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight truncate max-w-[200px] capitalize">
                            {plan.destination}
                          </p>
                          <span className="text-[9px] font-black uppercase tracking-widest text-primary/70">
                            {plan.travelType}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <User className="size-3.5" />
                        <span className="text-sm font-bold truncate max-w-[150px]">
                          {plan.user?.name || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5" />
                        <span className="text-sm font-bold truncate">
                          {format(new Date(plan.startDate), 'MMM d')} -{' '}
                          {format(new Date(plan.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
                        <DollarSign className="size-3.5 text-emerald-500" />
                        <span className="text-sm font-black tracking-tight">
                          ${plan.budget.min} - ${plan.budget.max}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(plan)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer group/edit"
                          title="Edit Plan"
                        >
                          <Pencil className="size-4 group-hover/edit:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(plan)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer group/delete"
                          title="Delete Plan"
                        >
                          <Trash2 className="size-4 group-hover/delete:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Travel Plan Modal */}
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
                  Edit Travel Plan
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                    Destination
                  </label>
                  <div className="relative">
                    <Map className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={editForm.destination}
                      onChange={(event) =>
                        setEditForm({
                          ...editForm,
                          destination: event.target.value,
                        })
                      }
                      className="w-full pl-11 pr-5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                    Travel Type
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <select
                      value={editForm.travelType}
                      onChange={(event) =>
                        setEditForm({
                          ...editForm,
                          travelType: event.target.value as TTravelType,
                        })
                      }
                      className="w-full pl-11 pr-10 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-300 appearance-none cursor-pointer"
                    >
                      <option value="Solo">Solo Traveler</option>
                      <option value="Friends">Friends Group</option>
                      <option value="Family">Family Trip</option>
                      <option value="Couple">Couple Trip</option>
                      <option value="Group">Mixed Group</option>
                      <option value="Business">Business Trip</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                    Min Budget ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={editForm.budget.min}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        budget: {
                          ...editForm.budget,
                          min: Number(event.target.value),
                        },
                      })
                    }
                    className="w-full px-5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                    Max Budget ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={editForm.budget.max}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        budget: {
                          ...editForm.budget,
                          max: Number(event.target.value),
                        },
                      })
                    }
                    className="w-full px-5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                    Plan Description
                  </label>
                  <textarea
                    rows={4}
                    value={editForm.description}
                    onChange={(event) =>
                      setEditForm({ ...editForm, description: event.target.value })
                    }
                    className="w-full px-5 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all resize-none"
                    placeholder="Short description of the trip..."
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isUpdating}
                  className="flex-1 px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all cursor-pointer uppercase tracking-widest text-xs"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 px-6 py-4 bg-primary text-slate-900 font-black rounded-2xl hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all cursor-pointer uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
                >
                  {isUpdating ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" strokeWidth={3} />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
          ></div>
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 text-center">
            <div className="size-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 mx-auto mb-6">
              <AlertTriangle className="size-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
              Confirm Removal
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Are you absoluteley sure you want to remove the travel plan for{' '}
              <span className="text-rose-500 font-black underline">
                {planToDelete?.destination}
              </span>
              ?
            </p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-500 font-black rounded-2xl hover:bg-slate-100 text-xs uppercase cursor-pointer"
              >
                Keep Plan
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-6 py-4 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 shadow-lg shadow-rose-500/20 text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}{' '}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTravelPlansPage;
