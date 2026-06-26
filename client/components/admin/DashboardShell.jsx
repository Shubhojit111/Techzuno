"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function DashboardShell({
  title,
  children,
  requiredPermission,
  adminHeadOnly = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, authLoading } = useContext(AuthContext);

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
    if (!user) {
      return [];
    }

    const all = [
      { href: "/dashboard", label: "Overview" },
      {
        href: "/dashboard/products",
        label: "Products",
        permission: "products",
      },
      { href: "/dashboard/orders", label: "Orders", permission: "orders" },
      {
        href: "/dashboard/blogs",
        label: "Blogs",
        permission: "blogs",
        children: [
          { href: "/dashboard/blogs", label: "All Blogs" },
          { href: "/dashboard/blogs/add", label: "Add Blogs" },
          { href: "/dashboard/blogs/categories", label: "Categories" },
          { href: "/dashboard/blogs/tags", label: "Tags" },
        ],
      },
      { href: "/dashboard/users", label: "Users", permission: "users" },
      {
        href: "/dashboard/settings",
        label: "Settings",
        permission: "settings",
      },
    ];

    if (user.role === "admin head") {
      all.splice(5, 0, { href: "/dashboard/admins", label: "Admins" });
    }

    return all;
  }, [user]);

  const isPermitted = useMemo(() => {
    if (!user) {
      return false;
    }

    if (adminHeadOnly) {
      return user.role === "admin head";
    }

    if (!requiredPermission) {
      return true;
    }

    if (user.role === "admin head") {
      return true;
    }

    const userPermissions = Array.isArray(user.permissions)
      ? user.permissions
      : [];
    return userPermissions.includes(requiredPermission);
  }, [adminHeadOnly, requiredPermission, user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-28 px-6 sm:px-10 lg:px-20">
        <div className="rounded-[28px] border border-white/10 bg-white/5 px-8 py-20 text-center text-2xl">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white pt-28 pb-20">
      <div className="px-6 sm:px-10 lg:px-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
          <aside className="rounded-[28px] border border-white/10 bg-linear-to-b from-white/10 to-white/[0.03] backdrop-blur-xl p-5 lg:p-6 h-fit">
            <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase">
              Dashboard
            </p>
            <h2 className="mt-3 text-white text-[24px] font-semibold leading-tight">
              Admin Panel
            </h2>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-white/50 text-[13px] mt-1">{user?.email}</p>
              <p className="text-[#38FFF2] text-[12px] uppercase tracking-[0.18em] mt-3">
                {user?.role}
              </p>
            </div>

            <nav className="mt-6 space-y-2">
              {sidebarItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.children && pathname.startsWith(item.href));
                const hasChildren =
                  Array.isArray(item.children) && item.children.length > 0;

                if (hasChildren) {
                  return (
                    <div key={item.href} className="group">
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] transition-all ${
                          isActive
                            ? "bg-[#03B8B8] text-black font-semibold"
                            : "bg-white/[0.03] text-white/80 hover:bg-white/[0.08] hover:text-white"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          className={`text-[12px] transition-transform ${
                            isActive ? "text-black/70" : "text-white/60"
                          } group-hover:rotate-180 group-focus-within:rotate-180`}
                        >
                          ▾
                        </span>
                      </Link>

                      <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-h-64 group-hover:opacity-100 group-focus-within:max-h-64 group-focus-within:opacity-100">
                        <div className="mt-2 space-y-1 pl-3">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href;

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block rounded-2xl px-4 py-2.5 text-[13px] transition-all ${
                                  isChildActive
                                    ? "bg-white/10 text-white font-semibold"
                                    : "bg-transparent text-white/70 hover:bg-white/[0.06] hover:text-white"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl px-4 py-3 text-[14px] transition-all ${
                      isActive
                        ? "bg-[#03B8B8] text-black font-semibold"
                        : "bg-white/[0.03] text-white/80 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6">
              <Link
                href="/logout"
                className="block rounded-2xl px-4 py-3 text-[14px] bg-white/[0.03] text-white/80 hover:bg-white/[0.08] hover:text-white transition-all"
              >
                Logout
              </Link>
            </div>
          </aside>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] backdrop-blur-xl p-6 md:p-8 lg:p-10">
            <div className="border-b border-white/10 pb-5 mb-8">
              <p className="text-[#38FFF2] text-[11px] tracking-[0.28em] uppercase">
                Admin Workspace
              </p>
              <h1 className="mt-3 text-[28px] md:text-[34px] font-semibold">
                {title}
              </h1>
            </div>

            {isPermitted ? (
              children
            ) : (
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-8">
                <h2 className="text-[26px] font-semibold">
                  you are not eligible to access here in ui
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
