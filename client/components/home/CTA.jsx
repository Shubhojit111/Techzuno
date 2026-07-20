"use client";

import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import GlowBtn from "../buttons/GlowBtn";
import InquiryModal from "../common/InquiryModal";
import { useState } from "react";

export default function CTA() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <>
      <section className="h-[450px] md:h-[550px] lg:h-[650px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src={Assets.CTABG}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 sm:px-10 lg:px-62 mx-auto flex flex-col md:flex-row items-end h-full justify-center gap-6 md:gap-12 relative z-10 w-full">
          <div className="h-full border-0 w-full p-4 sm:p-6 lg:p-10 absolute top-0 left-0 flex justify-center items-start lg:items-start">
            <Image
              src={Assets.CTAImage}
              alt="Comma"
              className="object-contain w-full h-[60%] sm:h-[70%] lg:h-[80%]"
            />
          </div>

          <div className="textarea flex flex-col items-center text-center mt-50 mb-10 sm:mb-16 lg:mb-20 z-40 w-full">
            <HeaderBtn text="Let's make great things" />
            <SectionTitle
              title={
                <>
                  Have a project? Speak
                  <br className="hidden md:block" />
                  With our <span className="text-[#03B8B8]">experts</span>
                </>
              }
              className="uppercase text-center mt-0 md:mt-4 lg:mt-0"
            />
            <p className="text-[14px] sm:text-[18px] lg:text-[26px] mt-4 lg:mt-6 leading-tight text-center">
              Leave Your Contact Details To Get A Free
              <br />
              Consultation With A Techzuno Expert.
            </p>
            <GlowBtn
              text="Get Started"
              className="mt-6 lg:mt-10"
              href={null}
              onClick={() => setIsInquiryOpen(true)}
            />
          </div>
        </div>
      </section>
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  );
}
