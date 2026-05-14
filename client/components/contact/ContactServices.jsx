"use client";

import Assets from "@/Assets/Assets";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import ServiceCard from "../cards/ServiceCard";
import SectionDescription from "../buttons/SectionDescription";

export default function ContactServices() {
  const services = [
    {
      icon: "iconoir:wifi",
      title: "Let's Chat",
      description:
        "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialise In Building Modern",
      linkText: "Email us: info@techzuno.com",
    },
    {
      icon: "hugeicons:message-multiple-01",
      title: "FAQS",
      description:
        "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialise In Building Modern",
      linkText: "Help Center",
    },
    {
      icon: "bytesize:clock",
      title: "Working Hours",
      description:
        "Looking For Professional Website Design Services In Kolkata? At Techzuno, We Specialise In Building Modern",
      linkText: "Find Out More About Us",
    },
  ];

  return (
    <section className="pb-12 relative">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="text-center mx-auto mb-12 md:mb-16">
          <HeaderBtn text="Get In Touch" />
          <SectionTitle
            className="mb-4 md:mb-6 uppercase"
            title={
              <>
                Stay Connected In {" "}
                <span className="text-[#B8FAFF]">
                  Your  <br className="hidden md:block" /> Counrtry
                </span>{" "}
                 Via <br className="hidden md:block lg:hidden" />Email.
              </>
            }
          />
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
              backgroundImage={Assets.Group491}
              linkText={service.linkText}
              titleColor="text-white"
              buttonColor="text-white"
              buttonHoverColor="hover:text-cyan-300"
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-white/80 text-[13px]">
            Want To Accelerate Website And App Development At Your Company?{" "}
            <a
              href="#"
              className="text-white underline hover:text-[#03B8B8] transition-colors underline-offset-2"
            >
              See How We Can Help.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
