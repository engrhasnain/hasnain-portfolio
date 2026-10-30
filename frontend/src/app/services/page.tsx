import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ArrowRight, ArrowUpRight, Check, serviceIcons } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = pageMetadata({
  title: "AI Development Services: Platforms, Chatbots, MCP, Agents",
  description:
    "Hire Muhammad Hasnain Pirzada for AI platforms, RAG chatbots, MCP servers, n8n AI agents, WhatsApp and voice AI. See what's included in each service.",
  path: "/services",
});

const steps = [
  { title: "Tell me the goal", text: "A short call or message about what the AI should do and what it connects to." },
  { title: "Clear plan and quote", text: "You get the scope, the stack and a fixed quote before any work starts." },
  { title: "Build with demos", text: "You see it working early and often, so there are no surprises at the end." },
  { title: "Launch and handover", text: "Deployed on your accounts, with docs, so your team owns it." },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          servicesSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <section className="section container-page">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title="AI development services"
          intro="Chatbots, MCP servers, AI agents, WhatsApp and voice AI: six ways I can help. Every project starts with a short call and ends with a system your team owns, with a clear scope and a fixed quote before any work starts."
        />

        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              // `anchor` keeps old /services#... links landing on the right card.
              <li key={service.slug} id={service.anchor}>
                <Reveal delay={(i % 2) * 0.06} className="h-full">
                  <article className="card flex h-full flex-col p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="icon-tile">
                        <Icon />
                      </span>
                      <span className="meta text-ink/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h2 className="mt-6 text-2xl sm:text-[1.7rem]">
                      <Link href={`/services/${service.slug}`} className="transition-colors hover:text-teal">
                        {service.title}
                      </Link>
                    </h2>
                    <p className="mt-2.5 leading-relaxed text-ink/70">{service.oneLiner}</p>

                    <div className="mt-7 border-t border-white/[0.07] pt-6">
                      <h3 className="meta">What&apos;s included</h3>
                      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                        {service.includes.map((item) => (
                          <li key={item} className="flex gap-3">
                            <Check className="mt-1 shrink-0 text-teal" />
                            <span className="leading-relaxed text-ink/85">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap">
                      <Link href={`/services/${service.slug}`} className="btn btn-primary btn-sm">
                        See the details <ArrowRight />
                      </Link>
                      {service.fiverr ? (
                        <a href={service.fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                          Hire me on Fiverr <ArrowUpRight />
                        </a>
                      ) : (
                        <Link href="/contact" className="btn btn-ghost btn-sm">
                          Get a quote
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {/* How I work: the one light, paper section, same as on the home page */}
      <section className="paper section">
        <div className="container-page">
          <SectionHeading eyebrow="How I work" title="From idea to running system" />
          <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.07}>
                  <span className="block font-hand text-[3.4rem] leading-none font-bold text-teal">{i + 1}.</span>
                  <h3 className="mt-3 text-xl">{step.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink/70">{step.text}</p>
                </Reveal>
                {i < steps.length - 1 ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 80 30"
                    className="absolute top-5 -right-9 hidden h-7 w-16 text-teal/70 lg:block"
                  >
                    <path d="M2 18 C 22 4, 48 4, 70 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
                    <path d="M60 9 L 71 16 L 60 22" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="pt-20 sm:pt-28">
        <CtaBand title="Not sure which one you need?" />
      </div>
    </>
  );
}
