import { Scribble } from "@/components/brand";
import { ContactForm } from "@/components/contact-form";
import { socials } from "@/components/footer";
import { ArrowUpRight, Calendar, Mail, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
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

      <section className="section">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build something <Scribble onLoad>that works</Scribble>
              </>
            }
            intro={
              <>
                Tell me what you want it to do, and I&apos;ll tell you honestly what will work.
                <span className="mt-4 flex items-center gap-2 text-sm font-bold text-ink/85">
                  <span className="size-2 rounded-full bg-teal" aria-hidden="true" />
                  Available for new projects
                </span>
              </>
            }
          />

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
            <div className="animate-in min-w-0 [--d:180ms]">
              <ContactForm email={site.email} />
            </div>

            <div className="animate-in flex min-w-0 flex-col gap-5 [--d:240ms]">
              {site.booking ? (
                <a
                  href={site.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card card-hover flex items-center gap-5 p-6"
                >
                  <span className="icon-tile">
                    <Calendar />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-bold text-ink">
                      Book a free <span className="whitespace-nowrap">30-minute</span> call
                    </span>
                    <span className="mt-0.5 block text-sm text-ink/55">Pick a time that suits you. No obligation.</span>
                  </span>
                  <ArrowUpRight className="ml-auto shrink-0 text-teal transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}

              <div>
                <h2 className="meta">Or reach me directly</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {channels.map(({ label, href, Icon, ...rest }, i) => (
                    <li key={label} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                      <a
                        href={href}
                        {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "me noopener noreferrer" })}
                        className="group card card-hover flex h-full items-center gap-4 p-4"
                      >
                        <span className="icon-tile size-11 text-lg">
                          <Icon />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-ink">{label}</span>
                          <span className="block truncate text-xs text-ink/55">
                            {"value" in rest ? rest.value : href.replace(/^https?:\/\/(www\.)?/, "")}
                          </span>
                        </span>
                        <ArrowUpRight className="ml-auto shrink-0 text-ink/45 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="section border-t border-white/[0.06]">
        <div className="container-page">
          <SectionHeading
            eyebrow="What happens next"
            title="From your message to a fixed quote"
            intro="Three short steps, and nothing is agreed until you have the scope and the quote in front of you."
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {nextSteps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="card h-full p-7">
                    <span className="meta">Step 0{i + 1}</span>
                    <h3 className="mt-4 text-xl">{step.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink/70">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
