import Assets from "@/Assets/Assets";
import Image from "next/image";
import HeaderBtn from "../buttons/HeaderBtn";
import AnimatedText from "./AnimatedText";

export default function CEO() {
  return (
    <section className="relative w-full h-[700px] overflow-hidden ">
      {/* BACKGROUND */}
      <div className="absolute bottom-0 max-h-[80%] left-0 w-full h-full z-0">
        <Image
          src={Assets.CEObg}
          alt=""
          fill
          className="object-cover "
          priority
        />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10  mx-auto h-full pl-48 pr-60">
        <div className="relative flex h-full items-end  justify-end">
          {/* LEFT IMAGE (BIG + OVERFLOWING) */}
          <div className="pointer-events-none  absolute bottom-0 left-0  ">
            <Image
              src={Assets.CEO}
              alt="CEO"
              className="object-cover h-170 w-140 "
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="relative z-20   mb-24 w-full md:w-[55%] ">
            <HeaderBtn text="A WORD FROM OUR CEO" />
            {/* MAIN HEADING */}
            <h2 className="mt-3 text-3xl md:text-[46px] font-semibold leading-tight tracking-wider text-white ">
              A BRIEF MESSAGE FROM
              <br />
              OUR <span className="text-[#38FFF2]">FOUNDER & CEO</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-4  ">
              <AnimatedText text="At Techzuno, diverse experiences and a passion for innovation shape everything we build — and that’s something we’re truly proud of." color="white/75" additionalClassName="italic text-[24px] leading-tight text-white/75"/> 
            
            </p>

            {/* NAME */}
            <p className="mt-16 text-[20px] text-white/70">
              Bishal Kayal – CEO And Founder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
