"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

type Spark = { dx: number; dy: number; azure: boolean; size: number };
type Burst = { x: number; y: number; start: number; sparks: Spark[] };

const DURATION = 950;
const LINK = 78;

/**
 * Site-wide touches:
 * 1. Click anywhere and a small burst of the hero's neural network sparks out from the pointer.
 * 2. Primary buttons (and anything with data-magnetic) lean towards the mouse.
 * 3. Cards (.card-hover) tilt in 3D towards the mouse.
 * Both switch off for people who ask their OS to reduce motion.
 */
export function Interactions() {
  const ref = useRef<HTMLCanvasElement>(null);

  // Close the loop: count every contact action (Fiverr, WhatsApp, LinkedIn, email, /contact), with the page it came from.
  // Sent to Umami Cloud (free plan includes custom events; Vercel's free plan doesn't). Does nothing until
  // NEXT_PUBLIC_UMAMI_WEBSITE_ID is set, because the Umami script isn't loaded before then.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element | null)?.closest("a")?.getAttribute("href") ?? "";
      const channel = href.includes("cal.com")
        ? "Book a call"
        : href.includes("fiverr.com")
          ? "Fiverr"
        : href.includes("wa.me")
          ? "WhatsApp"
          : href.includes("linkedin.com")
            ? "LinkedIn"
            : href.startsWith("mailto:")
              ? "Email"
              : href.includes("github.com")
                ? "GitHub"
                : href === "/contact"
                  ? "Contact page"
                  : null;
      if (channel) window.umami?.track("Contact click", { channel, page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bursts: Burst[] = [];
    let frame = 0;
    let running = false;

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    let sized = false; // the full-screen canvas only gets a backing store once someone clicks

    const draw = (t: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b];
        const age = (t - burst.start) / DURATION;
        if (age >= 1) {
          bursts.splice(b, 1);
          continue;
        }
        const ease = 1 - Math.pow(1 - age, 3);
        const fade = 1 - age;
        const points = burst.sparks.map((s) => ({ x: burst.x + s.dx * ease, y: burst.y + s.dy * ease, s }));

        ctx.lineWidth = 0.9;
        for (const p of points) {
          ctx.strokeStyle = `rgba(94, 234, 212, ${0.4 * fade})`;
          ctx.beginPath();
          ctx.moveTo(burst.x, burst.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
            if (d > LINK) continue;
            ctx.strokeStyle = `rgba(94, 234, 212, ${(1 - d / LINK) * 0.55 * fade})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
        for (const p of points) {
          ctx.fillStyle = p.s.azure ? `rgba(96, 165, 250, ${fade})` : `rgba(94, 234, 212, ${fade})`;
          ctx.shadowColor = p.s.azure ? "#3B82F6" : "#5EEAD4";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(229, 231, 240, ${fade})`;
        ctx.shadowColor = "#5EEAD4";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, 3 * (1 - age * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (bursts.length > 0) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (!sized) {
        resize();
        sized = true;
      }
      const count = 10;
      const sparks = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
        const distance = 34 + Math.random() * 52;
        return {
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          azure: Math.random() < 0.45,
          size: 1.4 + Math.random() * 1.6,
        };
      });
      bursts.push({ x: e.clientX, y: e.clientY, start: performance.now(), sparks });
      if (bursts.length > 6) bursts.shift();
      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    // Magnetic buttons: lean a little towards the mouse while it's over them.
    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };
    // Cards: tilt in 3D towards the mouse (skipped on very wide cards, where it looks wrong).
    let tilted: HTMLElement | null = null;
    const untilt = () => {
      if (tilted) tilted.style.transform = "";
      tilted = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = e.target as Element | null;

      const card = target?.closest<HTMLElement>(".card-hover") ?? null;
      if (card !== tilted) untilt();
      if (card && card.offsetWidth <= 760) {
        tilted = card;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
      }

      const el = target?.closest<HTMLElement>(".btn-primary, [data-magnetic]") ?? null;
      if (el !== magnet) release();
      if (!el) return;
      magnet = el;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
    };
    const leaveAll = () => {
      release();
      untilt();
    };

    const onResize = () => {
      if (sized) resize();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", leaveAll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", leaveAll);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] size-full" />;
}
