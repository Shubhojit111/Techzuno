import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const KnowMoreBtn = ({ text }) => {
  return (
    <div>
      <Link
        href="/about"
        className="inline-flex gap-2 border-2 tracking-wider border-[#03B8B8] hover:border-[#03B8B8] hover:text-[#03B8B8] items-center px-5 md:px-10 py-1  text-[18px] sm:text-[24px] lg:text-[20px] rounded-full font-medium transition-colors"
      >
        {text} <ArrowRight size={20} />
      </Link>
    </div>
  );
};

export default KnowMoreBtn;
