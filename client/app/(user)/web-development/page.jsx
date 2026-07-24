import React from "react";
import BusinessHero from "@/components/business-solutions/BusinessHero";
import ServicesGrid from "@/components/business-solutions/ServicesGrid";
import WhatYouGet from "@/components/business-solutions/WhatYouGet";
import WhyChoose from "@/components/business-solutions/WhyChoose";
import ClientSuccess from "@/components/business-solutions/ClientSuccess";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";
import TechStack from "@/components/home/TechStack";

export const metadata = {
  title: "Web Application Development Company | Techzuno",
  description: "Techzuno builds fast, scalable web applications and websites for growing businesses — from custom ERP and CRM systems to full e-commerce platforms.",
  url: "https://techzuno.com/web-development",
};

export default function WebDevelopmentPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen text-white overflow-">
      <BusinessHero
        headerbtn={"Web Development"}
        title={
          <>
            Top{" "}
            <span className="highlightedTextColor">
              Web
              <br />
              Application
            </span>{" "}
            Development
          </>
        }
        image={Assets.WebDev1}
      />
      <TechStack />
      <ServicesGrid />
      <WhatYouGet />
      <WhyChoose cardImage1={Assets.WebDev2} cardImage2={Assets.WebDev3} cardImage3={Assets.WebDev4}/>
      <FAQ />
      <ClientSuccess />
      <CTA />

      {/*
      <h1 className="mx-auto text-center text-7xl mt-32">Web Development Page</h1>
       */}
    </main>
  );
}
