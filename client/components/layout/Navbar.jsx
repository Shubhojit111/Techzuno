"use client";

import Link from "next/link";
import Image from "next/image";
import Assets from "@/Assets/Assets";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  {
    label: "Services",
    children: [
      { href: "/services", label: "All Services" },
      { href: "/web-development", label: "Web Development" },
      { href: "/app-development", label: "App Development" },
      { href: "/ui-ux-design", label: "UI/UX Design" },
      { href: "/business-solutions", label: "Business Solutions" },
      { href: "/ecom-integration", label: "Ecom Integration" },
      { href: "/seo", label: "SEO" },
    ],
  },
  { href: "/blogs", label: "Blog" },
  {
    label: "Learn More",
    children: [
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/about", label: "About Us" },
    ],
  },
];

function DesktopDropdown({ item }) {
  return (
    <div className="relative group/dropdown">
      <button
        type="button"
        className="hover:text-cyan-400 transition-colors flex items-center gap-1"
      >
        {item.label}
        <svg
          className="w-3 h-3 opacity-60 transition-transform duration-200 group-hover/dropdown:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Invisible bridge — pointer-events-none so hovering in the gap does NOT trigger other items */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[240px] pointer-events-none group-hover/dropdown:pointer-events-auto">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/85 backdrop-blur-md shadow-2xl opacity-0 translate-y-2 transition-all duration-300 group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0">
          <div className="max-h-0 group-hover/dropdown:max-h-[420px] transition-all duration-300 overflow-hidden">
            <div className="p-3">
              {item.children.map((child, idx) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-3 py-2 rounded-xl text-white/90 hover:text-cyan-400 hover:bg-white/5 transition-all"
                  style={{ transitionDelay: `${idx * 25}ms` }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDropdown({ item, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 border-b border-white/10 text-white/90 hover:text-cyan-400 transition-colors"
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>
        <span
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-1 pb-1">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block py-3 pl-4 border-b border-white/10 text-white/80 hover:text-cyan-400 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { user, authLoading } = useContext(AuthContext);

  const isAdmin = user?.role === "admin" || user?.role === "admin head";

  const closeMobileMenu = () => setOpen(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (authLoading) {
    return null;
  }

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-[9999] ">
      <div className="mx-auto bg-black/60 backdrop-blur-md pointer-events-auto">
        <div className="px-6 sm:px-10 lg:px-60 py-3 sm:py-6 lg:pt-4 lg:pb-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <Image
              src={Assets.logo}
              className="h-10 sm:h-14 lg:h-16 w-auto object-contain"
              alt="Techzuno Logo"
            />
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-8 text-[12px] font-normal tracking-wider">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {isAdmin ? (
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-[12px] font-normal tracking-wider hover:text-cyan-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/logout"
                className="bg-[#03B8B8] hover:brightness-110 text-white px-5 py-1.5 rounded-2xl text-[12px] font-normal tracking-wider transition-all"
              >
                Logout
              </Link>
            </div>
          ) : null}

          <button
            type="button"
            className="lg:hidden cursor-pointer h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center pointer-events-auto"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-[2px] w-5 bg-white/80" />
              <span className="block h-[2px] w-5 bg-white/80" />
              <span className="block h-[2px] w-5 bg-white/80" />
            </div>
          </button>
        </div>

        {/* ── Mobile nav ── */}
        {open ? (
          <div className="lg:hidden px-6 sm:px-10 pb-6">
            <div className="border-t border-white/10 pt-4 text-[13px] tracking-wide">
              {navItems.map((item) =>
                item.children ? (
                  <MobileDropdown
                    key={item.label}
                    item={item}
                    onNavigate={closeMobileMenu}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-3 border-b border-white/10 text-white/90 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}

              {isAdmin ? (
                <div className="flex gap-3 pt-5 mt-2">
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex-1 text-center py-2.5 border border-white/20 rounded-full text-white/90 hover:text-cyan-400 text-[13px] tracking-wide transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/logout"
                    onClick={closeMobileMenu}
                    className="flex-1 text-center py-2.5 bg-[#03B8B8] rounded-full text-white text-[13px] tracking-wide hover:brightness-110 transition-all"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3 pt-5 mt-2">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="flex-1 text-center py-2.5 border border-white/20 rounded-full text-white/90 hover:text-cyan-400 text-[13px] tracking-wide transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="flex-1 text-center py-2.5 bg-[#03B8B8] rounded-full text-white text-[13px] tracking-wide hover:brightness-110 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

