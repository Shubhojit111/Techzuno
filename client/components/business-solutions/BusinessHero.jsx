"use client";

import React from "react";
import HeaderBtn from "../buttons/HeaderBtn";
import Image from "next/image";
import SectionDescription from "../buttons/SectionDescription";
import KnowMoreBtn from "../buttons/KnowMoreBtn";
import Assets from "@/Assets/Assets";

export default function BusinessHero({ data }) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 lg:pt-40 pb-10 md:pb-14">
      <div className="absolute inset-0">
        <Image
          src={Assets.HomeBg}
          alt=""
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-62 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5">
          <HeaderBtn text={data.header} />

          <h1 className="mt-2 font-toxigenesis uppercase text-white tracking-[0.12em] text-[32px] sm:text-[40px] md:text-[44px] lg:text-[54px] leading-[1.06]">
            YOUR LOCAL <span className="text-[#03B8B8]">IT</span>
            <br />
            SPECIALIST
          </h1>

          <SectionDescription
            description={data.description}
            className="mt-4 mb-6 md:mb-8 text-white/70 max-w-[520px]"
          />

          <KnowMoreBtn text={data.buttonText} />
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-[18px] md:rounded-[22px] overflow-hidden border border-white/10 shadow-2xl bg-black/30">
            <div className="w-full aspect-[16/10] md:aspect-[16/9]">
              <Image
                src={data.image}
                alt="Business Solutions"
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
