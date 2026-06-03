import PricingCards from "@/components/pricing/PricingCards";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/home/CTA";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import SectionTitle from "@/components/buttons/SectionTitle";

const pricingData = [
  {
    title: "Business Solutions",
    subtitle: "Scalable Digital Strategy for Brands",
    price: "24,999",
    isPopular: false,
    icon: "akar-icons:dashboard",
    features: [
      "Business consultation/digital planning",
      "WorkFlow Automated creation",
      "CRM integration Assistance",
      "Branding and identity alignment",
      "Performance reporting/Optimization",
    ],
  },
  {
    title: "Custom Web Design UI/UX",
    subtitle: "Scalable Digital Strategy for Brands",
    price: "19,999",
    isPopular: true,
    icon: "fluent:card-ui-portrait-flip-20-regular",
    features: [
      "Business consultation/digital planning",
      "WorkFlow Automated creation",
      "CRM integration Assistance",
      "Branding and identity alignment",
      "Performance reporting/Optimization",
    ],
  },
  {
    title: "Mobile App Development",
    subtitle: "Scalable Digital Strategy for Brands",
    price: "24,999",
    isPopular: false,
    icon: "material-symbols-light:mobile-hand-outline",
    features: [
      "Business consultation/digital planning",
      "WorkFlow Automated creation",
      "CRM integration Assistance",
      "Branding and identity alignment",
      "Performance reporting/Optimization",
    ],
  },
  {
    title: "Business Solutions",
    subtitle: "Scalable Digital Strategy for Brands",
    price: "24,999",
    isPopular: false,
    icon: "streamline-ultimate:web-hook",
    features: [
      "Business consultation/digital planning",
      "WorkFlow Automated creation",
      "CRM integration Assistance",
      "Branding and identity alignment",
      "Performance reporting/Optimization",
    ],
  },
  {
    title: "Custom Web Design UI/UX",
    subtitle: "Scalable Digital Strategy for Brands",
    price: "19,999",
    isPopular: true,
    icon: "streamline-ultimate:e-commerce-apparel",
    features: [
      "Business consultation/digital planning",
      "WorkFlow Automated creation",
      "CRM integration Assistance",
      "Branding and identity alignment",
      "Performance reporting/Optimization",
    ],
  },
  {
    title: "Mobile App Development",
    subtitle: "Scalable Digital Strategy for Brands",
    price: "24,999",
    isPopular: false,
    icon: "hugeicons:seo",
    features: [
      "Business consultation/digital planning",
      "WorkFlow Automated creation",
      "CRM integration Assistance",
      "Branding and identity alignment",
      "Performance reporting/Optimization",
    ],
  },
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

export default function PricingPage() {
  return (
    <main className="bg-black min-h-screen pt-32 md:pt-40 pb-0">
      {/* Page Header */}
      <div className="px-6 md:px-10 lg:px-62 mx-auto flex flex-col items-center text-center mb-16 md:mb-20 relative z-20">
        <HeaderBtn text="PRICING AND PLANS" />
        <SectionTitle 
          title={<>FLEXIBLE, <span className="text-[#03B8B8]">TRANSPARENT PRICING</span><br className="hidden md:block" /> THAT ADAPTS TO YOUR NEEDS</>}
        />
      </div>

      {/* Pricing Cards */}
      <PricingCards data={pricingData} />

      {/* FAQ Section */}
      <FAQ data={faqData} />

      {/* CTA Section */}
      <div className="mt-10">
        <CTA />
      </div>
    </main>
  );
}