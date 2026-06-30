"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import { Plus, Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";

export default function OrdersPage() {
  return (
    <DashboardShell title="Orders" requiredPermission="orders">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Order Management</h1>
          <p className="text-zinc-400 text-sm">View and manage customer orders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-white">1,248</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
            <ShoppingCart size={20} className="text-[#38FFF2]" />
          </div>
        </div>
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">Pending</p>
            <p className="text-3xl font-bold text-white">24</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
          </div>
        </div>
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">Completed Today</p>
            <p className="text-3xl font-bold text-white">42</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
            <Check size={20} className="text-[#38FFF2]" />
          </div>
        </div>
      </div>

      <div className="admin-glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#38FFF2]/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-black/30">
              <tr className="text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1,2,3,4,5].map((i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5">
                    <p className="text-white font-medium">#ORD-000{i}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-zinc-300 text-sm">Customer {i}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border bg-[#38FFF2]/10 border-[#38FFF2]/30 text-[#38FFF2]">
                      Shipped
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-white font-medium">${(i * 29.99).toFixed(2)}</p>
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
      </div>
    </DashboardShell>
  );
}
