import Assets from "@/Assets/Assets";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Blog", href: "/blog" },
];

const serviceLinks = [
  { title: "Web Development", href: "/services/web" },
  { title: "App Development", href: "/services/app" },
  { title: "UI/UX Design", href: "/services/design" },
  { title: "SEO Optimization", href: "/services/seo" },
];

const supportLinks = [
  { title: "Help and FAQ", href: "/services/web" },
  { title: "Contact us", href: "/services/app" },
  { title: "Privacy Policy", href: "/services/design" },
  { title: "Terms and Conditions", href: "/services/seo" },
  { title: "Refund Policy", href: "/services/seo" },
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
              <Icon
                icon="lsicon:location-outline"
                className="text-[#16cfdc]"
              />
              12/1A SD Christopher Road
              <br />
              Bidhannagar South Kolkata -
              <br />
              700010
            </span>
          </p>

          <p className="text-zinc-400 mb-2 flex items-center gap-1 text-lg lg:text-sm">
            <Icon
              icon="material-symbols-light:call-outline-sharp"
              className="text-[#16cfdc]"
            />
            P. +91 6290345020
          </p>

          <p className="text-zinc-400 flex items-center gap-1 text-lg lg:text-sm">
            <Icon
              icon="material-symbols-light:mail-outline-sharp"
              className="text-[#16cfdc]"
            />
            E. info@techzuno.com
          </p>
        </div>

        <FooterSection title="Company" links={companyLinks} />

        <FooterSection title="Services" links={serviceLinks} />

        <FooterSection title="Support" links={supportLinks} />
      </div>
    </footer>
  );
}