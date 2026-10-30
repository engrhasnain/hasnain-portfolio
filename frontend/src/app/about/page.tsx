import Image from "next/image";
import Link from "next/link";
import { Scribble } from "@/components/brand";
import { CtaBand } from "@/components/cta-band";
import { ArrowUpRight, Check, Download, GitHub, LinkedIn, namedIcons } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { publicFileExists } from "@/lib/public-file";
import { breadcrumbSchema, personSchema, profilePageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { certifications, credentials, flagship, site, type Certification } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Muhammad Hasnain Pirzada, Full Stack AI Engineer",
  absoluteTitle: true,
  description:
    "Muhammad Hasnain Pirzada is a software engineer and Registered Engineer who builds AI platforms and agents. His story, experience, skills and CV.",
  path: "/about",
  type: "profile",
});

const values = [
  {
    title: "Accurate answers",
    text: "AI that says \"I don't know\" beats AI that guesses. Every system is grounded in real data.",
    icon: "search",
  },
  { title: "Secure systems", text: "Permissions, validation and audit logs from day one, not bolted on later.", icon: "shield" },
  {
    title: "Costs that make sense",
    text: "The right model for each job, caching where it helps, and no surprise bills.",
    icon: "coins",
  },
];

// Titles and dates match LinkedIn exactly. "Full Stack AI Engineer" stays the brand line everywhere else.
const experience = [
  {
    role: "Associate Software Engineer (AI/LLM)",
    org: site.company,
    when: "Nov 2025 - Present",
    points: [
      "Built an AI operations platform that runs a digital marketing agency end to end",
      "3 apps, 2,600+ API endpoints and 50+ integrations, from React portal to AWS",
      "MCP layer for Claude: 6 servers, 17 MCPs and 1,000+ tools",
      "RAG chatbots, AI agents and voice AI for business clients",
    ],
  },
  {
    role: "Freelance AI Engineer",
    org: "Available on Fiverr",
    when: "Open for projects",
    points: [
      "AI chatbots trained on a business's own documents (RAG)",
      "MCP servers that connect Claude to real systems",
      "WhatsApp assistants and n8n automations",
    ],
  },
  {
    role: "Associate Software Engineer",
    org: "Cognisons",
    when: "Sep 2025 - Nov 2025",
    points: [
      "Built end-to-end data and ML workflows",
      "Collected, cleaned and explored datasets, and engineered features",
      "Built reproducible ML pipelines, including work with YOLO models",
    ],
  },
  {
    role: "Natural Language Processing Engineer (Internship)",
    org: "ITSOLERA Pvt Ltd",
    when: "Jun 2024 - Sep 2024",
    points: [
      "Completed an internship in Natural Language Processing",
      "Worked on chatbots and language-processing tasks",
    ],
  },
];

const skills = [
  { group: "AI and LLMs", items: ["Claude", "OpenAI GPT", "Gemini", "Groq", "LangChain", "RAG", "Embeddings", "Prompt design"] },
  { group: "Integrations", items: ["MCP servers", "n8n", "WhatsApp Cloud API", "Voice agents", "REST APIs", "Webhooks"] },
  { group: "Backend", items: ["Python", "FastAPI", "NestJS", "Node.js", "PostgreSQL", "pgvector", "Redis"] },
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { group: "Cloud and DevOps", items: ["Docker", "AWS", "S3", "Vercel", "CI/CD"] },
];

// Certificates with courses take a wide card; the rest sit three to a row, and a short last row stretches to fill it.
const plainCerts = certifications.filter((c) => !c.courses?.length);
const lastRow = plainCerts.length % 3 || 3;
function certSpan(c: Certification) {
  if (c.courses?.length) return "sm:col-span-2 lg:col-span-4";
  const fromEnd = plainCerts.length - plainCerts.indexOf(c);
  return fromEnd <= lastRow ? ["lg:col-span-6", "lg:col-span-3", "lg:col-span-2"][lastRow - 1] : "lg:col-span-2";
}

const ShieldIcon = namedIcons.shield;
const AwardIcon = namedIcons.award;

export default function AboutPage() {
  const hasCv = publicFileExists(site.cv);
  const hasPhoto = publicFileExists(site.photo);

  return (
    <>
      <JsonLd
        data={[
          profilePageSchema(),
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* Page title, photo and story */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="About me"
            title={<>I&apos;m {site.name}</>}
            intro="I'm a software engineer. I started as a full stack developer and moved into AI because I wanted to build things people actually use every day."
          />

          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <figure className="animate-in card mx-auto w-full max-w-sm p-3 [--d:160ms] md:sticky md:top-28 md:max-w-none">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-panel">
                {hasPhoto ? (
                  <Image
                    src={site.photo}
                    alt={`${site.name}, ${site.jobTitle}`}
                    fill
                    priority
                    sizes="(min-width: 768px) 400px, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <div role="img" aria-label={site.name} className="grid size-full place-items-center text-6xl font-extrabold text-teal">
                    {site.initials}
                  </div>
                )}
              </div>
              <figcaption className="px-3 pt-5 pb-3">
                <ul className="flex flex-wrap gap-2" aria-label="Roles">
                  {site.roles.map((role) => (
                    <li key={role} className="chip">
                      {role}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 space-y-2" aria-label="Credentials">
                  {credentials.map((c) => (
                    <li key={c.title} className="flex items-center gap-2 text-sm font-semibold text-ink/85">
                      <ShieldIcon className="shrink-0 text-teal" /> {c.title}
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>

            <div className="animate-in [--d:220ms]">
              <h2 className="text-2xl sm:text-[2rem]">My story</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70">
                <p>
                  Today I work across the whole stack: the model and retrieval logic, the integrations that plug it into
                  real systems, and the app that puts it in front of users.
                </p>
                <p>
                  Recently I built an{" "}
                  <Link
                    href={flagship}
                    className="font-semibold text-teal underline decoration-teal/40 underline-offset-4 hover:decoration-teal"
                  >
                    AI operations platform
                  </Link>{" "}
                  that runs a digital marketing agency end to end: 3 apps, 2,600+ API endpoints, 50+ integrations and an
                  MCP layer that gives Claude 1,000+ tools. I also build chatbots, WhatsApp assistants and voice AI for
                  businesses.
                </p>
                <p>
                  I care about three things: answers that are accurate, systems that are secure, and running costs that
                  make sense. If you want AI working inside your business, I&apos;d like to hear what you&apos;re
                  building.
                </p>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {hasCv ? (
                  <a href={site.cv} download className="btn btn-primary">
                    <Download /> Download CV
                  </a>
                ) : (
                  <Link href="/contact" className="btn btn-primary">
                    <Download /> Request my CV
                  </Link>
                )}
                <a href={site.links.linkedin} target="_blank" rel="me noopener noreferrer" className="btn btn-ghost">
                  <LinkedIn /> LinkedIn
                </a>
                <a href={site.links.github} target="_blank" rel="me noopener noreferrer" className="btn btn-ghost">
                  <GitHub /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I care about: the one light, paper section */}
      <section className="paper section">
        <div className="container-page">
          <SectionHeading
            eyebrow="My values"
            title={
              <>
                What I <Scribble>care about</Scribble>
              </>
            }
            intro="Three things I hold every system to, from the first prototype to the day it goes live."
          />
          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-3">
            {values.map((v, i) => {
              const Icon = namedIcons[v.icon];
              return (
                <li key={v.title}>
                  <Reveal delay={i * 0.07}>
                    <span className="icon-tile">
                      <Icon />
                    </span>
                    <h3 className="mt-6 text-xl">{v.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink/70">{v.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="section border-t border-white/[0.06]">
        <div className="container-page">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've done the work"
            intro="From an internship in natural language processing to building a full AI operations platform."
          />
          <ol className="relative">
            {experience.map((job, i) => {
              const current = i === 0;
              return (
                <li key={job.role} className="relative grid gap-3 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-0">
                  <p className="meta md:pt-8 md:pr-8 md:text-right md:whitespace-nowrap">{job.when}</p>
                  <div
                    className={`relative md:border-l md:border-white/10 md:pl-10 ${i < experience.length - 1 ? "pb-6" : ""}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-8 -left-[7px] hidden size-3.5 rounded-full ring-4 ring-[#0b1020] md:block ${
                        current ? "bg-teal" : "border-2 border-teal/60 bg-[#0b1020]"
                      }`}
                    />
                    <Reveal>
                      <div className={`${current ? "card-feature" : "card"} p-6 sm:p-7`}>
                        <h3 className="text-xl">{job.role}</h3>
                        <p className="mt-1 text-ink/55">{job.org}</p>
                        <ul className="mt-5 space-y-2.5">
                          {job.points.map((p) => (
                            <li key={p} className="flex gap-2.5 text-ink/85">
                              <Check className="mt-1 shrink-0 text-teal" /> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section className="section border-t border-white/[0.06]">
        <div className="container-page">
          <SectionHeading
            eyebrow="Skills"
            title="What I work with"
            intro="The models, integrations and full stack I use to take an idea from a prototype to production."
          />
          <Reveal>
            <dl className="card divide-y divide-white/[0.06]">
              {skills.map((s) => (
                <div key={s.group} className="grid gap-3 p-6 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-center sm:gap-8 sm:px-8">
                  <dt className="meta">{s.group}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2" aria-label={s.group}>
                      {s.items.map((item) => (
                        <li key={item} className="chip">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Credentials and certifications */}
      <section className="section border-t border-white/[0.06]">
        <div className="container-page">
          <SectionHeading
            eyebrow="Registered and certified"
            title={`Credentials${certifications.length > 0 ? " and certifications" : ""}`}
            intro="A professional registration, plus the courses behind the work. Where a certificate has a public verify link, you'll find it here."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-6">
            {credentials.map((c) => (
              <li key={c.title} className="lg:col-span-2">
                <Reveal className="h-full">
                  <div className="card-feature flex h-full items-start gap-5 p-7">
                    <span className="icon-tile">
                      <ShieldIcon />
                    </span>
                    <div>
                      <p className="meta">Professional registration</p>
                      <h3 className="mt-2 text-xl">{c.title}</h3>
                      <p className="mt-1 text-ink/55">{c.issuer || "Professional registration"}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
            {certifications.map((c, i) => (
              <li key={c.title} className={certSpan(c)}>
                <Reveal delay={((i + 1) % 3) * 0.06} className="h-full">
                  <div className="card flex h-full items-start gap-5 p-7">
                    <span className="icon-tile">
                      <AwardIcon />
                    </span>
                    <div className="min-w-0">
                      {c.year ? <p className="meta mb-2">{c.year}</p> : null}
                      <h3 className={c.courses?.length ? "text-xl" : "text-lg leading-snug"}>{c.title}</h3>
                      <p className="mt-1 text-sm text-ink/55">{c.issuer}</p>
                      {c.courses?.length ? (
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Courses">
                          {c.courses.map((course) => (
                            <li key={course.title}>
                              {course.url ? (
                                <a
                                  href={course.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="chip transition hover:border-teal/50 hover:text-teal"
                                >
                                  <Check className="text-teal" /> {course.title}
                                </a>
                              ) : (
                                <span className="chip">
                                  <Check className="text-teal" /> {course.title}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="link group mt-4 text-sm font-bold">
                          Verify certificate{" "}
                          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Want to work together?" />
    </>
  );
}
