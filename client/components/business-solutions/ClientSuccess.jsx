"use client";

import React from "react";
import SectionTitle from "../buttons/SectionTitle";
import Image from "next/image";
import Assets from "@/Assets/Assets";
import SectionDescription from "../buttons/SectionDescription";

export default function ClientSuccess() {
  const logos = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    src: Assets.logo,
  }));

  return (
    <section className="py-20 bg-[#050505]/50">
      <div className="px-6 md:px-10 lg:px-62 mx-auto w-full text-center">
        <SectionTitle 
          title={<>CASE STUDIES - <span className="highlightedTextColor">CLIENT <br /> SUCCESS</span> STORIES</>} 
          className="mb-14 md:mb-16 uppercase" 
        />
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-8 items-center place-items-center opacity-60 hover:opacity-90 transition-opacity duration-500">
          {logos.map((logo) => (
            <div key={logo.id} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="h-8 md:h-20 w-auto grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        
        <SectionDescription 
          description={<>Want to accelerate website and app development at your company? <span className="highlightedTextColor underline">See how we can help.</span> 
          </>}
          className="mt-14 md:mt-8 font-bold"
        />
      </div>
    </section>
  );
}
