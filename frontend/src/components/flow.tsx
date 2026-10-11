import { ArrowRight } from "./icons";
import { Reveal } from "./motion";

type Step = string | { label: string; note?: string };

/**
 * A simple architecture diagram for MDX:
 *   <Flow steps={["Chat UI", { label: "FastAPI", note: "auth + routing" }, "Claude"]} caption="..." />
 * Stacks vertically on phones, runs left to right on wider screens.
 */
export function Flow({ steps, caption }: { steps: Step[]; caption?: string }) {
  return (
    <figure className="my-10">
      <ol className="m-0! flex list-none! flex-col items-stretch gap-2 p-0! md:flex-row md:items-center [&>li]:mt-0!">
        {steps.map((step, i) => {
          const { label, note } = typeof step === "string" ? { label: step, note: undefined } : step;
          return (
            <li key={label} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
              <Reveal delay={i * 0.12} className="w-full">
                <div className="card card-hover w-full px-4 py-3 text-center">
                  <span className="block text-sm font-semibold text-ink">{label}</span>
                  {note ? <span className="mt-0.5 block text-xs text-muted">{note}</span> : null}
                </div>
              </Reveal>
              {i < steps.length - 1 ? (
                <span className="shrink-0 rotate-90 text-teal md:rotate-0">
                  <ArrowRight className="animate-nudge" />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      {caption ? <figcaption className="mt-4 text-center text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
