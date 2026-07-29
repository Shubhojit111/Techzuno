"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  end,
  start = 0,
  duration = 800,
  suffix = "",
  prefix = "",
  className = "",
}) {
  const ref = useRef(null);
  const [count, setCount] = useState(start);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (animatedRef.current) return;

    const animate = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;
      let startTime;

      const update = (time) => {
        if (!startTime) startTime = time;

        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(start + (end - start) * progress);

        setCount(value);

        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const rect = el.getBoundingClientRect();
    const isVisibleNow =
      rect.bottom > 0 &&
      rect.top < (typeof window !== "undefined" ? window.innerHeight : 900);

    if (isVisibleNow) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [start, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* USAGE:

<CountUp
  end={500}
  suffix="+"
  className="text-6xl font-bold text-white"
/>

<CountUp
  end={98}
  suffix="%"
  className="text-4xl text-cyan-400"
/>

*/