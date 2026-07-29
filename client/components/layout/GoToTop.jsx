"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);

  const size = 48;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      setProgress(pct);
      setVisible(scrollTop > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const offset = circumference - progress * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90 pointer-events-none"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gtt-progress)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 150ms ease-out" }}
        />
        <defs>
          <linearGradient id="gtt-progress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38FFF2" />
            <stop offset="100%" stopColor="#03B8B8" />
          </linearGradient>
        </defs>
      </svg>

      <button
        type="button"
        aria-label="Go to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="relative h-12 w-12 rounded-full border border-white/10 bg-[#03B8B8] text-black shadow-[0_12px_40px_rgba(3,184,184,0.25)] transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_16px_48px_rgba(3,184,184,0.35)] active:translate-y-[1px]"
      >
        <Icon icon="mdi:arrow-up" className="mx-auto text-[22px]" />
      </button>
    </div>
  );
}

