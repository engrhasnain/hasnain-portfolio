import Link from "next/link";
import { CardNetwork } from "@/components/card-network";
import { CtaBand } from "@/components/cta-band";
import { ArrowRight, ArrowUpRight, Check, serviceIcons } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

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
          title="AI that does real work for your business"
          intro="Six ways I can help. Every project starts with a short call and ends with a system your team owns. You get a clear scope and a fixed quote before any work starts."
        />

        <ul className="flex flex-col gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            const fiverr = service.fiverr || site.links.fiverr;
            return (
              <li key={service.slug} id={service.slug}>
                <Reveal>
                  <article className="group card card-hover grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1.15fr] md:gap-12">
                    <div className="flex flex-col">
                      <span className="fx-icon grid size-12 place-items-center rounded-xl border border-teal/30 bg-night/70 text-2xl text-teal group-hover:border-teal/70">
                        <Icon />
                      </span>
                      <h2 className="mt-4 text-2xl">{service.title}</h2>
                      <p className="mt-2 leading-relaxed text-muted">{service.oneLiner}</p>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-auto md:pt-6">
                        {fiverr ? (
                          <a href={fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Hire me on Fiverr <ArrowUpRight />
                          </a>
                        ) : null}
                        <Link href="/contact" className={`btn ${fiverr ? "btn-ghost" : "btn-primary"}`}>
                          Get a quote <ArrowRight />
                        </Link>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-line bg-night/50 p-5 sm:p-6">
                      <h3 className="text-sm font-semibold text-ink">What&apos;s included</h3>
                      <ul className="mt-3 space-y-2.5 text-sm">
                        {service.includes.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <Check className="mt-0.5 shrink-0 text-teal" />
                            <span className="text-ink/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section border-t border-line">
        <div className="container-page">
          <SectionHeading eyebrow="How I work" title="From idea to running system" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.08} className="group card card-hover h-full overflow-hidden p-6">
                  <CardNetwork seed={i + 80} />
                  <span className="text-gradient text-3xl font-extrabold">0{i + 1}</span>
                  <h3 className="mt-3 text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Not sure which one you need?" />
    </>
  );
}
