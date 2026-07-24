import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Steps from "@/components/home/Steps";
import Services from "@/components/home/Services";
import Newsletter from "@/components/home/Newsletter";
import Marquee from "@/components/home/Marquee";
import CEO from "@/components/home/CEO";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import News from "@/components/home/News";
import TechStack from "@/components/home/TechStack";
import CTA from "@/components/home/CTA";
import Assets from "@/Assets/Assets";
import AboutHome from "@/components/home/AboutHome";

export const metadata = {
  title: "Techzuno | Web & App Development Company in Kolkata",
  description: "Techzuno is Kolkata's leading web design, app development and IT solutions company. Custom, SEO-friendly websites and software built to grow your business.",
  url: "https://techzuno.com/",
};

export default function HomePage() {
  return (
    <div className="flex flex-col h-full ">
      <Hero />
      {/*
       */}
      <AboutHome
        image={Assets.RoboticHead}
        title={
          <>
            KOLKATA'S{" "}
            <span className="text-[#38FFF2]">
              LEADING{" "}
            </span>
            WEBSITE <br /> DEVELOPMENT & <br /> DESIGN COMPANY
          </>
        }
        description={
          "Searching for the top web development company in Kolkata? Our team of designers, developers and strategists builds modern, responsive, user-friendly websites tailored to your business — from e-commerce stores to full corporate platforms. We combine clean design with solid engineering, so your site doesn't just look good, it performs: fast load times, mobile-first layouts, and SEO built in from day one. Partner with Techzuno to build an online identity that brings in more of the right customers."
        }
        buttonText="Find More About Techzuno"
      />

      <Steps />
      <TechStack />
      <Services />
      <Newsletter />
      <Marquee />

      <CEO />
      <WhyChooseUs />

      <Testimonials />
      <News />

      <CTA />
    </div>
  );
}
