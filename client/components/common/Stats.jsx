import React from "react";
import CountUpNumber from "@/components/buttons/CountUpNumber";

const Stats = () => {
  return (
    <section className="bg-black pt-16">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="w-full rounded-[14px] border border-white/10 overflow-hidden">
          <div className="bg-linear-to-r from-[#2b2b2b] via-[#0f1010] to-[#0b3a3a] px-6 md:px-10 py-7">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-y-8">
              <div className="text-center ">
                <p className="highlightedTextColor text-[11px] tracking-[0.15em] uppercase mb-2">
                  Projects Delivered
                </p>
                
                <h3 className="text-white font-toxigenesis font-bold text-[34px] md:text-[42px] leading-none">
                  <CountUpNumber end={147} suffix="+" />
                </h3>
                <p className="text-white/70 text-[11px] mt-2">Case Studies</p>
              </div>

              <div className="text-center ">
                <p className="highlightedTextColor text-[11px] tracking-[0.15em] uppercase mb-2">
                  Hours Of Working Time
                </p>
                <h3 className="text-white font-toxigenesis font-bold text-[34px] md:text-[42px] leading-none">
                  <CountUpNumber end={12} />
                </h3>
                <p className="text-white/70 text-[11px] mt-2">Working Time</p>
              </div>

              <div className="text-center ">
                <p className="highlightedTextColor text-[11px] tracking-[0.15em] uppercase mb-2">
                  Top 500 Technology
                </p>
                <h3 className="text-white font-toxigenesis font-bold text-[34px] md:text-[42px] leading-none">
                  <CountUpNumber end={68} />
                </h3>
                <p className="text-white/70 text-[11px] mt-2">In The World</p>
              </div>

              <div className="text-center ">
                <p className="highlightedTextColor text-[11px] tracking-[0.15em] uppercase mb-2">
                  Happy Customers
                </p>
                <h3 className="text-white font-toxigenesis font-bold text-[34px] md:text-[42px] leading-none">
                  <CountUpNumber end={99} suffix="%" />
                </h3>
                <p className="text-white/70 text-[11px] mt-2">Clients Success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
