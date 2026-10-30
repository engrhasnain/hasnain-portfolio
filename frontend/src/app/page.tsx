import Link from "next/link";
import { EngineerBadge, LogoBand, MarginNote, Scribble } from "@/components/brand";
import { CoverMock } from "@/components/cover-mocks";
import { CtaBand } from "@/components/cta-band";
import { socials } from "@/components/footer";
import { ArrowRight, Calendar, Check, serviceIcons } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { PostCard } from "@/components/post-card";
import { ProjectCover } from "@/components/project-cover";
import { ProofTabs, type ProofTab } from "@/components/proof-tabs";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ToolChip } from "@/components/tool-chip";
import { getPosts, getProjects, toProjectMeta } from "@/lib/content";
import { faqSchema, personSchema, websiteSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { credentials, flagship, proof, site, stackGroups } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} · ${site.jobTitle}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

// Every one of these is wired into a system on the projects page.
const bandTools = [
  "Claude",
  "OpenAI",
  "Gemini",
  "Retell AI",
  "WhatsApp",
  "Meta",
  "Google",
  "Zoom",
  "WordPress",
  "Elementor",
  "Twilio",
  "ElevenLabs",
  "QuickBooks",
  "PostgreSQL",
  "n8n",
  "AWS",
];

// Direct answers for search and AI assistants (sent as FAQPage schema too). 40 to 70 words each, facts only.
const faq = [
  {
    q: "Who is Muhammad Hasnain Pirzada?",
    a: "Muhammad Hasnain Pirzada is a Full Stack AI Engineer and a Registered Engineer with the Pakistan Engineering Council. He builds AI platforms, MCP servers for Claude, RAG chatbots, and WhatsApp and voice agents for businesses, from the user interface to the backend, the AI layer and the cloud it runs on.",
  },
  {
    q: "What can you build for my business?",
    a: "Six things: a full AI platform or SaaS, an AI chatbot trained on your documents, an MCP server that connects Claude to your systems, an AI agent or n8n automation, a WhatsApp AI assistant, and an AI voice agent that answers your phone. Each one has its own page with what's included.",
  },
  {
    q: "Do you work with businesses in Saudi Arabia and the UAE?",
    a: "Yes. I work remotely and build assistants that reply in English and Arabic. Pakistan time is 2 hours ahead of Riyadh and 1 hour ahead of Dubai, so our working hours overlap for calls, reviews and launches.",
  },
  {
    q: "How does a project start, and how is it priced?",
    a: "With a short free call about what the AI should do and what it connects to. After that you get a clear scope, the stack and a fixed quote before any work starts. You see working demos during the build, and at the end it's deployed on your accounts with docs.",
  },
  {
    q: "Can I see real work before hiring you?",
    a: "Yes. The projects page has case studies for an AI operations platform and the systems inside it, including a voice agent platform, a WordPress MCP server with 201 tools, call intelligence and SEO automation, plus chatbot, WhatsApp and MCP builds.",
  },
];

const whyMe = [
  { title: "Claude and MCP specialist.", text: "I've built 1,180+ MCP tools across three production servers, with auth, rate limits and call logs." },
  { title: "Fixed scope before code.", text: "You get the plan, the stack and a fixed quote before any work starts." },
  { title: "English and Arabic.", text: "WhatsApp and voice assistants built to answer customers in both languages." },
  { title: "Your accounts, your code.", text: "Everything is deployed on your cloud, with docs and a handover, so you own it." },
  { title: "Built for real customers.", text: "Approval gates, audit logs and a read-back on every write, because people depend on it." },
  { title: "Gulf working hours.", text: "Pakistan time is 2 hours ahead of Riyadh and 1 hour ahead of Dubai, so our days overlap." },
];

const steps = [
  { title: "Understand the job", text: "A short call about what the AI should do, what it connects to, and what must never go wrong." },
  { title: "Plan and quote", text: "A clear scope, the stack and a fixed quote, agreed before any code is written." },
  { title: "Build in the open", text: "Working demos early and often, so you see real progress instead of a big reveal." },
  { title: "Launch and hand over", text: "Deployed on your accounts with docs, logs and a runbook, so your team owns it." },
];

export default function HomePage() {
  const all = getProjects().map(toProjectMeta);
  const flagshipProject = all.find((p) => p.layout === "case-study");
  const featured = all.filter((p) => p.featured && p !== flagshipProject).slice(0, 6);
  const posts = getPosts().slice(0, 3);

  // "See it working": verified facts from each case study, one tab per kind of system.
  const bySlug = (slug: string) => all.find((p) => p.slug === slug);
  const proofTabs: ProofTab[] = [
    {
      label: "Voice agents",
      title: "A phone agent that knows who's calling before it picks up",
      points: [
        "37 functions the agent can call mid-call, each one signature-checked",
        "A 4-tier gate decides what each caller gets before the call is answered",
        "Anything said on a call waits for a person before it changes a record",
      ],
      slug: "ai-voice-agent-platform",
      service: { href: "/services/ai-voice-agent", label: "AI voice agent service" },
    },
    {
      label: "MCP for Claude",
      title: "Claude running a fleet of WordPress sites, safely",
      points: [
        "201 tools for page building, security, schema and migrations",
        "Two-step execute, and every write says how to read it back",
        "Part of 1,180+ MCP tools across three production servers",
      ],
      slug: "wordpress-fleet-mcp",
      service: { href: "/services/mcp-server-development", label: "MCP server service" },
    },
    {
      label: "Meta and ads",
      title: "Meta ads, leads and conversions in one closed loop",
      points: [
        "The full Marketing API campaign lifecycle, run through Claude",
        "Lead Ads webhooks verified, answered at once and synced in the background",
        "Conversions API events sent once, only after the CRM saves",
      ],
      slug: "meta-ads-and-social-automation",
      service: { href: "/services/ai-agent-development", label: "AI agent service" },
    },
    {
      label: "SEO automation",
      title: "Google Business Profiles managed from verified data",
      points: [
        "Every write is read back from Google before it counts as done",
        "1 and 2 star reviews are held for a person, never auto-answered",
        "Risk tiers are enforced on the server: no tier, no action",
      ],
      slug: "google-business-profile-manager",
      service: { href: "/services/ai-agent-development", label: "AI agent service" },
    },
    {
      label: "WhatsApp",
      title: "Customers answered on WhatsApp in seconds",
      points: [
        "Replies come from the business's own information, not guesses",
        "Complex chats are handed to a person on the team",
        "A visual n8n workflow the business can adjust without code",
      ],
      slug: "whatsapp-ai-chatbot",
      service: { href: "/services/whatsapp-ai-chatbot", label: "WhatsApp AI service" },
    },
  ].flatMap(({ slug, ...t }) => {
    const project = bySlug(slug);
    return project ? [{ ...t, project }] : [];
  });

  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema(), faqSchema(faq)]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(70%_70%_at_75%_40%,black,transparent_75%)]"
        />
        <div className="container-page grid items-center gap-14 pt-8 pb-16 sm:pt-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10 lg:pt-14 lg:pb-24">
          <div>
            <h1 className="animate-in">
              <span className="block -rotate-2 font-hand text-[2.1rem] leading-none text-teal sm:text-[2.5rem]">
                Hi, I&apos;m
              </span>
              <span className="mt-3 block text-[2.7rem] leading-[1.02] sm:text-[3.8rem] lg:text-[4.3rem]">
                {site.name}
              </span>
              <span className="sr-only">, {site.jobTitle}</span>
            </h1>
            <p className="animate-in mt-7 max-w-2xl text-[1.45rem] leading-snug font-bold text-ink/90 [--d:80ms] sm:text-[1.75rem]">
              I build AI that answers your calls, replies on WhatsApp and takes the <Scribble onLoad>busywork</Scribble>{" "}
              off your team.
            </p>
            <p className="animate-in mt-5 max-w-xl text-lg leading-relaxed text-ink/70 [--d:140ms]">
              {site.jobTitle}. Voice agents, MCP servers for Claude, chatbots and full AI platforms, built end to end and
              running in production.
            </p>
            <div className="animate-in mt-9 flex flex-col gap-3 [--d:200ms] sm:flex-row">
              <Link href="/projects" className="btn btn-primary">
                See my work <ArrowRight />
              </Link>
              {site.booking ? (
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Calendar /> Book a free call
                </a>
              ) : (
                <Link href="/contact" className="btn btn-ghost">
                  Let&apos;s talk
                </Link>
              )}
            </div>
            <ul className="animate-in mt-9 flex items-center gap-2.5 [--d:260ms]" aria-label="Profiles">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid size-11 place-items-center rounded-full border border-white/10 text-lg text-ink/70 transition hover:-translate-y-0.5 hover:border-teal/50 hover:text-teal"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-in relative [--d:120ms]">
            <EngineerBadge
              role={site.jobTitle}
              credential={credentials[0] ? `${credentials[0].title} · ${credentials[0].issuer}` : undefined}
            />
            <MarginNote className="top-28 -left-2 hidden xl:flex" arrowClass="rotate-[8deg]">
              that&apos;s me
            </MarginNote>
            <MarginNote className="-bottom-16 -left-4 hidden xl:flex" arrowClass="rotate-[35deg]">
              29 real systems below
            </MarginNote>
          </div>
        </div>
      </section>

      {/* Tools I connect AI to */}
      <section aria-label="Tools I build with" className="pb-16 sm:pb-20">
        <p className="container-page mb-6 text-center font-hand text-[1.5rem] leading-none font-bold text-ink/55">
          wired into the tools businesses already use
        </p>
        <LogoBand tools={bandTools} />
      </section>

      {/* Numbers */}
      <section aria-label="Highlights" className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="container-page py-12 sm:py-14">
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {proof.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col ${i % 2 === 1 ? "border-l border-white/[0.08] pl-6 sm:pl-10" : ""} ${
                  i === 2 ? "lg:border-l lg:pl-10" : ""
                } ${i > 0 ? "lg:border-l lg:border-white/[0.08] lg:pl-10" : ""}`}
              >
                <dt className="order-2 mt-2 text-sm text-ink/60">{item.label}</dt>
                <dd className="order-1 text-[2.4rem] leading-none font-extrabold tracking-[-0.045em] sm:text-[3.2rem]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/60">
            <span className="font-hand text-[1.35rem] leading-none font-bold text-teal">counted straight from the code</span>
            in one AI operations platform: two backends, a React portal and three MCP servers.
            <Link href={flagship} className="link font-bold">
              Read the case study <ArrowRight />
            </Link>
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="cv-auto section border-t border-white/[0.06]">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                What I can <Scribble>build</Scribble> for you
              </>
            }
            intro="Six services, each with its own clear scope and a fixed quote before any work starts. Every one ends with a system your team owns."
            action={{ href: "/services", label: "Compare all services" }}
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon];
              if (i === 0) {
                // The big tile: the full platform service, with a live preview of a platform console.
                return (
                  <li key={service.slug} className="sm:col-span-2 lg:row-span-2">
                    <Reveal className="h-full">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group card-feature card-hover flex h-full flex-col overflow-hidden"
                      >
                        <div className="p-7 sm:p-8">
                          <span className="icon-tile">
                            <Icon />
                          </span>
                          <h3 className="mt-6 text-2xl sm:text-[1.75rem]">{service.title}</h3>
                          <p className="mt-2.5 max-w-lg text-[0.98rem] leading-relaxed text-ink/70">{service.oneLiner}</p>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal">
                            Learn more <ArrowRight className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                        <div className="cover-host tilt-host relative mt-auto aspect-[16/8] min-h-[220px] overflow-hidden border-t border-white/[0.07] bg-[radial-gradient(70%_90%_at_80%_0%,rgb(94_234_212/0.16),transparent_65%)]">
                          <div className="absolute inset-0 bg-dots opacity-50" />
                          <CoverMock art="platform" />
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                );
              }
              return (
                <li key={service.slug}>
                  <Reveal delay={(i % 3) * 0.06} className="h-full">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group card card-hover flex h-full flex-col p-7"
                    >
                      <span className="icon-tile">
                        <Icon />
                      </span>
                      <h3 className="mt-6 text-xl">{service.title}</h3>
                      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/70">{service.oneLiner}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-teal">
                        Learn more <ArrowRight className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* See it working */}
      {proofTabs.length > 0 ? (
        <section className="cv-auto section border-t border-white/[0.06]">
          <div className="container-page">
            <SectionHeading
              eyebrow="See it working"
              title={
                <>
                  Real systems, running
                </>
              }
              intro="Pick a kind of system to see what it does and the facts behind it. Every number here was counted in the code."
            />
            <ProofTabs tabs={proofTabs} />
          </div>
        </section>
      ) : null}

      {/* Featured work */}
      <section className="cv-auto section border-t border-white/[0.06]">
        <div className="container-page">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems I have built and shipped"
            intro="Systems I've built end to end: the model and retrieval logic, the integrations, the safety checks, and the app people actually use."
            action={{ href: "/projects", label: "See all projects" }}
          />
          {flagshipProject ? (
            <Reveal className="mb-6">
              <Link
                href={`/projects/${flagshipProject.slug}`}
                className="group card-feature card-hover grid overflow-hidden lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.07] lg:aspect-auto lg:min-h-[400px] lg:border-r lg:border-b-0">
                  <ProjectCover project={flagshipProject} large />
                </div>
                <div className="flex flex-col p-7 sm:p-10">
                  <p className="eyebrow">Flagship case study</p>
                  <h3 className="mt-3 text-2xl leading-tight transition-colors group-hover:text-teal sm:text-[2rem]">
                    {flagshipProject.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink/75">{flagshipProject.summary}</p>
                  <ul className="mt-6 space-y-2.5">
                    {flagshipProject.results.slice(0, 4).map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-ink/85">
                        <Check className="mt-0.5 shrink-0 text-teal" /> {r}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-bold text-teal">
                    Read the full case study <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ) : null}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <li key={project.slug}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why work with me */}
      <section className="cv-auto section border-t border-white/[0.06]">
        <div className="container-page">
          <Reveal>
            <div className="brackets relative border border-white/[0.07] bg-[#0d1430]/80 px-6 py-12 sm:px-12 sm:py-16">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
                <div>
                  <p className="eyebrow">Why work with me</p>
                  <h2 className="mt-4 text-[2.2rem] sm:text-5xl">
                    What you can <Scribble>count on</Scribble>
                  </h2>
                  <p className="mt-5 max-w-sm leading-relaxed text-ink/70">
                    The model is the easy part. Approvals, logs, permissions and the boring safety checks are where I spend my time.
                  </p>
                </div>
                <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  {whyMe.map((item, i) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="mt-0.5 font-extrabold text-teal tabular-nums">0{i + 1}</span>
                      <p className="leading-relaxed text-ink/75">
                        <strong className="block text-[1.05rem] text-ink">{item.title}</strong>
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How I work: the one light, paper section */}
      <section className="paper cv-auto section">
        <div className="container-page">
          <SectionHeading
            eyebrow="how I work"
            title="From first call to a system you own"
            intro="You see it working early, you can change your mind along the way, and at the end you get everything needed to run it yourself."
          />
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

      {/* Stack */}
      <section className="cv-auto section border-t border-white/[0.06]">
        <div className="container-page">
          <SectionHeading
            eyebrow="Stack"
            title="Tools I ship with, model to cloud"
            intro="The right model for each job, the tools that connect it to real work, and the stack that ships it."
          />
          <Reveal>
            <div className="card grid divide-y divide-white/[0.07] lg:grid-cols-[0.8fr_1fr_1.5fr] lg:divide-x lg:divide-y-0">
              {stackGroups.map((group) => (
                <div key={group.label} className="p-7 sm:p-8">
                  <h3 className="meta">{group.label}</h3>
                  <p className="mt-2 text-sm text-ink/70">{group.note}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <li key={tool}>
                        <ToolChip name={tool} size="sm" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Writing */}
      {posts.length > 0 ? (
        <section className="cv-auto section border-t border-white/[0.06]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Writing"
              title="Notes from building AI in production"
              intro="Practical posts on AI agents, MCP, RAG and voice AI, with a source for every claim."
              action={{ href: "/blog", label: "Read the blog" }}
            />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <PostCard post={post} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Questions */}
      <section aria-labelledby="home-faq" className="cv-auto section border-t border-white/[0.06]">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 id="home-faq" className="mt-4 text-[2.2rem] sm:text-5xl lg:text-[3.4rem]">
              Straight answers
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/70">
              The things people usually ask before we start. Anything else, just ask on a call.
            </p>
          </Reveal>
          <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faq.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="text-lg font-bold text-ink">{q}</dt>
                <dd className="mt-2.5 leading-7 text-ink/75">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="Want AI working inside your business?"
        text="Tell me what you want it to do, and I'll tell you honestly what will work."
      />
    </>
  );
}
