import Assets from "@/Assets/Assets";
import { Icon } from "@iconify/react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pb-16 border-t border-white/10">
      {/* <div className="px-62 mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Image src={Assets.logo} alt="Techzuno" />
          </div>
          <p className="text-zinc-400 text-sm mb-2">
            <span className="flex gap-1">
              <Icon icon="lsicon:location-outline" classname="text-[#B8FAFF]" />
              12/1A SD Christopher Road
              <br /> Bidhannagar South Kolkata -<br /> 700010
            </span>
          </p>
          <p className="text-zinc-400 text-sm mb-2 flex items-center gap-1">
            <Icon
              icon="material-symbols-light:call-outline-sharp"
              classname="text-[#B8FAFF]"
            />
            P. +91 6290345020
          </p>
          <p className="text-zinc-400 text-sm flex items-center gap-1">
            <Icon
              icon="material-symbols-light:mail-outline-sharp"
              classname="text-[#B8FAFF]"
            />
            E. info@techzuno.com
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/about" className="hover:text-cyan-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-cyan-400">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-cyan-400">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/services/web" className="hover:text-cyan-400">
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/services/app" className="hover:text-cyan-400">
                App Development
              </Link>
            </li>
            <li>
              <Link href="/services/design" className="hover:text-cyan-400">
                UI/UX Design
              </Link>
            </li>
            <li>
              <Link href="/services/seo" className="hover:text-cyan-400">
                SEO Optimization
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/services/web" className="hover:text-cyan-400">
                Help and FAQ{" "}
              </Link>
            </li>
            <li>
              <Link href="/services/app" className="hover:text-cyan-400">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/services/design" className="hover:text-cyan-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/services/seo" className="hover:text-cyan-400">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="/services/seo" className="hover:text-cyan-400">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-62 mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} Techzuno. All rights reserved.
      </div> */}

      <div className="bg-white text-black border-t border-white/10 flex items-center justify-center w-full overflow-hidden px-4">
        <h1 className="font-bold text-[clamp(56px,18vw,230px)] tracking-wider max-w-full leading-none whitespace-nowrap">
          TECHZUNO
        </h1>
      </div>
    </footer>
  );
}
