import PricingCards from "@/components/pricing/PricingCards";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/home/CTA";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import SectionTitle from "@/components/buttons/SectionTitle";

export const metadata = {
  title: "Pricing & Plans | Techzuno Web & App Development",
  description: "Transparent pricing for Techzuno's web design, mobile app, and business solutions packages — flexible plans that adapt to your budget and needs",
  url: "https://techzuno.com/pricing",
};

const pricingData = [
  {
    title: "Business Solutions",
    subtitle:
      "Scalable digital strategy for brands that need more than a website — CRM, workflows, and reporting built around how you actually operate.",
    price: "24,999",
    isPopular: false,
    icon: "akar-icons:dashboard",
    features: [
      "Business consultation & digital planning",
      "Workflow automated creation",
      "CRM integration sssistance",
      "Branding and identity alignment",
      "Performance reporting & Optimization",
    ],
  },
  {
    title: "Custom Web Design UI/UX",
    subtitle:
      "A fully custom, SEO-ready website with a design system built around your brand — not a theme.",
    price: "19,999",
    isPopular: true,
    icon: "fluent:card-ui-portrait-flip-20-regular",
    features: [
      "Business consultation & digital planning",
      "Workflow automated creation",
      "CRM integration sssistance",
      "Branding and identity alignment",
      "Performance reporting & Optimization",
    ],
  },
  {
    title: "Mobile App Development",
    subtitle:
      "A launch-ready mobile app, from wireframe to App Store submission, built for how your customers actually use their phones.",
    price: "24,999",
    isPopular: false,
    icon: "material-symbols-light:mobile-hand-outline",
    features: [
      "Business consultation & digital planning",
      "Workflow automated creation",
      "CRM integration sssistance",
      "Branding and identity alignment",
      "Performance reporting & Optimization",
    ],
  },
  {
    title: "Business Solutions",
    subtitle:
      "Scalable digital strategy for brands that need more than a website — CRM, workflows, and reporting built around how you actually operate.",
    price: "24,999",
    isPopular: false,
    icon: "akar-icons:dashboard",
    features: [
      "Business consultation & digital planning",
      "Workflow automated creation",
      "CRM integration sssistance",
      "Branding and identity alignment",
      "Performance reporting & Optimization",
    ],
  },
  {
    title: "Custom Web Design UI/UX",
    subtitle:
      "A fully custom, SEO-ready website with a design system built around your brand — not a theme.",
    price: "19,999",
    isPopular: true,
    icon: "fluent:card-ui-portrait-flip-20-regular",
    features: [
      "Business consultation & digital planning",
      "Workflow automated creation",
      "CRM integration sssistance",
      "Branding and identity alignment",
      "Performance reporting & Optimization",
    ],
  },
  {
    title: "Mobile App Development",
    subtitle:
      "A launch-ready mobile app, from wireframe to App Store submission, built for how your customers actually use their phones.",
    price: "24,999",
    isPopular: false,
    icon: "material-symbols-light:mobile-hand-outline",
    features: [
      "Business consultation & digital planning",
      "Workflow automated creation",
      "CRM integration sssistance",
      "Branding and identity alignment",
      "Performance reporting & Optimization",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-black min-h-screen pt-32 md:pt-40 pb-0">
      {/* Page Header */}
      <div className="px-6 md:px-10 lg:px-62 mx-auto flex flex-col items-center text-center mb-16 md:mb-20 relative z-20">
        <HeaderBtn text="PRICING AND PLANS" />
        <SectionTitle
          title={
            <>
              FLEXIBLE,{" "}
              <span className="text-[#03B8B8]">TRANSPARENT PRICING</span>
              <br className="hidden md:block" /> THAT ADAPTS TO YOUR NEEDS
            </>
          }
        />
      </div>

      {/* Pricing Cards */}
      <PricingCards data={pricingData} />

      {/* FAQ Section */}
      <FAQ/>

      {/* CTA Section */}
      <div className="mt-10">
        <CTA />
      </div>
    </main>
  );
}
