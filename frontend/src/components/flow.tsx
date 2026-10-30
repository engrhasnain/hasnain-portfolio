import { Reveal } from "./motion";

type Step = string | { label: string; note?: string };

/** A solid hairline with an arrowhead between two steps: downwards on phones, to the right from sm up. */
function Connector({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-full left-1/2 h-6 w-3 -translate-x-1/2 items-center justify-center sm:top-1/2 sm:left-full sm:h-3 sm:w-10 sm:translate-x-0 sm:-translate-y-1/2 ${className}`}
    >
      <svg viewBox="0 0 12 24" className="h-6 w-3 sm:hidden" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 1V22" stroke="currentColor" className="text-white/20" />
        <path d="M2.5 18.5L6 22L9.5 18.5" stroke="currentColor" strokeWidth={1.4} className="text-teal" />
      </svg>
      <svg viewBox="0 0 40 12" className="hidden h-3 w-10 sm:block" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 6H35" stroke="currentColor" className="text-white/20" />
        <path d="M31.5 2.5L35 6L31.5 9.5" stroke="currentColor" strokeWidth={1.4} className="text-teal" />
      </svg>
    </span>
  );
}

/**
 * A simple architecture diagram for MDX:
 *   <Flow steps={["Chat UI", { label: "FastAPI", note: "auth + routing" }, "Claude"]} caption="..." />
 * Each step is a card ("Step 01"), joined by hairline arrows: one column on phones, two on small screens, three from md.
 */
export function Flow({ steps, caption }: { steps: Step[]; caption?: string }) {
  return (
    <figure className="my-10">
      <ol className="m-0! grid list-none! gap-x-10 gap-y-6 p-0! sm:grid-cols-2 md:grid-cols-3 [&>li]:mt-0!">
        {steps.map((step, i) => {
          const { label, note } = typeof step === "string" ? { label: step, note: undefined } : step;
          // Arrows only run between cards in the same row: hide the one leaving the last card of each row.
          const endsSmRow = i % 2 === 1;
          const endsMdRow = (i + 1) % 3 === 0;
          const connector = `flex ${endsSmRow ? "sm:hidden" : ""} ${endsMdRow ? "md:hidden" : endsSmRow ? "md:flex" : ""}`;
          return (
            <li key={label} className="relative">
              <Reveal delay={i * 0.08} className="h-full">
                <div className="card h-full px-5 py-4">
                  <span className="meta block leading-none">Step {String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-2.5 block text-[0.95rem] leading-snug font-bold text-ink">{label}</span>
                  {note ? <span className="mt-1 block text-sm leading-snug text-ink/55">{note}</span> : null}
                </div>
              </Reveal>
              {i < steps.length - 1 ? <Connector className={connector} /> : null}
            </li>
          );
        })}
      </ol>
      {caption ? <figcaption className="mt-5 text-center text-sm text-ink/55">{caption}</figcaption> : null}
    </figure>
  );
}
