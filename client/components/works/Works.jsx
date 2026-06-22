import React from "react";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import SectionDescription from "@/components/buttons/SectionDescription";
import SectionTitle from "../buttons/SectionTitle";

const Works = () => {
  return (
    <section className="bg-black pt-24">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <HeaderBtn text="OUR WORKS" className="" />

        <SectionTitle
          title={
            <>
              DISCOVER SOME FEATURED PROJECTS WE&apos;RE REALLY PROUD OF <br /> SOFTWARE
              TOOLS FOR <span className="highlightedTextColor">DEVELOPING <br /> </span>{" "}
              <span className="highlightedTextColor">YOUR FUTURE</span>-RICH PROJECTS
            </>
          }
          className="mb-3"
        />

        <SectionDescription
          description="We Provide A Fully Customised Service, Designed To Meet Your Specific IT Requirements, Business Set Up And Budget."
          className=" lg:w-[50%]"
        />
      </div>
    </section>
  );
};

export default Works;
