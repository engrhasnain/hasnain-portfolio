import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "./count-up";
import { ArrowRight, Check, namedIcons, Sparkles } from "./icons";
import { Reveal } from "./motion";

// Building blocks for long case studies written in MDX (see content/projects/ai-operations-platform.mdx).
// Each block renders its own numbered section heading, so the MDX file stays short and readable.
// Everything here uses the site's design system: card, card-feature, icon-tile, meta, eyebrow, chip.

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

/** "01" as a small label, the way numbered points look everywhere on the site. */
const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * The heading of a case-study section, laid out like the site's section headings:
 * number and handwritten label over the big title on the left, the intro on the right.
 */
export function CaseHeading({ n, eyebrow, title, intro }: { n?: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-10 grid gap-5 sm:mb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
      <div>
        <p className="flex items-baseline gap-3">
          {n ? <span className="meta tabular-nums">{n}</span> : null}
          <span className="eyebrow">{eyebrow}</span>
        </p>
        <h2 className="mt-4 text-[2.1rem] sm:text-5xl lg:text-[3.2rem]">{title}</h2>
      </div>
      {intro ? <p className="text-base leading-relaxed text-ink/70 sm:text-lg lg:pb-2">{intro}</p> : null}
    </Reveal>
  );
}

function CaseSection({ n, eyebrow, title, intro, nav, children }: SectionProps & { children: ReactNode }) {
  return (
    <section
      id={sectionId(nav ?? eyebrow)}
      className="scroll-mt-36 border-t border-white/[0.06] py-16 first:border-t-0 first:pt-4 sm:py-24 sm:first:pt-6"
    >
      <CaseHeading n={n} eyebrow={eyebrow} title={title} intro={intro} />
      {children}
    </section>
  );
}

/** 01 · The problem: the story on the left, a "done by hand" list on the right. */
export function Problem({ manual, children, ...section }: SectionProps & { manual: string[]; children: ReactNode }) {
  return (
    <CaseSection {...section}>
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg [&_strong]:font-bold [&_strong]:text-ink">
          {children}
        </Reveal>
        <Reveal delay={0.1} className="card overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-4">
            <span className="meta">Before the platform</span>
            <span className="text-xs font-semibold text-ink/50">by hand</span>
          </div>
          <ul className="divide-y divide-white/[0.06]">
            {manual.map((item) => (
              <li key={item} className="flex items-center gap-3.5 px-6 py-3.5 text-[0.95rem] text-ink/85">
                <span className="icon-tile size-8 rounded-lg text-sm">
                  <NamedIcon name="clock" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2.5 border-t border-white/[0.08] px-6 py-4 text-[0.95rem] font-semibold text-ink">
            <Check className="mt-1 shrink-0 text-teal" /> Now automated, with a person approving what goes live.
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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((area, i) => (
          <li key={area.title}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <div className="card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-tile">
                    <NamedIcon name={area.icon} />
                  </span>
                  <span className="meta tabular-nums text-ink/40">{pad(i)}</span>
                </div>
                <h3 className="mt-5 text-xl">{area.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">{area.text}</p>
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

/** Three hairlines between two tiers, with a small packet travelling down each one (desktop only, see .arch-packet). */
function Connector() {
  return (
    <div aria-hidden="true" className="grid lg:grid-cols-[120px_1fr] lg:gap-x-3">
      <span className="hidden lg:block" />
      <div className="relative mx-auto h-10 w-full max-w-md sm:h-12">
        {["20%", "50%", "80%"].map((left, i) => (
          <span key={left} className="absolute top-0 h-full w-px bg-white/15" style={{ left }}>
            <span
              className="arch-packet absolute left-1/2 size-1 -translate-x-1/2 rounded-full bg-teal/80"
              style={{ "--d": `${i * 0.6}s` } as CSSProperties}
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
        <figure className="card overflow-hidden px-4 py-8 sm:px-8 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
          />
          <ol className="relative">
            {tiers.map((tier, t) => (
              <li key={tier.label}>
                {t > 0 ? <Connector /> : null}
                <div className="grid gap-3 lg:grid-cols-[120px_1fr] lg:items-center">
                  <p className="meta text-center lg:text-left">{tier.label}</p>
                  <ul className="flex flex-wrap justify-center gap-3">
                    {tier.nodes.map((node) => (
                      <li
                        key={node.title}
                        className={`relative flex min-w-0 flex-1 basis-56 items-center gap-3 rounded-2xl border bg-night/70 px-4 py-3 sm:max-w-xs ${
                          node.highlight ? "border-teal/40" : "border-white/[0.08]"
                        }`}
                      >
                        <span className="icon-tile size-10 text-lg">
                          <NamedIcon name={node.icon} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-ink">{node.title}</span>
                          {node.note ? <span className="block text-xs leading-snug text-ink/55">{node.note}</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          {caption ? (
            <figcaption className="relative mt-8 border-t border-white/[0.06] pt-6 text-center text-sm text-ink/55">
              {caption}
            </figcaption>
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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <div className="card flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-tile">
                    <NamedIcon name={item.icon} />
                  </span>
                  <span className="meta tabular-nums text-ink/40">{pad(i)}</span>
                </div>
                <h3 className="mt-6 text-xl">{item.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/70">{item.text}</p>
                {item.tags?.length ? (
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {item.tags.map((tag) => (
                      <li key={tag} className="chip">
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

/**
 * Hairlines between the number cells: 2 columns on phones, 3 from sm, 5 from lg.
 * Each breakpoint gets exactly one class per side, so no two classes fight over the same border.
 */
function cellBorders(i: number) {
  // Written out in full so Tailwind can find every class in the source.
  const phone = `${i % 2 !== 0 ? "border-l" : "border-l-0"} ${i >= 2 ? "border-t" : "border-t-0"}`;
  const sm = `${i % 3 !== 0 ? "sm:border-l" : "sm:border-l-0"} ${i >= 3 ? "sm:border-t" : "sm:border-t-0"}`;
  const lg = `${i % 5 !== 0 ? "lg:border-l" : "lg:border-l-0"} ${i >= 5 ? "lg:border-t" : "lg:border-t-0"}`;
  return `${phone} ${sm} ${lg}`;
}

/** 05 · By the numbers: big counters, like the numbers band on the home page. Only facts from the code. */
export function Numbers({ items, note, ...section }: SectionProps & { items: { value: string; label: string }[]; note?: string }) {
  return (
    <CaseSection {...section}>
      <Reveal>
        <div className="card overflow-hidden">
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((item, i) => (
              <div key={item.label} className={`flex flex-col border-white/[0.08] px-6 py-8 sm:px-8 sm:py-10 ${cellBorders(i)}`}>
                <dt className="order-2 mt-2 text-sm text-ink/60">{item.label}</dt>
                <dd className="order-1 text-[2.3rem] leading-none font-extrabold tracking-[-0.045em] sm:text-[2.8rem]">
                  <CountUp value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
          {note ? <p className="border-t border-white/[0.08] px-6 py-4 text-sm text-ink/55 sm:px-8">{note}</p> : null}
        </div>
      </Reveal>
    </CaseSection>
  );
}

/** 06 · Key workflows: each one a pipeline whose steps are highlighted in order, like a job running (desktop only). */
export function Workflows({ items, ...section }: SectionProps & { items: { title: string; steps: string[] }[] }) {
  return (
    <CaseSection {...section}>
      <ul className="grid gap-5 lg:grid-cols-2">
        {items.map((flow, f) => (
          <li key={flow.title}>
            <Reveal delay={(f % 2) * 0.08} className="h-full">
              <div
                className="card flex h-full flex-col overflow-hidden p-6 sm:p-7"
                style={{ "--n": flow.steps.length } as CSSProperties}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl">{flow.title}</h3>
                  <span className="meta shrink-0">{flow.steps.length} steps</span>
                </div>
                <ol className="mt-5 flex flex-col gap-2">
                  {flow.steps.map((step, i) => (
                    <li key={step}>
                      <span
                        className="wf-step flex items-center gap-3.5 rounded-xl border border-line bg-night/70 px-4 py-2.5 text-[0.95rem]"
                        style={{ "--i": i } as CSSProperties}
                      >
                        <span className="meta w-5 shrink-0 tabular-nums text-ink/45">{pad(i)}</span>
                        <span className="text-ink/90">{step}</span>
                        {i === flow.steps.length - 1 ? <Check className="ml-auto shrink-0 text-teal" /> : null}
                      </span>
                    </li>
                  ))}
                </ol>
                <span aria-hidden="true" className="wf-bar absolute inset-x-0 bottom-0 h-px origin-left bg-teal/50" />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}

type Highlight = { icon: string; title: string; text: string; tag?: string; steps?: string[] };

/** 07 · Engineering highlights: a bento grid, the first card wider than the rest and highlighted. */
export function Highlights({ items, ...section }: SectionProps & { items: Highlight[] }) {
  return (
    <CaseSection {...section}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const lead = i === 0;
          return (
            <li key={item.title} className={lead ? "sm:col-span-2" : undefined}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className={`${lead ? "card-feature p-7 sm:p-8" : "card p-7"} flex h-full flex-col`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-tile">
                      <NamedIcon name={item.icon} />
                    </span>
                    {item.tag ? <span className="chip">{item.tag}</span> : null}
                  </div>
                  <h3 className={`mt-6 ${lead ? "text-2xl sm:text-[1.75rem]" : "text-xl"}`}>{item.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/70">{item.text}</p>
                  {item.steps?.length ? (
                    <ol
                      aria-label="How it works"
                      className="mt-auto flex flex-wrap items-center gap-2 pt-6"
                      style={{ "--n": item.steps.length } as CSSProperties}
                    >
                      {item.steps.map((step, s) => (
                        <li key={step} className="flex items-center gap-2">
                          <span
                            className="wf-step rounded-full border border-line bg-night/70 px-3.5 py-1.5 text-xs font-semibold text-ink/90"
                            style={{ "--i": s } as CSSProperties}
                          >
                            {step}
                          </span>
                          {s < item.steps!.length - 1 ? <ArrowRight aria-hidden="true" className="text-ink/35" /> : null}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </CaseSection>
  );
}
