"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Filter,
  MoreVertical,
  Trash2,
  Search,
  SearchIcon,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const ALLOWED_PERMISSIONS = [
  "products",
  "orders",
  "blogs",
  "users",
  "settings",
];
const PERMISSION_BADGE_STYLES = {
  products: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  orders: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  blogs: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  users: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  settings: "border-rose-500/30 bg-rose-500/10 text-rose-200",
};

const initialCreateForm = {
  name: "",
  email: "",
  password: "",
  permissions: [],
};

const initialDraftProfile = {
  name: "",
  email: "",
  phone: "",
  profileImage: "",
};

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [creating, setCreating] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [drawerMode, setDrawerMode] = useState("view");
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [draftPermissions, setDraftPermissions] = useState([]);
  const [draftProfile, setDraftProfile] = useState(initialDraftProfile);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedAdminId = selectedAdmin?.id;

  const drawerTitle = useMemo(() => {
    if (!selectedAdmin) return "Admin Details";
    return selectedAdmin.name || selectedAdmin.email || "Admin Details";
  }, [selectedAdmin]);

  const filteredAdmins = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return admins;
    return admins.filter((admin) => {
      const name = String(admin.name || "").toLowerCase();
      const email = String(admin.email || "").toLowerCase();
      return name.includes(query) || email.includes(query);
    });
  }, [admins, searchQuery]);

  const allVisibleSelected = useMemo(() => {
    if (filteredAdmins.length === 0) return false;
    return filteredAdmins.every((admin) => selectedIds.includes(admin.id));
  }, [filteredAdmins, selectedIds]);

  const fetchAdmins = useCallback(async () => {
    setLoadingAdmins(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin", {
        withCredentials: true,
      });
      setAdmins(
        Array.isArray(response.data.admins) ? response.data.admins : [],
      );
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to fetch admins",
      });
    } finally {
      setLoadingAdmins(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAdmins();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchAdmins]);

  const openDrawer = (admin, mode = "view") => {
    setDrawerMode(mode);
    setSelectedAdmin(admin);
    setDraftPermissions(
      Array.isArray(admin.permissions) ? admin.permissions : [],
    );
    setDraftProfile({
      name: admin.name || "",
      email: admin.email || "",
      phone: admin.phone || "",
      profileImage: admin.profileImage || "",
    });
    setIsDrawerMounted(true);
    requestAnimationFrame(() => setIsDrawerOpen(true));
    setFeedback({ type: "", message: "" });
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setIsDrawerMounted(false);
      setSelectedAdmin(null);
      setDraftPermissions([]);
      setDraftProfile(initialDraftProfile);
    }, 260);
  };

  const togglePermission = (permission) => {
    setDraftPermissions((prev) => {
      if (prev.includes(permission)) {
        return prev.filter((p) => p !== permission);
      }
      return [...prev, permission];
    });
  };

  const handleDraftProfileChange = (e) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCreatePermission = (permission) => {
    setCreateForm((prev) => {
      const current = Array.isArray(prev.permissions) ? prev.permissions : [];
      if (current.includes(permission)) {
        return {
          ...prev,
          permissions: current.filter((p) => p !== permission),
        };
      }
      return { ...prev, permissions: [...current, permission] };
    });
  };

  const submitCreateAdmin = async (e) => {
    e.preventDefault();
    setCreating(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/create",
        createForm,
        { withCredentials: true },
      );

      setFeedback({
        type: "success",
        message: response.data.message || "Admin created",
      });
      setCreateForm(initialCreateForm);
      setIsCreateOpen(false);
      await fetchAdmins();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to create admin",
      });
    } finally {
      setCreating(false);
    }
  };

  const saveAdmin = async () => {
    if (!selectedAdminId) return;
    setSavingAdmin(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/admin/admins/${selectedAdminId}`,
        {
          name: draftProfile.name,
          email: draftProfile.email,
          phone: draftProfile.phone,
          profileImage: draftProfile.profileImage,
          permissions: draftPermissions,
        },
        { withCredentials: true },
      );

      const updatedAdmin = response.data.admin;
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === updatedAdmin.id ? { ...admin, ...updatedAdmin } : admin,
        ),
      );
      setSelectedAdmin(updatedAdmin);
      setDraftPermissions(
        Array.isArray(updatedAdmin.permissions) ? updatedAdmin.permissions : [],
      );
      setDraftProfile({
        name: updatedAdmin.name || "",
        email: updatedAdmin.email || "",
        phone: updatedAdmin.phone || "",
        profileImage: updatedAdmin.profileImage || "",
      });
      setFeedback({
        type: "success",
        message: response.data.message || "Updated successfully",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to update admin",
      });
    } finally {
      setSavingAdmin(false);
    }
  };

  const deleteSelectedAdmin = async () => {
    if (!selectedAdminId) return;
    const confirmed = window.confirm("Delete this admin?");
    if (!confirmed) return;

    setDeletingAdmin(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/admins/${selectedAdminId}`,
        { withCredentials: true },
      );
      setFeedback({
        type: "success",
        message: response.data.message || "Admin deleted",
      });
      setAdmins((prev) => prev.filter((admin) => admin.id !== selectedAdminId));
      closeDrawer();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to delete admin",
      });
    } finally {
      setDeletingAdmin(false);
    }
  };

  const deleteAdmin = async (admin) => {
    if (!window.confirm(`Delete ${admin.name || admin.email}?`)) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/admins/${admin.id}`, { withCredentials: true });
      setAdmins((prev) => prev.filter((item) => item.id !== admin.id));
      setFeedback({ type: "success", message: response.data.message || "Admin deleted" });
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to delete admin" });
    }
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAllVisible = () => {
    setSelectedIds((prev) => {
      if (allVisibleSelected) {
        const visibleIds = filteredAdmins.map((a) => a.id);
        return prev.filter((id) => !visibleIds.includes(id));
      }
      const merged = new Set(prev);
      filteredAdmins.forEach((a) => merged.add(a.id));
      return [...merged];
    });
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  };

  const getInitials = (name, email) => {
    const raw = String(name || "").trim() || String(email || "").trim();
    if (!raw) return "A";
    const parts = raw.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return raw.slice(0, 2).toUpperCase();
  };

  const permissionShort = (permission) => {
    const map = {
      products: "P",
      orders: "O",
      blogs: "B",
      users: "U",
      settings: "S",
    };
    return map[permission] || permission.slice(0, 1).toUpperCase();
  };

  return (
    <DashboardShell title="Admin Management" adminHeadOnly>
      <div>
        {/* Top Header Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Admin Management
            </h1>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Audit, manage, and monitor all admin accounts within the
              ecosystem.
            </p>
          </div>
          <button
            onClick={() => {
              setFeedback({ type: "", message: "" });
              setIsCreateOpen(true);
            }}
            className="flex items-center gap-2 bg-[#38FFF2] text-black font-bold px-5 py-3 rounded-xl hover:bg-[#38FFF2]/90 transition-all shadow-[0_0_20px_rgba(56,255,242,0.2)]"
          >
            <UserPlus size={18} />
            <span>Add Admin</span>
          </button>
        </div>

        {feedback.message ? (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-[#38FFF2]/20 bg-[#38FFF2]/10 text-[#38FFF2]"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        {/* Filter Bar Panel (Image UI replica) */}
        <div className="bg-white/3 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-3 mb-8 flex flex-col md:flex-row items-center gap-46">
          <div className="flex-1 relative w-full">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search admin name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white/3 border border-white/5 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/3 border border-white/5 text-zinc-300 text-sm font-medium hover:bg-white/[0.06] transition-all min-w-[140px]">
              <span>Category: All</span>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            <button className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/3 border border-white/5 text-zinc-300 text-sm font-medium hover:bg-white/[0.06] transition-all min-w-[120px]">
              <span>Status: All</span>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Main Admins Table (Matching Users Page exactly) */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Users</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Permissions</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loadingAdmins ? (
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5" />
                            <div className="space-y-2">
                              <div className="h-4 bg-white/5 rounded w-28" />
                              <div className="h-3 bg-white/5 rounded w-16" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-2">
                            <div className="h-4 bg-white/5 rounded w-36" />
                            <div className="h-3 bg-white/5 rounded w-20" />
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex gap-1.5">
                            <div className="w-7 h-7 rounded-full bg-white/5" />
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-6 bg-white/5 rounded-full w-20" />
                        </td>
                        <td className="px-6 py-5">
                          <div className="h-8 bg-white/5 rounded w-24 ml-auto" />
                        </td>
                      </tr>
                    ))
                ) : filteredAdmins.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-zinc-500 text-sm"
                    >
                      No admins found matching query.
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr
                      key={admin.id}
                      onClick={() => openDrawer(admin, "view")}
                      className="cursor-pointer hover:bg-white/[0.01] transition-colors group"
                    >
                      {/* USER column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl border border-white/10 bg-[#38FFF2]/10 text-[#38FFF2] flex items-center justify-center font-bold text-sm select-none">
                            {getInitials(admin.name, admin.email)}
                          </div>
                          <div>
                            <p className="text-white font-semibold text-[15px] leading-tight">
                              {admin.name || "Admin"}
                            </p>
                            <p className="text-zinc-500 text-xs font-mono mt-1">
                              ID: TZ-{admin.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL column */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-zinc-300 text-[14px] leading-tight">
                            {admin.email}
                          </p>
                          <p className="text-zinc-500 text-xs mt-1">
                            {admin.phone ||
                              (admin.role === "admin head"
                                ? "Admin Head"
                                : "Admin")}
                          </p>
                        </div>
                      </td>

                      {/* PERMISSIONS column */}
                      <td
                        className="px-6 py-5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-1.5">
                          {admin.role === "admin head" ? (
                            <span className="text-[#38FFF2] text-xs font-semibold uppercase tracking-wider bg-[#38FFF2]/10 px-2 py-0.5 rounded border border-[#38FFF2]/20">
                              All Power
                            </span>
                          ) : (Array.isArray(admin.permissions)
                              ? admin.permissions
                              : []
                            ).length === 0 ? (
                            <span className="text-zinc-600 text-xs">
                              No permissions
                            </span>
                          ) : (
                            (Array.isArray(admin.permissions)
                              ? admin.permissions
                              : []
                            ).map((permission) => (
                              <span
                                key={`${admin.id}-${permission}`}
                                title={permission}
                                className={`h-7 w-7 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                  PERMISSION_BADGE_STYLES[permission] ||
                                  "border-white/15 bg-white/[0.05] text-white/75"
                                }`}
                              >
                                {permissionShort(permission)}
                              </span>
                            ))
                          )}
                        </div>
                      </td>

                      {/* STATUS column */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#38FFF2]/10 border-[#38FFF2]/20 text-[#38FFF2]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38FFF2]" />
                          Active
                        </span>
                      </td>

                      {/* ACTION column */}
                      <td
                        className="px-6 py-5 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openDrawer(admin, "view")}
                            className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openDrawer(admin, "edit")}
                            title="Edit admin"
                            className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => deleteAdmin(admin)}
                            title="Delete admin"
                            className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-300 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 text-xs text-zinc-500">
            <span>
              Showing 1-{filteredAdmins.length} of {admins.length} admins
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-all">
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#38FFF2] text-black text-xs font-bold transition-all">
                1
              </button>
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isCreateOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            onClick={() => setIsCreateOpen(false)}
            className="absolute inset-0 bg-black/70"
            aria-label="Close create admin drawer"
          />
          <aside className="absolute right-0 top-0 h-full w-[92%] max-w-xl overflow-y-auto border-l border-white/10 bg-black/95 p-6 backdrop-blur-xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase">
                  Admin
                </p>
                <h3 className="mt-3 text-[24px] font-semibold">Create Admin</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

            <form onSubmit={submitCreateAdmin} className="mt-6 space-y-5">
              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Name</span>
                <input
                  type="text"
                  name="name"
                  value={createForm.name}
                  onChange={handleCreateChange}
                  placeholder="Rahul"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 outline-none focus:border-[#03B8B8] transition-colors"
                  required
                />
              </label>

              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Email</span>
                <input
                  type="email"
                  name="email"
                  value={createForm.email}
                  onChange={handleCreateChange}
                  placeholder="rahul@gmail.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 outline-none focus:border-[#03B8B8] transition-colors"
                  required
                />
              </label>

              <label className="block">
                <span className="block text-sm text-white/70 mb-2">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  value={createForm.password}
                  onChange={handleCreateChange}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 outline-none focus:border-[#03B8B8] transition-colors"
                  required
                />
              </label>

              <div className="rounded-[20px] border border-white/10 bg-white/3 p-4">
                <p className="text-sm text-white/70 mb-3">Permissions</p>
                <div className="space-y-3">
                  {ALLOWED_PERMISSIONS.map((permission) => (
                    <label
                      key={`create-${permission}`}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <span className="text-white/85 capitalize">
                        {permission}
                      </span>
                      <input
                        type="checkbox"
                        checked={(Array.isArray(createForm.permissions)
                          ? createForm.permissions
                          : []
                        ).includes(permission)}
                        onChange={() => toggleCreatePermission(permission)}
                        className="h-4 w-4 accent-[#03B8B8]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full rounded-full bg-[#03B8B8] px-6 py-4 text-black font-semibold tracking-[0.18em] uppercase hover:bg-[#38FFF2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </form>
          </aside>
        </div>
      ) : null}

      {isDrawerMounted ? (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            onClick={closeDrawer}
            className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
              isDrawerOpen ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Close admin drawer"
          />
          <aside
            className={`absolute right-0 top-0 h-full w-[92%] max-w-xl border-l border-white/10 bg-black/90 backdrop-blur-xl p-6 md:p-8 overflow-y-auto transition-transform duration-300 ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase">
                  Admin Profile
                </p>
                <h3 className="mt-3 text-[24px] font-semibold truncate">
                  {drawerTitle}
                </h3>
                <p className="mt-2 text-white/60 text-sm truncate">
                  {selectedAdmin?.email}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-2xl border border-white/10 bg-white/3 px-4 py-2 text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

            <div className="mt-7 rounded-[24px] border border-white/10 bg-white/3 p-5">
              <div className="flex items-center gap-4">
                {draftProfile.profileImage ? (
                  <div
                    className="h-14 w-14 rounded-full border border-white/10 bg-center bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${draftProfile.profileImage})`,
                    }}
                    aria-label={draftProfile.name || "Admin profile"}
                    role="img"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full border border-white/10 bg-white/[0.06] flex items-center justify-center text-white font-semibold text-[18px]">
                    {getInitials(selectedAdmin?.name, selectedAdmin?.email)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {selectedAdmin?.name || "Admin"}
                  </p>
                  <p className="text-white/60 text-sm truncate">
                    {selectedAdmin?.email}
                  </p>
                  <p className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                    {selectedAdmin?.role || "admin"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/3 p-5">
              <p className="text-sm text-white/60 mb-4">Profile Details</p>
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-sm text-white/70 mb-2">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={draftProfile.name}
                    onChange={handleDraftProfileChange}
                    readOnly={drawerMode === "view"}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm text-white/70 mb-2">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={draftProfile.email}
                    onChange={handleDraftProfileChange}
                    readOnly={drawerMode === "view"}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm text-white/70 mb-2">
                    Phone
                  </span>
                  <input
                    type="text"
                    name="phone"
                    value={draftProfile.phone}
                    onChange={handleDraftProfileChange}
                    readOnly={drawerMode === "view"}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
                    placeholder="Optional"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm text-white/70 mb-2">
                    Profile Image URL
                  </span>
                  <input
                    type="url"
                    name="profileImage"
                    value={draftProfile.profileImage}
                    onChange={handleDraftProfileChange}
                    readOnly={drawerMode === "view"}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#03B8B8] transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/3 p-5">
              <p className="text-sm text-white/60 mb-4">Permissions</p>
              <div className="space-y-3">
                {ALLOWED_PERMISSIONS.map((permission) => (
                  <label
                    key={`drawer-${permission}`}
                    className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-colors ${
                      draftPermissions.includes(permission)
                        ? "border-[#03B8B8]/35 bg-[#03B8B8]/10"
                        : "border-white/10 bg-black/30 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-8 w-8 rounded-full border flex items-center justify-center text-[12px] font-semibold ${
                          PERMISSION_BADGE_STYLES[permission] ||
                          "border-white/15 bg-white/[0.05] text-white/75"
                        }`}
                      >
                        {permissionShort(permission)}
                      </span>
                      <span className="text-white/85 capitalize">
                        {permission}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={draftPermissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      disabled={drawerMode === "view"}
                      className="h-4 w-4 accent-[#03B8B8]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {drawerMode === "edit" ? <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={saveAdmin}
                disabled={savingAdmin}
                className="rounded-2xl bg-[#03B8B8] px-6 py-3.5 text-black font-semibold hover:bg-[#38FFF2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {savingAdmin ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={deleteSelectedAdmin}
                disabled={deletingAdmin}
                className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-3.5 text-red-200 font-semibold hover:bg-red-500/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deletingAdmin ? "Deleting..." : "Delete"}
              </button>
            </div> : null}
          </aside>
        </div>
      ) : null}
    </DashboardShell>
  );
}
