import Assets from "@/Assets/Assets";
import Image from "next/image";

export default function AboutHeader() {
  return (
    <div className="relative h-72">
      <div className="absolute inset-0">
        <Image src={Assets.AboutBg} alt="Background" className="h-full w-full object-cover" />
      </div>

      <div className=" w-full h-full mx-auto flex justify-center items-center font-semibold relative z-10">
        <h2 className="text-white text-5xl font-toxigenesis tracking-wider uppercase">
          About Us
        </h2>
      </div>
    </div>
  );
}
