import Assets from "@/Assets/Assets";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { title: "About", href: "/about" },
  { title: "Careers", href: "/contact" },
  { title: "Blog", href: "/blogs" },
];

const serviceLinks = [
  { title: "Web Development", href: "/web-development" },
  { title: "App Development", href: "/app-development" },
  { title: "UI/UX Design", href: "/ui-ux-design" },
  { title: "SEO Optimization", href: "/seo" },
  { title: "Business Solutions", href: "/business-solutions" },
  { title: "Ecommerce Integration", href: "/ecom-integration" },
];

const supportLinks = [
  { title: "Help and FAQ", href: "/faq" },
  { title: "Contact us", href: "/contact" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms and Conditions", href: "/terms-and-conditions" },
  { title: "Refund Policy", href: "/refund-policy" },
];

function FooterSection({ title, links }) {
  return (
    <div>
      <h4 className="font-semibold text-xl lg:text-md mb-4">{title}</h4>

      <ul className="space-y-2 text-lg lg:text-sm text-zinc-400">
        {links.map((link) => (
          <li key={link.title}>
            <Link href={link.href} className="hover:text-cyan-400">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white pb-16 border-t border-white/60">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 pt-12">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Image src={Assets.logo} alt="Techzuno" />
          </div>

          <p className="text-zinc-400 mb-2 text-lg lg:text-sm">
            <span className="flex gap-1">
              <Icon icon="lsicon:location-outline" className="text-[#16cfdc]" />
              12/1A/3D Chowbagha Road
              <br />
              Bidhan Nagar South Kolkata - 700039
            </span>
          </p>

          <p className="text-zinc-400 mb-2 flex items-center gap-1 text-lg lg:text-sm">
            <Icon
              icon="material-symbols-light:call-outline-sharp"
              className="text-[#16cfdc]"
            />
            P. +91 6291815773
          </p>

          <p className="text-zinc-400 flex mb-2 items-center gap-1 text-lg lg:text-sm">
            <Icon
              icon="material-symbols-light:mail-outline-sharp"
              className="text-[#16cfdc]"
            />
            E. info@techzuno.com
          </p>

          <p className="text-zinc-400 flex items-center gap-1 text-lg lg:text-sm">
            GST No:{" "}
            <a className="hover:text-[#03B8B8] transition-colors">
              19AAMCT8152B1Z5
            </a>
          </p>
        </div>

        <FooterSection title="Company" links={companyLinks} />

        <FooterSection title="Services" links={serviceLinks} />

        <FooterSection title="Support" links={supportLinks} />
      </div>
    </footer>
  );
}
