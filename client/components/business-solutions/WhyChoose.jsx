"use client";

import React, { useEffect } from "react";
import SectionTitle from "../buttons/SectionTitle";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { MegaphoneIcon } from "lucide-react";
import Assets from "@/Assets/Assets";
import CardSliderComponent from "./CardSliderComponent";

export default function WhyChoose({ data }) {
  return (
    <section className="py-20">
      <div className="px-6 md:px-10 lg:px-62 mx-auto">
        <div className="flex justify-end">
          <SectionTitle
            title={
              <>
                WHY CHOOSE <br className="hidden lg:block" />
                <span className="text-[#03B8B8]">TECHZUNO</span>
              </>
            }
            className="text-right uppercase"
          />
        </div>

        <div className=" h-full w-full flex flex-col gap-12 pt-8">
          {data.map((item, idx) => (
        <CardSliderComponent key={idx} {...item} />
      ))}
        </div>
      </div>
    </section>
  );
}
