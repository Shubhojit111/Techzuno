"use client";

import React, { useEffect } from "react";
import SectionTitle from "../buttons/SectionTitle";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { MegaphoneIcon } from "lucide-react";
import Assets from "@/Assets/Assets";
import CardSliderComponent from "./CardSliderComponent";

export default function WhyChoose() {
  const whyChooseData = [
    {
      index: "01",
      title: "Experienced Team",
      description:
        "With years of hands-on experience across web, mobile, and cloud technologies, we bring deep technical expertise and strategic thinking to every project.",
      icon: "hugeicons:work",
      image: Assets.BusinessSolutions2,
    },
    {
      index: "02",
      title: "Client-First Approach",
      description:
        "We prioritize your business goals, ensuring our solutions are not just technologically advanced but also perfectly aligned with your objectives.",
      icon: "streamline-flex:customer-support-7",
      image: Assets.BusinessSolutions3,
    },
    {
      index: "03",
      title: "Reliable Support",
      description:
        "Our commitment extends beyond delivery with robust post-launch support and maintenance, ensuring your systems run smoothly 24/7.",
      icon: "icon-park-outline:message",
      image: Assets.BusinessSolutions4,
    },
  ];

  return (
    <section className="pb-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <div className="flex justify-end">
          <SectionTitle
            title={
              <>
                WHY CHOOSE <br className="hidden lg:block" />
                <span className="text-[#03B8B8]">TECHZUNO</span>
              </>
            }
            className="text-right uppercase"
          />
        </div>

        <div className=" h-full w-full flex flex-col gap-12 pt-8">
          {whyChooseData.map((item, idx) => (
            <CardSliderComponent key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
