"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-[9999] h-12 w-12 rounded-full border border-white/10 bg-[#03B8B8] text-black shadow-[0_12px_40px_rgba(3,184,184,0.25)] transition-all duration-300 hover:bg-cyan-400 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <Icon icon="mdi:arrow-up" className="mx-auto text-[22px]" />
    </button>
  );
}

