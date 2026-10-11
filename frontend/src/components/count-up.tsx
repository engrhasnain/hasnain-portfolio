"use client";

import { useEffect, useRef, useState } from "react";

const NUMBER = /^(\D*)([\d,]+)(.*)$/;

/** Counts a stat like "1,000+" up from zero when it scrolls into view. The real value is in the HTML for SEO. */
export function CountUp({ value }: { value: string }) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const match = value.match(NUMBER);
    const el = ref.current;
    if (!match || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;
    let frame = 0;

    setShown(format(0));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1600);
          setShown(format(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
