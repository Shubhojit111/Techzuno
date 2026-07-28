"use client";

import React from "react";
import HeaderBtn from "../buttons/HeaderBtn";
import Image from "next/image";
import SectionDescription from "../buttons/SectionDescription";
import SectionTitle from "../buttons/SectionTitle";
import KnowMoreBtnSmall from "../buttons/KnowMoreBtnSmall";
import Assets from "@/Assets/Assets";
import SectionTitleBig from "../buttons/SectionTitleBig";


export default function BusinessHero({ headerbtn,title,description,buttonText,image }) {
  return (
    <section className="relative pt-28 md:pt-36 lg:pt-40 ">
      <div className="relative z-10 px-6 sm:px-10 lg:px-62 mx-auto flex flex-col sm:flex-row justify-between gap-8 lg:gap-14 lg:h-[400px]">
        <div className="w-full justify-start flex flex-col sm:w-1/2 lg:min-w-[50%] ">
          <HeaderBtn text={headerbtn} className="w-full sm:text-left" />

          <SectionTitleBig
            className="mt-3 uppercase sm:text-left "
            title={title}
          />

          <SectionDescription
            description={description || "We provide a fully customised service, designed to meet your specific IT requirements, business set up and budget."}
            className="mt-4 mb-6 md:mb-8 text-white/70 w-[450px] sm:text-left"
          />

          <KnowMoreBtnSmall text={buttonText || "Let's Discuss Your Needs"} link={`/contact?inquiry=Services&service=${encodeURIComponent(headerbtn)}#contact-form-section`} />
        </div>

        <div className="h-full w-full sm:w-1/2  lg:min-w-[45%]">
          <div className="relative rounded-[18px] md:rounded-[24px] border border-white/10 shadow-2xl bg-black/30">
            <div className="w-full h-full relative">
              <Image
                src={Assets.ImageBgRectangle}
                alt="Business Solutions"
                className="w-full h-full object-cover  -z-10"
              />

              <Image
                src={image}
                alt="Business Solutions"
                className="w-full h-full object-cover rounded-[18px] md:rounded-[24px] absolute sm:top-3 top-0 sm:-left-3.5 left-0 z-10"
              />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
