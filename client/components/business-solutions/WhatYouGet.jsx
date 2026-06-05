"use client";

import React from "react";
import SectionTitle from "../buttons/SectionTitle";
import { Icon } from "@iconify/react";
import SectionDescription from "../buttons/SectionDescription";

export default function WhatYouGet({ data }) {
  return (
    <section className="py-10">
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
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-start group">
              <div className=" flex items-start gap-4 max-w-[85%]">
                <Icon icon={item.icon} className="w-10 h-10 md:h-8 md:w-8 text-[#03B8B8]" />

                <div className="flex flex-col gap-2 w-full sm:max-w-[80%]">
                  <h3 className="text-white font-semibold tracking-wide text-[18px] md:text-[22px] lg:text-[20px] group-hover:text-[#03B8B8] transition-colors">
                    {item.title}
                  </h3>
                  <SectionDescription
                    description={item.description} className="text-white "
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
