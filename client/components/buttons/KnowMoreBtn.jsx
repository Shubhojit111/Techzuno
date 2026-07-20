import { Icon } from "@iconify/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const KnowMoreBtn = ({ text, className, link }) => {
  return (
    <div>
      <Link
        href={link || "/about"}
        className={`${className} inline-flex gap-2 border-2 tracking-widest border-[#03B8B8] hover:border-[#03B8B8] hover:text-[#03B8B8] items-center px-5 md:px-8 py-1  text-[16px] sm:text-[24px] lg:text-[20px] rounded-full font-medium transition-colors `}
      >
        {text} <Icon icon="solar:arrow-right-outline" className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default KnowMoreBtn;
