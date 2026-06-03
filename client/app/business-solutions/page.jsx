"use client";

import React from "react";
import BusinessHero from "@/components/business-solutions/BusinessHero";
import TechMarquee from "@/components/business-solutions/TechMarquee";
import ServicesGrid from "@/components/business-solutions/ServicesGrid";
import WhatYouGet from "@/components/business-solutions/WhatYouGet";
import WhyChoose from "@/components/business-solutions/WhyChoose";
import ClientSuccess from "@/components/business-solutions/ClientSuccess";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";

const heroData = {
  header: "IT BUSINESS SOLUTIONS",
  title: "YOUR LOCAL IT SPECIALIST",
  description: "At Techzuno, we help your business thrive with tailored IT solutions.",
  buttonText: "Let's Discuss Your Needs",
  image: Assets.BusinessSolutions1,
};

const techStack = [
  { name: "PHP", icon: "logos:php" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Python", icon: "logos:python" },
  { name: "WordPress", icon: "logos:wordpress-icon" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
];

const servicesData = {
  services: [
    { title: "Custom ERP Solutions" },
    { title: "CRM Development" },
    { title: "E-Commerce Solutions" },
    { title: "Inventory & Warehouse Management Systems" },
    { title: "SaaS Product Development" },
    { title: "Project Management Platforms" },
    { title: "Booking & Appointment Systems" },
    { title: "Learning Management Systems (LMS)" },
    { title: "Billing & Invoicing Systems" },
    { title: "Job Portals & Marketplace Solutions" },
  ],
  quickLinks: [
    { label: "Services We Provide", href: "#services-we-provide" },
    { label: "What You Get", href: "#what-you-get" },
    { label: "Why Choose Techzuno", href: "#why-choose-techzuno" },
    { label: "FAQ's For Service", href: "#faq-service" },
  ],
  testimonial: {
    quote:
      "At Techzuno, Diverse Experiences And A Passion For Innovation Shape Everything We Build — And That's Something We're Truly Proud Of.",
    author: "Bishal Kayal",
    role: "CEO",
    avatar: Assets.CEO,
  },
};

const whatYouGetData = [
  {
    title: "Project Documentation",
    description: "We provide comprehensive documentation for every project, ensuring that you have all the information you need to manage and maintain your software.",
    icon: "mdi:file-document-outline"
  },
  {
    title: "Integration Tests Satisfaction",
    description: "Our rigorous testing process ensures that your software is robust, reliable, and meets your exact requirements, giving you peace of mind.",
    icon: "mdi:cog-outline"
  },
  {
    title: "Added Business Value",
    description: "We focus on delivering solutions that add real value to your business, helping you streamline operations and increase efficiency.",
    icon: "mdi:briefcase-outline"
  },
  {
    title: "Post-Launch Support",
    description: "We provide ongoing support and maintenance after your project is launched, ensuring that your software continues to perform at its best.",
    icon: "mdi:heart-outline"
  },
  {
    title: "Transparent & Detailed delivery",
    description: "We believe in transparency and keep you informed at every stage of the project, providing detailed reports on progress and milestones.",
    icon: "mdi:package-variant-closed"
  },
  {
    title: "Intellectual Property Protection",
    description: "We take intellectual property protection seriously and ensure that your software and data are secure and protected at all times.",
    icon: "mdi:shield-lock-outline"
  }
];

const whyChooseData = [
  {
    number: "01",
    title: "Partnership Focus",
    description: "We believe in building long-term partnerships with our clients, working closely with you to understand your needs and deliver solutions that help you succeed.",
    icon: "mdi:handshake-outline",
    image: Assets.BusinessSolutions1,
  },
  {
    number: "02",
    title: "More Than Just Code",
    description: "Our team of experts brings a wealth of experience and expertise to every project, providing strategic advice and consulting to help you make informed decisions.",
    icon: "mdi:eye-outline",
    image: Assets.BusinessSolutions1,
  },
  {
    number: "03",
    title: "Reliable Support",
    description: "We are committed to providing reliable support and maintenance, ensuring that your software is always up-to-date and performing optimally.",
    icon: "mdi:headset",
    image: Assets.BusinessSolutions1,
  }
];

const faqData = [
  {
    question: "How long does it take to complete a project?",
    answer: "The timeline depends on the scope and complexity of the project. A standard website might take 2-4 weeks, while complex applications can take several months. We will provide a detailed timeline during the consultation.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer: "Yes, we offer comprehensive post-launch support and maintenance packages to ensure your digital product remains secure, updated, and performs optimally over time.",
  },
  {
    question: "Can I customize my package or combine multiple services?",
    answer: "Absolutely! We understand that every business has unique needs. You can mix and match services to create a custom package that perfectly aligns with your goals.",
  },
  {
    question: "Can I customize my package or combine multiple services?",
    answer: "Absolutely! We understand that every business has unique needs. You can mix and match services to create a custom package that perfectly aligns with your goals.",
  },
];

export default function BusinessSolutionsPage() {
  return (
    <main className="bg-black min-h-screen text-white overflow-hidden">
      <BusinessHero data={heroData} />
      <TechMarquee stack={techStack} />
      <div className="pt-12 md:pt-16">
        <ServicesGrid data={servicesData} />
      </div>
      <div id="what-you-get">
        <WhatYouGet data={whatYouGetData} />
      </div>
      <div id="why-choose-techzuno">
        <WhyChoose data={whyChooseData} />
      </div>
      <div id="faq-service">
        <FAQ data={faqData} />
      </div>
      <ClientSuccess />
      <div className="mt-20">
        <CTA />
      </div>
    </main>
  );
}
