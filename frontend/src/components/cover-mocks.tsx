import type { ReactNode } from "react";
import { BookOpen, Check, namedIcons, typeIcons, WhatsApp } from "./icons";

// Realistic product mockups for project covers, built from HTML/CSS (no image files).
// Every size is in `em`, and .mock-root sets 1em from the cover's size, so they scale from phone cards to the big cover.
// .seq-N replays the conversation step by step; .tilt gives the 3D angle that straightens on hover.

export type MockArt = "platform" | "chat" | "mcp" | "salestalk" | "whatsapp" | "pdf";

const surface = "bg-[#0F1531]";
const raised = "bg-[#18214A]";

function Window({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div
      className={`overflow-hidden rounded-[0.9em] border border-white/10 ${surface} shadow-[0_1.4em_3em_-0.8em_rgb(0_0_0/0.8),0_0_2.4em_-0.8em_rgb(94_234_212/0.35)] ${className}`}
    >
      <div className="flex items-center gap-[0.32em] border-b border-white/[0.06] bg-[#131B3D] px-[0.75em] py-[0.5em]">
        <span className="size-[0.42em] rounded-full bg-[#FF5F57]" />
        <span className="size-[0.42em] rounded-full bg-[#FEBC2E]" />
        <span className="size-[0.42em] rounded-full bg-[#28C840]" />
        <span className="ml-[0.55em] font-mono text-[0.46em] tracking-wide text-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Typing() {
  return (
    <span className="typing inline-flex gap-[0.25em] rounded-full border border-white/10 bg-[#18214A] px-[0.7em] py-[0.55em]">
      <span className="size-[0.4em] rounded-full bg-muted" />
      <span className="size-[0.4em] rounded-full bg-muted" />
      <span className="size-[0.4em] rounded-full bg-muted" />
    </span>
  );
}

function ChatMock() {
  return (
    <div className="relative w-[25em]">
      <Window title="business-assistant · live" className="w-[19.5em]">
        <div className="flex items-center justify-between px-[0.8em] pt-[0.65em]">
          <div className="flex gap-[0.2em] rounded-full border border-white/[0.06] bg-night p-[0.18em] text-[0.46em] font-semibold">
            <span className="rounded-full bg-brand px-[0.9em] py-[0.3em] text-night">Claude</span>
            <span className="px-[0.9em] py-[0.3em] text-muted">GPT</span>
            <span className="px-[0.9em] py-[0.3em] text-muted">Gemini</span>
          </div>
          <span className="flex items-center gap-[0.35em] font-mono text-[0.42em] text-teal">
            <span className="size-[0.6em] rounded-full bg-teal shadow-[0_0_0.6em_#5EEAD4]" /> RAG · 248 docs
          </span>
        </div>
        <div className="flex flex-col gap-[0.55em] px-[0.8em] pt-[0.7em] pb-[0.5em] text-[0.54em] leading-snug">
          <p className="seq-1 ml-auto max-w-[78%] rounded-[1em] rounded-br-[0.3em] bg-brand px-[0.9em] py-[0.5em] font-semibold text-night">
            What&apos;s your refund policy?
          </p>
          <div className="seq-2 flex max-w-[90%] gap-[0.5em]">
            <span className="mt-[0.1em] size-[1.6em] shrink-0 rounded-full bg-brand shadow-[0_0_0.8em_rgb(94_234_212/0.6)]" />
            <div className={`rounded-[1em] rounded-tl-[0.3em] border border-white/10 ${raised} px-[0.9em] py-[0.55em] text-ink`}>
              Refunds are accepted within 14 days with the original receipt.
              <span className="mt-[0.5em] flex w-fit items-center gap-[0.4em] rounded-[0.5em] border border-teal/40 bg-teal/10 px-[0.55em] py-[0.2em] font-mono text-[0.82em] text-teal">
                <BookOpen /> refund-policy.pdf · p.2
              </span>
            </div>
          </div>
          <p className="seq-3 ml-auto max-w-[78%] rounded-[1em] rounded-br-[0.3em] bg-brand px-[0.9em] py-[0.5em] font-semibold text-night">
            Make a promo image for it
          </p>
          <div className="seq-4 flex items-center gap-[0.5em]">
            <span className="size-[1.6em] shrink-0 rounded-full bg-brand" />
            <Typing />
          </div>
        </div>
        <div className="mx-[0.8em] mb-[0.75em] flex items-center justify-between rounded-full border border-white/[0.07] bg-night px-[0.8em] py-[0.4em] text-[0.48em] text-muted">
          Ask anything about your business…
          <span className="grid size-[1.6em] place-items-center rounded-full bg-brand text-night">↑</span>
        </div>
      </Window>

      {/* generated image, floating beside the chat */}
      <div className="seq-5 absolute top-[3.2em] -right-[0.4em] w-[7em]">
      <div className="rotate-[4deg]">
      <div className="animate-float rounded-[0.8em] border border-white/10 bg-[#131B3D] p-[0.35em] shadow-[0_1.2em_2.4em_-0.6em_rgb(0_0_0/0.85)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[0.55em] bg-[linear-gradient(160deg,#3B82F6,#5EEAD4_55%,#F59E0B)]">
          <span className="absolute top-[18%] right-[18%] size-[1.2em] rounded-full bg-[#FEF3C7] shadow-[0_0_1em_#FEF3C7]" />
          <span className="absolute -bottom-[1.2em] -left-[0.5em] h-[3em] w-[5em] rotate-[-8deg] rounded-[40%] bg-[#0B1020]/80" />
          <span className="absolute -right-[1em] -bottom-[1.4em] h-[3.2em] w-[5.4em] rotate-[10deg] rounded-[40%] bg-[#121933]" />
          <span className="absolute bottom-[0.35em] left-[0.45em] font-extrabold text-[0.55em] text-white">14-DAY REFUNDS</span>
        </div>
        <p className="mt-[0.35em] flex items-center justify-between px-[0.2em] font-mono text-[0.4em] text-muted">
          promo.png <span className="text-teal">✓ generated</span>
        </p>
      </div>
      </div>
      </div>
    </div>
  );
}

const calls = [
  { server: "crm", tool: "find_clients", ms: "84ms" },
  { server: "billing", tool: "list_invoices", ms: "132ms" },
  { server: "files", tool: "search", ms: "61ms" },
];
const activeTiles = [2, 7, 11];

function McpMock() {
  return (
    <div className="relative flex w-[26em] items-center gap-[1.1em]">
      <Window title="claude · agent" className="w-[16em] shrink-0">
        <div className="px-[0.8em] py-[0.75em] text-[0.54em]">
          <p className={`rounded-[0.9em] ${raised} px-[0.9em] py-[0.55em] text-ink`}>
            Find overdue invoices for our top 3 clients
          </p>
          <ul className="mt-[0.75em] flex flex-col gap-[0.45em] font-mono text-[0.88em]">
            {calls.map((c, i) => (
              <li
                key={c.tool}
                className={`seq-${i + 1} flex items-center gap-[0.55em] rounded-[0.6em] border border-white/[0.07] bg-night px-[0.7em] py-[0.45em]`}
              >
                <span className="grid size-[1.3em] place-items-center rounded-full bg-teal/15 text-teal">
                  <Check />
                </span>
                <span>
                  <span className="text-sky-300">{c.server}</span>
                  <span className="text-muted">.</span>
                  <span className="text-ink">{c.tool}</span>
                </span>
                <span className="ml-auto text-muted">{c.ms}</span>
              </li>
            ))}
          </ul>
          <p className="seq-4 mt-[0.75em] rounded-[0.6em] border border-teal/30 bg-teal/10 px-[0.7em] py-[0.45em] text-ink">
            <span className="font-semibold text-teal">3 overdue invoices</span> found across 2 systems.
          </p>
        </div>
      </Window>

      <div className="absolute top-1/2 left-[15.4em] h-px w-[1.8em] border-t border-dashed border-teal/70" aria-hidden="true" />

      <div className={`w-[8.6em] shrink-0 rounded-[0.9em] border border-white/10 ${surface} p-[0.65em] shadow-[0_1.4em_3em_-0.8em_rgb(0_0_0/0.8)]`}>
        <p className="font-mono text-[0.4em] tracking-[0.2em] text-muted uppercase">17 MCPs</p>
        <div className="mt-[0.5em] grid grid-cols-5 gap-[0.28em]">
          {Array.from({ length: 17 }, (_, i) => (
            <span
              key={i}
              className={`grid aspect-square place-items-center rounded-[0.3em] border ${
                activeTiles.includes(i)
                  ? "tile-pulse border-teal/70 bg-teal/25"
                  : "border-white/[0.07] bg-[#18214A]"
              }`}
              style={activeTiles.includes(i) ? { animationDelay: `${activeTiles.indexOf(i) * 0.5}s` } : undefined}
            >
              <span className={`size-[0.3em] rounded-full ${activeTiles.includes(i) ? "bg-teal" : "bg-teal/30"}`} />
            </span>
          ))}
        </div>
        <div className="mt-[0.6em] flex items-baseline justify-between">
          <span className="text-[1.3em] leading-none font-extrabold text-ink">6</span>
          <span className="font-mono text-[0.42em] text-teal">servers · 1,000+ tools</span>
        </div>
      </div>
    </div>
  );
}

const topCustomers = [
  { name: "Al Fajr Import & Export", city: "Dubai", aed: "58,645", w: 100 },
  { name: "Al Noor Hypermarket", city: "Riyadh", aed: "42,488", w: 72 },
  { name: "Al Safa Foodstuff", city: "Dubai", aed: "38,084", w: 65 },
];
const cityRevenue = [
  { city: "Dubai", w: 100 },
  { city: "Riyadh", w: 81 },
  { city: "Jeddah", w: 64 },
  { city: "Abu Dhabi", w: 31 },
];

function SalesTalkMock() {
  return (
    <div className="relative flex w-[26em] items-center gap-[1em]">
      <Window title="claude · salestalk" className="w-[16.4em] shrink-0">
        <div className="px-[0.8em] py-[0.75em] text-[0.54em]">
          <p className="seq-1 ml-auto w-fit max-w-[85%] rounded-[1em] rounded-br-[0.3em] bg-brand px-[0.9em] py-[0.5em] font-semibold text-night">
            Top customers last month?
          </p>
          <p className="seq-2 mt-[0.7em] flex items-center gap-[0.55em] rounded-[0.6em] border border-white/[0.07] bg-night px-[0.7em] py-[0.45em] font-mono text-[0.88em]">
            <span className="grid size-[1.3em] place-items-center rounded-full bg-teal/15 text-teal">
              <Check />
            </span>
            <span>
              <span className="text-sky-300">query_sales</span>
              <span className="text-muted">(</span>
              <span className="text-amber-300">&quot;last_month&quot;</span>
              <span className="text-muted">)</span>
            </span>
            <span className="ml-auto text-muted">459ms</span>
          </p>
          <ul className="seq-3 mt-[0.6em] flex flex-col gap-[0.45em]">
            {topCustomers.map((c, i) => (
              <li key={c.name} className="grid grid-cols-[1em_1fr_auto] items-center gap-x-[0.5em] gap-y-[0.2em]">
                <span className="font-mono text-[0.85em] text-muted">{i + 1}</span>
                <span className="truncate text-ink">
                  {c.name} <span className="text-muted">· {c.city}</span>
                </span>
                <span className="font-mono text-[0.85em] text-ink">{c.aed}</span>
                <span className="col-start-2 col-end-4 h-[0.35em] overflow-hidden rounded-full bg-white/[0.06]">
                  <span className="block h-full rounded-full bg-brand" style={{ width: `${c.w}%` }} />
                </span>
              </li>
            ))}
          </ul>
          <p className="seq-5 mt-[0.7em] flex items-center gap-[0.55em] rounded-[0.6em] border border-red-400/40 bg-red-500/10 px-[0.7em] py-[0.45em] font-mono text-[0.88em]">
            <span className="text-red-300">✕</span>
            <span className="text-ink">DELETE FROM orders</span>
            <span className="ml-auto font-sans font-semibold text-red-300">refused</span>
          </p>
        </div>
      </Window>

      <div className={`seq-4 w-[8.6em] shrink-0 rounded-[0.9em] border border-white/10 ${surface} p-[0.65em] shadow-[0_1.4em_3em_-0.8em_rgb(0_0_0/0.8)]`}>
        <p className="flex items-center justify-between font-mono text-[0.4em] tracking-[0.2em] text-muted uppercase">
          PostgreSQL
          <span className="flex items-center gap-[0.4em] tracking-normal text-teal normal-case">
            <span className="tile-pulse size-[0.7em] rounded-full bg-teal" /> read-only
          </span>
        </p>
        <p className="mt-[0.7em] font-mono text-[0.38em] text-muted">revenue_by_city · this quarter</p>
        <ul className="mt-[0.45em] flex flex-col gap-[0.42em]">
          {cityRevenue.map((c) => (
            <li key={c.city} className="flex flex-col gap-[0.18em]">
              <span className="text-[0.42em] text-ink">{c.city}</span>
              <span className="h-[0.38em] overflow-hidden rounded-full bg-white/[0.06]">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${c.w}%` }} />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-[0.7em] flex items-baseline justify-between">
          <span className="text-[1.3em] leading-none font-extrabold text-ink">6</span>
          <span className="font-mono text-[0.42em] text-teal">tools · SELECT only</span>
        </div>
      </div>
    </div>
  );
}

const flow = [
  { label: "WhatsApp webhook", Icon: WhatsApp },
  { label: "Groq · Llama 3", Icon: typeIcons.Models },
  { label: "Calendar check", Icon: Check },
  { label: "Send reply", Icon: typeIcons.Chatbots },
];

function WhatsAppMock() {
  return (
    <div className="relative flex w-[24em] items-center justify-center gap-[1.4em]">
      <ol className="flex w-[8.6em] flex-col">
        {flow.map(({ label, Icon }, i) => (
          <li key={label} className="flex flex-col items-start">
            <div className={`seq-${i + 1} flex w-full items-center gap-[0.5em] rounded-[0.7em] border border-white/10 ${surface} px-[0.55em] py-[0.45em] shadow-[0_0.8em_1.6em_-0.6em_rgb(0_0_0/0.8)]`}>
              <span className="grid size-[1.5em] shrink-0 place-items-center rounded-[0.45em] bg-brand text-[0.62em] text-night">
                <Icon />
              </span>
              <span className="text-[0.48em] font-semibold text-ink">{label}</span>
              <span className="ml-auto text-[0.5em] text-teal">✓</span>
            </div>
            {i < flow.length - 1 ? <span className="ml-[0.95em] h-[0.7em] border-l border-dashed border-teal/60" /> : null}
          </li>
        ))}
      </ol>

      <div className="relative h-[14.2em] w-[8.4em] shrink-0 rounded-[1.4em] border-[0.28em] border-[#1C2547] bg-[#0A0F1E] p-[0.3em] shadow-[0_1.4em_3em_-0.8em_rgb(0_0_0/0.85),0_0_2.4em_-0.8em_rgb(94_234_212/0.4)]">
        <span className="absolute top-[0.35em] left-1/2 h-[0.45em] w-[2.6em] -translate-x-1/2 rounded-full bg-[#1C2547]" />
        <div className="flex h-full flex-col overflow-hidden rounded-[1.1em] bg-[#0E1428]">
          <div className="flex items-center gap-[0.4em] bg-[#131B3D] px-[0.55em] pt-[0.95em] pb-[0.45em]">
            <span className="size-[1.2em] rounded-full bg-brand" />
            <span className="leading-tight">
              <span className="block text-[0.44em] font-bold text-ink">AI Assistant</span>
              <span className="block text-[0.36em] text-teal">online</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-[0.4em] bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.04)_1px,transparent_0)] bg-[length:0.8em_0.8em] p-[0.5em] text-[0.42em] leading-snug">
            <p className="seq-1 max-w-[85%] rounded-[0.9em] rounded-tl-[0.25em] bg-[#1E2850] px-[0.7em] py-[0.4em] text-ink">
              Hi! Any slot tomorrow?
            </p>
            <p className="seq-2 ml-auto max-w-[85%] rounded-[0.9em] rounded-tr-[0.25em] bg-teal px-[0.7em] py-[0.4em] font-medium text-night">
              Yes, 4:30 PM is free. Shall I book it?
            </p>
            <p className="seq-3 max-w-[85%] rounded-[0.9em] rounded-tl-[0.25em] bg-[#1E2850] px-[0.7em] py-[0.4em] text-ink">
              Yes please
            </p>
            <p className="seq-4 ml-auto max-w-[85%] rounded-[0.9em] rounded-tr-[0.25em] bg-teal px-[0.7em] py-[0.4em] font-medium text-night">
              ✓ Booked: tomorrow, 4:30 PM
            </p>
            <p className="seq-5 max-w-[85%] rounded-[0.9em] rounded-tl-[0.25em] bg-[#1E2850] px-[0.7em] py-[0.4em] text-ink" dir="rtl">
              شكراً جزيلاً!
            </p>
          </div>
          <div className="m-[0.4em] rounded-full bg-[#131B3D] px-[0.6em] py-[0.35em] text-[0.38em] text-muted">Message</div>
        </div>
      </div>
    </div>
  );
}

function PdfMock() {
  return (
    <div className="relative flex w-[25em] items-center gap-[1em]">
      <div className="relative h-[13.4em] w-[9.8em] shrink-0 rotate-[-2deg] rounded-[0.5em] bg-[#EEF1F8] p-[0.75em] shadow-[0_1.4em_3em_-0.8em_rgb(0_0_0/0.85)]">
        <p className="flex justify-between font-mono text-[0.38em] text-[#5B6382]">
          research-paper.pdf <span>p. 12</span>
        </p>
        <p className="mt-[0.5em] text-[0.62em] leading-tight font-extrabold text-[#0B1020]">4. Discussion</p>
        <div className="mt-[0.45em] flex flex-col gap-[0.32em]">
          {[96, 88, 92, 70].map((w, i) => (
            <span key={i} className="h-[0.32em] rounded-full bg-[#C9CFDF]" style={{ width: `${w}%` }} />
          ))}
          <span className="seq-2 -mx-[0.25em] flex flex-col gap-[0.32em] rounded-[0.3em] bg-teal/45 px-[0.25em] py-[0.25em] ring-1 ring-teal">
            {[94, 90, 64].map((w, i) => (
              <span key={i} className="h-[0.32em] rounded-full bg-[#0B1020]/55" style={{ width: `${w}%` }} />
            ))}
          </span>
          {[90, 95, 84, 92, 60, 88, 76].map((w, i) => (
            <span key={i} className="h-[0.32em] rounded-full bg-[#C9CFDF]" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>

      <Window title="pdf-qa · 12 files" className="w-[14em] shrink-0">
        <div className="flex flex-col gap-[0.55em] px-[0.8em] py-[0.75em] text-[0.52em] leading-snug">
          <p className="seq-1 ml-auto max-w-[85%] rounded-[1em] rounded-br-[0.3em] bg-brand px-[0.9em] py-[0.5em] font-semibold text-night">
            What does the study conclude?
          </p>
          <div className={`seq-3 rounded-[1em] rounded-tl-[0.3em] border border-white/10 ${raised} px-[0.9em] py-[0.55em] text-ink`}>
            Earlier screening lowers long-term treatment costs.
            <span className="mt-[0.5em] flex w-fit items-center gap-[0.4em] rounded-[0.5em] border border-teal/40 bg-teal/10 px-[0.55em] py-[0.2em] font-mono text-[0.82em] text-teal">
              <BookOpen /> p.12 · ¶3
            </span>
          </div>
          <p className="seq-4 ml-auto max-w-[85%] rounded-[1em] rounded-br-[0.3em] bg-brand px-[0.9em] py-[0.5em] font-semibold text-night">
            Any limitations?
          </p>
          <div className="seq-5">
            <Typing />
          </div>
        </div>
      </Window>
    </div>
  );
}


const navItems = [
  { label: "Overview", icon: "gauge" },
  { label: "Clients", icon: "users" },
  { label: "Content", icon: "content" },
  { label: "SEO", icon: "search" },
  { label: "Social", icon: "social" },
  { label: "Calls", icon: "voice" },
  { label: "Billing", icon: "billing" },
];
const kpis = [
  { value: "3", label: "apps" },
  { value: "1,400+", label: "endpoints" },
  { value: "50+", label: "integrations" },
  { value: "1,000+", label: "MCP tools" },
];
const approvals = [
  { what: "Service page", detail: "Roof repair", done: false },
  { what: "Profile post", detail: "Spring offer", done: false },
  { what: "Review reply", detail: "5 stars", done: true },
];
const jobs = [
  { name: "seo.rank_check", running: false },
  { name: "reviews.sync", running: false },
  { name: "social.publish", running: true },
  { name: "calls.summarize", running: false },
];

function PlatformMock() {
  return (
    <div className="relative w-[25em]">
      <Window title="mission-control" className="w-[22em]">
        <div className="flex">
          <nav className="flex w-[4.9em] shrink-0 flex-col gap-[0.2em] border-r border-white/[0.06] bg-[#0D1330] p-[0.4em]">
            {navItems.map((item, i) => {
              const Icon = namedIcons[item.icon];
              return (
                <span
                  key={item.label}
                  className={`flex items-center gap-[0.4em] rounded-[0.4em] px-[0.4em] py-[0.32em] text-[0.42em] font-semibold ${
                    i === 0 ? "bg-teal/15 text-teal" : "text-muted"
                  }`}
                >
                  <Icon className="shrink-0" />
                  {item.label}
                </span>
              );
            })}
          </nav>
          <div className="min-w-0 flex-1 p-[0.6em]">
            <div className="flex items-center justify-between">
              <span className="text-[0.6em] font-extrabold text-ink">Mission Control</span>
              <span className="flex items-center gap-[0.35em] font-mono text-[0.38em] text-teal">
                <span className="size-[0.6em] rounded-full bg-teal shadow-[0_0_0.6em_#5EEAD4]" /> all systems running
              </span>
            </div>
            <div className="mt-[0.5em] grid grid-cols-4 gap-[0.3em]">
              {kpis.map((k) => (
                <div key={k.label} className={`rounded-[0.5em] border border-white/[0.07] ${raised} px-[0.4em] py-[0.35em]`}>
                  <span className="text-gradient block text-[0.68em] leading-tight font-extrabold">{k.value}</span>
                  <span className="block font-mono text-[0.32em] tracking-wider text-muted uppercase">{k.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-[0.5em] grid grid-cols-[1.25fr_1fr] gap-[0.4em]">
              <div className="rounded-[0.5em] border border-white/[0.07] bg-night p-[0.4em]">
                <p className="font-mono text-[0.34em] tracking-[0.18em] text-muted uppercase">Needs approval</p>
                <ul className="mt-[0.35em] flex flex-col gap-[0.25em]">
                  {approvals.map((a, i) => (
                    <li
                      key={a.what}
                      className={`seq-${i + 1} flex items-center justify-between gap-[0.3em] rounded-[0.35em] bg-[#131B3D] px-[0.4em] py-[0.3em] text-[0.4em]`}
                    >
                      <span className="truncate text-ink">
                        {a.what} <span className="text-muted">· {a.detail}</span>
                      </span>
                      {a.done ? (
                        <span className="shrink-0 font-semibold text-teal">✓ Approved</span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-brand px-[0.7em] py-[0.15em] font-bold text-night">Approve</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[0.5em] border border-white/[0.07] bg-night p-[0.4em]">
                <p className="font-mono text-[0.34em] tracking-[0.18em] text-muted uppercase">Scheduled jobs</p>
                <ul className="mt-[0.35em] flex flex-col gap-[0.3em] font-mono text-[0.38em]">
                  {jobs.map((j) => (
                    <li key={j.name} className="flex items-center justify-between gap-[0.4em]">
                      <span className="truncate text-sky-300">{j.name}</span>
                      {j.running ? (
                        <span className="tile-pulse size-[0.8em] shrink-0 rounded-full border border-teal/70 bg-teal/25" />
                      ) : (
                        <span className="shrink-0 text-teal">✓</span>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-[0.5em] flex h-[1.6em] items-end gap-[0.15em]">
                  {[40, 62, 48, 75, 58, 88, 70, 95].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t-[0.15em] bg-brand opacity-80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Window>

      {/* Claude working through the MCP layer, floating over the dashboard */}
      <div className="seq-4 absolute -right-[0.2em] -bottom-[1.2em] w-[9.4em]">
        <div className="animate-float rounded-[0.7em] border border-teal/40 bg-[#131B3D] p-[0.5em] shadow-[0_1.2em_2.4em_-0.6em_rgb(0_0_0/0.85),0_0_1.6em_-0.4em_rgb(94_234_212/0.5)]">
          <p className="flex items-center justify-between font-mono text-[0.36em] text-muted">
            claude · mcp <span className="text-teal">● live</span>
          </p>
          <p className="mt-[0.35em] flex items-center justify-between gap-[0.4em] rounded-[0.4em] bg-night px-[0.45em] py-[0.3em] font-mono text-[0.4em]">
            <span>
              <span className="text-sky-300">profile</span>
              <span className="text-muted">.</span>
              <span className="text-ink">create_post</span>
            </span>
            <span className="text-teal">✓ 120ms</span>
          </p>
          <p className="mt-[0.3em] text-[0.38em] text-muted">Draft sent for approval</p>
        </div>
      </div>
    </div>
  );
}

const mocks: Record<MockArt, () => ReactNode> = {
  platform: PlatformMock,
  chat: ChatMock,
  mcp: McpMock,
  salestalk: SalesTalkMock,
  whatsapp: WhatsAppMock,
  pdf: PdfMock,
};

export function isMockArt(value: string | undefined): value is MockArt {
  return !!value && value in mocks;
}

export function CoverMock({ art }: { art: MockArt }) {
  const Mock = mocks[art];
  return (
    <div className="mock-root absolute inset-0 grid place-items-center pt-[1.1em]">
      <div className="tilt">
        <Mock />
      </div>
    </div>
  );
}
