"use client";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import DashboardShell from "@/components/admin/DashboardShell";
import { ArrowUpRight, ArrowDownRight, Users, FileText, Layers, Tag, Loader2, Calendar } from "lucide-react";
import axios from "axios";
import Image from "next/image";

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

// Custom segmented bar component for the main activity chart
function SegmentedBar({ date, count, isHovered, onHover }) {
  const maxSegments = 16;
  // Let's assume max count per day realistically is 10 for coloring, scale it.
  const activeSegments = Math.min(count, maxSegments);
  
  return (
    <div
      className="flex flex-col-reverse items-center gap-0.5 flex-1 cursor-pointer group h-56 justify-end"
      onMouseEnter={() => onHover({ date, count })}
    >
      {Array.from({ length: maxSegments }).map((_, idx) => {
        const isActive = idx < activeSegments;
        let bgClass = "bg-zinc-900/35";
        if (isActive) {
          bgClass = isHovered
            ? "bg-white"
            : "bg-zinc-400 group-hover:bg-white transition-colors duration-200";
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
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredActivity, setHoveredActivity] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/stats", {
          withCredentials: true,
        });
        setStats(response.data.stats);
        if (response.data.stats.activityChartData?.length > 0) {
          setHoveredActivity(response.data.stats.activityChartData[response.data.stats.activityChartData.length - 1]);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <DashboardShell title="Dashboard Overview">
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-[#38FFF2]" />
        </div>
      </DashboardShell>
    );
  }

  const { totals, recentBlogs, recentUsers, activityChartData } = stats;

  return (
    <DashboardShell title="Dashboard Overview">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Welcome back, {user?.name || "Admin"}! 👋
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5">
            Here&apos;s your platform overview for today.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#38FFF2]/10 border border-[#38FFF2]/20 hover:bg-[#38FFF2]/15 text-[#38FFF2] text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
          <FileText className="w-4 h-4" />
          <span>New Blog</span>
        </button>
      </div>

      {/* Grid for Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Blogs */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Total Blogs
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totals.blogs}</h3>
            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Active</span>
            </p>
          </div>
          <StatSparkline heights={[2, 4, 3, 5, 4]} isPositive={true} />
        </div>

        {/* Total Users */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Total Users
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totals.users}</h3>
            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Active</span>
            </p>
          </div>
          <StatSparkline heights={[3, 2, 4, 3, 5]} isPositive={true} />
        </div>

        {/* Categories */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Categories
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totals.categories}</h3>
            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Active</span>
            </p>
          </div>
          <StatSparkline heights={[2, 2, 2, 3, 3]} isPositive={true} />
        </div>

        {/* Tags */}
        <div className="bg-[#0A0A0A] border border-[#121212] hover:border-zinc-800/80 rounded-xl p-5 flex justify-between items-end transition-all">
          <div>
            <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Tags
            </p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{totals.tags}</h3>
            <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Active</span>
            </p>
          </div>
          <StatSparkline heights={[3, 3, 4, 4, 5]} isPositive={true} />
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column: Equalizer Activity Chart */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#121212] rounded-xl p-6 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight transition-all duration-300">
                  {hoveredActivity?.count || 0} Blogs published on {hoveredActivity?.date || "today"}
                </h3>
                {/* Legend */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
                    <span className="text-xs text-zinc-500 uppercase font-semibold">Blogs Published</span>
                  </div>
                </div>
              </div>

              {/* Time toggles */}
              <div className="flex bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800/80 select-none">
                {["14D"].map((tab) => (
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
              {activityChartData.map((d, i) => (
                <SegmentedBar
                  key={i}
                  date={d.date}
                  count={d.count}
                  isHovered={hoveredActivity?.date === d.date}
                  onHover={setHoveredActivity}
                />
              ))}
            </div>
          </div>

          {/* X Axis dates label */}
          <div className="flex justify-between items-center text-xs text-zinc-600 font-mono mt-4 border-t border-[#121212] pt-4 px-1">
            <span>{activityChartData[0]?.date.split("-").slice(1).join("/")}</span>
            <span>{activityChartData[Math.floor(activityChartData.length / 2)]?.date.split("-").slice(1).join("/")}</span>
            <span>{activityChartData[activityChartData.length - 1]?.date.split("-").slice(1).join("/")}</span>
          </div>
        </div>

        {/* Right Column: Recent Blogs List */}
        <div className="bg-[#0A0A0A] border border-[#121212] rounded-xl p-6 flex flex-col justify-start">
          <div className="mb-6 flex justify-between items-center border-b border-[#121212] pb-4">
            <div>
              <p className="text-xs text-zinc-500 font-semibold tracking-widest uppercase mb-1">
                Content
              </p>
              <h3 className="text-xl font-bold text-white tracking-tight">Recent Blogs</h3>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div key={blog.id} className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0 relative border border-zinc-800">
                    {blog.image ? (
                      <Image
                        src={`http://localhost:5000${blog.image}`}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <FileText className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-zinc-200 line-clamp-1 group-hover:text-[#38FFF2] transition-colors cursor-pointer">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-[100px]">By {blog.User?.name || 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500 py-4 text-center">No recent blogs found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row Details: Recent Users */}
      <div className="bg-[#0A0A0A] border border-[#121212] rounded-xl p-6">
        <h3 className="text-lg font-bold text-white tracking-tight mb-4 flex items-center gap-2 border-b border-[#121212] pb-4">
          <Users className="w-5 h-5 text-[#38FFF2]" />
          Newest Registered Users
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {recentUsers.length > 0 ? (
            recentUsers.map((u) => (
              <div key={u.id} className="bg-[#080C14] border border-[#121212] rounded-lg p-4 flex flex-col items-center text-center hover:border-zinc-800/80 transition-colors">
                <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden mb-3 border border-zinc-700 relative">
                  {u.profileImage ? (
                    <Image
                      src={`http://localhost:5000${u.profileImage}`}
                      alt={u.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-zinc-400 bg-zinc-900">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-white truncate w-full">{u.name}</h4>
                <p className="text-xs text-zinc-500 truncate w-full mt-0.5">{u.email}</p>
                <span className="text-[10px] uppercase font-bold tracking-wider mt-3 px-2 py-1 rounded bg-[#38FFF2]/10 text-[#38FFF2]">
                  {u.role === 1 ? 'Admin' : 'User'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500 py-4 text-center col-span-full">No recent users found.</p>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
