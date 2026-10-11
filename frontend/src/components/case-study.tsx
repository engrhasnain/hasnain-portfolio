import type { CSSProperties, ReactNode } from "react";
import { CardNetwork } from "./card-network";
import { CountUp } from "./count-up";
import { ArrowRight, Check, namedIcons, Sparkles } from "./icons";
import { Reveal } from "./motion";

// Building blocks for long case studies written in MDX (see content/projects/ai-operations-platform.mdx).
// Each block renders its own numbered section heading, so the MDX file stays short and readable.

type SectionProps = { n?: string; eyebrow: string; title: string; intro?: string; /** Short label for the sticky menu. */ nav?: string };

/** Anchor id for a case-study section, e.g. "What I built" -> "what-i-built". */
export function sectionId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The sticky-menu entries of a case-study MDX body, in order. Every section block needs a nav="..." label. */
export function caseNavItems(body: string) {
  return [...body.matchAll(/<(?:Problem|Areas|Architecture|Built|Numbers|Workflows|Highlights)\b[^>]*?\snav="([^"]+)"/g)].map(
    ([, label]) => ({ id: sectionId(label), label }),
  );
}

function NamedIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && namedIcons[name]) || Sparkles;
  return <Icon className={className} />;
}

function CaseSection({ n, eyebrow, title, intro, nav, children }: SectionProps & { children: ReactNode }) {
  return (
    <section
      id={sectionId(nav ?? eyebrow)}
      className="scroll-mt-36 border-t border-line py-14 first:border-t-0 first:pt-4 sm:py-20"
    >
      <Reveal className="mb-10 max-w-3xl sm:mb-12">
        <p className="eyebrow flex items-center gap-3">
          {n ? <span className="font-mono text-muted">{n}</span> : null}
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl leading-tight sm:text-[2.6rem]">{title}</h2>
        {intro ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p> : null}
      </Reveal>
      {children}
    </section>
  );
}

const iconTile =
  "grid shrink-0 place-items-center rounded-xl bg-brand text-night shadow-[0_0_24px_-6px_rgb(94_234_212/0.7)]";

/** 01 · The problem: the story on the left, a "done by hand" list on the right. */
export function Problem({ manual, children, ...section }: SectionProps & { manual: string[]; children: ReactNode }) {
  return (
    <CaseSection {...section}>
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg [&_strong]:text-ink">
          {children}
        </Reveal>
        <Reveal delay={0.1} className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <span className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Before the platform</span>
            <span className="font-mono text-[11px] text-muted">by hand</span>
          </div>
          <ul className="divide-y divide-line">
            {manual.map((item) => (
              <li key={item} className="flex items-center gap-3 px-5 py-3.5 text-sm text-ink/85">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-line bg-night text-muted">
                  <NamedIcon name="clock" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 border-t border-teal/30 bg-teal/5 px-5 py-3.5 text-sm font-semibold text-teal">
            <ArrowRight className="shrink-0" /> Now automated, with a person approving what goes live.
          </p>
        </Reveal>
      </div>
    </CaseSection>
  );
}

type Area = { icon: string; title: string; text: string };

/** 02 · What the platform does: icon cards, one per area. */
export function Areas({ items, ...section }: SectionProps & { items: Area[] }) {
  return (
    <CaseSection {...section}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((area, i) => (
          <li key={area.title}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <div className="group card card-hover flex h-full flex-col overflow-hidden p-5">
                <CardNetwork seed={i} />
                <span aria-hidden="true" className="fx-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`${iconTile} fx-icon size-11 text-xl`}>
                  <NamedIcon name={area.icon} />
                </span>
                <h3 className="mt-4 text-base">{area.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{area.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}

type ArchNode = { icon: string; title: string; note?: string; highlight?: boolean };
type Tier = { label: string; nodes: ArchNode[] };

function Connector() {
  return (
    <div aria-hidden="true" className="grid lg:grid-cols-[120px_1fr] lg:gap-x-3">
      <span className="hidden lg:block" />
      <div className="relative mx-auto h-12 w-full max-w-md sm:h-14">
      {["20%", "50%", "80%"].map((left, i) => (
        <span key={left} className="absolute top-0 h-full w-px bg-linear-to-b from-teal/70 to-azure/40" style={{ left }}>
          <span
            className="arch-packet absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-teal shadow-[0_0_10px_#5EEAD4]"
            style={{ "--d": `${i * 0.45}s` } as CSSProperties}
          />
        </span>
      ))}
      </div>
    </div>
  );
}

/** 03 · Architecture: tiers from the screen people use down to the outside world, with data flowing between them. */
export function Architecture({ tiers, caption, ...section }: SectionProps & { tiers: Tier[]; caption?: string }) {
  return (
    <CaseSection {...section}>
      <Reveal>
        <figure className="card relative overflow-hidden px-4 py-8 sm:px-8 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
          />
          <div
            aria-hidden="true"
            className="animate-glow pointer-events-none absolute top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.16),transparent_65%)]"
          />
          <ol className="relative">
            {tiers.map((tier, t) => (
              <li key={tier.label}>
                {t > 0 ? <Connector /> : null}
                <div className="grid gap-3 lg:grid-cols-[120px_1fr] lg:items-center">
                  <p className="text-center font-mono text-[11px] tracking-[0.2em] text-muted uppercase lg:text-left">
                    {tier.label}
                  </p>
                  <ul className="flex flex-wrap justify-center gap-3">
                    {tier.nodes.map((node) => (
                      <li
                        key={node.title}
                        className={`relative flex min-w-0 flex-1 basis-56 items-center gap-3 rounded-2xl border bg-night/80 px-4 py-3 backdrop-blur sm:max-w-xs ${
                          node.highlight
                            ? "node-glow border-teal/60 shadow-[0_0_32px_-8px_rgb(94_234_212/0.7)]"
                            : "border-line"
                        }`}
                      >
                        <span className={`${iconTile} size-10 text-lg`}>
                          <NamedIcon name={node.icon} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">{node.title}</span>
                          {node.note ? <span className="block text-xs leading-snug text-muted">{node.note}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          {caption ? (
            <figcaption className="relative mt-8 text-center text-sm text-muted">{caption}</figcaption>
          ) : null}
        </figure>
      </Reveal>
    </CaseSection>
  );
}

type BuiltItem = { icon: string; title: string; text: string; tags?: string[] };

/** 04 · What I built: one card per part of the system. */
export function Built({ items, ...section }: SectionProps & { items: BuiltItem[] }) {
  return (
    <CaseSection {...section}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <div className="group card card-hover flex h-full flex-col overflow-hidden p-6">
                <CardNetwork seed={i + 20} />
                <span aria-hidden="true" className="fx-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="fx-icon grid size-11 place-items-center rounded-xl border border-teal/30 bg-night text-xl text-teal group-hover:border-teal/70">
                  <NamedIcon name={item.icon} />
                </span>
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                {item.tags?.length ? (
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {item.tags.map((tag) => (
                      <li key={tag} className="chip text-ink">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}

/** 05 · By the numbers: big counters. Only facts from the code. */
export function Numbers({ items, note, ...section }: SectionProps & { items: { value: string; label: string }[]; note?: string }) {
  return (
    <CaseSection {...section}>
      <Reveal>
        <div className="card relative isolate overflow-hidden border-teal/30">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="animate-aurora absolute -top-40 left-1/4 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(94_234_212/0.18),transparent_65%)]" />
            <div className="animate-aurora absolute -right-20 -bottom-48 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.2),transparent_65%)] [--d:-7s]" />
          </div>
          <dl className="grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
            {items.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center sm:py-10">
                <dt className="order-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{item.label}</dt>
                <dd className="order-1 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <span className="text-gradient">
                    <CountUp value={item.value} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          {note ? (
            <p className="border-t border-line px-6 py-3.5 text-center font-mono text-xs text-muted">{note}</p>
          ) : null}
        </div>
      </Reveal>
    </CaseSection>
  );
}

/** 06 · Key workflows: each one a pipeline whose steps light up in order, like a job running. */
export function Workflows({ items, ...section }: SectionProps & { items: { title: string; steps: string[] }[] }) {
  return (
    <CaseSection {...section}>
      <ul className="grid gap-5 lg:grid-cols-2">
        {items.map((flow, f) => (
          <li key={flow.title}>
            <Reveal delay={(f % 2) * 0.08} className="h-full">
              <div
                className="card relative flex h-full flex-col overflow-hidden p-6"
                style={{ "--n": flow.steps.length } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg">{flow.title}</h3>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-teal">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full rounded-full bg-teal opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-teal" />
                    </span>
                    running
                  </span>
                </div>
                <ol className="mt-5 flex flex-col gap-2">
                  {flow.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-3">
                      <span
                        className="wf-step flex flex-1 items-center gap-3 rounded-xl border border-line bg-night/70 px-3.5 py-2.5 text-sm text-muted"
                        style={{ "--i": i } as CSSProperties}
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line font-mono text-[11px]">
                          {i + 1}
                        </span>
                        <span className="text-ink/90">{step}</span>
                        {i === flow.steps.length - 1 ? <Check className="ml-auto text-teal" /> : null}
                      </span>
                    </li>
                  ))}
                </ol>
                <span aria-hidden="true" className="wf-bar absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand" />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}

type Highlight = { icon: string; title: string; text: string; tag?: string; steps?: string[] };

/** 07 · Engineering highlights: a bento grid, the first card wider than the rest. */
export function Highlights({ items, ...section }: SectionProps & { items: Highlight[] }) {
  return (
    <CaseSection {...section}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title} className={i === 0 ? "sm:col-span-2" : undefined}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <div
                className={`group card card-hover relative flex h-full flex-col overflow-hidden p-6 ${
                  i === 0 ? "border-teal/30" : ""
                }`}
              >
                <CardNetwork seed={i + 40} />
                {i === 0 ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_100%_at_100%_0%,rgb(94_234_212/0.14),transparent_70%)]"
                  />
                ) : null}
                <div className="flex items-center justify-between gap-3">
                  <span className={`${iconTile} fx-icon size-11 text-xl`}>
                    <NamedIcon name={item.icon} />
                  </span>
                  {item.tag ? (
                    <span className="rounded-md border border-teal/30 bg-night px-2 py-1 font-mono text-[11px] text-teal">
                      {item.tag}
                    </span>
                  ) : null}
                </div>
                <h3 className={`mt-4 ${i === 0 ? "text-xl sm:text-2xl" : "text-lg"}`}>{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                {item.steps?.length ? (
                  <ol
                    aria-label="How it works"
                    className="mt-auto flex flex-wrap items-center gap-2 pt-6"
                    style={{ "--n": item.steps.length } as CSSProperties}
                  >
                    {item.steps.map((step, s) => (
                      <li key={step} className="flex items-center gap-2">
                        <span
                          className="wf-step rounded-full border border-line bg-night/70 px-3 py-1.5 font-mono text-xs text-ink"
                          style={{ "--i": s } as CSSProperties}
                        >
                          {step}
                        </span>
                        {s < item.steps!.length - 1 ? <ArrowRight className="animate-nudge text-teal" /> : null}
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}
