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
  Bell,
  ChevronDown,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkle,
  Sun,
  ArrowRight,
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  const breadcrumbs = useMemo(() => {
    const normalizeLabel = (label) => {
      const parts = label.replace("-", " ");
      return parts
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    };

    const pathParts = pathname.split("/").filter(Boolean); // Split path into segments, remove empty
    const crumbs = [];
    let currentPath = "";

    crumbs.push({ label: "Dashboard", href: "/dashboard" });
    currentPath = "/dashboard";

    for (let i = 1; i < pathParts.length; i++) {
      currentPath += `/${pathParts[i]}`;
      crumbs.push({
        label: normalizeLabel(pathParts[i]),
        href: currentPath,
      });
    }

    return crumbs;
  }, [pathname]);

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

  const sidebarW = isSidebarOpen ? "w-[240px]" : "w-16";

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
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/5 shrink-0">
            <div
              className={`flex items-center gap-3 min-w-0 overflow-hidden transition-all duration-300 ${isSidebarOpen ? "opacity-100 w-[160px]" : "opacity-0 max-w-0 overflow-hidden"}`}
            >
              {/* Icon mark */}
              <Sparkle className="w-5 h-5" />
              <span
                className={`text-white font-bold text-sm tracking-[0.15em] uppercase whitespace-nowrap
                  transition-all duration-300 `}
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
            {/* sidebar Header */}
            <div>
              <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#38FFF2]/10 border border-[#38FFF2]/20 flex items-center justify-center">
                    <Sparkle className="w-5 h-5" />
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
          isSidebarOpen ? "lg:ml-[240px]" : "lg:pl-16"
        }`}
      >
        {/* ── TOP HEADER ─────────────────────────────────────────────── */}
        <header
          className={`fixed top-0 right-0 z-30 flex h-16 items-center border-b border-white/5 bg-[#080C14]/92 px-4 shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 sm:px-5 lg:px-6 ${
            isSidebarOpen ? "left-0 lg:left-[240px]" : "left-0 lg:left-16"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition-all hover:bg-white/[0.07] hover:text-white lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" />
              </button>

              <nav className="flex min-w-0 items-center gap-2 text-[13px] font-medium" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <div key={crumb.href} className="flex min-w-0 items-center gap-1.5">
                      {index > 0 ? <span className="text-zinc-400"><ArrowRight className="w-4 h-4" /></span> : null}
                      {isLast ? (
                        <span className="truncate text-[#38FFF2] tracking-[0.1em] text-[14px]">{crumb.label}</span>
                      ) : (
                        <Link
                          href={crumb.href}
                          className="truncate text-zinc-400 transition-colors hover:text-white hover:underline underline-offset-4"
                        >
                          {crumb.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end">
              <button
                type="button"
                className="relative flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#38FFF2] px-1 text-[10px] font-bold text-[#080C14] ring-2 ring-[#080C14]">
                  3
                </span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((value) => !value)}
                  className="flex items-center gap-3 rounded-xl px-1.5 py-1 transition-colors hover:bg-white/[0.04]"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#38FFF2]/25 bg-[#38FFF2]/10 text-sm font-bold text-[#38FFF2]">
                    {user?.name ? user.name[0].toUpperCase() : "A"}
                  </span>
                  <span className="hidden min-w-0 text-left lg:block">
                    <span className="block max-w-[150px] truncate text-[12px] font-semibold leading-4 text-white">
                      {user?.name || "Techzuno Admin"}
                    </span>
                    <span className="block max-w-[150px] truncate text-[11px] leading-4 text-zinc-500">
                      {user?.email || "admin@techzuno.com"}
                    </span>
                  </span>
                  <ChevronDown className={`hidden h-4 w-4 text-zinc-500 transition-transform lg:block ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {isUserMenuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0A0F1C] shadow-2xl shadow-black/40"
                  >
                    <Link
                      href="/"
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Globe className="h-4 w-4" />
                      User Panel
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <Link
                      href="/logout"
                      role="menuitem"
                      className="flex items-center gap-2 border-t border-white/5 px-4 py-3 text-sm font-medium text-rose-300 transition-colors hover:bg-rose-500/10 hover:text-rose-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        {/* ── WORKSPACE AREA ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="p-5 md:p-6 max-w-[1400px] mx-auto w-full">
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
