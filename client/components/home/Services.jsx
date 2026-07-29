"use client";

import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import ServiceCard from "../cards/ServiceCard";
import SectionTitleSmall from "../buttons/SectionTitleSmall";
import Reveal from "../common/Reveal";

export default function Services() {
  const services = [
  {
    icon: "mynaui:mobile",
    title: "Web Development",
    description:
      "Custom, responsive websites engineered for speed, search visibility, and conversions — built on modern stacks like Next.js, React, and WordPress.",
    url: "/web-development",
  },
  {
    icon: "simple-icons:civicrm",
    title: "App Development",
    description:
      "Native and cross-platform mobile apps that keep users coming back, from first wireframe to App Store launch.",
    url: "/app-development",
  },
  {
    icon: "streamline-plump:web",
    title: "UI/UX Design",
    description:
      "Interfaces people actually enjoy using — researched, wireframed, and tested before a single line of code is written.",
    url: "/ui-ux-design",
  },
  {
    icon: "akar-icons:dashboard",
    title: "Business Solutions",
    description:
      "Digital strategy, CRM integration, workflow automation, and business consulting tailored to streamline operations and accelerate growth.",
    url: "/business-solutions",
  },
  {
    icon: "mdi:cart-outline",
    title: "E-Commerce Solutions",
    description:
      "Complete online stores with secure payments, inventory management, order tracking, and optimized shopping experiences that drive sales.",
    url: "/ecom-integration",
  },
  {
    icon: "material-symbols:trending-up-rounded",
    title: "SEO & Performance",
    description:
      "Improve search rankings, website speed, Core Web Vitals, and overall performance to attract more visitors and convert them into customers.",
    url: "/seo",
  },
];

  return (
    <section className="sm:my-16 relative">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <Reveal y={30} duration={0.8} start="top 90%" className="text-left md:text-center mx-auto mb-12 md:mb-16">
          <HeaderBtn text="OUR SERVICES" />
          <SectionTitleSmall className="mb-4 md:mb-6" title={<>
            PROVIDES FULL-CYCLE{" "}
            <span className="text-[#B8FAFF]">
              CUSTOM <br className="hidden sm:block"/> WEBSITE
            </span> DESIGN SERVICES IN <br className="hidden md:block text-[24px]! sm:text-[34px]! md:text-[34px]! lg:text-[46px]!" />
            KOLKATA.
          </>} />
          <SectionDescription className="md:mx-auto sm:text-center!" description="Looking for professional website design services in Kolkata? At Techzuno, we specialise in building modern, responsive and SEO-friendly websites that help your business grow online. Being a reputable website design company in Kolkata, we are aware that every company is different. For this reason, whether it's an e-commerce store, personal portfolio, or corporate website, our talented designers develop custom solutions. To make sure your website works well and ranks higher on Google, we concentrate on search engine optimization, mobile compatibility, clean layouts, and quick loading times." />
        </Reveal>

        <Reveal
          stagger={0.12}
          y={40}
          duration={0.9}
          start="top 92%"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
              linkText="Explore Our Services"
              url={service.url}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
