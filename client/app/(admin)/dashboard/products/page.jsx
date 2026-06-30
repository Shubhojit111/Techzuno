"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import { Plus, Search, Filter, MoreHorizontal, Package, Edit2, Trash2 } from "lucide-react";

export default function ProductsPage() {
  return (
    <DashboardShell title="Products" requiredPermission="products">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Product Management</h1>
          <p className="text-zinc-400 text-sm">Manage your catalog and inventory.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#38FFF2] text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-[#38FFF2]/90 transition-colors">
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">Total Products</p>
            <p className="text-3xl font-bold text-white">84</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
            <Package size={20} className="text-[#38FFF2]" />
          </div>
        </div>
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">In Stock</p>
            <p className="text-3xl font-bold text-white">72</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-[#38FFF2] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#38FFF2]" />
            </div>
          </div>
        </div>
        <div className="admin-glass-card rounded-2xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400 uppercase tracking-wide mb-1">Low Stock</p>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="admin-glass-card rounded-2xl p-5 hover:border-[#38FFF2]/30 transition-all cursor-pointer">
            <div className="w-full h-32 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-600 mb-4">
              <Package size={40} />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">Product {i}</h3>
              <p className="text-[#38FFF2] font-bold">${(i * 19.99).toFixed(2)}</p>
            </div>
            <p className="text-zinc-500 text-sm line-clamp-2 mb-4">Short product description goes here.</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400">SKU: PRD-00{i}</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white">
                  <Edit2 size={14} />
                </button>
                <button className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors text-zinc-400 hover:text-red-300">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
