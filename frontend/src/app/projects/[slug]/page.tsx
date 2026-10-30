import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseNav } from "@/components/case-nav";
import { CaseHeading, caseNavItems } from "@/components/case-study";
import { CtaBand } from "@/components/cta-band";
import { ToolChip } from "@/components/tool-chip";
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, Calendar, Check, GitHub } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { ProjectCover } from "@/components/project-cover";
import { SectionHeading } from "@/components/section-heading";
import { VideoEmbed } from "@/components/video-embed";
import { getProject, getProjects, toProjectMeta } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // Long, keyword-led titles skip the name suffix so Google shows them whole (about 60 characters fit).
  return pageMetadata({
    title: project.title,
    absoluteTitle: project.title.length > 38,
    description: project.description,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const fiverr = project.fiverr || site.links.fiverr || undefined;
  const caseStudy = project.layout === "case-study";
  // The small label over the title: kind of page, project types, and "Building" while it's in progress.
  const metaLabels = [
    ...(caseStudy ? ["Flagship case study"] : []),
    ...project.type,
    ...(project.status === "Building" ? ["Building"] : []),
  ];
  const more = getProjects()
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2)
    .map(toProjectMeta);

  return (
    <>
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="container-page pt-8 sm:pt-12 lg:pt-14">
          <nav aria-label="Breadcrumb">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 transition-colors hover:text-teal"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" /> All projects
            </Link>
          </nav>
          <p className="meta animate-in mt-8 flex flex-wrap items-center gap-x-2 gap-y-1.5 sm:mt-10">
            {metaLabels.map((label, i) => (
              <span key={label} className={label === "Building" ? "text-ink/55" : undefined}>
                {label}
                {i < metaLabels.length - 1 ? <span className="ml-2 text-ink/45">·</span> : null}
              </span>
            ))}
          </p>
          <h1 className="animate-in mt-4 max-w-5xl text-[2.4rem] leading-[1.04] [--d:60ms] sm:text-[3.4rem] lg:text-[4rem]">
            {project.title}
          </h1>
          <p className="animate-in mt-6 max-w-3xl text-lg leading-relaxed text-ink/70 [--d:120ms] sm:text-xl">
            {project.summary}
          </p>
          {caseStudy && project.results.length > 0 ? (
            <ul
              className="animate-in mt-8 grid max-w-4xl gap-x-10 gap-y-3 [--d:160ms] sm:grid-cols-2"
              aria-label="Highlights"
            >
              {project.results.map((r) => (
                <li key={r} className="flex gap-2.5 text-ink/85">
                  <Check className="mt-1 shrink-0 text-teal" /> {r}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="animate-in mt-9 flex flex-col gap-3 [--d:200ms] sm:flex-row sm:flex-wrap">
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live demo <ArrowUpRight />
              </a>
            ) : null}
            {fiverr ? (
              <a
                href={fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${project.demo ? "btn-ghost" : "btn-primary"}`}
              >
                <Briefcase /> Hire me on Fiverr
              </a>
            ) : null}
            <Link href="/contact" className={`btn ${project.demo || fiverr ? "btn-ghost" : "btn-primary"}`}>
              Discuss a similar project
            </Link>
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHub /> Code on GitHub
              </a>
            ) : null}
          </div>
        </header>

        {/* The cover, framed as a card like a screen on a desk. */}
        <div className="animate-pop container-page mt-12 [--d:200ms] sm:mt-16">
          {project.video ? (
            <VideoEmbed src={project.video} title={project.title} poster={project.cover} />
          ) : (
            <div className="card p-2 sm:p-2.5">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/[0.06] sm:aspect-[21/9]">
                {project.cover ? (
                  <Image
                    src={project.cover}
                    alt={`${project.title} screenshot`}
                    fill
                    priority
                    sizes="(min-width: 1152px) 1084px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <ProjectCover project={project} large />
                )}
              </div>
            </div>
          )}
        </div>

        {caseStudy ? (
          <div className="relative mt-16 sm:mt-24">
            <CaseNav
              items={[...caseNavItems(project.body), ...(project.stack.length > 0 ? [{ id: "stack", label: "Stack" }] : [])]}
            />
            <div className="container-page pt-12 sm:pt-16">
              <Mdx source={project.body} />
              {project.stack.length > 0 ? (
                <section id="stack" className="scroll-mt-36 border-t border-white/[0.06] py-16 sm:py-24">
                  <CaseHeading
                    n={String(caseNavItems(project.body).length + 1).padStart(2, "0")}
                    eyebrow="Stack"
                    title="Tools behind it"
                  />
                  <Reveal>
                    <ul className="flex flex-wrap gap-2.5">
                      {project.stack.map((s) => (
                        <li key={s}>
                          <ToolChip name={s} />
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </section>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div className="prose-glow min-w-0 [&>h2:first-child]:mt-0">
              <Mdx source={project.body} />
              {project.architecture ? (
                <figure>
                  <h2>Architecture</h2>
                  <Image
                    src={project.architecture}
                    alt={`Architecture diagram of ${project.title}`}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="mt-6 h-auto w-full"
                  />
                </figure>
              ) : null}
            </div>

            {/* Sidebar: the facts first, then the one highlighted box. Only that box stays in view while you read. */}
            <aside className="flex flex-col gap-5">
              {project.results.length > 0 ? (
                <Reveal className="card p-6">
                  <p className="meta">At a glance</p>
                  <h2 className="mt-2 text-xl">Results</h2>
                  <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed">
                    {project.results.map((r) => (
                      <li key={r} className="flex gap-2.5">
                        <Check className="mt-1 shrink-0 text-teal" />
                        <span className="text-ink/85">{r}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
              {project.stack.length > 0 ? (
                <Reveal delay={0.08} className="card p-6">
                  <p className="meta">Built with</p>
                  <h2 className="mt-2 text-xl">Stack</h2>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <li key={s}>
                        <ToolChip name={s} size="sm" />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
              <div className="lg:sticky lg:top-24">
                <section className="card-feature p-6">
                  <p className="eyebrow">Let&apos;s build yours</p>
                  <h2 className="mt-3 text-xl">Need something like this?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    Tell me what you need, or hire me directly on Fiverr.
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <Link href="/contact" className="btn btn-primary">
                      Let&apos;s talk <ArrowRight />
                    </Link>
                    {site.booking ? (
                      <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        <Calendar /> Book a free call
                      </a>
                    ) : null}
                    {fiverr ? (
                      <a href={fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        Hire me on Fiverr <ArrowUpRight />
                      </a>
                    ) : null}
                  </div>
                </section>
              </div>
            </aside>
          </div>
        )}
      </article>

      {more.length > 0 ? (
        <section className="section border-t border-white/[0.06]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Keep exploring"
              title="More projects"
              action={{ href: "/projects", label: "See all projects" }}
            />
            <ul className="grid gap-6 sm:grid-cols-2">
              {more.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <ProjectCard project={p} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand title={project.cta} />
    </>
  );
}
