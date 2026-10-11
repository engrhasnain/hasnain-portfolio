import type { CSSProperties } from "react";
import { NeuralCanvas } from "./neural-canvas";
import { ToolChip, ToolLogo, toolBrand } from "./tool-chip";

export type StackGroup = { label: string; note: string; tools: string[] };

// Ring sizes (radius as % of the orbit's width) and spin speeds, inner to outer.
const RINGS = [
  { radius: 19, seconds: 38, reverse: false },
  { radius: 32, seconds: 56, reverse: true },
  { radius: 46, seconds: 90, reverse: false },
];

const at = (radius: number, i: number, count: number, offset: number) => {
  const a = ((i / count) * 360 + offset) * (Math.PI / 180);
  return { x: 50 + radius * Math.cos(a), y: 50 + radius * Math.sin(a) };
};

/**
 * "Tools I ship with": every tool orbits an AI core on three rings (AI models, AI and automation, build and ship),
 * joined by the same neural-network lines as the hero. Hover a group on the left to light up its ring.
 */
export function StackOrbit({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="stack-orbit grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
      <ul className="flex flex-col gap-3">
        {groups.map((group, g) => (
          <li
            key={group.label}
            data-ring={g + 1}
            className="stack-legend card card-hover cursor-default p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-3">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full rounded-full bg-teal opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Ring {g + 1}</span>
                <span className="text-base font-bold text-ink">{group.label}</span>
              </p>
              <span className="text-gradient font-mono text-sm font-bold">{group.tools.length}</span>
            </div>
            <p className="mt-1.5 text-sm text-muted">{group.note}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.tools.map((tool) => (
                <li key={tool}>
                  <ToolChip name={tool} size="sm" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="orbit-stage relative order-first mx-auto aspect-square w-full max-w-[560px] lg:order-none">
        {/* radar sweep and glow */}
        <div className="absolute inset-[3%] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.12),transparent_68%)]" />
        <div className="orbit-radar absolute inset-[3%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg_290deg,rgb(94_234_212/0.22)_360deg)] [mask-image:radial-gradient(circle,black_55%,transparent_71%)]" />

        {/* ring tracks */}
        {RINGS.map((ring, r) => (
          <div
            key={ring.radius}
            data-ring={r + 1}
            className="orbit-track absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/15 shadow-[inset_0_0_30px_-12px_rgb(94_234_212/0.35)]"
            style={{ width: `${ring.radius * 2}%`, height: `${ring.radius * 2}%` }}
          />
        ))}

        {/* the AI core, with the hero's neural network around it */}
        <NeuralCanvas count={34} className="pointer-events-none absolute top-1/2 left-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 grid size-[21%] -translate-x-1/2 -translate-y-1/2 place-items-center">
          <span className="pulse-ring absolute inset-0 rounded-full border border-teal/60" />
          <span className="pulse-ring absolute inset-0 rounded-full border border-teal/60 [animation-delay:1.2s]" />
          <span className="animate-spin-slow absolute -inset-[8%] rounded-full bg-[conic-gradient(from_0deg,#5EEAD4,#3B82F6,#0B1020_40%,#0B1020_60%,#3B82F6_80%,#5EEAD4)]" />
          <span className="relative grid size-full place-items-center rounded-full bg-brand text-center shadow-[0_0_50px_-6px_rgb(94_234_212/0.8)]">
            <span>
              <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-night/70 uppercase sm:text-[10px]">
                Stack
              </span>
              <span className="block text-sm leading-tight font-extrabold text-night sm:text-base">
                Model
                <br />→ Cloud
              </span>
            </span>
          </span>
        </div>

        {/* the three rings of tools, each spinning, with network lines that turn with them */}
        {groups.slice(0, RINGS.length).map((group, r) => {
          const ring = RINGS[r];
          const offset = r * 25;
          const points = group.tools.map((_, i) => at(ring.radius, i, group.tools.length, offset));
          return (
            <div
              key={group.label}
              data-ring={r + 1}
              className="orbit-ring absolute inset-0"
              style={
                {
                  "--spin": `${ring.seconds}s`,
                  "--dir": ring.reverse ? "reverse" : "normal",
                  // tiles spin the other way at the same speed, so logos stay upright
                  "--cdir": ring.reverse ? "normal" : "reverse",
                } as CSSProperties
              }
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
                {points.map((p, i) => {
                  const next = points[(i + 1) % points.length];
                  return (
                    <g key={i}>
                      <line x1="50" y1="50" x2={p.x} y2={p.y} stroke="#5EEAD4" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <line x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#5EEAD4" strokeOpacity="0.28" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </g>
                  );
                })}
              </svg>
              {group.tools.map((tool, i) => {
                const p = points[i];
                return (
                  <div
                    key={tool}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <div className="orbit-counter">
                      <div
                        className="orbit-tile group relative grid size-10 place-items-center rounded-xl border border-white/10 bg-panel shadow-[0_8px_20px_-8px_rgb(0_0_0/0.9)] sm:size-12"
                        style={{ "--brand": toolBrand(tool).color } as CSSProperties}
                      >
                        <ToolLogo name={tool} size={r === 2 ? 20 : 22} />
                        <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md border border-line bg-night px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-ink opacity-0 transition group-hover:opacity-100">
                          {tool}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
