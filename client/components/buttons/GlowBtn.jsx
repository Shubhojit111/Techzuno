import Link from "next/link";
import React from "react";

const GlowBtn = ({
  text,
  className = "",
  link,
  onClick,
  type = "button",
  disabled = false,
}) => {
  const classes = `inline-block bg-linear-to-r tracking-widest from-[#03B8B8] to-[#03B8B8] hover:brightness-110 text-white px-10 py-1 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(0,210,255,0.5)] border-2 border-white/70 font-sans cursor-pointer disabled:opacity-60 ${className}`;

  if (onClick || !link) {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={classes}>
        {text}
      </button>
    );
  }

  return (
    <div>
      <Link href={link || "/about"} className={classes}>
        {text}
      </Link>
    </div>
  );
};

export default GlowBtn;
