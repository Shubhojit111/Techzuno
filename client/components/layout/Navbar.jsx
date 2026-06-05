"use client";

import Link from "next/link";
import Image from "next/image";
import Assets from "@/Assets/Assets";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
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
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </Link>
            <Link href="/learn-more" className="hover:text-cyan-400 transition-colors">
              Learn More
            </Link>
            <Link href="/services" className="hover:text-cyan-400 transition-colors">
              Services
            </Link>
            <Link href="/blogs" className="hover:text-cyan-400 transition-colors">
              Blogs
            </Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </Link>
            <Link href="/business-solutions" className="hover:text-cyan-400 transition-colors">
              Business Solutions
            </Link>
            <Link href="/ui-ux-design" className="hover:text-cyan-400 transition-colors">
              UI/UX
            </Link>
            <Link href="/app-development" className="hover:text-cyan-400 transition-colors">
              App
            </Link>
            <Link href="/web-development" className="hover:text-cyan-400 transition-colors">
              Web
            </Link>
            <Link href="/ecom-integration" className="hover:text-cyan-400 transition-colors">
              Ecom
            </Link>
            <Link href="/seo" className="hover:text-cyan-400 transition-colors">
              SEO
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button className="text-[12px] font-normal tracking-wider hover:text-cyan-400 transition-colors">
              Login
            </button>
            <button className="bg-[#03B8B8] hover:cursor-pointer text-white px-5 py-1.5 rounded-2xl text-[12px] font-normal tracking-wider">
              Sign Up
            </button>
          </div>

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
              {[
                { href: "/", label: "Home" },
                { href: "/pricing", label: "Pricing" },
                { href: "/learn-more", label: "Learn More" },
                { href: "/services", label: "Services" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
                { href: "/business-solutions", label: "Business Solutions" },
                { href: "/ui-ux-design", label: "UI/UX" },
                { href: "/app-development", label: "App" },
                { href: "/web-development", label: "Web" },
                { href: "/ecom-integration", label: "Ecom" },
                { href: "/seo", label: "SEO" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-white/10 text-white/90 hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
