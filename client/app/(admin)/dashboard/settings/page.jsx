"use client";

import DashboardShell from "@/components/admin/DashboardShell";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" requiredPermission="settings">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
          <p className="text-zinc-400 text-sm">Configure your store and admin preferences.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#38FFF2] text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-[#38FFF2]/90 transition-colors">
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: User, label: "Profile" },
            { icon: Bell, label: "Notifications" },
            { icon: Shield, label: "Security" },
            { icon: Palette, label: "Appearance" },
            { icon: Database, label: "Data & Backup" },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${i === 0 ? "bg-[#38FFF2]/10 border border-[#38FFF2]/30 text-[#38FFF2]" : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"}`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="admin-glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
                <User size={20} className="text-[#38FFF2]" />
              </div>
              <h2 className="text-xl font-bold text-white">Profile Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm text-white/70 mb-2">First Name</span>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/30 transition-colors text-white"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm text-white/70 mb-2">Last Name</span>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/30 transition-colors text-white"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-sm text-white/70 mb-2">Email Address</span>
                <input
                  type="email"
                  placeholder="admin@techzuno.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#38FFF2]/30 transition-colors text-white"
                />
              </label>
            </div>
          </div>

          <div className="admin-glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
                <Palette size={20} className="text-[#38FFF2]" />
              </div>
              <h2 className="text-xl font-bold text-white">Appearance</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Dark", "Light", "System"].map((theme, i) => (
                <button
                  key={theme}
                  className={`p-4 rounded-xl border text-center transition-all ${i === 0 ? "border-[#38FFF2]/30 bg-[#38FFF2]/10 text-[#38FFF2]" : "border-white/10 bg-black/30 text-zinc-400 hover:text-white hover:bg-white/5"}`}
                >
                  <p className="font-medium">{theme}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
