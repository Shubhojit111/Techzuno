"use client";

import React from "react";
import SectionTitle from "../buttons/SectionTitle";
import { Icon } from "@iconify/react";
import SectionDescription from "../buttons/SectionDescription";

export default function WhatYouGet() {
  const whatYouGetData = [
    {
      title: "Project Documentation",
      description:
        "We provide comprehensive documentation for every project, ensuring that you have all the information you need to manage and maintain your software.",
      icon: "mdi:file-document-outline",
    },
    {
      title: "Integration Tests Satisfaction",
      description:
        "Our rigorous testing process ensures that your software is robust, reliable, and meets your exact requirements, giving you peace of mind.",
      icon: "mdi:cog-outline",
    },
    {
      title: "Added Business Value",
      description:
        "We focus on delivering solutions that add real value to your business, helping you streamline operations and increase efficiency.",
      icon: "mdi:briefcase-outline",
    },
    {
      title: "Post-Launch Support",
      description:
        "We provide ongoing support and maintenance after your project is launched, ensuring that your software continues to perform at its best.",
      icon: "mdi:heart-outline",
    },
    {
      title: "Transparent & Detailed delivery",
      description:
        "We believe in transparency and keep you informed at every stage of the project, providing detailed reports on progress and milestones.",
      icon: "mdi:package-variant-closed",
    },
    {
      title: "Intellectual Property Protection",
      description:
        "We take intellectual property protection seriously and ensure that your software and data are secure and protected at all times.",
      icon: "mdi:shield-lock-outline",
    },
  ];
  return (
    <section className="pb-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <SectionTitle
          title={
            <>
              WHAT <br className="hidden lg:block" />
              <span className="highlightedTextColor">YOU GET</span>
            </>
          }
          className="mb-14 md:mb-10 uppercase"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12  md:gap-y-4 ">
          {whatYouGetData.map((item, index) => (
            <div key={index} className="flex flex-col items-start group">
              <div className=" flex items-start gap-4 max-w-[85%]">
                <Icon
                  icon={item.icon}
                  className="w-10 h-10 md:h-8 md:w-8 text-[#03B8B8]"
                />

                <div className="flex flex-col gap-2 w-full sm:max-w-[80%]">
                  <h3 className="text-white font-semibold tracking-wide text-[18px] md:text-[22px] lg:text-[20px] group-hover:text-[#03B8B8] transition-colors">
                    {item.title}
                  </h3>
                  <SectionDescription
                    description={item.description}
                    className="text-white "
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
