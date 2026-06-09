"use client";
import { Icon } from "@iconify/react";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionArrowBtn from "../buttons/SectionArrowBtn";
import Assets from "@/Assets/Assets";
import Image from "next/image";
import KnowMoreBtn from "../buttons/KnowMoreBtn";

const values = [
  {
    icon: "mage:dashboard-4",
    title: "Flexibility",
    description:
      "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.",
  },
  {
    icon: "mynaui:sun",
    title: "Cultural Awareness",
    description:
      "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.",
  },
  {
    icon: "ion:open-outline",
    title: "Open Collaboration",
    description:
      "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.",
  },
  {
    icon: "mdi:tick-circle-outline",
    title: "Reliability",
    description:
      "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.",
  },
  {
    icon: "mingcute:head-ai-line",
    title: "Honesty & Integrity",
    description:
      "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.",
  },
  {
    icon: "iconamoon:profile",
    title: "Client Success",
    description:
      "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialize In Building Modern Digital Experiences.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-black pb-16 md:pb-20">
      <div className="h-full w-full mx-auto px-6 sm:px-10 lg:px-62">
        {/* Header */}
        <div className="text-left md:text-center mb-10 md:mb-14 flex flex-col items-start md:items-center">
          <HeaderBtn text="Welcome to our company" />
          <SectionTitle
            className="text-[28px] md:text-[32px] lg:text-[38px] font-black mt-3 leading-tight text-left md:text-center w-full"
            title={
              <>
                CULTURE &amp; VALUES BASED
                <br className="hidden md:block" />{" "}
                ON <span className="text-[#B8FAFF]">SIX FUNDAMENTAL</span>{" "}
                PRINCIPLES.
              </>
            }
          />
          <div className="hidden md:block w-full ">
            <KnowMoreBtn className="mt-4 md:mt-6" text="Always Ready To Craft Your Next Big Idea" />
          </div>
          <div className=" md:hidden w-full justify-end flex" >
            <KnowMoreBtn className="mt-4" text="Ready To Craft?" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-7">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="group h-auto lg:h-[300px] w-full flex flex-col items-center md:items-center justify-center relative rounded-[10px] transition-all duration-300 overflow-hidden text-left md:text-center"
            >
              <div className="w-full h-full absolute top-0 left-0">
                <Image
                  src={Assets.Group491}
                  alt="Group 491"
                  className=" w-full object-cover"
                />
              </div>
              <div className="h-full w-full flex flex-col items-center justify-center text-center px-6 sm:px-8 py-10 md:py-8 lg:py-10 ">
                <div className="pop-icon p-3 bg-white rounded-full flex items-center justify-center text-4xl mb-4 md:mb-3 lg:mb-4 relative">
                  <Icon
                    icon={value.icon}
                    className="text-[#03B8B8] w-8 h-8 sm:w-8 sm:h-8 lg:w-12 lg:h-12  "
                  />
                </div>
                <h3 className="text-[22px] sm:text-[16px] lg:text-[18px] tracking-wider font-bold text-[#38FFF2] mb-3 md:mb-2 lg:mb-3 relative z-10">
                  {value.title}
                </h3>
                <p className="text-[#E5E5E5] leading-tight text-[14px] sm:text-[12px] lg:text-[13px] relative z-10 md:max-w-[280px]">
                  {value.description}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
