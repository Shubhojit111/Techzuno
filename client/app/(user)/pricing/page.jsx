import PricingCards from "@/components/pricing/PricingCards";
import FAQ from "@/components/pricing/FAQ";
import CTA from "@/components/home/CTA";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import SectionTitle from "@/components/buttons/SectionTitle";
import SectionTitleSmall from "@/components/buttons/SectionTitleSmall";

export const metadata = {
  title: "Pricing & Plans | Techzuno Web & App Development",
  description: "Transparent pricing for Techzuno's web design, mobile app, and business solutions packages — flexible plans that adapt to your budget and needs",
  url: "https://techzuno.com/pricing",
};

const pricingData = [
  {
    title: "Business Solutions",
    subtitle: "Scalable digital strategy for growth",
    price: "24,999",
    isPopular: false,
    icon: "akar-icons:dashboard",
    features: [
      "Business consultation & digital planning",
      "Workflow automation setup",
      "CRM integration & analytics",
      "Branding and identity alignment",
      "Performance reporting & optimization",
    ],
  },
  {
    title: "Custom Web Design UI/UX",
    subtitle: "Modern, user-focused visual experience",
    price: "19,999",
    isPopular: true,
    icon: "fluent:card-ui-portrait-flip-20-regular",
    features: [
      "Custom UI/UX design",
      "Responsive layout for all devices",
      "Wireframe & prototype creation",
      "Brand color and typography setup",
      "Interactive elements & animations",
    ],
  },
  {
    title: "Mobile App Development",
    subtitle: "Smart, seamless mobile app solutions",
    price: "24,999",
    isPopular: false,
    icon: "material-symbols-light:mobile-hand-outline",
    features: [
      "Android & iOS app development",
      "User authentication & profile system",
      "API integration & data sync",
      "Push notifications setup",
      "App testing & deployment support",
    ],
  },
  {
    title: "Web App Development",
    subtitle: "See your content marketing pricing below",
    price: "22,999",
    isPopular: false,
    icon: "akar-icons:dashboard",
    features: [
      "Custom web app architecture",
      "Admin dashboard & user panel",
      "Database integration",
      "API development & deployment",
      "Security & scalability setup",
    ],
  },
  {
    title: "E-Commerce Integration",
    subtitle: "Boost sales with online storefront",
    price: "23,999",
    isPopular: false,
    icon: "fluent:card-ui-portrait-flip-20-regular",
    features: [
      "Product catalog & cart setup",
      "Payment gateway integration",
      "Order & inventory management",
      "User dashboard & order tracking",
      "SEO-friendly eCommerce optimization",
    ],
  },
  {
    title: "SEO & Performance Optimization",
    subtitle: "Rank higher, load faster instantly",
    price: "14,999",
    isPopular: false,
    icon: "material-symbols-light:mobile-hand-outline",
    features: [
      "On-page & off-page SEO",
      "Website speed optimization",
      "Keyword & competitor analysis",
      "Sitemap & Google indexing",
      "Performance monitoring & reporting",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-black min-h-screen pt-28 md:pt-40 pb-0">
      {/* Page Header */}
      <div className="px-6 md:px-10 lg:px-62 mx-auto flex flex-col items-center text-center mb-10 md:mb-20 relative z-20">
        <HeaderBtn text="PRICING AND PLANS" />
        <SectionTitleSmall
          title={
            <>
              FLEXIBLE,{" "} <span className="text-[#03B8B8]">TRANSPARENT PRICING</span>
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
      <div className="sm:mt-10">
        <CTA />
      </div>
    </main>
  );
}
