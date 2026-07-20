import { Suspense } from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactServices from "@/components/contact/ContactServices";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "Contact Us - Techzuno",
  description: "Get in touch with Techzuno for professional web and app development solutions.",
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
