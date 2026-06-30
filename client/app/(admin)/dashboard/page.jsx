"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import DashboardShell from "@/components/admin/DashboardShell";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mini Sparkline component for the stat cards
function StatSparkline({ heights, isPositive = true }) {
  return (
    <div className="flex items-end gap-0.5 h-10 pb-1 flex-shrink-0">
      {heights.map((h, i) => (
        <div key={i} className="flex flex-col-reverse gap-0.5 w-1 h-full justify-start">
          {Array.from({ length: 5 }).map((_, level) => {
            const isActive = level < h;
            let bgClass = "bg-zinc-900";
            if (isActive) {
              bgClass = isPositive ? "bg-zinc-700" : "bg-zinc-800";
            }
            return (
              <div
                key={level}
                className={`w-1 h-1.5 rounded-2xs transition-all duration-300 ${bgClass}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

// Custom segmented bar component for the main sales chart
function SegmentedBar({ date, sales, newUsers, existingUsers, isHovered, onHover }) {
  const maxSegments = 16;
  return (
    <div
      className="flex flex-col-reverse items-center gap-0.5 flex-1 cursor-pointer group h-56 justify-end"
      onMouseEnter={() => onHover({ date, sales, newUsers, existingUsers })}
    >
      {Array.from({ length: maxSegments }).map((_, idx) => {
        const isNew = idx < newUsers;
        const isExisting = idx >= newUsers && idx < (newUsers + existingUsers);

        let bgClass = "bg-zinc-900/35";
        if (isExisting) {
          bgClass = isHovered
            ? "bg-white"
            : "bg-zinc-300 group-hover:bg-white transition-colors duration-200";
        } else if (isNew) {
          bgClass = isHovered
            ? "bg-zinc-500"
            : "bg-zinc-600 group-hover:bg-zinc-400 transition-colors duration-200";
        }

        return (
          <div
            key={idx}
            className={`w-full h-1 md:h-1.5 rounded-2xs transition-all duration-300 ${bgClass}`}
          />
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("14D");

  // Mock data for the main sales equalizer chart
  const salesData = [
    { date: "Mar 22", sales: "$10.2K", newUsers: 3, existingUsers: 4 },
    { date: "Mar 23", sales: "$11.5K", newUsers: 4, existingUsers: 5 },
    { date: "Mar 24", sales: "$9.8K", newUsers: 2, existingUsers: 4 },
    { date: "Mar 25", sales: "$12.4K", newUsers: 5, existingUsers: 6 },
    { date: "Mar 26", sales: "$14.0K", newUsers: 6, existingUsers: 7 },
    { date: "Mar 27", sales: "$9.0K", newUsers: 3, existingUsers: 4 },
    { date: "Mar 28", sales: "$11.0K", newUsers: 4, existingUsers: 5 },
    { date: "Mar 29", sales: "$12.5K", newUsers: 5, existingUsers: 6 },
    { date: "Mar 30", sales: "$13.2K", newUsers: 6, existingUsers: 5 },
    { date: "Mar 31", sales: "$14.0K", newUsers: 5, existingUsers: 9 }, // Hover default
    { date: "Apr 1", sales: "$9.5K", newUsers: 3, existingUsers: 4 },
    { date: "Apr 2", sales: "$11.0K", newUsers: 4, existingUsers: 5 },
    { date: "Apr 3", sales: "$14.5K", newUsers: 7, existingUsers: 7 },
    { date: "Apr 4", sales: "$12.8K", newUsers: 5, existingUsers: 6 },
    { date: "Apr 5", sales: "$11.5K", newUsers: 4, existingUsers: 5 },
    { date: "Apr 6", sales: "$13.8K", newUsers: 6, existingUsers: 7 },
    { date: "Apr 7", sales: "$15.5K", newUsers: 8, existingUsers: 7 },
    { date: "Apr 8", sales: "$10.2K", newUsers: 3, existingUsers: 5 },
    { date: "Apr 9", sales: "$11.8K", newUsers: 4, existingUsers: 6 },
    { date: "Apr 10", sales: "$13.0K", newUsers: 5, existingUsers: 7 },
    { date: "Apr 11", sales: "$14.8K", newUsers: 7, existingUsers: 7 },
    { date: "Apr 12", sales: "$10.0K", newUsers: 3, existingUsers: 4 },
    { date: "Apr 13", sales: "$11.5K", newUsers: 4, existingUsers: 5 },
    { date: "Apr 14", sales: "$13.5K", newUsers: 6, existingUsers: 6 },
    { date: "Apr 15", sales: "$12.2K", newUsers: 5, existingUsers: 5 },
    { date: "Apr 16", sales: "$11.8K", newUsers: 4, existingUsers: 5 },
    { date: "Apr 17", sales: "$14.5K", newUsers: 7, existingUsers: 7 },
    { date: "Apr 18", sales: "$14.0K", newUsers: 6, existingUsers: 6 },
    { date: "Apr 19", sales: "$13.2K", newUsers: 5, existingUsers: 6 },
  ];

  // Currently hovered/selected sales detail state
  const [hoveredSales, setHoveredSales] = useState(salesData[9]);

  // Campaign chart data (11 months)
  const campaignData = [
    { month: "Jan", val: 5, active: false },
    { month: "Feb", val: 8, active: false },
    { month: "Mar", val: 7, active: false },
    { month: "Apr", val: 9, active: false },
    { month: "May", val: 8, active: false },
    { month: "Jun", val: 10, active: false },
    { month: "Jul", val: 13, active: false },
    { month: "Aug", val: 16, active: true }, // Highlighted in screenshot
    { month: "Sep", val: 11, active: false },
    { month: "Oct", val: 9, active: false },
    { month: "Nov", val: 8, active: false },
  ];

  return (
    <DashboardShell title="Dashboard Overview">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Welcome back, {user?.name || "Admin"}! 👋
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#38FFF2]/10 border border-[#38FFF2]/20 hover:bg-[#38FFF2]/15 text-[#38FFF2] text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
          <span>New Product</span>
        </button>
      </div>

      {/* Grid for Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Revenue */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2">
              $ Total revenue
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">$284,920</h3>
            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>8.2%</span>
              <span className="text-zinc-500">vs prior 30 days</span>
            </p>
          </div>
          <StatSparkline heights={[2, 4, 3, 5, 2]} isPositive={true} />
        </div>

        {/* Orders */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2">
              🛒 Orders
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">1,842</h3>
            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>4.1%</span>
              <span className="text-zinc-500">vs prior 30 days</span>
            </p>
          </div>
          <StatSparkline heights={[3, 2, 4, 3, 5]} isPositive={true} />
        </div>

        {/* Average Order Value */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2">
              📄 Average order value
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">$154.60</h3>
            <p className="text-xs text-rose-500 font-medium mt-2 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>1.3%</span>
              <span className="text-zinc-500">vs prior 30 days</span>
            </p>
          </div>
          <StatSparkline heights={[4, 3, 2, 4, 1]} isPositive={false} />
        </div>

        {/* Store Conversion */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2">
              ⚡ Store conversion
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">3.06%</h3>
            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>0.6%</span>
              <span className="text-zinc-500">vs prior 30 days</span>
            </p>
          </div>
          <StatSparkline heights={[2, 3, 3, 4, 5]} isPositive={true} />
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column: Equalizer Sales Chart */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#121212] rounded-xl p-6 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight transition-all duration-300">
                  {hoveredSales.sales} Sales on {hoveredSales.date}, 2026
                </h3>
                {/* User type legend & growth */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                    <span className="text-xs text-zinc-500 uppercase font-semibold">New user</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                    <span className="text-xs text-zinc-500 uppercase font-semibold">Existing user</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                    <span>↑ 1.5%</span>
                    <span className="text-zinc-500">vs last 30 days</span>
                  </div>
                </div>
              </div>

              {/* Time toggles */}
              <div className="flex bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800/80 select-none">
                {["14D", "1M", "3M", "6M"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all ${
                      activeTab === tab
                        ? "bg-[#151515] text-white shadow-xs"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Segmented equalizer chart */}
            <div className="flex items-end gap-1.5 h-60 pt-6">
              {salesData.map((d, i) => (
                <SegmentedBar
                  key={i}
                  date={d.date}
                  sales={d.sales}
                  newUsers={d.newUsers}
                  existingUsers={d.existingUsers}
                  isHovered={hoveredSales.date === d.date}
                  onHover={setHoveredSales}
                />
              ))}
            </div>
          </div>

          {/* X Axis dates label */}
          <div className="flex justify-between items-center text-xs text-zinc-600 font-mono mt-4 border-t border-[#121212] pt-4 px-1">
            <span>MAR 22</span>
            <span>MAR 26</span>
            <span>MAR 30</span>
            <span>APR 3</span>
            <span>APR 7</span>
            <span>APR 11</span>
            <span>APR 15</span>
            <span>APR 19</span>
          </div>
        </div>

        {/* Right Column: Campaign Revenue Chart */}
        <div className="bg-[#0A0A0A] border border-[#121212] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-1">
                Campaigns
              </p>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-baseline gap-2">
                <span>$92.5K</span>
                <span className="text-xs text-zinc-400 font-medium">Revenue from campaigns in Aug</span>
              </h3>
              <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                <span>5.2%</span>
              </p>
            </div>

            {/* Campaigns visual chart */}
            <div className="h-64 flex justify-between items-end px-2 pt-6 relative border-b border-[#121212] pb-2">
              {campaignData.map((m, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
                >
                  {m.active ? (
                    /* Highlighted solid bar */
                    <div
                      className="w-2.5 bg-white rounded-t-xs transition-all duration-300 shadow-md relative"
                      style={{ height: `${m.val * 5}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#121212] border border-zinc-800 text-[9px] text-white px-1.5 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        $92.5K
                      </div>
                    </div>
                  ) : (
                    /* Dotted column lines with hover dots */
                    <div className="relative flex flex-col justify-end items-center w-2.5 h-full pb-0.5">
                      <div
                        className="w-0.5 border-l border-dashed border-zinc-800 group-hover:border-zinc-500 transition-colors duration-200"
                        style={{ height: `${m.val * 5}%` }}
                      />
                      <div
                        className="absolute w-1 h-1 bg-zinc-700 rounded-full group-hover:bg-zinc-400 transition-colors pointer-events-none"
                        style={{ bottom: `${m.val * 5}%` }}
                      />
                    </div>
                  )}
                  {/* Under Labels, only show for alternate months to look clean */}
                  <span className="text-[11px] text-zinc-600 mt-2 font-mono uppercase">
                    {m.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-zinc-500 leading-relaxed mt-4 bg-zinc-950/40 p-3 rounded-lg border border-[#141414]">
            Campaign engagement is up <strong>12%</strong> compared to last quarter. Email lists performed best.
          </div>
        </div>
      </div>

      {/* Bottom Row Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0A0A0A] border border-[#121212] rounded-xl p-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase">
              Average session duration
            </p>
            <h4 className="text-lg font-bold text-white mt-1">7.8%</h4>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10 font-semibold">
            +0.4%
          </span>
        </div>

        <div className="bg-[#0A0A0A] border border-[#121212] rounded-xl p-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase">
              Active visitors (Real-time)
            </p>
            <h4 className="text-lg font-bold text-white mt-1">1,842</h4>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10 font-semibold">
            +0.5%
          </span>
        </div>
      </div>
    </DashboardShell>
  );
}
