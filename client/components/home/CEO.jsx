"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";

export default function FounderQuoteSection() {
  return (
    <section className="relative w-full h-auto md:h-[480px] lg:h-[620px] bg-black overflow-hidden flex items-center py-16 md:py-1 px-6 sm:px-10 lg:px-62">
      <div className="absolute top-0 left-0 w-full h-full z-0 ">
        <Image
          src={Assets.CEObg}
          alt="Founder"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative mx-auto w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-10 md:gap-6 lg:gap-8">
          {/* LEFT IMAGE BLOCK */}
          <div className="w-full md:w-[40%] lg:w-[40%] relative flex justify-center lg:justify-start z-30">
            <div className="relative w-[300px] sm:w-[340px] md:w-[360px] lg:w-full max-w-[400px] h-[360px] md:h-[380px] lg:h-[500px]">
              {/* White Frame Top + Right */}
              <div className="hidden md:block absolute top-0 md:right-[6px] lg:right-3 w-[120px] lg:w-[180px] h-[calc(100%+20px)] lg:h-[calc(100%+30px)] border-t-[3px] border-r-[3px] border-white pointer-events-none z-20" />

              {/* White Frame Bottom */}
              <div className="hidden md:block absolute bottom-[-20px] lg:bottom-[-30px] right-[6px] lg:right-3 w-[200px] lg:w-[300px] h-[3px] bg-white z-20" />

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 w-[260px] sm:w-[300px] md:w-[250px] lg:w-[360px] h-[280px] sm:h-[320px] md:h-[320px] lg:h-[400px] rounded-[18px] border border-cyan-100/20 bg-gradient-to-br from-[#24363d] via-[#1a2328] to-[#111111] overflow-hidden shadow-[0_0_60px_rgba(56,255,242,0.08)]" />
              
              {/* Main Portrait Card */}
              <div className="relative w-full h-full flex justify-center">
                <Image
                  src={Assets.CEO}
                  alt="Founder"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT BLOCK */}
          <div className="w-full md:w-[55%] lg:w-[60%] h-full flex flex-col justify-center items-center md:items-end">
            <div className="relative bg-black flex h-full w-full flex-col justify-center shadow-2xl z-10 rounded-2xl p-6 sm:p-8 md:p-6 lg:p-10">
              {/* Giant Quote */}
              <div className="h-[60px] md:h-[60px] lg:h-[100px] w-auto self-end">
                <Image
                  src={Assets.CommaIconSharp}
                  alt="Comma"
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Quote Text */}
              <div className="mt-4 md:mt-4 lg:mt-6 flex flex-col justify-center items-start">
                <h2 className="text-white/90 italic font-medium tracking-wide leading-[1.3] text-[18px] sm:text-[22px] md:text-[18px] lg:text-[32px]">
                  At Techzuno, Diverse Experiences And A Passion For Innovation
                  Shape Everything We Build — And That&apos;s Something We&apos;re
                </h2>

                {/* Founder Info */}
                <p className="mt-6 md:mt-6 lg:mt-10 text-white/50 text-[14px] sm:text-[15px] md:text-[13px] lg:text-[18px] font-normal tracking-wide">
                  Bishal Kayal – CEO And Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
