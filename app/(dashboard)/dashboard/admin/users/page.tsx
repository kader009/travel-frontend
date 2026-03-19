'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store/store';
import { useGetAllUsersQuery, useDeleteUserMutation } from '@/src/redux/store/api/endApi';
import { Users, Mail, Shield, UserCircle, Loader2, Search, Pencil, Trash2, AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner';
import { IUser } from '@/src/types/user';

const ManageUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string, name: string } | null>(null);
  
  const { data, isLoading, error: fetchError } = useGetAllUsersQuery(undefined);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  
  const users = (data?.data as IUser[]) || [];
  
  // Client-side filtering
  const filteredUsers = users.filter((user: IUser) => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (user: IUser) => {
    // Prevent deleting self
    if (currentUser && user._id === currentUser._id) {
      toast.error('You cannot delete your own account');
      return;
    }

    // Prevent deleting other admins
    if (user.role === 'admin') {
      toast.error('Admin users cannot be deleted');
      return;
    }

    // Show confirmation toast
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
              setIsModalOpen(true);
            }
          },
        },
        cancel: {
          label: 'Cancel',
          onClick: () => {},
        },
      },
    );
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const res = await deleteUser(userToDelete.id).unwrap();
      if (res.success) {
        toast.success(`User "${userToDelete.name}" deleted successfully.`);
        setIsModalOpen(false);
        setUserToDelete(null);
      } else {
        toast.error(res.message || "Failed to delete user.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred while deleting the user.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Manage Users</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">View and manage all registered users on the platform.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Registered Users</p>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md">
              {searchTerm ? filteredUsers.length : users.length} {searchTerm ? 'Matches' : 'Total'}
            </span>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-5 py-2.5 text-sm border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-bold shadow-sm" 
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 className="size-10 animate-spin text-primary mb-4" />
            <p className="font-black uppercase tracking-widest text-xs">Fetching users data...</p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-16 text-rose-500">
            <Shield className="size-12 mx-auto mb-4 opacity-40" />
            <p className="font-black uppercase tracking-tight">Error loading users</p>
            <p className="text-sm mt-1 opacity-70">Please check your permissions and try again.</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20 text-slate-400 dark:text-slate-600">
            <Users className="size-14 mx-auto mb-5 opacity-20" />
            <p className="font-black uppercase tracking-tighter text-lg">
              {searchTerm ? 'No results found' : 'No users found'}
            </p>
            <p className="text-sm mt-1">
              {searchTerm ? `No matches found for "${searchTerm}"` : 'New registered users will appear in this list.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
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
                        <div className="size-11 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 transition-all">
                          {user.image ? (
                            <img src={user.image} alt={user.name} className="size-full object-cover" />
                          ) : (
                            <UserCircle className="size-6 text-primary opacity-60" />
                          )}
                        </div>
                        <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Mail className="size-3.5" />
                        <span className="text-sm font-bold">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                        user.role === 'admin' 
                          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-200/50 dark:border-amber-800/50' 
                          : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-200/50 dark:border-blue-800/50'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer group/edit" 
                          title="Edit User"
                        >
                          <Pencil className="size-4 group-hover/edit:scale-110 transition-transform" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer group/delete disabled:opacity-50 disabled:cursor-not-allowed" 
                          title={user._id === currentUser?._id ? "You cannot delete yourself" : (user.role === 'admin' ? "Admins cannot be deleted" : "Delete User")}
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

      {/* Custom Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isDeleting && setIsModalOpen(false)}
          ></div>
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="size-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 mb-6">
                <AlertTriangle className="size-10" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Confirm Delete</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Are you sure you want to delete <span className="font-black text-rose-500 underline underline-offset-4">{userToDelete?.name}</span>? 
                This action is permanent and cannot be undone.
              </p>
              
              <div className="grid grid-cols-2 gap-4 w-full mt-10">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isDeleting}
                  className="px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer uppercase tracking-widest text-xs disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-6 py-4 bg-rose-500 text-white font-black rounded-2xl hover:bg-rose-600 transition-all cursor-pointer shadow-lg shadow-rose-500/25 uppercase tracking-widest text-xs flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete User'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
