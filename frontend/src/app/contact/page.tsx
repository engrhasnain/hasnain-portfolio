import { ContactForm } from "@/components/contact-form";
import { socials } from "@/components/footer";
import { CardNetwork } from "@/components/card-network";
import { ArrowUpRight, Calendar, Mail, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact: Hire an AI Engineer",
  description:
    "Contact Muhammad Hasnain Pirzada about an AI chatbot, MCP server, AI agent or WhatsApp assistant by email, WhatsApp, LinkedIn, Fiverr or the contact form.",
  path: "/contact",
});

const nextSteps = [
  { title: "You tell me what you need", text: "A few lines about the problem and the tools you already use is enough." },
  { title: "I reply with questions or a short plan", text: "Honest advice on what will work, and what won't." },
  { title: "A clear scope and a fixed quote", text: "Agreed before any work starts, so there are no surprises." },
];

export default function ContactPage() {
  const channels = [
    { label: "Email", href: `mailto:${site.email}`, Icon: Mail, value: site.email },
    { label: "WhatsApp", href: site.whatsapp, Icon: WhatsApp, value: site.phone },
    ...socials,
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <section className="section container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow animate-in flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            Contact
          </p>
          <h1 className="animate-in mt-3 text-4xl [--d:80ms] sm:text-6xl">
            Let&apos;s build something <span className="text-gradient">that works</span>
          </h1>
          <p className="animate-in mt-5 max-w-md text-lg leading-relaxed text-muted [--d:160ms]">
            Tell me what you want it to do, and I&apos;ll tell you honestly what will work.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
            <span className="size-2 rounded-full bg-amber" aria-hidden="true" />
            Available for new projects
          </p>

          {site.booking ? (
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="group card card-hover relative mt-10 flex items-center gap-4 overflow-hidden border-teal/40 p-5"
            >
              <CardNetwork seed={7} />
              <span className="fx-icon grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-2xl text-night shadow-[0_0_24px_-6px_rgb(94_234_212/0.7)]">
                <Calendar />
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-ink">Book a free 30-minute call</span>
                <span className="block text-sm text-muted">Pick a time that suits you. No obligation.</span>
              </span>
              <ArrowUpRight className="ml-auto shrink-0 text-teal transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {channels.map(({ label, href, Icon, ...rest }, i) => (
              <li key={label}>
                <Reveal delay={i * 0.06}>
                <a
                  href={href}
                  {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "me noopener noreferrer" })}
                  className="group card card-hover flex items-center gap-4 p-4"
                >
                  <span className="fx-icon grid size-10 shrink-0 place-items-center rounded-xl border border-teal/30 bg-night/70 text-lg text-teal">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="block truncate text-xs text-muted">
                      {"value" in rest ? rest.value : href.replace(/^https?:\/\/(www\.)?/, "")}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal" />
                </a>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="text-lg">What happens next</h2>
            <ol className="relative mt-5 space-y-5 border-l border-line pl-7">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 -left-[41px] grid size-7 place-items-center rounded-full border border-teal/40 bg-night font-mono text-[11px] font-bold text-teal shadow-[0_0_18px_-6px_rgb(94_234_212/0.8)]"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-ink">{step.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="animate-in [--d:200ms]">
          <h2 className="sr-only">Send a message</h2>
          <ContactForm email={site.email} />
        </div>
      </section>
    </>
  );
}
