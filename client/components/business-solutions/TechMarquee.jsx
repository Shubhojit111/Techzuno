"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function TechMarquee({ stack }) {
  return (
    <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-20 -mt-8 md:-mt-10 lg:-mt-12">
      <div className="bg-[#121212]/60 border border-white/10 rounded-[18px] md:rounded-2xl px-5 py-4 md:px-8 md:py-5 flex flex-wrap items-center justify-center lg:justify-between gap-6 md:gap-10 backdrop-blur-md">
        <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em] font-medium w-full lg:w-auto text-center lg:text-left mb-4 lg:mb-0">
          The Technologies We Use for Digital Solutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {stack.map((item, index) => (
            <div key={index} className="flex items-center gap-3 group transition-all">
              <Icon 
                icon={item.icon} 
                className="w-7 h-7 md:w-9 md:h-9 opacity-40 group-hover:opacity-100 transition-opacity" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
