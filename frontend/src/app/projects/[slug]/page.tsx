import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseNav } from "@/components/case-nav";
import { caseNavItems } from "@/components/case-study";
import { CtaBand } from "@/components/cta-band";
import { ToolChip } from "@/components/tool-chip";
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, Calendar, Check, GitHub } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { ProjectCover } from "@/components/project-cover";
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
  return pageMetadata({ title: project.title, description: project.description, path: `/projects/${slug}` });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const fiverr = project.fiverr || site.links.fiverr || undefined;
  const caseStudy = project.layout === "case-study";
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
        <header className="container-page pt-10 sm:pt-16">
          <nav aria-label="Breadcrumb">
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-teal">
              <ArrowLeft /> All projects
            </Link>
          </nav>
          <div className="animate-in mt-6 flex flex-wrap gap-2">
            {project.type.map((t) => (
              <span key={t} className="chip text-teal">
                {t}
              </span>
            ))}
            {project.status === "Building" ? <span className="chip">Building</span> : null}
          </div>
          <h1 className="animate-in mt-4 max-w-4xl text-3xl leading-tight [--d:80ms] sm:text-5xl">{project.title}</h1>
          <p className="animate-in mt-4 max-w-3xl text-lg leading-relaxed text-muted [--d:160ms]">{project.summary}</p>
          {caseStudy && project.results.length > 0 ? (
            <ul className="animate-in mt-6 flex flex-wrap gap-2 [--d:200ms]" aria-label="Highlights">
              {project.results.map((r) => (
                <li
                  key={r}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/5 px-3 py-1.5 text-sm text-ink"
                >
                  <Check className="shrink-0 text-teal" /> {r}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="animate-in mt-8 flex flex-col gap-3 [--d:240ms] sm:flex-row sm:flex-wrap">
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

        <div className="animate-pop container-page mt-10 [--d:200ms] sm:mt-14">
          {project.video ? (
            <VideoEmbed src={project.video} title={project.title} poster={project.cover} />
          ) : (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-line sm:aspect-[21/9]">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt={`${project.title} screenshot`}
                  fill
                  priority
                  sizes="(min-width: 1152px) 1104px, 100vw"
                  className="object-cover"
                />
              ) : (
                <ProjectCover project={project} large />
              )}
            </div>
          )}
        </div>

        {caseStudy ? (
          <div className="relative mt-14 sm:mt-20">
          <CaseNav items={[...caseNavItems(project.body), ...(project.stack.length > 0 ? [{ id: "stack", label: "Stack" }] : [])]} />
          <div className="container-page pt-12 sm:pt-16">
            <Mdx source={project.body} />
            {project.stack.length > 0 ? (
              <section id="stack" className="scroll-mt-36 border-t border-line py-16 sm:py-20">
                <p className="eyebrow flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 bg-brand" />
                  Stack
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl">Tools behind it</h2>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <ToolChip name={s} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
          </div>
        ) : (
        <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px]">
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

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            {project.results.length > 0 ? (
              <Reveal className="card p-6">
                <h2 className="text-base">Results</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {project.results.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <Check className="mt-0.5 shrink-0 text-teal" />
                      <span className="text-ink/90">{r}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
            {project.stack.length > 0 ? (
              <Reveal delay={0.08} className="card p-6">
                <h2 className="text-base">Stack</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s} className="chip text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
            <section className="card relative isolate overflow-hidden border-teal/30 p-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_100%_0%,rgb(94_234_212/0.15),transparent_70%)]"
              />
              <h2 className="text-base">Need something like this?</h2>
              <p className="mt-2 text-sm text-muted">Tell me what you need, or hire me directly on Fiverr.</p>
              <div className="mt-5 flex flex-col gap-2">
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
          </aside>
        </div>
        )}
      </article>

      {more.length > 0 ? (
        <section className="container-page border-t border-line py-16 sm:py-20">
          <h2 className="mb-8 text-2xl sm:text-3xl">More projects</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {more.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.1} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <CtaBand title={project.cta} />
    </>
  );
}
