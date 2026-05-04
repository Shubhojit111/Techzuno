import Link from "next/link";
import React from "react";

const GlowBtn = ({ text }) => {
  return (
    <div>
      <Link
        href="/start"
        className="inline-block bg-linear-to-r tracking-widest from-[#03B8B8] to-[#03B8B8] hover:brightness-110 text-white px-10 py-1 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(0,210,255,0.5)] border-2 border-white/70 font-sans"
      >
        {text}
      </Link>
    </div>
  );
};

export default GlowBtn;
