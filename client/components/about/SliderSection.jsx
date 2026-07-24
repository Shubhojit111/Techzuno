"use client";

import Assets from "@/Assets/Assets";
import SectionDescription from "../buttons/SectionDescription";
import SectionTitle from "../buttons/SectionTitle";
import Image from "next/image";

export default function SliderSection() {
  return (
    <>
      <section className="bg-black h-full w-full mb-10 lg:mb-10">
        <div className="flex justify-start w-full h-full px-6 sm:px-10 lg:px-62 mx-auto">
          <div className="flex flex-col lg:flex-row items-start w-full md:w-full lg:max-w-[90%] gap-8 lg:gap-14 text-left ">
            {/* Left Image */}
            <div className="w-full md:w-[70%] lg:w-[45%] h-[250px] lg:h-full rounded-2xl overflow-hidden shrink-0">
              <Image
                src={Assets.AboutVision}
                alt="Our Vision"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 lg:w-[55%] ">
              <SectionTitle
                title={
                  <>
                    OUR <span className="text-[#38FFF2]">VISION</span>
                  </>
                }
                className="mb-4"
              />

              <SectionDescription
                className="max-w-full leading-tight"
                description={
                  <>
                    To be the outsourcing partner businesses actually trust —the
                    team you call when the deadline is real and the product has
                    to work. We want every brand we build for, from a first-time
                    founder to a scaling enterprise, to see their idea handled
                    with the same care we'd give our own.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black h-full w-full mb-6 lg:mb-10">
        <div className="flex justify-end w-full h-full px-6 sm:px-10 lg:px-62 mx-auto">
          <div className="flex flex-col lg:flex-row items-end lg:items-start w-full md:w-full lg:max-w-[90%] gap-8 lg:gap-14 text-right lg:text-left">
            {/* Left Image */}
            <div className="w-full md:w-[70%] lg:w-[45%] h-[250px] lg:h-full rounded-2xl overflow-hidden shrink-0">
              <Image
                src={Assets.AboutMission}
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col items-end lg:items-start">
              <SectionTitle
                title={
                  <>
                    OUR <span className="text-[#38FFF2]">MISSION</span>
                  </>
                }
                className="mb-4 text-right lg:text-left"
              />

              <SectionDescription
                className="text-right lg:text-left max-w-full leading-tight"
                description={
                  <>
                    To deliver web and mobile products that are fast, functional, and built to grow — using the right technology for the job, not the trendiest one, and staying honest about timelines, costs, and trade-offs at every stage of the project.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
