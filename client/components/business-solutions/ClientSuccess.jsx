"use client";

import React from "react";
import SectionTitle from "../buttons/SectionTitle";
import Image from "next/image";
import Assets from "@/Assets/Assets";

export default function ClientSuccess() {
  const logos = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: "TECHZUNO",
    src: Assets.logo,
  }));

  return (
    <section className="py-20 bg-[#050505]/50">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <SectionTitle 
          title={<>CASE STUDIES - <span className="text-[#03B8B8]">CLIENT SUCCESS</span> STORIES</>} 
          className="mb-14 md:mb-16 uppercase" 
        />
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10 items-center place-items-center opacity-60 hover:opacity-90 transition-opacity duration-500">
          {logos.map((logo) => (
            <div key={logo.id} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="h-8 md:h-9 w-auto grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-[9px] md:text-[10px] text-white/45 group-hover:text-[#03B8B8] transition-colors font-bold uppercase tracking-widest">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        
        <p className="text-center text-white/20 text-[10px] uppercase tracking-[0.3em] mt-14 md:mt-16 font-bold">
          Trusted by leading companies around the world
        </p>
      </div>
    </section>
  );
}
