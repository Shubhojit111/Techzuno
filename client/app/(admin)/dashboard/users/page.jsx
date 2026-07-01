"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  MoreVertical,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  ChevronDown,
  SearchIcon,
} from "lucide-react";

const PERMISSION_BADGE_STYLES = {
  products: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  orders: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  blogs: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  users: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  settings: "border-rose-500/30 bg-rose-500/10 text-rose-200",
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

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [dateFilter, setDateFilter] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        { withCredentials: true },
      );
      const raw = Array.isArray(response.data.users) ? response.data.users : [];
      setUsers(
        raw.map((u) => ({
          id: u.id,
          name: u.name || "",
          email: u.email || "",
          role: u.role || "",
          permissions: Array.isArray(u.permissions) ? u.permissions : [],
          createdAt: u.createdAt || null,
        })),
      );
    } catch (error) {
      console.error("Unable to fetch users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" || u.status === statusFilter;

      let matchesDate = true;
      if (dateFilter && u.createdAt) {
        const itemDate = new Date(u.createdAt).toISOString().split("T")[0];
        matchesDate = itemDate === dateFilter;
      }

      return matchesQuery && matchesStatus && matchesDate;
    });
  }, [users, searchQuery, statusFilter, dateFilter]);

  const userCounts = useMemo(
    () => ({
      users: users.filter((user) => user.role === "user").length,
      admins: users.filter(
        (user) => user.role === "admin" || user.role === "admin head",
      ).length,
    }),
    [users],
  );

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DashboardShell title="Users" requiredPermission="users">
      <div>
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              User Management
            </h1>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Audit, manage, and monitor all registered accounts within the
              ecosystem.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#38FFF2] text-black font-bold px-5 py-3 rounded-xl hover:bg-[#38FFF2]/90 transition-all shadow-[0_0_20px_rgba(56,255,242,0.2)]">
            <UserPlus size={18} />
            <span>Add User</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-3 mb-8 flex flex-col md:flex-row items-center gap-46">
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
              className="w-full pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-300 text-sm font-medium hover:bg-white/[0.06] transition-all min-w-[140px]">
              <span>Category: All</span>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            <button className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-300 text-sm font-medium hover:bg-white/[0.06] transition-all min-w-[120px]">
              <span>Status: All</span>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            console.log(users);
          }}
        >
          get Users
        </button>

        {/* Users Table */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Users</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Permissions</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/5" />
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
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center text-zinc-500 text-sm"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      {/* USER column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl border border-white/10 bg-[#38FFF2]/10 text-[#38FFF2] flex items-center justify-center font-bold text-sm select-none">
                            {getInitials(u.name)}
                          </div>
                          <div>
                            <p className="text-white font-semibold text-[15px] leading-tight">
                              {u.name || "—"}
                            </p>
                            <p className="text-zinc-500 text-xs font-mono mt-1">
                              ID: {u.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL column */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-zinc-300 text-[14px] leading-tight">
                            {u.email || "—"}
                          </p>
                          <p className="text-zinc-500 text-xs mt-1">
                            Joined {formatDate(u.createdAt)}
                          </p>
                        </div>
                      </td>

                      {/* STATUS column */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#38FFF2]/10 border-[#38FFF2]/20 text-[#38FFF2]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38FFF2]" />
                          {u.role}
                        </span>
                      </td>

                      {/* PERMISSIONS column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5">
                          {u.permissions.length === 0 ? (
                            <span className="text-zinc-600 text-xs">
                              Standard
                            </span>
                          ) : (
                            u.permissions.map((p) => (
                              <span
                                key={p}
                                title={p}
                                className={`h-7 w-7 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                  PERMISSION_BADGE_STYLES[p] ||
                                  "border-white/15 bg-white/[0.05] text-white/75"
                                }`}
                              >
                                {permissionShort(p)}
                              </span>
                            ))
                          )}
                        </div>
                      </td>

                      {/* ACTION column */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all">
                            <MoreVertical size={16} />
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
              Showing {filteredUsers.length} of {users.length} users
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-all">
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#38FFF2] text-black text-xs font-bold">
                1
              </button>
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center text-[#38FFF2]">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                Total Users
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {userCounts.users}
                </span>
                <span className="text-[11px] text-[#38FFF2] font-semibold">
                  registered
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                Total Admins
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {userCounts.admins}
                </span>
                <span className="text-[11px] text-zinc-400">admins</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <ShieldAlert size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                Filtered Results
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {filteredUsers.length}
                </span>
                <span className="text-[11px] text-zinc-400">Shown</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}


