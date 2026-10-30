import Image from "next/image";
import type { ReactNode } from "react";
import { publicFileExists } from "@/lib/public-file";
import { site } from "@/lib/site";
import { ToolLogo } from "./tool-chip";

/**
 * The site's signature pieces, all in the brand teal:
 * - Scribble: a hand-drawn underline that draws itself in under a few key words
 * - LogoBand: the tools I build with, as a slow logo band
 * - MarginNote: a handwritten note with a hand-drawn arrow
 * - EngineerBadge: the hero picture, my ID badge on a lanyard
 */

/** Words with a hand-drawn underline. Keep it to 1 to 3 short words, on at most a few headings per page. */
export function Scribble({ children, onLoad = false }: { children: ReactNode; onLoad?: boolean }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className={`scribble pointer-events-none absolute -bottom-[0.2em] left-[-2%] h-[0.34em] w-[104%] ${onLoad ? "scribble-load" : ""}`}
      >
        <path
          d="M4 16 C 52 7, 104 5, 158 10 S 236 19, 296 8"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** Tools I build with, as a slow logo band. Hover pauses it; reduced-motion users get a static row. */
export function LogoBand({ tools }: { tools: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
      {tools.map((t) => (
        <li key={t} className="logo-item flex items-center gap-3 text-[0.95rem] font-bold whitespace-nowrap text-ink/55">
          <ToolLogo name={t} size={24} />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="logo-band relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="logo-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** A hand-drawn arrow for margin notes. `d` is the stroke; the head is drawn at its end. */
function HandArrow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 90 70" className={`overflow-visible ${flip ? "-scale-x-100" : ""} ${className}`}>
      <path d="M6 8 C 30 4, 58 14, 72 50" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M60 44 L 72 52 L 77 38" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A handwritten note in the margin, with an arrow. */
export function MarginNote({ children, className = "", arrowClass = "", flip = false }: {
  children: ReactNode;
  className?: string;
  arrowClass?: string;
  flip?: boolean;
}) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute flex items-start gap-1 font-hand text-[1.35rem] leading-none font-bold text-teal ${className}`}>
      <span className="max-w-[9rem] -rotate-3">{children}</span>
      <HandArrow className={`mt-3 h-10 w-12 shrink-0 ${arrowClass}`} flip={flip} />
    </span>
  );
}

/** Hero picture: an engineer's ID badge on a lanyard, tilted, that straightens when you point at it. */
export function EngineerBadge({ role, credential }: { role: string; credential?: string }) {
  const hasPhoto = publicFileExists(site.photo);
  return (
    <div className="relative mx-auto w-[280px] pt-24 sm:w-[320px]">
      {/* lanyard straps meeting at the clip */}
      <svg aria-hidden="true" viewBox="0 0 160 100" className="absolute top-0 left-1/2 h-24 w-40 -translate-x-1/2">
        <path d="M18 0 L 74 92" stroke="#5eead4" strokeOpacity={0.55} strokeWidth={9} strokeLinecap="round" />
        <path d="M142 0 L 86 92" stroke="#5eead4" strokeOpacity={0.35} strokeWidth={9} strokeLinecap="round" />
        <rect x="68" y="84" width="24" height="16" rx="4" fill="#9097ae" />
      </svg>
      <div className="badge group relative rotate-[-5deg] rounded-[1.75rem] border border-white/10 bg-[#0f1733] p-4 shadow-[0_50px_90px_-40px_rgb(0_0_0/0.95)] transition-transform duration-700 ease-out hover:rotate-0">
        <div className="mx-auto mb-3.5 h-2.5 w-14 rounded-full bg-[#0a0f1f] ring-1 ring-white/10" />
        <div className="relative aspect-[1/1.05] overflow-hidden rounded-2xl bg-panel">
          {hasPhoto ? (
            <Image
              src={site.photo}
              alt={`${site.name}, ${role}`}
              fill
              priority
              sizes="(min-width: 640px) 290px, 250px"
              className="object-cover"
            />
          ) : (
            <span className="grid size-full place-items-center text-5xl font-extrabold text-teal">{site.initials}</span>
          )}
        </div>
        <div className="px-1 pt-4">
          <p className="text-[0.62rem] font-extrabold tracking-[0.18em] text-teal uppercase">{role}</p>
          <p className="mt-1.5 text-[1.3rem] leading-tight font-extrabold tracking-tight">{site.name}</p>
          {credential ? <p className="mt-1 text-xs text-ink/60">{credential}</p> : null}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-ink/85">
              <span className="size-2 rounded-full bg-teal" aria-hidden="true" /> Taking new projects
            </span>
            <span aria-hidden="true" className="flex h-5 items-end gap-[2px] opacity-60">
              {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2].map((w, i) => (
                <span key={i} className="h-full bg-ink" style={{ width: w }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
