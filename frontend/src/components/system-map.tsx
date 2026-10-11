import Link from "next/link";
import type { ComponentType, CSSProperties } from "react";
import { services } from "@/lib/services";
import {
  ArrowRight,
  BookOpen,
  Database,
  Globe,
  Mail,
  namedIcons,
  PhoneIcon,
  type IconProps,
  serviceIcons,
  Users,
  WhatsApp,
} from "./icons";
import { Reveal } from "./motion";
import { NeuralCanvas } from "./neural-canvas";
import { NodeChip } from "./node-chip";

type Item = { label: string; Icon: ComponentType<IconProps> };

// The kinds of data my systems work with (RAG chatbots, MCP servers, agents, WhatsApp and voice AI).
const inputs: Item[] = [
  { label: "Documents & PDFs", Icon: BookOpen },
  { label: "Website", Icon: Globe },
  { label: "CRM", Icon: Users },
  { label: "Databases", Icon: Database },
  { label: "Business APIs", Icon: namedIcons.plug },
  { label: "Email & inbox", Icon: Mail },
  { label: "Phone calls", Icon: PhoneIcon },
  { label: "WhatsApp chats", Icon: WhatsApp },
];

// Diagram geometry (SVG viewBox 1000 x 520). HTML chips are placed at the same points in %.
const W = 1000;
const H = 520;
const CORE = { x: 500, y: H / 2, r: 92 };
const spread = (count: number) => Array.from({ length: count }, (_, i) => 50 + (i * (H - 100)) / Math.max(1, count - 1));
const inY = spread(inputs.length);
const outY = spread(services.length);
const IN_X = 250;
const OUT_X = 750;

// Each chip is joined to the core by a "strand" of the neural network: chip -> node -> node -> core,
// and neighbouring strands are cross-linked, so the whole thing reads like the network around my photo.
type Pt = { x: number; y: number };
type Strand = { start: Pt; a: Pt; b: Pt; end: Pt };

const along = (from: Pt, to: Pt, t: number, bend: number): Pt => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: from.x + dx * t - (dy / len) * bend, y: from.y + dy * t + (dx / len) * bend };
};
const coreEdge = (p: Pt): Pt => {
  const dx = p.x - CORE.x;
  const dy = p.y - CORE.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: CORE.x + (dx / len) * CORE.r, y: CORE.y + (dy / len) * CORE.r };
};
const strand = (start: Pt, i: number): Strand => {
  const end = coreEdge(start);
  return { start, a: along(start, end, 0.34, i % 2 ? 11 : -11), b: along(start, end, 0.68, i % 2 ? -7 : 7), end };
};
const inStrands = inY.map((y, i) => strand({ x: IN_X + 10, y }, i));
const outStrands = outY.map((y, i) => strand({ x: OUT_X - 10, y }, i));

/** One side of the network. Nodes flash in a wave: inwards for data coming in, outwards for what I build. */
function Network({ strands, color, outward, delay }: { strands: Strand[]; color: string; outward: boolean; delay: number }) {
  const wave = (step: number, i: number) => ({ "--d": `${delay + (outward ? 2 - step : step) * 0.35 + i * 0.12}s` }) as CSSProperties;
  return (
    <g>
      {strands.map((s, i) => (
        <polyline
          key={`line-${i}`}
          points={`${s.start.x},${s.start.y} ${s.a.x},${s.a.y} ${s.b.x},${s.b.y} ${s.end.x},${s.end.y}`}
          fill="none"
          stroke={color}
          strokeOpacity="0.45"
          strokeWidth="1.1"
        />
      ))}
      {strands.slice(1).map((s, i) => {
        const prev = strands[i];
        return (
          <g key={`mesh-${i}`} stroke={color} strokeWidth="0.8">
            <line x1={prev.a.x} y1={prev.a.y} x2={s.a.x} y2={s.a.y} strokeOpacity="0.22" />
            <line x1={prev.b.x} y1={prev.b.y} x2={s.b.x} y2={s.b.y} strokeOpacity="0.22" />
            <line x1={prev.a.x} y1={prev.a.y} x2={s.b.x} y2={s.b.y} strokeOpacity="0.12" />
          </g>
        );
      })}
      <g filter="url(#net-glow)">
        {strands.map((s, i) => (
          <g key={`nodes-${i}`} fill={color}>
            <circle cx={s.start.x} cy={s.start.y} r="3" className="net-node" style={wave(0, i)} />
            <circle cx={s.a.x} cy={s.a.y} r="3.2" className="net-node" style={wave(1, i)} />
            <circle cx={s.b.x} cy={s.b.y} r="2.6" className="net-node" style={wave(2, i)} />
          </g>
        ))}
      </g>
    </g>
  );
}

/** The rings around the AI core. The hero photo uses the same ones, so both "cores" match. */
export function CoreRings() {
  return (
    <>
      <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-teal/50" />
      <span className="pulse-ring absolute inset-6 rounded-full border border-teal/60" />
      <span className="pulse-ring absolute inset-6 rounded-full border border-teal/60 [animation-delay:1.2s]" />
    </>
  );
}

function Core() {
  return (
    <div className="relative grid size-full place-items-center">
      <NeuralCanvas count={40} className="pointer-events-none absolute top-1/2 left-1/2 size-[250%] -translate-x-1/2 -translate-y-1/2" />
      <div className="animate-glow absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(94_234_212/0.35),transparent_65%)]" />
      <CoreRings />
      <div className="absolute inset-3 rounded-full border border-azure/40" />
      <div className="relative grid size-[68%] place-items-center rounded-full bg-brand text-center shadow-[0_0_60px_-6px_rgb(94_234_212/0.8)]">
        <div>
          <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-night/70 uppercase">AI core</p>
          <p className="mt-0.5 text-[13px] leading-tight font-extrabold text-night">
            Claude · GPT
            <br />
            Gemini · Groq
          </p>
        </div>
      </div>
    </div>
  );
}

/** "Your data in, useful AI out": what my systems read, the models, and what I build with them. */
export function SystemMap() {
  return (
    <>
      {/* Desktop: animated diagram */}
      <Reveal className="relative hidden lg:block">
        <div className="relative mx-auto aspect-[1000/520] w-full max-w-5xl">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
            <defs>
              <filter id="net-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Network strands={inStrands} color="#5EEAD4" outward={false} delay={0} />
            <Network strands={outStrands} color="#60A5FA" outward delay={1.2} />
          </svg>

          {inputs.map((item, i) => (
            <div
              key={item.label}
              className="absolute -translate-x-full -translate-y-1/2"
              style={{ left: `${(IN_X / W) * 100}%`, top: `${(inY[i] / H) * 100}%` }}
            >
              <NodeChip Icon={item.Icon} label={item.label} variant="in" reverse />
            </div>
          ))}

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(CORE.x / W) * 100}%`,
              top: `${(CORE.y / H) * 100}%`,
              width: `${((CORE.r * 2) / W) * 100}%`,
              aspectRatio: "1",
            }}
          >
            <Core />
          </div>

          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="group absolute -translate-y-1/2"
              style={{ left: `${(OUT_X / W) * 100}%`, top: `${(outY[i] / H) * 100}%` }}
            >
              <NodeChip
                Icon={serviceIcons[service.icon]}
                label={service.title}
                className="transition group-hover:border-teal/60 group-hover:text-teal group-hover:shadow-[0_0_24px_-6px_rgb(94_234_212/0.6)]"
                trailing={<ArrowRight className="text-muted transition group-hover:translate-x-1 group-hover:text-teal" />}
              />
            </Link>
          ))}
        </div>
      </Reveal>

      {/* Phones and tablets: the same story, stacked */}
      <div className="flex flex-col items-center gap-5 lg:hidden">
        <Reveal className="w-full">
          <p className="mb-3 text-center font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Your data</p>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {inputs.map((item) => (
              <li key={item.label}>
                <NodeChip Icon={item.Icon} label={item.label} variant="in" className="w-full whitespace-normal" />
              </li>
            ))}
          </ul>
        </Reveal>
        <span className="h-10 w-px bg-linear-to-b from-transparent to-teal" aria-hidden="true" />
        <Reveal className="size-44">
          <Core />
        </Reveal>
        <span className="h-10 w-px bg-linear-to-b from-azure to-transparent" aria-hidden="true" />
        <Reveal className="w-full">
          <p className="mb-3 text-center font-mono text-[11px] tracking-[0.2em] text-muted uppercase">What I build</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className="block">
                  <NodeChip
                    Icon={serviceIcons[service.icon]}
                    label={service.title}
                    className="w-full py-2.5"
                    trailing={<ArrowRight className="ml-auto text-muted" />}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  );
}
