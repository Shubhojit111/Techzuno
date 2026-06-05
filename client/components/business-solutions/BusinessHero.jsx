"use client";

import React from "react";
import HeaderBtn from "../buttons/HeaderBtn";
// import HeaderBtn from "@/components/buttons/";
import Image from "next/image";
import SectionDescription from "../buttons/SectionDescription";
import KnowMoreBtn from "../buttons/KnowMoreBtn";
import Assets from "@/Assets/Assets";
import SectionTitle from "../buttons/SectionTitle";
import KnowMoreBtnSmall from "../buttons/KnowMoreBtnSmall";

export default function BusinessHero({ data }) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 lg:pt-40 ">
      <div className="relative z-10 px-6 sm:px-10 lg:px-62 mx-auto flex flex-col sm:flex-row justify-between gap-8 lg:gap-2 items-center">
        <div className="w-full sm:w-1/2 lg:w-[40%]">
          <HeaderBtn text={data.header} className="w-1/2 sm:w-full"/>

          <SectionTitle
            className="mt-3"
            title={
              <>
                YOUR <span className="highlightedTextColor">LOCAL
                <br />
                IT</span> SPECIALIST
              </>
            }
          />

          <SectionDescription
            description={data.description}
            className="mt-4 mb-6 md:mb-8 text-white/70 max-w-[520px]"
          />

          <KnowMoreBtnSmall text={data.buttonText} />
        </div>

        <div className="w-full sm:w-1/2 lg:w-[55%]">
          <div className="relative rounded-[18px] md:rounded-[22px] overflow-hidden border border-white/10 shadow-2xl bg-black/30">
            <div className="w-full h-full">
              <Image
                src={data.image}
                alt="Business Solutions"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
