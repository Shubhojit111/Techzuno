"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import { Plus, Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Users } from "lucide-react";

export default function UsersPage() {
  return (
    <DashboardShell title="Users" requiredPermission="users">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">User Management</h1>
          <p className="text-zinc-400 text-sm">Manage all registered users and view customer activity.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#38FFF2] text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-[#38FFF2]/90 transition-colors">
          <Plus size={16} />
          <span>Invite User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">Total Users</p>
            <p className="text-3xl font-bold text-white">248</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
            <Users size={20} className="text-[#38FFF2]" />
          </div>
        </div>
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">Active Today</p>
            <p className="text-3xl font-bold text-white">42</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-[#38FFF2] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#38FFF2]" />
            </div>
          </div>
        </div>
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">New Signups</p>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
            <Plus size={20} className="text-[#38FFF2]" />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="admin-glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              placeholder="Search users..."
              className="pl-10 pr-4 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#38FFF2]/30"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-colors">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-black/30">
              <tr className="text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38FFF2]/20 to-[#38FFF2]/5 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                        U{i}
                      </div>
                      <div>
                        <p className="text-white font-medium">User Name {i}</p>
                        <p className="text-[#38FFF2] text-xs font-mono">ID: user_{i}_000</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-zinc-300 text-sm">user{i}@techzuno.com</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border bg-[#38FFF2]/10 border-[#38FFF2]/30 text-[#38FFF2]">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-zinc-400 text-sm">Jan {10 + i}, 2026</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">Showing 1-5 of 248 users</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/30 text-[#38FFF2] text-sm font-semibold">1</button>
            <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-colors">3</button>
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
