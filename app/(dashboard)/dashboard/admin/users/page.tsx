'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import Image from 'next/image';
import { useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '@/src/redux/store/api/endApi';
import { Mail, Shield, UserCircle, Loader2, Search, Pencil, Trash2, AlertTriangle, X, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';
import { IUser, TUserRole } from '@/src/types/user';
import AdminUsersSkeleton from '@/src/components/skeleton/AdminUsersSkeleton';

const ManageUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Delete States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string, name: string } | null>(null);
  
  // Edit States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    role: '' as TUserRole,
    image: '',
  });

  const { data, isLoading, error: fetchError } = useGetAllUsersQuery(undefined);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  
  const users = (data?.data as IUser[]) || [];
  
  // Client-side filtering
  const filteredUsers = users.filter((user: IUser) => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- DELETE HANDLERS ---
  const handleDeleteClick = (user: IUser) => {
    if (currentUser && user._id === currentUser._id) {
      toast.error('You cannot delete your own account');
      return;
    }
    if (user.role === 'admin') {
      toast.error('Admin users cannot be deleted');
      return;
    }

    toast(
      <div className="flex flex-col gap-2 p-1">
        <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Delete User?</p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
          Are you sure you want to delete {user.name}?
        </p>
      </div>,
      {
        duration: 5000,
        action: {
          label: 'Yes, Delete',
          onClick: () => {
            if (user._id) {
              setUserToDelete({ id: user._id, name: user.name });
              setIsDeleteModalOpen(true);
            }
          },
        },
        cancel: { label: 'Cancel', onClick: () => {} },
      },
    );
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const res = await deleteUser(userToDelete.id).unwrap();
      if (res.success) {
        toast.success(`User "${userToDelete.name}" deleted successfully.`);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "An error occurred while deleting the user.");
    }
  };

  // --- EDIT HANDLERS ---
  const handleEditClick = (user: IUser) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || '',
      role: user.role || 'user',
      image: user.image || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser?._id) return;

    try {
      const res = await updateUser({
        id: editingUser._id,
        data: editForm,
      }).unwrap();

      if (res.success) {
        toast.success("User updated successfully!");
        setIsEditModalOpen(false);
        setEditingUser(null);
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to update user.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Manage Users</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">View and manage all registered users on the platform.</p>
        </div>
      </header>

      <div className="bg-white dark:bg-background-dark rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Registered Users</p>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md">
              {searchTerm ? filteredUsers.length : users.length} Total
            </span>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-5 py-2.5 text-sm border border-slate-100 dark:border-slate-800 rounded-full bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-bold" 
            />
          </div>
        </div>

        {isLoading ? (
          <AdminUsersSkeleton />
        ) : fetchError ? (
          <div className="text-center py-16 text-rose-500">
            <Shield className="size-12 mx-auto mb-4 opacity-40" />
            <p className="font-black uppercase tracking-tight">Error loading users</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-background-dark">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">User</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Email</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Role</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredUsers.map((user: IUser) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-11 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 transition-all shrink-0 relative">
                          {user.image ? <Image src={user.image} alt={user.name} fill className="object-cover" /> : <UserCircle className="size-6 text-primary opacity-60" />}
                        </div>
                        <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight truncate max-w-[150px]">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Mail className="size-3.5" />
                        <span className="text-sm font-bold truncate max-w-[200px] text-slate-900 dark:text-white">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`w-fit px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full border ${user.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-200/50' : 'bg-blue-50 text-blue-600 border-blue-200/50'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEditClick(user)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer group/edit" title="Edit User">
                          <Pencil className="size-4 group-hover/edit:scale-110 transition-transform" />
                        </button>
                        <button onClick={() => handleDeleteClick(user)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer group/delete" title="Delete User">
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

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isUpdating && setIsEditModalOpen(false)}></div>
          <div className="bg-white dark:bg-background-dark w-full max-w-lg max-h-full overflow-y-auto rounded-3xl shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 z-20 bg-slate-50 dark:bg-background-dark px-6 md:px-8 py-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Pencil className="size-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Edit Profile</h3>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="relative group">
                  <div className="size-24 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-md relative">
                    {editForm.image ? (
                      <Image src={editForm.image} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="size-full bg-slate-100 dark:bg-background-dark flex items-center justify-center text-slate-400">
                        <UserCircle className="size-10" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white size-6" />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Profile Image URL</label>
                  <input 
                    type="text" 
                    value={editForm.image}
                    onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-5 py-3 text-sm bg-slate-50 dark:bg-background-dark border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-5 py-3 text-sm bg-slate-50 dark:bg-background-dark border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Account Role</label>
                  <select 
                    value={editForm.role}
                    onChange={(e) => setEditForm({...editForm, role: e.target.value as TUserRole})}
                    className="w-full px-5 py-3 text-sm bg-slate-50 dark:bg-background-dark border border-slate-100 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-700 dark:text-slate-300 appearance-none cursor-pointer"
                  >
                    <option value="user">Traveler (User)</option>
                    <option value="admin">Administrator (Admin)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isUpdating}
                  className="w-full sm:flex-1 px-6 py-4 bg-slate-50 dark:bg-background-dark text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all cursor-pointer uppercase tracking-widest text-xs whitespace-nowrap"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="w-full sm:flex-1 px-6 py-4 bg-primary text-slate-900 font-black rounded-2xl hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all cursor-pointer uppercase tracking-widest text-xs flex items-center justify-center gap-2 group whitespace-nowrap order-first sm:order-last"
                >
                  {isUpdating ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" strokeWidth={3} />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isDeleting && setIsDeleteModalOpen(false)}></div>
          <div className="bg-white dark:bg-background-dark w-full max-w-md max-h-full overflow-y-auto rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 text-center">
            <div className="size-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 mx-auto mb-6">
              <AlertTriangle className="size-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Final Confirmation</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Are you sure you want to permanently delete <span className="text-rose-500 font-black underline">{userToDelete?.name}</span>?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button 
                onClick={() => setIsDeleteModalOpen(false)} 
                disabled={isDeleting} 
                className="w-full sm:flex-1 px-6 py-4 bg-slate-50 dark:bg-background-dark text-slate-500 font-black rounded-2xl hover:bg-slate-100 text-xs uppercase cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                disabled={isDeleting} 
                className="w-full sm:flex-1 px-6 py-4 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 shadow-lg shadow-rose-500/20 text-xs uppercase flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap order-first sm:order-last"
              >
                {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />} 
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
