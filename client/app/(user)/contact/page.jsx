import { Suspense } from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactServices from "@/components/contact/ContactServices";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "Contact Techzuno | Web & App Development, Kolkata",
  description: " Get in touch with Techzuno for a free consultation on your web development, app development, or IT solutions project. Based in Kolkata, working worldwide.",
  url: "https://techzuno.com/contact",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col bg-black min-h-screen">
      <ContactHero />
      <Suspense fallback={null}>
        <ContactFormSection />
      </Suspense>
      <ContactServices />
      <CTA />
    </main>
  );
}
