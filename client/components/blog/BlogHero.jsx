import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "@/components/buttons/HeaderBtn";
import SectionTitle from "@/components/buttons/SectionTitle";
import SectionDescription from "@/components/buttons/SectionDescription";

export default function BlogHero() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] lg:h-screen flex flex-col justify-center pt-40 md:pt-52 lg:pt-42 pb-10 md:pb-16 lg:pb-20 overflow-hidden">
      {/* Background full width image */}
      <div className="absolute top-0 left-0 w-full h-full z-0 ">
        <Image
          src={Assets.BlogsBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 sm:px-10 lg:px-62 mx-auto relative z-10 w-full flex flex-col items-center">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="text-white text-[40px]  md:text-[70px] lg:text-[110px] font-semibold uppercase tracking-[3.5px] leading-[1.25] text-center">
            Insights to help you do what
            <span className="text-[#03B8B8]"> you do </span>
            better.
          </p>

          <span className="text-white mx-auto text-sm pt-10">SCROLL DOWN</span>
        </div>
      </div>
    </section>
  );
}
