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

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <Hero />
      {/*
       */}
      {/* <AboutHome
        image={Assets.RoboticHead}
        title={
          <>
            THE{" "}
            <span className="text-[#38FFF2]">
              KOLKATA'S <br /> LEADING{" "}
            </span>
            WEBSITE <br /> DEVELOPMENT & <br /> DESIGN COMPANY.
          </>
        }
        description={
          "Searching for the top web development company in Kolkata? Our expert team delivers modern, responsive and user-friendly websites tailored to your business needs. From e-commerce stores to corporate sites, we provide complete website design services in Kolkata that boost your brand presence. Partner with us today to build a powerful online identity and reach more customers."
        }
        buttonText="Find More About Techzuno"
      /> */}
      {/* 
      <Steps />
      <TechStack />
      <Services />
      <Newsletter />
      <Marquee />
      */}
      <CEO />
      <WhyChooseUs />
      {/* 
      <Testimonials />
      <News />
      */}
      <CTA /> 
    </div>
  );
}
