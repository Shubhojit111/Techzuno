"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimatedText({ text, color, additionalClassName }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.anim-char', {
      y: 10,
      opacity: 0,
      stagger: 0.05, // Lower stagger means it completes smoother with long text
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%", // Start earlier
        end: "top 50%",   // End later, spreading out the animation over more scroll space
        scrub: true,
        // markers: true, 
      }
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-block ${additionalClassName}`} style={{ color }}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="anim-char inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
