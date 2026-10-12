import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { CardNetwork } from "@/components/card-network";
import { CtaBand } from "@/components/cta-band";
import { ArrowUpRight, Download, GitHub, LinkedIn, namedIcons } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { publicFileExists } from "@/lib/public-file";
import { breadcrumbSchema, personSchema, profilePageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { certifications, credentials, flagship, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Muhammad Hasnain Pirzada, Full Stack AI Engineer",
  absoluteTitle: true,
  description:
    "Muhammad Hasnain Pirzada is a software engineer and Registered Engineer who builds AI platforms and agents. His story, experience, skills and CV.",
  path: "/about",
  type: "profile",
});

const values = [
  { title: "Accurate answers", text: "AI that says \"I don't know\" beats AI that guesses. Every system is grounded in real data." },
  { title: "Secure systems", text: "Permissions, validation and audit logs from day one, not bolted on later." },
  { title: "Costs that make sense", text: "The right model for each job, caching where it helps, and no surprise bills." },
];

// Titles and dates match LinkedIn exactly. "Full Stack AI Engineer" stays the brand line everywhere else.
const experience = [
  {
    role: "Associate Software Engineer (AI/LLM)",
    org: site.company,
    when: "Nov 2025 – Present",
    points: [
      "Built an AI operations platform that runs a digital marketing agency end to end",
      "3 apps, 1,400+ API endpoints and 50+ integrations, from React portal to AWS",
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
    when: "Sep 2025 – Nov 2025",
    points: [
      "Built end-to-end data and ML workflows",
      "Collected, cleaned and explored datasets, and engineered features",
      "Built reproducible ML pipelines, including work with YOLO models",
    ],
  },
  {
    role: "Natural Language Processing Engineer (Internship)",
    org: "ITSOLERA Pvt Ltd",
    when: "Jun 2024 – Sep 2024",
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

const ShieldIcon = namedIcons.shield;
const AwardIcon = namedIcons.award;

export default function AboutPage() {
  const hasCv = publicFileExists(site.cv);

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

      <section className="section container-page grid items-start gap-12 md:grid-cols-[auto_1fr]">
        <div className="animate-pop justify-self-center md:sticky md:top-28">
          <Avatar className="size-40 sm:size-56" sizes="224px" priority />
        </div>
        <div className="animate-in [--d:100ms]">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">
            I&apos;m <span className="text-gradient">{site.name}</span>
          </h1>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Roles">
            {site.roles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-sm font-semibold text-teal"
              >
                {role}
              </li>
            ))}
          </ul>
          <p className="mt-3 flex flex-wrap items-center gap-2">
            {credentials.map((c) => (
              <span
                key={c.title}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1 text-sm font-semibold text-ink"
              >
                <ShieldIcon className="text-teal" /> {c.title}
              </span>
            ))}
          </p>
          <div className="prose-glow mt-8 max-w-2xl text-muted">
            <p>
              I&apos;m a software engineer. I started as a full stack developer and moved into AI because I wanted to
              build things people actually use every day. Today I work across the whole stack: the model and retrieval logic, the integrations that
              plug it into real systems, and the app that puts it in front of users.
            </p>
            <p>
              Recently I built an <Link href={flagship}>AI operations platform</Link> that runs a digital marketing
              agency end to end: 3 apps, 1,400+ API endpoints, 50+ integrations and an MCP layer that gives Claude
              1,000+ tools. I also build chatbots, WhatsApp assistants and voice AI for businesses.
            </p>
            <p>
              I care about three things: answers that are accurate, systems that are secure, and running costs that
              make sense. If you want AI working inside your business, I&apos;d like to hear what you&apos;re building.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
      </section>

      <section className="section border-t border-line">
        <div className="container-page">
          <h2 className="text-3xl sm:text-4xl">What I care about</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={i * 0.08} className="group card card-hover h-full overflow-hidden p-6">
                  <CardNetwork seed={i + 100} />
                  <h3 className="text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl">Experience</h2>
            <ol className="mt-10 border-l border-line">
              {experience.map((job) => (
                <li key={job.role} className="relative pb-10 pl-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-night bg-brand"
                  />
                  <Reveal>
                    <p className="text-xs font-semibold tracking-wider text-teal uppercase">{job.when}</p>
                    <h3 className="mt-1 text-lg">
                      {job.role} <span className="font-medium text-muted">· {job.org}</span>
                    </h3>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-teal">
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl">Skills</h2>
            <div className="mt-10 flex flex-col gap-6">
              {skills.map((s) => (
                <Reveal key={s.group}>
                  <h3 className="text-sm font-semibold text-ink">{s.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li key={item} className="chip text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-page">
          <h2 className="text-3xl sm:text-4xl">Credentials{certifications.length > 0 ? " and certifications" : ""}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c) => (
              <li key={c.title}>
                <Reveal className="h-full">
                  <div className="group card card-hover relative isolate flex h-full items-start gap-4 overflow-hidden border-teal/30 p-6">
                    <CardNetwork seed={120} />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 bg-[radial-gradient(80%_100%_at_100%_0%,rgb(94_234_212/0.14),transparent_70%)]"
                    />
                    <span className="fx-icon grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-2xl text-night shadow-[0_0_24px_-6px_rgb(94_234_212/0.7)]">
                      <ShieldIcon />
                    </span>
                    <div>
                      <h3 className="text-lg">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted">{c.issuer || "Professional registration"}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
            {certifications.map((c, i) => (
              <li key={c.url}>
                <Reveal delay={(i + 1) * 0.06} className="h-full">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card card-hover flex h-full items-start gap-4 p-6"
                  >
                    <span className="fx-icon grid size-12 shrink-0 place-items-center rounded-xl border border-teal/30 bg-night text-2xl text-teal">
                      <AwardIcon />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base leading-snug">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {c.issuer}
                        {c.year ? ` · ${c.year}` : ""}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                        Verify <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </a>
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
