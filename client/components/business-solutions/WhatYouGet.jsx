"use client";

import React from "react";
import SectionTitle from "../buttons/SectionTitle";
import { Icon } from "@iconify/react";

export default function WhatYouGet({ data }) {
  return (
    <section className="py-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <SectionTitle
          title={
            <>
              WHAT <span className="text-[#03B8B8]">YOU GET</span>
            </>
          }
          className="mb-14 md:mb-16 uppercase"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-start group">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#121212] border border-white/5 flex items-center justify-center text-[#03B8B8] group-hover:bg-[#03B8B8] group-hover:text-black transition-all">
                  <Icon icon={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold tracking-wide uppercase text-[14px] md:text-[15px] group-hover:text-[#03B8B8] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed font-montserrat max-w-[520px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
