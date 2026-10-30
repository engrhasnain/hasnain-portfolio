import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowRight, Calendar, LinkedIn, WhatsApp } from "./icons";
import { Reveal } from "./motion";

/** The one clear contact action every page ends with. */
export function CtaBand({
  title = "Building something with AI?",
  text = "Tell me what you want it to do, and I'll tell you honestly what will work.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page pb-20 sm:pb-28">
      <Reveal>
        <div className="card-feature relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/2 h-full w-3/4 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(94_234_212/0.16),transparent)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-[2.2rem] sm:text-5xl lg:text-[3.4rem]">{title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink/75 sm:text-lg">{text}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              {site.booking ? (
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Calendar /> Book a free call
                </a>
              ) : null}
              <Link href="/contact" className={`btn ${site.booking ? "btn-ghost" : "btn-primary"}`}>
                Send a message <ArrowRight />
              </Link>
            </div>
            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink/60">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-ink/85 hover:text-teal">
                <WhatsApp /> WhatsApp
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-ink/85 hover:text-teal">
                <LinkedIn /> LinkedIn
              </a>
              <a href={`mailto:${site.email}`} className="font-semibold text-ink/85 hover:text-teal">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
