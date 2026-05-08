"use client";

import Assets from "@/Assets/Assets";
import SectionDescription from "../buttons/SectionDescription";
import SectionTitle from "../buttons/SectionTitle";
import Image from "next/image";

export default function SliderSection() {
  return (
    <>
      <section className="bg-black h-full w-full mb-10">
        <div className=" flex justify-start items-left w-full h-full px-6 sm:px-10 lg:px-62 mx-auto ">
          <div className="flex flex-col lg:flex-row items-end max-w-[90%] max-h-[300px] gap-14 ">
            {/* Left Image */}
            <div className="w-[45%] rounded-2xl overflow-hidden h-full">
              <Image
                src={Assets.AboutVision}
                alt="Our Vision"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 ">
              <SectionTitle
                title={
                  <>
                    OUR <span className="text-[#38FFF2]">VISION</span>
                  </>
                }
                className="mb-4"
              />

              <SectionDescription
                description={
                  <>
                    Founded with a passion for digital innovation, Techzuno delivers high-quality web and mobile app solutions tailored to modern business needs. From startups to scaling enterprises, we help brands build fast, functional, and beautifully designed digital products.
                    <br /> 
                    We specialize in technologies like Next.js, React, Python, WordPress, and Shopify, crafting every solution with precision and care. With a focus on performance, clean design, and scalability, our work is built to grow with you — not around you.
                    <br /> 
                    At Techzuno, we don’t just write code — we help you turn ideas into impact through smart development and honest collaboration.
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black h-full w-full ">
        <div className=" flex justify-end items-end w-full h-full px-6 sm:px-10 lg:px-62 mx-auto ">
          <div className="flex flex-col lg:flex-row items-end max-w-[90%] max-h-[300px] gap-14 ">
            {/* Left Image */}
            <div className="w-[45%] rounded-2xl overflow-hidden h-full">
              <Image
                src={Assets.AboutMission}
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 ">
              <SectionTitle
                title={
                  <>
                    OUR <span className="text-[#38FFF2]">MISSION</span>
                  </>
                }
                className="mb-4"
              />

              <SectionDescription
                description={
                  <>
                    Founded with a passion for digital innovation, Techzuno delivers high-quality web and mobile app solutions tailored to modern business needs. From startups to scaling enterprises, we help brands build fast, functional, and beautifully designed digital products.
                    <br /> 
                    We specialize in technologies like Next.js, React, Python, WordPress, and Shopify, crafting every solution with precision and care. With a focus on performance, clean design, and scalability, our work is built to grow with you — not around you.
                    <br /> 
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
