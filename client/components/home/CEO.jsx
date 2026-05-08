"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";

export default function FounderQuoteSection() {
  return (
    <section className="relative border w-full h-[650px] bg-black overflow-hidden flex items-center py-1 px-6 sm:px-10 lg:px-62 ">
      <div className="absolute top-0 left-0 w-full h-full z-0 ">
        <Image
          src={Assets.CEObg}
          alt="Founder"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative  mx-auto w-full ">
        <div className="flex items-center justify-center w-full">
          {/* LEFT IMAGE BLOCK */}
          <div className="w-[40%] relative flex justify-center lg:justify-start z-30">
            {/* White Frame Top + Right */}
            <div className="hidden md:block absolute top-0 right-0 w-[180px] h-[calc(100%+30px)] border-t-[3px] border-r-[3px] border-white pointer-events-none z-20" />

            {/* White Frame Bottom */}
            <div className="hidden md:block absolute bottom-[-30px] right-0 w-[300px] h-[3px] bg-white z-20" />

            <div className="absolute bottom-0 left-0 w-[280px] sm:w-[300px] md:w-[380px] h-[340px] sm:h-[380px] md:h-[400px] rounded-[18px] border border-cyan-100/20 bg-gradient-to-br from-[#24363d] via-[#1a2328] to-[#111111] overflow-hidden shadow-[0_0_60px_rgba(56,255,242,0.08)]"/>
            {/* Main Portrait Card */}
            <div className="relative w-full h-[500px]">
              <Image
                src={Assets.CEO}
                alt="Founder"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* RIGHT CONTENT BLOCK */}
          <div className="w-[60%] relative bg-[#080808] h-[340px] sm:h-[380px] md:h-[400px] flex flex-col justify-center pl-10 sm:pl-16 md:pl-28 lg:pl-24 pr-6 sm:pr-8 md:pr-12 lg:pr-14 shadow-2xl z-10 border border-white/5">
            {/* Giant Quote */}
            <div className="absolute top-4 right-8 sm:top-6 sm:right-10 md:top-8 md:right-12 text-[100px] sm:text-[140px] md:text-[180px] font-black text-white/10 leading-none select-none font-serif">
              ”
            </div>

            {/* Quote Text */}
            <div className="relative z-10 max-w-[500px]">
              <h2 className="text-white/90 italic font-medium tracking-wide leading-[1.3] text-[16px] sm:text-[20px] md:text-[24px]">
                At Techzuno, Diverse Experiences And A Passion For Innovation
                Shape Everything We Build — And That's Something We're
              </h2>

              {/* Founder Info */}
              <p className="mt-6 md:mt-10 text-white/50 text-[13px] sm:text-[14px] md:text-[15px] font-normal tracking-wide">
                Bishal Kayal – CEO And Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
