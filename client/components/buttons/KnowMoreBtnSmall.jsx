import { Icon } from "@iconify/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function KnowMoreBtnSmall({ text, additionalClassName }) {
  return (
    <div>
      <Link
        href="/about"
        className={`${additionalClassName} inline-flex gap-2 border-2 tracking-widest border-[#03B8B8] hover:border-[#03B8B8] hover:text-[#03B8B8] items-center px-5 md:px-8 py-1.5 text-[16px] sm:text-[16px] lg:text-[20px] rounded-full font-medium transition-colors `}
      >
        {text} <Icon icon="solar:arrow-right-outline" className="h-5 w-5" />
      </Link>
    </div>
  );
}
