"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/#$%&*";

// The brand gradient (teal -> blue -> teal), sampled per letter. Gradient text can't paint through the per-letter
// boxes the decoding effect needs, so each letter gets its own colour from the same gradient.
const STOPS = [
  [94, 234, 212],
  [59, 130, 246],
  [94, 234, 212],
];
function gradientAt(t: number) {
  const scaled = t * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(scaled));
  const f = scaled - i;
  const [a, b] = [STOPS[i], STOPS[i + 1]];
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(" ")})`;
}

/**
 * My name in the hero, with a "decoding" effect: letters scramble like a machine reading them, then lock in
 * from left to right (again when you hover it). Each letter keeps its real width, so nothing jumps.
 * A neural-network underline draws itself in underneath. Screen readers and Google get the plain name.
 */
export function HeroName({ name }: { name: string }) {
  const [shown, setShown] = useState(name);
  const frame = useRef(0);
  const reduce = useRef(false);

  const decode = useCallback(() => {
    if (reduce.current) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 1300;
    const tick = (t: number) => {
      const progress = Math.min(1, (t - start) / duration);
      const locked = Math.floor(progress * name.length);
      setShown(
        name
          .split("")
          .map((c, i) => (c === " " || i < locked ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [name]);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // On phones the name shows straight away: the decode re-renders every frame, which a phone pays for while
    // the page is still loading. On desktop it plays on load, and everywhere it plays when you hover the name.
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const timer = desktop ? setTimeout(decode, 250) : undefined;
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame.current);
    };
  }, [decode]);

  const words = name.split(" ");
  let index = 0;

  return (
    <span className="hero-name relative mt-2 block pb-1" onMouseEnter={decode}>
      <span className="sr-only">{name}</span>
      <span aria-hidden="true" className="block text-4xl leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
        {words.map((word, w) => {
          const chars = word.split("").map((c) => {
            const i = index++;
            return (
              <span
                key={i}
                className="hero-char relative inline-block"
                style={{ color: gradientAt(i / (name.length - 1)), "--i": i } as CSSProperties}
              >
                <span className="invisible">{c}</span>
                <span className="absolute inset-0 text-center">{shown[i]}</span>
              </span>
            );
          });
          index++; // the space
          return (
            <span key={word + w}>
              <span className="inline-block whitespace-nowrap">{chars}</span>
              {w < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
      <svg aria-hidden="true" viewBox="0 0 520 18" className="hero-underline mt-3 block h-auto w-full max-w-[520px] overflow-visible">
        <polyline
          points="4,9 70,4 140,12 215,6 290,13 365,5 440,11 516,7"
          fill="none"
          stroke="url(#hero-underline-g)"
          strokeWidth="1.4"
          className="hero-underline-line"
        />
        <defs>
          <linearGradient id="hero-underline-g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#5EEAD4" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[
          [4, 9],
          [70, 4],
          [140, 12],
          [215, 6],
          [290, 13],
          [365, 5],
          [440, 11],
          [516, 7],
        ].map(([x, y], i) => (
          <circle
            key={x}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 3 : 2.2}
            fill={i % 3 === 1 ? "#60A5FA" : "#5EEAD4"}
            className="hero-underline-node net-node"
            style={{ "--d": `${0.9 + i * 0.12}s`, "--i": i } as CSSProperties}
          />
        ))}
      </svg>
    </span>
  );
}
