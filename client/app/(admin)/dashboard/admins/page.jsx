"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

const ALLOWED_PERMISSIONS = ["products", "orders", "blogs", "users", "settings"];
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

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [creating, setCreating] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [draftPermissions, setDraftPermissions] = useState([]);
  const [savingPermissions, setSavingPermissions] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedAdminId = selectedAdmin?.id;

  const drawerTitle = useMemo(() => {
    if (!selectedAdmin) return "Admin Details";
    return selectedAdmin.name || selectedAdmin.email || "Admin Details";
  }, [selectedAdmin]);

  const filteredAdmins = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return admins;
    return admins.filter((admin) => {
      const name = String(admin.name || "").toLowerCase();
      const email = String(admin.email || "").toLowerCase();
      return name.includes(query) || email.includes(query);
    });
  }, [admins, search]);

  const allVisibleSelected = useMemo(() => {
    if (filteredAdmins.length === 0) return false;
    return filteredAdmins.every((admin) => selectedIds.includes(admin.id));
  }, [filteredAdmins, selectedIds]);

  const fetchAdmins = useCallback(async () => {
    setLoadingAdmins(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/admins", {
        withCredentials: true,
      });
      setAdmins(Array.isArray(response.data.admins) ? response.data.admins : []);
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

  const openDrawer = (admin) => {
    setSelectedAdmin(admin);
    setDraftPermissions(Array.isArray(admin.permissions) ? admin.permissions : []);
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

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCreatePermission = (permission) => {
    setCreateForm((prev) => {
      const current = Array.isArray(prev.permissions) ? prev.permissions : [];
      if (current.includes(permission)) {
        return { ...prev, permissions: current.filter((p) => p !== permission) };
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
        "http://localhost:5000/api/admin/admins",
        createForm,
        { withCredentials: true },
      );

      setFeedback({ type: "success", message: response.data.message || "Admin created" });
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

  const savePermissions = async () => {
    if (!selectedAdminId) return;
    setSavingPermissions(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/admin/admins/${selectedAdminId}/permissions`,
        { permissions: draftPermissions },
        { withCredentials: true },
      );

      const updatedAdmin = response.data.admin;
      setAdmins((prev) =>
        prev.map((admin) => (admin.id === updatedAdmin.id ? { ...admin, ...updatedAdmin } : admin)),
      );
      setSelectedAdmin(updatedAdmin);
      setDraftPermissions(
        Array.isArray(updatedAdmin.permissions) ? updatedAdmin.permissions : [],
      );
      setFeedback({ type: "success", message: response.data.message || "Updated successfully" });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to update permissions",
      });
    } finally {
      setSavingPermissions(false);
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
      setFeedback({ type: "success", message: response.data.message || "Admin deleted" });
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

  const toggleRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
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
    const map = { products: "P", orders: "O", blogs: "B", users: "U", settings: "S" };
    return map[permission] || permission.slice(0, 1).toUpperCase();
  };

  return (
    <DashboardShell title="Admin Management" adminHeadOnly>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-white/65 leading-relaxed max-w-2xl">
            Manage admins and permissions. Admin head automatically has all permissions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative w-full sm:w-[360px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 outline-none focus:border-[#03B8B8] transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setFeedback({ type: "", message: "" });
              setIsCreateOpen(true);
            }}
            className="shrink-0 rounded-2xl bg-[#03B8B8] px-6 py-3 text-black font-semibold hover:bg-[#38FFF2] transition-colors"
          >
            Invite
          </button>
        </div>
      </div>

      {feedback.message ? (
        <div
          className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "bg-[#03B8B8]/10 text-[#38FFF2] border border-[#03B8B8]/20"
              : "bg-red-500/10 text-red-300 border border-red-500/20"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="text-[18px] font-semibold">Users</h2>
            <p className="text-sm text-white/50 mt-1">
              {loadingAdmins ? "Loading..." : `${filteredAdmins.length} shown`}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="text-left text-white/55 text-[12px] uppercase tracking-[0.18em]">
                <th className="px-6 py-4 w-[54px]">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    className="h-4 w-4 accent-[#03B8B8]"
                  />
                </th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Permissions</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4 w-[60px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loadingAdmins ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-white/70">
                    Loading admins...
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-white/70">
                    No admins found.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    onClick={() => openDrawer(admin)}
                    className="cursor-pointer hover:bg-white/[0.04] transition-colors"
                  >
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(admin.id)}
                        onChange={() => toggleRow(admin.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 accent-[#03B8B8]"
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.06] flex items-center justify-center text-white/85 font-semibold">
                          {getInitials(admin.name, admin.email)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate max-w-[320px]">
                            {admin.name || "Admin"}
                          </p>
                          <p className="text-white/50 text-sm truncate max-w-[320px]">
                            {admin.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-white/70">Active</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {(Array.isArray(admin.permissions) ? admin.permissions : []).length === 0 ? (
                          <span className="text-white/45 text-sm">No permissions</span>
                        ) : (
                          (Array.isArray(admin.permissions) ? admin.permissions : []).map(
                            (permission) => (
                              <span
                                key={`${admin.id}-${permission}`}
                                title={permission}
                                className={`h-8 w-8 rounded-full border flex items-center justify-center text-[12px] font-semibold ${
                                  PERMISSION_BADGE_STYLES[permission] ||
                                  "border-white/15 bg-white/[0.05] text-white/75"
                                }`}
                              >
                                {permissionShort(permission)}
                              </span>
                            ),
                          )
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-white/60">{formatDate(admin.createdAt)}</td>
                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors"
                        aria-label="Row actions"
                      >
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            onClick={() => setIsCreateOpen(false)}
            className="absolute inset-0 bg-black/70"
            aria-label="Close create admin modal"
          />
          <div className="relative mx-auto mt-24 w-[92%] max-w-xl rounded-[28px] border border-white/10 bg-black/90 backdrop-blur-xl p-6 md:p-8">
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
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors"
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
                <span className="block text-sm text-white/70 mb-2">Password</span>
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

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-white/70 mb-3">Permissions</p>
                <div className="space-y-3">
                  {ALLOWED_PERMISSIONS.map((permission) => (
                    <label
                      key={`create-${permission}`}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <span className="text-white/85 capitalize">{permission}</span>
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
          </div>
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
                <h3 className="mt-3 text-[24px] font-semibold truncate">{drawerTitle}</h3>
                <p className="mt-2 text-white/60 text-sm truncate">{selectedAdmin?.email}</p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

            <div className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full border border-white/10 bg-white/[0.06] flex items-center justify-center text-white font-semibold text-[18px]">
                  {getInitials(selectedAdmin?.name, selectedAdmin?.email)}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {selectedAdmin?.name || "Admin"}
                  </p>
                  <p className="text-white/60 text-sm truncate">{selectedAdmin?.email}</p>
                  <p className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
                    {selectedAdmin?.role || "admin"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
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
                      <span className="text-white/85 capitalize">{permission}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={draftPermissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="h-4 w-4 accent-[#03B8B8]"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={savePermissions}
                disabled={savingPermissions}
                className="rounded-2xl bg-[#03B8B8] px-6 py-3.5 text-black font-semibold hover:bg-[#38FFF2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {savingPermissions ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={deleteSelectedAdmin}
                disabled={deletingAdmin}
                className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-3.5 text-red-200 font-semibold hover:bg-red-500/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deletingAdmin ? "Deleting..." : "Delete"}
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </DashboardShell>
  );
}
