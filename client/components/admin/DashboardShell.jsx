"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  Globe,
  LayoutGrid,
  Package,
  ShoppingBag,
  BookOpen,
  Users,
  Shield,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkle,
} from "lucide-react";

export default function DashboardShell({
  title,
  children,
  requiredPermission,
  adminHeadOnly = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, authLoading } = useContext(AuthContext);
  // Sidebar is OPEN by default (not hover-based)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState(new Set());

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "admin" && user.role !== "admin head") {
      router.replace("/");
    }
  }, [user, authLoading, router]);

  const sidebarItems = useMemo(() => {
    if (!user) return [];

    const all = [
      { href: "/dashboard", label: "Overview", icon: LayoutGrid },
      {
        href: "/dashboard/blogs",
        label: "Blogs",
        permission: "blogs",
        icon: BookOpen,
        children: [
          { href: "/dashboard/blogs", label: "All Blogs" },
          { href: "/dashboard/blogs/add", label: "Add Blog" },
          { href: "/dashboard/blogs/categories", label: "Categories" },
          { href: "/dashboard/blogs/tags", label: "Tags" },
        ],
      },
      {
        href: "/dashboard/admins",
        label: "Admins",
        permission: "admins",
        icon: Shield,
      },
      {
        href: "/dashboard/users",
        label: "Users",
        permission: "users",
        icon: Users,
      },
      {
        href: "/dashboard/settings",
        label: "Settings",
        permission: "settings",
        icon: Settings,
      },
    ];

    // Filter admins section — only admin head sees it
    return user.role === "admin head"
      ? all
      : all.filter((item) => item.href !== "/dashboard/admins");
  }, [user]);

  const isPermitted = useMemo(() => {
    if (!user) return false;
    if (adminHeadOnly) return user.role === "admin head";
    if (!requiredPermission) return true;
    if (user.role === "admin head") return true;
    const userPermissions = Array.isArray(user.permissions)
      ? user.permissions
      : [];
    return userPermissions.includes(requiredPermission);
  }, [adminHeadOnly, requiredPermission, user]);

  const currentItem = useMemo(() => {
    return (
      sidebarItems.find(
        (item) =>
          pathname === item.href ||
          (item.children && pathname.startsWith(item.href)),
      ) || { label: title, icon: LayoutGrid }
    );
  }, [sidebarItems, pathname, title]);

  const toggleSubmenu = (href, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newSet = new Set(openMenus);
    if (newSet.has(href)) {
      newSet.delete(href);
    } else {
      newSet.add(href);
    }
    setOpenMenus(newSet);
  };

  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (item.children && pathname.startsWith(item.href)) {
        setOpenMenus((prev) => {
          const next = new Set(prev);
          next.add(item.href);
          return next;
        });
      }
    });
  }, [pathname, sidebarItems]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080C14] text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#38FFF2] rounded-full animate-spin"></div>
          <span className="text-zinc-400 font-medium text-sm">
            Loading workspace...
          </span>
        </div>
      </div>
    );
  }

  const sidebarW = isSidebarOpen ? "w-64" : "w-[72px]";

  const renderNavItems = (expanded) => (
    <nav className="space-y-0.5">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.children && pathname.startsWith(item.href));
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        const isMenuOpen = openMenus.has(item.href);

        return (
          <div key={item.href} className="group/item">
            {hasChildren ? (
              <div>
                <button
                  onClick={(e) => {
                    if (!expanded) setIsSidebarOpen(true);
                    toggleSubmenu(item.href, e);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all w-full select-none cursor-pointer group/btn ${
                    isActive
                      ? "bg-[#38FFF2]/8 text-[#38FFF2] border border-[#38FFF2]/15"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                        isActive
                          ? "text-[#38FFF2]"
                          : "text-zinc-500 group-hover/btn:text-zinc-300"
                      }`}
                    />
                    <span
                      className={`whitespace-nowrap font-medium tracking-wide transition-all duration-200 ${
                        expanded
                          ? "opacity-100 max-w-[160px]"
                          : "opacity-0 max-w-0 overflow-hidden"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {expanded && (
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        isMenuOpen
                          ? "rotate-180 text-[#38FFF2]"
                          : "text-zinc-600"
                      }`}
                    />
                  )}
                </button>

                {/* Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expanded && isMenuOpen
                      ? "max-h-72 opacity-100 mt-0.5"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-[36px] space-y-0.5 border-l border-[#38FFF2]/10 pl-3 py-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                            isChildActive
                              ? "text-[#38FFF2] bg-[#38FFF2]/8"
                              : "text-zinc-500 hover:text-zinc-100 hover:bg-white/5"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all border ${
                  isActive
                    ? "bg-[#38FFF2]/8 text-[#38FFF2] border-[#38FFF2]/15"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100 border-transparent"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                    isActive
                      ? "text-[#38FFF2]"
                      : "text-zinc-500 group-hover/item:text-zinc-300"
                  }`}
                />
                <span
                  className={`whitespace-nowrap font-medium tracking-wide transition-all duration-200 ${
                    expanded
                      ? "opacity-100 max-w-[160px]"
                      : "opacity-0 max-w-0 overflow-hidden"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#080C14] text-zinc-100 font-sans flex overflow-hidden">
      {/* ── DESKTOP SIDEBAR ────────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen hidden lg:flex flex-col justify-between
          bg-[#0A0F1C]/95 backdrop-blur-md border-r border-white/5
          transition-all duration-300 ease-in-out ${sidebarW}
          shadow-[4px_0_24px_rgba(0,0,0,0.4)]`}
      >
        {/* Top – Logo + toggle */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0 overflow-hidden">
              {/* Icon mark */}
              <Sparkle className="w-5 h-5" />
              <span
                className={`text-white font-bold text-sm tracking-[0.15em] uppercase whitespace-nowrap
                  transition-all duration-300 ${isSidebarOpen ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0 overflow-hidden"}`}
              >
                Techzuno
              </span>
            </div>

            {/* Shrink / Expand toggle button */}
            <button
              onClick={() => setIsSidebarOpen((v) => !v)}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/8 text-zinc-500 hover:text-zinc-200 transition-all"
              title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeftOpen className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation scroll area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin scrollbar-thumb-zinc-800">
            {/* Section label */}
            {isSidebarOpen && (
              <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600 px-3 mb-2">
                Navigation
              </p>
            )}
            {renderNavItems(isSidebarOpen)}
          </div>
        </div>

        {/* Bottom – user + logout */}
        <div className="flex-shrink-0 border-t border-white/5 px-3 py-4">
          {/* User row */}
          <div
            className={`flex items-center gap-3 mb-3 px-2 overflow-hidden ${isSidebarOpen ? "" : "justify-center"}`}
          >
            <div className="w-8 h-8 rounded-full bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center text-[#38FFF2] font-bold text-sm flex-shrink-0">
              {user?.name ? user.name[0].toUpperCase() : "A"}
            </div>
            {isSidebarOpen && (
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate leading-tight">
                  {user?.name}
                </p>
                <p className="text-zinc-500 text-xs truncate leading-tight">
                  {user?.email}
                </p>
              </div>
            )}
          </div>

          <Link
            href="/logout"
            className={`flex items-center gap-3 px-3 py-2.5 text-zinc-500 hover:text-rose-400
              hover:bg-rose-500/5 rounded-xl transition-all border border-transparent hover:border-rose-500/10
              ${isSidebarOpen ? "" : "justify-center"}`}
          >
            <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-sm font-medium whitespace-nowrap">
                Logout
              </span>
            )}
          </Link>
        </div>
      </aside>

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div
            className="relative w-72 bg-[#0A0F1C] border-r border-white/5 h-full flex flex-col justify-between py-0
            animate-in slide-in-from-left duration-300 shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 fill-[#38FFF2]" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        rx="1.5"
                        fillOpacity="0.4"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-sm tracking-[0.15em] uppercase">
                    Techzuno
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg border border-zinc-800 hover:bg-white/5 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-3 py-4 overflow-y-auto">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600 px-3 mb-2">
                  Navigation
                </p>
                {renderNavItems(true)}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 px-3 py-4">
              <div className="flex items-center gap-3 mb-3 px-2">
                <div className="w-8 h-8 rounded-full bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center text-[#38FFF2] font-bold text-sm">
                  {user?.name ? user.name[0].toUpperCase() : "A"}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">
                    {user?.name}
                  </p>
                  <p className="text-zinc-500 text-xs truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                href="/logout"
                className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all"
              >
                <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="text-sm font-medium">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ──────────────────────────────────────────── */}
      <div
        className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-[72px]"
        }`}
      >
        {/* ── TOP HEADER ─────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-30 h-16 flex items-center justify-between px-5 lg:px-8
          bg-[#080C14]/80 backdrop-blur-xl border-b border-white/5
          shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.3)]"
        >
          {/* Left – mobile menu trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-zinc-800 bg-[#0A0F1C] hover:bg-white/5 text-zinc-400 hover:text-white transition-all"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Logo mark on mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 fill-[#38FFF2]" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                    fillOpacity="0.4"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-xs tracking-widest uppercase">
                Techzuno
              </span>
            </div>
          </div>

          {/* Centre – Primary nav tabs (image 2 style) */}
          <nav className="hidden md:flex items-center bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm rounded-xl px-1 py-1 gap-0.5">
            {[
              { href: "/dashboard", label: "Overview" },
              { href: "/dashboard/blogs", label: "Blogs" },
              { href: "/dashboard/admins", label: "Admins" },
              { href: "/dashboard/users", label: "Users" },
            ].map((tab) => {
              const isActive =
                tab.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-[#38FFF2] "
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                  {/* Active underline glow */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3/4 h-px bg-[#38FFF2]/60 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right – actions */}
          <div className="flex items-center gap-2.5">
            {/* User Panel */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                text-zinc-400 hover:text-zinc-100 bg-white/[0.04] border border-white/[0.07]
                hover:bg-white/[0.07] hover:border-white/10 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>User Panel</span>
            </Link>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg text-zinc-400 hover:text-white
              bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#38FFF2] rounded-full ring-2 ring-[#080C14]" />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#38FFF2]/10 border border-[#38FFF2]/25 flex items-center justify-center text-[#38FFF2] font-bold text-sm select-none cursor-pointer">
              {user?.name ? user.name[0].toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {/* ── WORKSPACE AREA ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 max-w-[1400px] mx-auto w-full">
            {isPermitted ? (
              children
            ) : (
              <div className="rounded-2xl border border-rose-500/10 bg-rose-900/5 p-8 text-center max-w-lg mx-auto mt-12">
                <h2 className="text-lg font-semibold text-rose-400">
                  Access Denied
                </h2>
                <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
                  You do not have the required permission to access this
                  workspace. Please check with your administrator.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
