import Assets from "@/Assets/Assets";
import Image from "next/image";
import Link from "next/link";
import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";
import GlowBtn from "../buttons/GlowBtn";

export default function CTA() {
  return (
    <section className=" h-[650px] relative overflow-hidden ">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={Assets.CTABG}
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-62 mx-auto flex flex-col md:flex-row items-end h-full justify-center gap-12 relative z-10 w-full">
        <div className="h-[700px] absolute top-0 ">
          <Image
            src={Assets.CTAImage}
            alt="Comma"
            className="object-cover w-full h-full "
          />
        </div>

        <div className="textarea  flex flex-col items-center mb-20 z-40">
          <HeaderBtn text="Let's make great things" />
          <SectionTitle
            title={
              <>
                Have a project? Speak
                <br />
                With our <span className="text-[#03B8B8]">experts</span>
              </>
            }
            className="uppercase text-center"
          />
          <p className="text-[26px] mt-6 leading-tight text-center">
            Leave Your Contact Details To Get A Free
            <br />
            Consultation With A Techzuno Expert.
          </p>
          <GlowBtn text="Get Started" className=" mt-10" />
        </div>
      </div>
    </section>
  );
}
