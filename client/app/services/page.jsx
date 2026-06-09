import Assets from "@/Assets/Assets";
import MilestonesSection from "@/components/about/MilestonesSection";
import ValuesSection from "@/components/about/ValuesSection";
import BusinessHero from "@/components/business-solutions/BusinessHero";
import CommonHero from "@/components/common/CommonHero";
import TellUs from "@/components/common/TellUs";
import ContactFormSection from "@/components/contact/ContactFormSection";
import Services from "@/components/home/Services";
import TechStack from "@/components/home/TechStack";
import FAQ from "@/components/pricing/FAQ";
import React from "react";

export default function ServicesPage() {
  return (
    <div>
      <CommonHero
        headerbtn="Redifining Outsourcing"
        title={
          <>
            Where <span className="highlightedTextColor">Excellence</span> and
            trust unite.
          </>
        }
        description="We provide a fully customised service, designed to meet your specific IT requirements, business set up and budget."
        image={Assets.ServiceHeader}
        buttonText={"Let's Discuss Your Needs"}
      />

      <TechStack />
      <Services />
      <TellUs />
      <ValuesSection />
      <FAQ />

      {/* <h1 className="mx-auto text-center text-7xl mt-32">Services Page</h1> */}
    </div>
  );
}
