import Assets from "@/Assets/Assets";
import Image from "next/image";
import Link from "next/link";
import GlowBtn from "../buttons/GlowBtn";
import CountUpNumber from "../buttons/CountUpNumber";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-left md:text-center overflow-hidden ">
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src={Assets.HomeBg}
          alt="Techzuno Home Background"
          className="w-full h-full object-cover "
        />
      </div>
      <div className="relative z-10 w-full mx-auto flex flex-col items-start md:items-center pt-20 md:pt-34 lg:pt-34 px-6 sm:px-10 md:px-0">
        <p className="text-[#B8FAFF] font-medium mb-4 text-[15px] sm:text-[16px] md:text-[18px] tracking-wide font-sans">
          Elevating Outsourcing — Where Craftsmanship Meets Commitment.
        </p>

        <h1 className="max-w-[320px] sm:max-w-[520px] md:max-w-none text-[40px] sm:text-[44px] md:text-[42px] lg:text-[50px] font-toxigenesis font-bold mb-4 leading-[1.1] tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase">
          WHERE VISION MEETS INNOVATION <br className="hidden lg:flex"/>SOFTWARE SOLUTION
        </h1>

        <p className="text-white mb-8 text-[16px] md:text-[18px] font-medium tracking-wide font-sans">
          Now Is Always Right Time To Start
        </p>

        {/* Central Graphic Area */}
        <div className="relative w-full max-w-[380px] sm:max-w-[520px] md:max-w-[680px] flex flex-col items-center self-center md:self-auto before:absolute before:top-[45px] before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[120px] before:h-[120px] before:bg-[#38FFF2] before:blur-[35px] before:opacity-50 before:z-0">
          {/* Top connecting lines (horizontal) */}

          {/* Center Brain Icon */}
          <div className="relative z-10 w-[90px] h-[90px] mb-6">
            <Image
              src={Assets.HomeIcon}
              alt="Logo"
              className="object-cover object-top "
            />
          </div>

          {/* Left Floating Box */}
          <div className="hidden md:block absolute top-[25px] left-[10%] md:left-[18%] -translate-x-1/2 bg-white/5 border border-white/20 rounded-xl leading-[1.2] py-3.5 px-5 text-[13px] text-white shadow-xl w-fit text-center font-sans">
            Previous Known As National
            <br /> Insurance Group Llc
          </div>

          {/* Right Floating Box */}
          <div className="hidden md:block absolute top-0 right-[10%] md:right-[18%] translate-x-1/2 bg-white/5 border border-white/20 rounded-xl leading-[1.2] py-3.5 px-5 text-[13px] text-white shadow-xl w-fit text-center font-sans">
            Previous Known As National
            <br /> Insurance Group Llc
          </div>

          {/* Vertical connecting line */}
          <div className="absolute top-[64px] left-1/2 -translate-x-1/2 w-px h-[160px] md:h-[60px] bg-white/20 z-0" />

          {/* Main Stats Box */}
          <div className="relative z-10 w-full max-w-[380px] sm:max-w-[520px] md:max-w-[680px] bg-linear-to-b from-white/30 to-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Left Stat */}
            <div className="flex-1 flex flex-col items-center justify-center text-center md:border-r md:border-white/10 bg-linear-to-b from-white/5 to-transparent py-6">
              <h3 className="text-5xl md:text-[50px] font-toxigenesis text-white mb-2 tracking-tight drop-shadow-md">
                <CountUpNumber end={98} suffix="%" />
              </h3>
              <p className="text-xs md:text-sm tracking-wide text-gray-300 max-w-[200px] leading-snug font-medium font-sans">
                Delivering Result Proven 98% Client Success Rate
              </p>
            </div>

            {/* Right Stat */}
            <div className="flex-1 flex flex-col items-center justify-center text-center bg-linear-to-b from-white/5 to-transparent py-6">
              <h3 className="text-5xl md:text-[50px] font-toxigenesis text-white mb-2 tracking-tight drop-shadow-md">
                <CountUpNumber end={50} suffix="+" />
              </h3>
              <p className="text-xs md:text-sm tracking-wide text-gray-300 max-w-[200px] leading-snug font-medium font-sans">
                Trusted Clients For Software Solutions
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 relative z-10 self-center md:self-auto">
          <GlowBtn text="Start Now" />
        </div>
      </div>
    </section>
  );
}
