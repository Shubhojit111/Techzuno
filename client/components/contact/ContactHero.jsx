import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import Link from "next/link";

export default function ContactHero() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center pt-24 sm:pt-52 lg:pt-42 pb-10 md:pb-16 lg:pb-20 overflow-hidden">
      {/* Background full width image */}
      <div className="absolute top-0 left-0 w-full h-full z-0 ">
        <Image
          src={Assets.ContactBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full">
        {/* Flex row: Left text, Right image */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-10">
          <div className="w-full lg:w-1/2 flex flex-col items-center sm:items-start md:max-w-[70%] lg:max-w-none md:mr-auto lg:mr-0">
            <HeaderBtn text="GET IN TOUCH" className="sm:text-left" />
            <SectionTitle
              title={
                <>
                  LET&apos;S MAKE <span className="text-[#38FFF2]">OUR</span>
                  <br />
                  <span className="text-[#38FFF2]">DREAMS</span> REALIZED
                </>
              }
              className="mt-0 sm:text-left!"
            />
            <SectionDescription
              className="mt-4 md:mt-2 lg:mt-2 lg:max-w-[90%] sm:text-left"
              description={
                <>
                  Founded with a passion for digital innovation, Techzuno delivers high-quality web and mobile app solutions tailored to modern business needs. From startups to scaling enterprises, we help brands build fast.
                </>
              }
            />
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-2 lg:mt-0">
            <div className="relative w-[280px] h-[280px] md:w-[500px] md:h-[500px] lg:w-[450px] lg:h-[450px]">
              <Image
                src={Assets.ContactRight}
                alt="Globe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text beneath flex element */}
        <div className="w-full mt-10 md:mt-16 text-center ">
          <p className="text-white/80 text-[12px] md:text-[13px]">
            Want to accelerate software development at your company?{" "}
            <Link
              href="/contact"
              className="text-white underline underline-offset-2 hover:text-[#03B8B8] transition-colors"
            >
              See How We Can Help.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
