"use client";

import { useRef, Children, isValidElement, cloneElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
  children,
  y = 40,
  x = 0,
  opacity = 0,
  duration = 0.9,
  delay = 0,
  stagger = 0,
  ease = "power3.out",
  start = "top 85%",
  toggleActions = "play none none none",
  once = true,
  className = "",
  as = "div",
  onEnter,
  rotate = 0,
  scale = 1,
}) {
  const scopeRef = useRef(null);

  useGSAP(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const targets = stagger
      ? Array.from(scope.querySelectorAll(".reveal-child"))
      : [scope];

    if (targets.length === 0) return;

    gsap.set(targets, {
      y,
      x,
      opacity,
      rotate,
      scale,
      willChange: "transform, opacity",
    });

    ScrollTrigger.create({
      trigger: scope,
      start,
      toggleActions,
      once,
      onEnter: (self) => {
        gsap.to(targets, {
          y: 0,
          x: 0,
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease,
          clearProps: "willChange",
          onComplete: () => {
            if (typeof onEnter === "function") onEnter();
          },
        });
        if (once) self.kill();
      },
    });
  }, [y, x, opacity, duration, delay, stagger, ease, start, toggleActions, once, rotate, scale]);

  if (stagger) {
    const Comp = as;
    return (
      <Comp ref={scopeRef} className={className}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          return cloneElement(child, {
            className: `${child.props.className || ""} reveal-child`.trim(),
          });
        })}
      </Comp>
    );
  }

  const Comp = as;
  return (
    <Comp ref={scopeRef} className={className}>
      {children}
    </Comp>
  );
}
