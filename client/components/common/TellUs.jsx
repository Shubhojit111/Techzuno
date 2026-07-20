"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import SectionDescription from "../buttons/SectionDescription";
import GlowBtn from "../buttons/GlowBtn";

export default function TellUs() {
  const [inquiry, setInquiry] = useState("General Information Request");
  const [agree, setAgree] = useState(false);

  return (
    <section className="bg-black pt-12">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full lg:w-1/2 md:max-w-[80%] ">
            <h2 className="text-white font-semibold tracking-normal leading-tight text-[24px] sm:text-[32px] lg:text-[26px]">
              Tell Us About Your Ideas, And We&apos;ll Offer The Most Fitting
              Solution.
            </h2>

            <div className="mt-5 sm:mt-9 lg:mt-7 flex flex-col gap-4 sm:gap-6 lg:gap-4">
              <div className="flex gap-3 ">
                <div className="shrink-0 mt-1">
                  <Icon
                    icon="material-symbols-light:dashboard-outline-rounded"
                    className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6 highlightedTextColor"
                  />
                </div>
                <div className="min-w-0 ">
                  <p className="text-white font-semibold text-[19px] sm:text-[20px] lg:text-[17px]">
                    Project Documentation
                  </p>
                  <SectionDescription
                    description={
                      "We Deliver Complete Technical And User Documentation—Ensuring Your Team Can Maintain, Scale, Or Hand Off The Product Confidently."
                    }
                    className="mt-2 mb-0!  text-white/55 md:text-[14px] lg:text-[13px] leading-[1.35]"
                  />
                </div>
              </div>        

              <div className="flex gap-3">
                <div className="shrink-0 mt-1">
                  <Icon
                    icon="streamline-ultimate:human-resources-search-men"
                    className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6 highlightedTextColor"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-[19px] sm:text-[20px] lg:text-[17px]">
                    Integration-Ready Architecture
                  </p>
                  <SectionDescription
                    description={
                      "We Deliver Complete Technical And User Documentation—Ensuring Your Team Can Maintain, Scale, Or Hand Off The Product Confidently."
                    }
                    className="mt-2 mb-0!  text-white/55 md:text-[14px] lg:text-[13px] leading-[1.35]"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="shrink-0 mt-1">
                  <Icon
                    icon="arcticons:pixel-experience"
                    className="h-6 w-6 sm:h-6 sm:w-6 lg:h-6 lg:w-6 highlightedTextColor"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-[19px] sm:text-[20px] lg:text-[17px]">
                    Added Business Value
                  </p>
                  <SectionDescription
                    description={
                      "We Deliver Complete Technical And User Documentation—Ensuring Your Team Can Maintain, Scale, Or Hand Off The Product Confidently."
                    }
                    className="mt-2 mb-0!  text-white/55 md:text-[14px] lg:text-[13px] leading-[1.35]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 sm:mt-9 lg:mt-11">
              <p className="text-white leading-tight w-full sm:max-w-[90%] font-semibold text-[22px] sm:text-[20px] lg:text-[17px]">
                Discover How Techzuno Can Help Your Business Reach New Heights.
              </p>
              <SectionDescription
                description={
                  "We Deliver Complete Technical And User Documentation—Ensuring Your Team Can Maintain, Scale, Or Hand Off The Product Confidently."
                }
                className="mt-2 mb-0! text-white/55 md:text-[14px] lg:text-[13px] leading-[1.35]"
              />
            </div>
          </div>

          <div className="w-full lg:min-w-1/2 lg:w-1/2">
            <form className="w-full">
              <div className="flex flex-col gap-7">
                <div>
                  <label className="block text-white text-[18px] sm:text-[20px] lg:text-[16px] mb-2">
                    What Is Your Inquiry About? *
                  </label>
                  <div className="relative">
                    <select
                      value={inquiry}
                      onChange={(e) => setInquiry(e.target.value)}
                      className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/30 text-white/60 sm:text-[15px] lg:text-[13px] px-5 py-2.5 sm:px-6 sm:py-3 lg:px-5 lg:py-2.5 outline-none focus:border-[#03B8B8]/60"
                    >
                      <option>General Information Request</option>
                      <option>Project Discussion</option>
                      <option>Support</option>
                      <option>Partnership</option>
                    </select>
                    <Icon
                      icon="mdi:chevron-down"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 text-[18px] pointer-events-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
                  <div>
                    <label className="block text-white text-[18px] sm:text-[18px] lg:text-[16px] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="John De"
                      className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/30 text-white/60 sm:text-[15px] lg:text-[13px] px-5 py-2.5 outline-none focus:border-[#03B8B8]/60"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-[18px] sm:text-[18px] lg:text-[16px] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="example@example.com"
                      className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/30 text-white/60 sm:text-[15px] lg:text-[13px] px-5 py-2.5 outline-none focus:border-[#03B8B8]/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div>
                    <label className="block text-white text-[18px] sm:text-[18px] lg:text-[16px] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="12345678901"
                      className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/30 text-white/60 sm:text-[15px] lg:text-[13px] px-5 py-2.5 outline-none focus:border-[#03B8B8]/60"
                    />
                  </div>
                  <div>
                   <label className="block text-white text-[18px] sm:text-[18px] lg:text-[16px] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Techzuno"
                      className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/30 text-white/60 sm:text-[15px] lg:text-[13px] px-5 py-2.5 outline-none focus:border-[#03B8B8]/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-[18px] sm:text-[18px] lg:text-[16px] mb-2">
                    Message
                  </label>
                  <input
                    type="text"
                    placeholder="General Information Request"
                    className="w-full appearance-none rounded-full bg-[#1b2525] border border-white/30 text-white/60 sm:text-[15px] lg:text-[13px] px-5 py-2.5 outline-none focus:border-[#03B8B8]/60"
                  />
                </div>

                <label className=" mt-3 flex items-center gap-3 text-white sm:text-[18px] lg:text-[16px] tracking-wide select-none">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="h-4 w-4 shrink-0 accent-[#03B8B8]"
                  />
                  I Agree To Receive Communications From Techzuno
                </label>

                <GlowBtn text="Send a message" className="w-full text-center sm:text-[22px] lg:text-[18px] sm:py-2 lg:py-1.5" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
