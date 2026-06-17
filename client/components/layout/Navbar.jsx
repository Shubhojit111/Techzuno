"use client";

import Link from "next/link";
import Image from "next/image";
import Assets from "@/Assets/Assets";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [othersOpen, setOthersOpen] = useState(false);

  const [user, setUser] = useState([]);

  const primaryLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    // { href: "/learn-more", label: "Learn More" },
    { href: "/works", label: "Works" },
    { href: "/services", label: "Services" },
  ];

  const otherLinks = [
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/business-solutions", label: "Business Solutions" },
    { href: "/web-development", label: "Web Development" },
    { href: "/ui-ux-design", label: "UI/UX Design" },
    { href: "/app-development", label: "App Development" },
    { href: "/ecom-integration", label: "Ecom Integration" },
    { href: "/seo", label: "SEO" },
  ];

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          {
            withCredentials: true,
          },
        );
        console.log(response.data.user);
        const { user } = response.data;
        setUser(user);

        // console.log(user);

      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    };
    getAuth();
  }, [router]);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
        setOthersOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  

  return (
    <nav className="fixed top-0 w-full z-[9999] ">
      <div className="mx-auto bg-black/60 backdrop-blur-md pointer-events-auto">
        <div className="px-6 sm:px-10 lg:px-60 py-3 sm:py-6 lg:pt-4 lg:pb-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <Image
              src={Assets.logo}
              className="h-10 sm:h-14 lg:h-16 w-auto object-contain"
              alt="Logo"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-[12px] font-normal tracking-wider">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="relative group">
              <button
                type="button"
                className="hover:text-cyan-400 transition-colors"
              >
                Others
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-5 w-[260px]">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/85 backdrop-blur-md shadow-2xl opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <div className="max-h-0 group-hover:max-h-[420px] transition-all duration-300 overflow-hidden">
                    <div className="p-3">
                      {otherLinks.map((item, idx) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-xl text-white/90 hover:text-cyan-400 hover:bg-white/5 transition-all"
                          style={{ transitionDelay: `${idx * 25}ms` }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

        {open ? (
          <div className="lg:hidden px-6 sm:px-10 pb-6">
            <div className="border-t border-white/10 pt-4 text-[13px] tracking-wide">
              {primaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    setOthersOpen(false);
                  }}
                  className="block py-3 border-b border-white/10 text-white/90 hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => setOthersOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3 border-b border-white/10 text-white/90 hover:text-cyan-400 transition-colors"
                aria-expanded={othersOpen}
              >
                <span>Others</span>
                <span
                  className={`transition-transform ${othersOpen ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  othersOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2 pb-1">
                  {otherLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        setOthersOpen(false);
                      }}
                      className="block py-3 pl-4 border-b border-white/10 text-white/80 hover:text-cyan-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth links for mobile */}
              <div className="flex gap-3 pt-5 mt-2">
                <Link
                  href="/login"
                  onClick={() => {
                    setOpen(false);
                    setOthersOpen(false);
                  }}
                  className="flex-1 text-center py-2.5 border border-white/20 rounded-full text-white/90 hover:text-cyan-400 text-[13px] tracking-wide transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => {
                    setOpen(false);
                    setOthersOpen(false);
                  }}
                  className="flex-1 text-center py-2.5 bg-[#03B8B8] rounded-full text-white text-[13px] tracking-wide hover:brightness-110 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
