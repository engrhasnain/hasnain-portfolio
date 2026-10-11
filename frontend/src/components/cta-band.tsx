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
        <div className="card relative isolate overflow-hidden border-teal/30 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="animate-aurora absolute -top-40 left-1/4 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(94_234_212/0.25),transparent_65%)]" />
            <div className="animate-aurora absolute -bottom-48 right-1/5 size-[420px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.25),transparent_65%)] [--d:-7s]" />
            <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(60%_70%_at_50%_50%,black,transparent)]" />
          </div>
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">{text}</p>
          <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            {site.booking ? (
              <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-attract">
                <Calendar /> Book a free call <ArrowRight className="animate-nudge" />
              </a>
            ) : null}
            <Link href="/contact" className={`btn ${site.booking ? "btn-ghost" : "btn-primary btn-attract"}`}>
              Send a message {site.booking ? null : <ArrowRight className="animate-nudge" />}
            </Link>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <WhatsApp /> WhatsApp me
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <LinkedIn /> LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
