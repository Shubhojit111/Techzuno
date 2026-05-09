"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import { Icon } from "@iconify/react";

export default function Services() {
  const services = [
    {
      icon: "mynaui:mobile",
      title: "Web Development",
      description: "Looking for professional website design services in Kolkata? At Techzuno, we specialise in building modern",
    },
    {
      icon: "simple-icons:civicrm",
      title: "App Development",
      description: "Looking for professional website design services in Kolkata? At Techzuno, we specialise in building modern",
    },
    {
      icon: "streamline-plump:web",
      title: "UI/UX Design",
      description: "Looking for professional website design services in Kolkata? At Techzuno, we specialise in building modern",
    },
  ];

  return (
    <section className="pb-12 relative">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="text-left md:text-center mx-auto mb-12 md:mb-16">
          <HeaderBtn text="OUR SERVICES" />
          <SectionTitle className="mb-4 md:mb-6" title={<>
            PROVIDES FULL-CYCLE{" "}
            <span className="text-[#B8FAFF]">
              CUSTOM <br /> WEBSITE
            </span> DESIGN SERVICES IN <br className="hidden md:block" />
            KOLKATA.
          </>} />
          <SectionDescription className="md:mx-auto" description="Looking for professional website design services in Kolkata? At Techzuno, we specialise in building modern, responsive and SEO-friendly websites that help your business grow online. Being a reputable website design company in Kolkata, we are aware that every company is different. For this reason, whether it’s an e-commerce store, personal portfolio, or corporate website, our talented designers develop custom solutions. To make sure your website works well and ranks higher on Google, we concentrate on search engine optimization, mobile compatibility, clean layouts, and quick loading times." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group h-auto lg:h-[400px] w-full flex flex-col items-center md:items-center justify-center relative rounded-[10px] transition-all duration-300 overflow-hidden text-left md:text-center"
            >
              <div className="w-full h-full absolute top-0 left-0">
                <Image
                  src={Assets.Group491}
                  alt="Group 491"
                  className=" w-full object-cover"
                />
              </div>
              <div className="h-full w-full flex flex-col items-center justify-center text-center px-6 sm:px-8 py-10 md:py-8 lg:py-10 ">
                <div className="pop-icon w-14 h-14 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center text-4xl mb-4 md:mb-3 lg:mb-4 relative">
                  <Icon
                    icon={service.icon}
                    className="text-[#03B8B8] w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10  "
                  />
                </div>

                <h3 className="text-[22px] sm:text-[16px] lg:text-[24px] font-bold text-[#38FFF2] mb-3 md:mb-2 lg:mb-3 relative z-10">
                  {service.title}
                </h3>
                <p className="text-[#E5E5E5] leading-tight text-[14px] sm:text-[12px] lg:text-[14px] relative z-10 md:max-w-[280px]">
                  {service.description}
                </p>

                <button className="text-[#38FFF2] font-medium mt-10 md:mt-6 lg:mt-10 text-[14px] sm:text-[12px] lg:text-[14px] tracking-wider group-hover:text-cyan-300 relative cursor-pointer z-10 flex items-center justify-center w-full gap-2">
                  Explore Our Services <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
