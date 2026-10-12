"use client";

import { useEffect, useRef } from "react";

type Node = { angle: number; radius: number; speed: number; size: number; phase: number; azure: boolean };

/**
 * A slowly orbiting constellation of AI "neurons" around a centre (my photo, the AI core).
 * Canvas 2D, pauses when off screen, and draws a still frame for reduced-motion users.
 * On phones it uses fewer nodes, a cheaper glow and 30 fps, and it only starts moving once the page has loaded.
 */
export function NeuralCanvas({ className, count = 72 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const light = window.matchMedia("(max-width: 1023px), (hover: none)").matches;
    const frameGap = light ? 1000 / 30 : 0;
    let lastFrame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999 };

    const nodes: Node[] = Array.from({ length: light ? Math.round(count * 0.55) : count }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.3 + Math.random() * 0.2,
      speed: (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1) * 0.0012,
      size: Math.random() * 1.6 + 0.7,
      phase: Math.random() * Math.PI * 2,
      azure: Math.random() < 0.45,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const base = Math.min(width, height);
      const points = nodes.map((n) => {
        if (!reduce) n.angle += n.speed;
        const r = n.radius * base * (1 + Math.sin(t * 0.0006 + n.phase) * 0.04);
        return { x: cx + Math.cos(n.angle) * r, y: cy + Math.sin(n.angle) * r * 0.92, n };
      });

      const linkDistance = base * 0.17;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const d = Math.hypot(dx, dy);
          if (d > linkDistance) continue;
          ctx.strokeStyle = `rgba(94, 234, 212, ${(1 - d / linkDistance) * 0.32})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      for (const p of points) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 110;
        const pulse = 0.6 + Math.sin(t * 0.003 + p.n.phase) * 0.4;
        if (near) {
          ctx.strokeStyle = "rgba(94, 234, 212, 0.45)";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = p.n.azure ? `rgba(96, 165, 250, ${0.55 + pulse * 0.45})` : `rgba(94, 234, 212, ${0.55 + pulse * 0.45})`;
        // canvas shadows are expensive, so phones skip the glow
        ctx.shadowColor = p.n.azure ? "#3B82F6" : "#5EEAD4";
        ctx.shadowBlur = light ? 0 : near ? 14 : 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.n.size * (near ? 1.8 : 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = (t: number) => {
      if (t - lastFrame >= frameGap) {
        draw(t);
        lastFrame = t;
      }
      if (running) frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    draw(0);

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    // Let the page finish loading (photo, name, text) before the network starts moving.
    const begin = () => visibility.observe(canvas);
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle ? window.requestIdleCallback(begin, { timeout: 2500 }) : window.setTimeout(begin, 1200);
    const sizing = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    sizing.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      visibility.disconnect();
      sizing.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
