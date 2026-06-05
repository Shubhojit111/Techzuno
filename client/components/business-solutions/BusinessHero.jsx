"use client";

import React from "react";
import HeaderBtn from "../buttons/HeaderBtn";
// import HeaderBtn from "@/components/buttons/";
import Image from "next/image";
import SectionDescription from "../buttons/SectionDescription";
import SectionTitle from "../buttons/SectionTitle";
import KnowMoreBtnSmall from "../buttons/KnowMoreBtnSmall";

export default function BusinessHero({ headerbtn,title,description,buttonText,image }) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 lg:pt-40 ">
      <div className="relative z-10 px-6 sm:px-10 lg:px-62 mx-auto flex flex-col sm:flex-row justify-between gap-8 lg:gap-2 items-center">
        <div className="w-full sm:w-1/2 lg:w-[50%]">
          <HeaderBtn text={headerbtn} className="w-1/2 sm:w-full" />

          <SectionTitle
            className="mt-3 uppercase"
            title={title}
          />

          <SectionDescription
            description={description || "We provide a fully customised service, designed to meet your specific IT requirements, business set up and budget."}
            className="mt-4 mb-6 md:mb-8 text-white/70 w-[450px] "
          />

          <KnowMoreBtnSmall text={buttonText || "Let's Discuss Your Needs"} />
        </div>

        <div className="w-full sm:w-1/2 lg:w-[50%]">
          <div className="relative rounded-[18px] md:rounded-[22px] overflow-hidden border border-white/10 shadow-2xl bg-black/30">
            <div className="w-full h-full">
              <Image
                src={image || Assets.BusinessSolutions1}
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
