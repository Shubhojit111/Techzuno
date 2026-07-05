"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function TestimonialQuote({ data }) {
  return (
    <section className="py-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-white/5 p-10 md:p-16 rounded-[32px] relative overflow-hidden shadow-2xl">
          {/* Quote mark decoration */}
          <Icon 
            icon="ri:double-quotes-l" 
            className="absolute top-8 left-8 w-20 h-20 text-[#03B8B8]/10 pointer-events-none" 
          />
          
          <div className="relative z-10">
            <p className="text-white/80 text-xl md:text-2xl italic leading-relaxed mb-12 font-montserrat">
              &ldquo;{data.quote}&rdquo;
            </p>
            
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#03B8B8]">
                <Image
                  src={data.avatar}
                  alt={data.author || "Techzuno"}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-bold tracking-wide uppercase text-sm">
                  {data.author}
                </h4>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  {data.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
