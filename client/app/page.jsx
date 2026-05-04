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
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <Hero />
      {/*       
      <About />
      */}
      <Steps />
      <Services />
      <Newsletter />
      <Marquee />
      {/* 
      <CEO />
       */}
      <WhyChooseUs />
      {/* 
      <Testimonials /> 
      <News />
      <CTA /> 
      */}
    </div>
  );
}
