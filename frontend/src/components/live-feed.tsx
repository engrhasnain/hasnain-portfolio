"use client";

import { useEffect, useState } from "react";

const events = [
  { tag: "RAG", tone: "text-teal border-teal/40 bg-teal/10", text: "Answered from 3 policy documents, with sources." },
  { tag: "MCP", tone: "text-sky-300 border-sky-400/40 bg-sky-400/10", text: "crm.find_customer → 1 match in 212 ms." },
  { tag: "WHATSAPP", tone: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10", text: "Appointment booked for Thursday, 4:30 PM." },
  { tag: "APPROVAL", tone: "text-rose-300 border-rose-400/40 bg-rose-400/10", text: "New service page drafted, waiting for a human yes." },
  { tag: "CALLS", tone: "text-violet-300 border-violet-400/40 bg-violet-400/10", text: "Call transcribed, summary and next steps saved." },
];

/**
 * A small "live" console that cycles through the kind of work my AI systems do.
 * Fixed width, so nothing around it moves while it "types"; the typing is a CSS reveal, not per-letter re-renders.
 */
export function LiveFeed({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [clock, setClock] = useState("--:--:--");
  const event = events[index];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % events.length), 3600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setClock(new Date().toLocaleTimeString("en-GB", { hour12: false }));
  }, [index]);

  return (
    <div
      className={`w-80 max-w-full rounded-2xl border border-white/10 bg-panel/70 p-4 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
        <span>Live agent feed</span>
        <span className="flex items-center gap-1.5 normal-case tracking-normal text-teal">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-teal opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-teal" />
          </span>
          running
        </span>
      </div>
      <div key={index} className="animate-in mt-3 min-h-[4.75rem]">
        <span className={`inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-semibold ${event.tone}`}>
          {clock} · {event.tag}
        </span>
        <p className="feed-type mt-2 text-sm leading-snug text-ink">
          {event.text}
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-teal motion-safe:animate-pulse" />
        </p>
      </div>
      <div className="mt-3 flex gap-1.5">
        {events.map((e, i) => (
          <span key={e.tag} className="relative h-1 w-5 overflow-hidden rounded-full bg-line">
            <span
              className={`absolute inset-0 origin-left rounded-full bg-brand transition-transform duration-500 ${
                i === index ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
