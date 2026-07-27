import { Icon } from "@iconify/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const KnowMoreBtn = ({ text, className, link }) => {
  const buttonText = text || "Find More About Techzuno";
  const letters = buttonText.split("");

  return (
    <div>
      <Link
        href={link || "/about"}
        className={`${className} group inline-flex gap-2 border-2 tracking-widest border-[#03B8B8] hover:border-[#03B8B8] hover:text-[#03B8B8] hover:shadow-[0_0_20px_rgba(3,184,184,0.6)] items-center px-5 md:px-8 py-2 text-[16px] sm:text-[24px] lg:text-[20px] rounded-full font-medium transition-all duration-300`}
      >
        <span className="inline-flex">
          {letters.map((char, idx) => (
            <span
              key={idx}
              className="inline-block transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-[#38FFF2] transform-gpu"
              style={{
                transitionDelay: `${idx * 20}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
        <Icon
          icon="solar:arrow-right-outline"
          className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#38FFF2]"
        />
      </Link>
    </div>
  );
};

export default KnowMoreBtn;
