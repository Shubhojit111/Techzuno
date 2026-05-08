"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";

export default function FounderQuoteSection() {
  return (
    <section className="relative  w-full h-[620px] bg-black overflow-hidden flex items-center py-1 px-6 sm:px-10 lg:px-62 ">
      <div className="absolute top-0 left-0 w-full h-full z-0 ">
        <Image
          src={Assets.CEObg}
          alt="Founder"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative  mx-auto w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-full gap-6">
          {/* LEFT IMAGE BLOCK */}
          <div className="w-[40%] relative flex justify-center lg:justify-start z-30 ">
            {/* White Frame Top + Right */}
            <div className="hidden md:block absolute top-0 right-0 w-[180px] h-[calc(100%+30px)] border-t-[3px] border-r-[3px] border-white pointer-events-none z-20" />

            {/* White Frame Bottom */}
            <div className="hidden md:block absolute bottom-[-30px] right-0 w-[300px] h-[3px] bg-white z-20" />

            <div className="absolute bottom-0 left-0 w-[280px] sm:w-[300px] md:w-[360px] h-[340px] sm:h-[380px] md:h-[400px] rounded-[18px] border border-cyan-100/20 bg-gradient-to-br from-[#24363d] via-[#1a2328] to-[#111111] overflow-hidden shadow-[0_0_60px_rgba(56,255,242,0.08)]" />
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
          <div className="w-[60%] h-full flex flex-col justify-center items-end">
            <div className="relative bg-black flex h-full w-full flex-col justify-center  shadow-2xl z-10 rounded p-10">
              {/* Giant Quote */}
              <div className="h-[100px] w-auto  self-end ">
                <Image
                  src={Assets.CommaIconSharp}
                  alt="Comma"
                  className="object-cover w-full h-full "
                />
              </div>

              {/* Quote Text */}
              <div className="mt-6 flex flex-col justify-center items-start">
                <h2 className="text-white/90 italic font-medium tracking-wide leading-[1.3] text-[16px] sm:text-[20px] md:text-[32px]">
                  At Techzuno, Diverse Experiences And A Passion For Innovation
                  Shape Everything We Build — And That's Something We're
                </h2>

                {/* Founder Info */}
                <p className="mt-6 md:mt-10 text-white/50 text-[13px] sm:text-[14px] md:text-[18px] font-normal tracking-wide">
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
