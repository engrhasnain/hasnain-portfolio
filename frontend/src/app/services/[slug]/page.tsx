import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, serviceIcons } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getPost, getProject, toProjectMeta } from "@/lib/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    ...pageMetadata({
      title: service.seoTitle,
      absoluteTitle: true,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
    }),
    keywords: service.keywords,
  };
}

const num = (i: number) => String(i + 1).padStart(2, "0");

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const projects = service.projects.flatMap((s) => {
    const p = getProject(s);
    return p ? [toProjectMeta(p)] : [];
  });
  const posts = service.posts.flatMap((s) => {
    const p = getPost(s);
    return p ? [p] : [];
  });
  const others = services.filter((s) => s.slug !== service.slug);
  const useCases = service.useCases ?? [];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          ...(service.faq.length ? [faqSchema(service.faq)] : []),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      {/* Hero: the pitch on the left, the scope as the highlighted card on the right */}
      <section className="container-page pt-10 pb-16 sm:pt-16 sm:pb-20">
        <nav aria-label="Breadcrumb">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-teal">
            <ArrowLeft /> All services
          </Link>
        </nav>
        <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow animate-in flex items-center gap-2.5">
              <Icon className="text-[1.1rem]" /> {service.title}
            </p>
            <h1 className="animate-in mt-4 text-[2.5rem] leading-[1.04] [--d:60ms] sm:text-6xl lg:text-[3.9rem]">
              {service.headline}
            </h1>
            <p className="animate-in mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 [--d:120ms]">{service.intro}</p>
            <div className="animate-in mt-9 flex flex-col gap-3 [--d:180ms] sm:flex-row sm:flex-wrap">
              {site.booking ? (
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Calendar /> Book a free call
                </a>
              ) : null}
              <Link href="/contact" className="btn btn-ghost">
                Get a quote <ArrowRight />
              </Link>
              {service.fiverr ? (
                <a href={service.fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Hire me on Fiverr <ArrowUpRight />
                </a>
              ) : null}
            </div>
          </div>

          <aside className="card-feature animate-in p-7 [--d:140ms] sm:p-8">
            <div className="flex items-center gap-4">
              <span className="icon-tile">
                <Icon />
              </span>
              <h2 className="text-xl">What&apos;s included</h2>
            </div>
            <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-6 text-[0.95rem]">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 shrink-0 text-teal" />
                  <span className="leading-relaxed text-ink/85">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* The direct answer (AEO) */}
      {service.whatIs ? (
        <section aria-labelledby="what-is" className="container-page pb-20 sm:pb-28">
          <Reveal>
            <div className="card-feature grid gap-4 p-7 sm:p-9 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-12">
              <h2 id="what-is" className="meta lg:pt-1.5">
                {service.whatIs.q}
              </h2>
              <p className="text-lg leading-8 text-ink/90 sm:text-xl sm:leading-9">{service.whatIs.a}</p>
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* Problems: heading left, numbered list right (same layout as the home FAQ) */}
      <section className="section border-t border-white/[0.06]">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Sound familiar?</p>
            <h2 className="mt-4 text-[2.2rem] sm:text-5xl lg:text-[3.4rem]">The problem this solves</h2>
          </Reveal>
          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {service.problems.map((problem, i) => (
              <li key={problem}>
                <Reveal delay={i * 0.05} className="flex gap-5 py-6">
                  <span className="meta mt-1.5 w-6 shrink-0 tabular-nums">{num(i)}</span>
                  <p className="text-lg leading-relaxed text-ink/85">{problem}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Outcomes */}
      {service.outcomes?.length ? (
        <section className="section border-t border-white/[0.06]">
          <div className="container-page">
            <SectionHeading eyebrow="What you get" title="What you have at the end" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.outcomes.map((o, i) => (
                <li key={o.title}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <div className="card h-full p-6 sm:p-7">
                      <span className="icon-tile">
                        <Check />
                      </span>
                      <h3 className="mt-6 text-xl">{o.title}</h3>
                      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/70">{o.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Comparison: this service's own column is the teal one */}
      {service.comparison ? (
        <section aria-labelledby="compare" className="section border-t border-white/[0.06]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Compare"
              title={<span id="compare">{service.comparison.title}</span>}
              intro={service.comparison.intro}
            />
            <Reveal>
              <div className="card overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-[0.95rem]">
                  <thead>
                    <tr>
                      {service.comparison.columns.map((c, i) => (
                        <th
                          key={c}
                          scope="col"
                          className={`meta border-b border-white/[0.08] px-6 py-5 align-bottom ${
                            i === 1 ? "border-t-2 border-t-teal bg-teal/[0.06]" : "text-ink/50"
                          }`}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {service.comparison.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-white/[0.06] last:border-0">
                        {row.map((cell, i) =>
                          i === 0 ? (
                            <th key={i} scope="row" className="px-6 py-5 align-top font-bold text-ink">
                              {cell}
                            </th>
                          ) : (
                            <td
                              key={i}
                              className={`px-6 py-5 align-top leading-relaxed ${
                                i === 1 ? "bg-teal/[0.06] font-semibold text-ink" : "text-ink/65"
                              }`}
                            >
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Use cases: one panel split into quarters */}
      {useCases.length ? (
        <section className="section border-t border-white/[0.06]">
          <div className="container-page">
            <SectionHeading eyebrow="Use cases" title="Where this works in Saudi Arabia and the UAE" />
            <Reveal>
              <ul className="card grid overflow-hidden sm:grid-cols-2">
                {useCases.map((u, i) => {
                  const lastAlone = useCases.length % 2 === 1 && i === useCases.length - 1;
                  return (
                    <li
                      key={u.title}
                      className={`border-white/[0.07] p-7 sm:p-9 ${i > 0 ? "border-t" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${
                        i % 2 === 0 && !lastAlone ? "sm:border-r" : ""
                      } ${lastAlone ? "sm:col-span-2" : ""}`}
                    >
                      <span className="meta tabular-nums">{num(i)}</span>
                      <h3 className="mt-3 text-xl">{u.title}</h3>
                      <p className="mt-2.5 leading-relaxed text-ink/70">{u.text}</p>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Process: the one light, paper section, same steps layout as the home page */}
      <section className="paper section">
        <div className="container-page">
          <SectionHeading eyebrow="How it runs" title="From first call to handover" />
          <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.07}>
                  <span className="block font-hand text-[3.4rem] leading-none font-bold text-teal">{i + 1}.</span>
                  <h3 className="mt-3 text-xl">{step.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink/70">{step.text}</p>
                </Reveal>
                {i < service.process.length - 1 ? (
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

      {/* Proof */}
      {projects.length > 0 ? (
        <section className="section">
          <div className="container-page">
            <SectionHeading
              eyebrow="Proof"
              title="Work I've shipped like this"
              action={{ href: "/projects", label: "All projects" }}
            />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <li key={project.slug}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <ProjectCard project={project} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* FAQ: same layout as the home page */}
      {service.faq.length > 0 ? (
        <section aria-labelledby="faq" className="section border-t border-white/[0.06]">
          <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="eyebrow">Questions</p>
                <h2 id="faq" className="mt-4 text-[2.2rem] sm:text-5xl lg:text-[3.4rem]">
                  Frequently asked questions
                </h2>
              </Reveal>
            </div>
            <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {service.faq.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt className="text-lg font-bold text-ink">{q}</dt>
                  <dd className="mt-2.5 leading-7 text-ink/75">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {/* Read more and other services: one panel, split in two */}
      <section className="section border-t border-white/[0.06]">
        <Reveal className="container-page">
          <div className={`card grid ${posts.length > 0 ? "md:grid-cols-2" : ""}`}>
            {posts.length > 0 ? (
              <nav
                aria-labelledby="read-more"
                className="border-b border-white/[0.07] p-7 sm:p-9 md:border-r md:border-b-0"
              >
                <h2 id="read-more" className="text-xl">
                  Read more on this
                </h2>
                <ul className="mt-5 divide-y divide-white/[0.07] border-t border-white/[0.07]">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="group flex items-start justify-between gap-4 py-4">
                        <span className="min-w-0">
                          <span className="meta flex flex-wrap items-center gap-x-2">
                            {p.tags[0] ? (
                              <>
                                <span>{p.tags[0]}</span>
                                <span className="text-ink/45">·</span>
                              </>
                            ) : null}
                            <span className="text-ink/55">{p.readingMinutes} min read</span>
                          </span>
                          <span className="mt-1.5 block font-semibold leading-snug text-ink/90 transition-colors group-hover:text-teal">
                            {p.title}
                          </span>
                        </span>
                        <ArrowRight className="mt-6 shrink-0 text-teal transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            <nav aria-labelledby="other-services" className="p-7 sm:p-9">
              <h2 id="other-services" className="text-xl">
                Other services
              </h2>
              <ul className="mt-5 divide-y divide-white/[0.07] border-t border-white/[0.07]">
                {others.map((s) => {
                  const OtherIcon = serviceIcons[s.icon];
                  return (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex items-center gap-3.5 py-3.5">
                        <OtherIcon className="shrink-0 text-teal" />
                        <span className="flex-1 font-semibold text-ink/90 transition-colors group-hover:text-teal">{s.title}</span>
                        <ArrowRight className="shrink-0 text-teal transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </Reveal>
      </section>

      <CtaBand title="Want this built for your business?" />
    </>
  );
}
