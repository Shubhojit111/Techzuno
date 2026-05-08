"use client";
import { Icon } from "@iconify/react";
import CountUpNumber from "../buttons/CountUpNumber";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";

const stats = [
  {
    value: 730,
    label:
      "Successfully Built And Deployed\nWeb And App Solutions Across\nIndustries.",
  },
  {
    value: 120,
    label:
      "Happy Clients, Long-Term\nPartnerships With Startups,\nSMEs, And Global Teams.",
  },
  {
    value: 4,
    label: "Years Of Experience In Design,\nDevelopment, And Digital\nGrowth.",
  },
];

export default function CompanySection() {
  return (
    <section className="relative bg-black pb-16 md:pb-24 overflow-hidden">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="text-center mx-auto flex flex-col items-center justify-center">
          <HeaderBtn text="WELCOME TO OUR COMPANY" />
          <SectionTitle className="mb-4 md:mb-6" title={<>
            BUILD PROFESSIONAL <span className="text-[#38FFF2]">WEB</span>
            <br />
            <span className="text-[#38FFF2]">AND APPS</span> WITH PASSION
          </>} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 text-center mx-auto mt-8 max-w-[800px]">
          {stats.map((stat, i) => {
            

            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-5xl md:text-[40px] font-toxigenesis text-white tracking-tight drop-shadow-md">
                  <CountUpNumber end={stat.value} suffix={"+"} />
                </div>
                <p className="text-white text-[14px] md:text-[12px] tracking-wide font-sans whitespace-pre-line max-w-50">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
