"use client";

import React from "react";
import { Icon } from "@iconify/react";
import SectionDescription from "../buttons/SectionDescription";
import SectionTitle from "../buttons/SectionTitle";

export default function WhatYouGet() {
  const whatYouGetData = [
    {
      title: "Project Documentation",
      description:
        "Comprehensive documentation for every project, so your team always has what it needs to manage and maintain your software.",
      icon: "teenyicons:pdf-outline",
    },
    {
      title: "Integration Tests & Satisfaction",
      description:
        "Our rigorous testing process ensures your software is robust, reliable, and meets your exact requirements — before it ever reaches your users.",
      icon: "boxicons:plug-connect",
    },
    {
      title: "Added Business Value",
      description:
        "We focus on solutions that add real value to your business — streamlining operations and increasing efficiency, not just adding features.",
      icon: "solar:graph-broken",
    },
    {
      title: "Post-Launch Support",
      description:
        "Ongoing support and maintenance after launch, so your project keeps performing at its best.",
      icon: "gg:check-r",
    },
    {
      title: "Transparent & Detailed delivery",
      description:
        "Regular, detailed updates on progress and milestones — you always know exactly where your project stands.",
      icon: "humbleicons:sun",
    },
    {
      title: "Intellectual Property Protection",
      description:
        "We take intellectual property protection seriously and keep your software and data secure at every stage.",
      icon: "material-symbols:lock-outline",
    },
  ];
  return (
    <section className="pb-14 sm:mb-10">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <SectionTitle
          title={
            <>
              WHAT <br className="hidden lg:block" />
              <span className="highlightedTextColor">YOU GET</span>
            </>
          }
          className="mb-12 md:mb-10 uppercase"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 md:gap-y-4 ">
          {whatYouGetData.map((item, index) => (
            <div key={index} className="flex flex-col items-start group">
              <div className=" flex items-start gap-4 w-full max-w-[95%] sm:max-w-[85%]">
                <Icon
                  icon={item.icon}
                  className="w-8 h-8 md:h-8 md:w-8 text-[#03B8B8]"
                />

                <div className="flex flex-col gap-2 w-full sm:max-w-[80%]">
                  <h3 className="text-white font-semibold tracking-wide text-[18px] md:text-[22px] lg:text-[20px] group-hover:text-[#03B8B8] transition-colors leading-[1.2]">
                    {item.title}
                  </h3>
                  <SectionDescription
                    description={item.description}
                    className="text-white text-left"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
