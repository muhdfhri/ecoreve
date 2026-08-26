import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
  Search,
  ShieldCheck,
  Mail,
  Edit,
  Trash2,
  User,
  UserX,
  Filter,
  X,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { EmptyState } from "@/Components/ui/EmptyState";

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  created_at?: string;
}

interface UsersAdminViewProps {
  users?: UserData[];
}

export const UsersAdminView: React.FC<UsersAdminViewProps> = ({ users = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("ALL");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form State
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
    avatar_url: "",
  });

  // Default fallback sample users if DB is empty
  const defaultUsers: UserData[] = [
    {
      id: 1,
      name: "EcoReve Admin",
      email: "admin@ecoreve.com",
      role: "superadmin",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Jamik Tashpulatov",
      email: "jamik@ecoreve.com",
      role: "reviewer",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Eddie Lake",
      email: "eddie@ecoreve.com",
      role: "editor",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
  ];

  const actualUsers = users && users.length > 0 ? users : defaultUsers;

  // Filter users by Search & Role
  const filteredUsers = actualUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === "ALL" || u.role === filterRole;

    return matchesSearch && matchesRole;
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      name: "",
      email: "",
      password: "password123",
      role: "editor",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    });
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "editor",
      avatar_url: user.avatar_url || "",
    });
    setIsEditOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  // Submit Create User
  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/users", formData, {
      onSuccess: () => {
        setIsCreateOpen(false);
      },
    });
  };

  // Submit Edit User
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    router.post(`/admin/users/${selectedUser.id}/update`, formData, {
      onSuccess: () => {
        setIsEditOpen(false);
        setSelectedUser(null);
      },
    });
  };

  // Submit Delete User
  const handleSubmitDelete = () => {
    if (!selectedUser) return;

    router.post(`/admin/users/${selectedUser.id}/delete`, {}, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setSelectedUser(null);
      },
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. TOP TOOLBAR & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search admin users by name, email, or role..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="reviewer">Reviewer</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#005883] hover:bg-[#003853] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Admin User</span>
          </button>
        </div>
      </div>

      {/* 2. USERS DATA TABLE OR EMPTY STATE */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={UserX}
          title="No Admin Users Found"
          description={
            searchQuery
              ? `No admin users matched your search query "${searchQuery}". Try searching with another name or role.`
              : "No admin users created yet. Click the 'Add Admin User' button above to create one."
          }
          actionLabel={searchQuery ? "Clear Search Filter" : "Add Admin User"}
          onAction={searchQuery ? () => setSearchQuery("") : handleOpenCreate}
        />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-300">
              <thead className="bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3.5 font-bold">User Profile</th>
                  <th className="p-3.5 font-bold">Email Address</th>
                  <th className="p-3.5 font-bold">Role Guard</th>
                  <th className="p-3.5 font-bold">Account Status</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.name} className="h-8 w-8 rounded-full object-cover shrink-0 border border-zinc-200/60 dark:border-zinc-800" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                      <span>{user.name}</span>
                    </td>
                    <td className="p-3.5 font-mono text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-zinc-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800/40">
                        <ShieldCheck className="h-3 w-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-semibold">
                        Active
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                          title="Edit User"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(user)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-all cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. CREATE USER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add Admin User
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreate} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Lin"
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@ecoreve.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Role Guard</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="superadmin">Super Admin</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Avatar Image URL</label>
                  <input
                    type="text"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT USER MODAL */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Admin User (#{selectedUser.id})
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Lock className="h-3 w-3 text-zinc-400" />
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Leave blank to keep same"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Role Guard</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="superadmin">Super Admin</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Avatar Image URL</label>
                  <input
                    type="text"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-950/40">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Delete Admin User</h3>
                <p className="text-xs text-zinc-500">Are you sure you want to remove this user?</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{selectedUser.name} ({selectedUser.email})"
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
