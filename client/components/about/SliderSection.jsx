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
          <div className="flex flex-col lg:flex-row items-start lg:items-end w-full md:w-full lg:max-w-[90%] gap-8 lg:gap-14 text-left ">
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
                    Founded with a passion for digital innovation, Techzuno delivers high-quality web and mobile app solutions tailored to modern business needs. From startups to scaling enterprises, we help brands build fast, functional, and beautifully designed digital products.
                    <br className="hidden lg:block" /> 
                    We specialize in technologies like Next.js, React, Python, WordPress, and Shopify, crafting every solution with precision and care. With a focus on performance, clean design, and scalability, our work is built to grow with you — not around you.
                    <br className="hidden lg:block" /> 
                    At Techzuno, we don’t just write code — we help you turn ideas into impact through smart development and honest collaboration.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black h-full w-full mb-6 lg:mb-10">
        <div className="flex justify-end w-full h-full px-6 sm:px-10 lg:px-62 mx-auto">
          <div className="flex flex-col lg:flex-row items-end lg:items-end w-full md:w-full lg:max-w-[90%] gap-8 lg:gap-14 text-right lg:text-left">
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
                    Founded with a passion for digital innovation, Techzuno delivers high-quality web and mobile app solutions tailored to modern business needs. From startups to scaling enterprises, we help brands build fast, functional, and beautifully designed digital products.
                    <br className="hidden lg:block" /> 
                    We specialize in technologies like Next.js, React, Python, WordPress, and Shopify, crafting every solution with precision and care. With a focus on performance, clean design, and scalability, our work is built to grow with you — not around you.
                    <br className="hidden lg:block" /> 
                    At Techzuno, we don’t just write code — we help you turn ideas into impact through smart development and honest collaboration.
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
