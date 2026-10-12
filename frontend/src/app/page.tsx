import Link from "next/link";
import { CardNetwork } from "@/components/card-network";
import { CountUp } from "@/components/count-up";
import { CtaBand } from "@/components/cta-band";
import { socials } from "@/components/footer";
import { CoverMock } from "@/components/cover-mocks";
import { ArrowRight, serviceIcons } from "@/components/icons";
import { HeroName } from "@/components/hero-name";
import { HeroPortrait } from "@/components/hero-portrait";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SystemMap } from "@/components/system-map";
import { StackOrbit } from "@/components/stack-orbit";
import { getPosts, getProjects, toProjectMeta } from "@/lib/content";
import { personSchema, websiteSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { flagship, proof, site, stackGroups } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} · ${site.jobTitle}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});


export default function HomePage() {
  const featured = getProjects()
    .filter((p) => p.featured)
    .slice(0, 3)
    .map(toProjectMeta);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema()]} />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="animate-aurora absolute -top-56 -right-40 size-[680px] rounded-full bg-[radial-gradient(circle,rgb(94_234_212/0.22),transparent_62%)]" />
          <div className="animate-aurora absolute top-1/3 -left-56 size-[600px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.22),transparent_62%)] [--d:-9s]" />
          <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(70%_60%_at_60%_30%,black,transparent)]" />
        </div>

        <div className="container-page grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_auto] lg:gap-24 lg:pt-24 lg:pb-32">
          <div className="order-2 lg:order-1">
            <Link
              href="/contact"
              className="amber-pill animate-in group inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-amber opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-amber" />
              </span>
              Available for projects
              <ArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <h1 className="animate-in mt-6 [--d:80ms]">
              <span className="block text-2xl font-bold text-ink sm:text-3xl">Hi, I&apos;m</span>
              <HeroName name={site.name} />
            </h1>
            <ul className="animate-in mt-5 flex flex-wrap gap-2 [--d:160ms]" aria-label="Roles">
              {site.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal sm:text-sm"
                >
                  {role}
                </li>
              ))}
            </ul>
            <p className="animate-in mt-7 max-w-2xl text-2xl leading-snug font-bold text-ink sm:text-[2rem] [--d:240ms]">
              I build <span className="text-gradient">AI platforms and agents</span> that automate operations for
              growing businesses.
            </p>
            <p className="animate-in mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg [--d:320ms]">
              From the screen your team uses to the backend, the AI and the cloud it runs on. I build all of it, end to
              end.
            </p>
            <div className="animate-in mt-8 flex flex-col gap-3 sm:flex-row [--d:400ms]">
              <Link href="/projects" className="btn btn-primary btn-attract">
                View my work <ArrowRight className="animate-nudge" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Let&apos;s talk
              </Link>
            </div>
            <ul className="animate-in mt-8 flex items-center gap-3 [--d:480ms]" aria-label="Profiles">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid size-11 place-items-center rounded-full border border-line bg-panel text-lg text-muted transition duration-300 hover:-translate-y-1 hover:border-teal/60 hover:text-teal hover:shadow-[0_0_24px_-6px_rgb(94_234_212/0.7)]"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-pop order-1 justify-self-center [--d:120ms] lg:order-2">
            <HeroPortrait />
          </div>
        </div>
      </section>

      {/* 2. Proof strip: all from the AI Operations Platform */}
      <section aria-label="Highlights" className="relative border-y border-line bg-panel">
        <dl className="container-page grid grid-cols-2 gap-y-10 pt-12 pb-8 md:grid-cols-4 md:divide-x md:divide-line">
          {proof.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="flex flex-col items-center gap-1 px-2 text-center">
              <dt className="order-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{item.label}</dt>
              <dd className="order-1 text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span className="text-gradient">
                  <CountUp value={item.value} />
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="container-page pb-10 text-center text-sm text-muted">
          All from one AI operations platform I built.{" "}
          <Link href={flagship} className="link font-semibold">
            Read the case study <ArrowRight />
          </Link>
        </p>
      </section>

      {/* How it fits together */}
      <section className="cv-auto section relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_55%,rgb(59_130_246/0.1),transparent_70%)]"
        />
        <div className="container-page">
          <SectionHeading
            eyebrow="How it fits together"
            title={
              <>
                Your data in. <span className="text-gradient">Useful AI out.</span>
              </>
            }
            intro="I connect the model to the data and tools your business already has, then put it where your team and customers already are."
          />
          <SystemMap />
        </div>
      </section>

      {/* 3. Featured projects */}
      <section className="cv-auto section container-page">
        <SectionHeading
          eyebrow="Featured work"
          title="Production AI, not demos"
          intro="A few systems I've built end to end: the model and retrieval logic, the integrations, and the app people actually use."
          action={{ href: "/projects", label: "All projects" }}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Services */}
      <section className="cv-auto section border-t border-line">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="What I can build for you"
            action={{ href: "/services", label: "All services" }}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon];
              if (service.icon === "Platform") {
                return (
                  <li key={service.slug} className="sm:col-span-2">
                    <Reveal className="h-full">
                      <Link
                        href={`/services#${service.slug}`}
                        className="group card card-hover relative isolate grid h-full gap-6 overflow-hidden border-teal/30 p-6 sm:grid-cols-[1fr_1.15fr] sm:items-center"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_100%_0%,rgb(94_234_212/0.14),transparent_70%)]"
                        />
                        <div className="flex flex-col gap-3">
                          <span className="fx-icon grid size-11 place-items-center rounded-xl bg-brand text-xl text-night shadow-[0_0_24px_-6px_rgb(94_234_212/0.7)]">
                            <Icon />
                          </span>
                          <h3 className="text-xl">{service.title}</h3>
                          <p className="text-sm leading-relaxed text-muted">{service.oneLiner}</p>
                          <span className="inline-flex items-center gap-1 pt-2 text-sm font-semibold text-teal">
                            What&apos;s included <ArrowRight className="transition group-hover:translate-x-1" />
                          </span>
                        </div>
                        <div
                          aria-hidden="true"
                          className="cover-host tilt-host relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-night"
                        >
                          <div className="absolute inset-0 bg-grid opacity-60" />
                          <CoverMock art="platform" />
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                );
              }
              return (
                <li key={service.slug}>
                  <Reveal delay={i * 0.05} className="h-full">
                    <Link
                      href={`/services#${service.slug}`}
                      className="group card card-hover flex h-full flex-col gap-3 overflow-hidden p-6"
                    >
                      <CardNetwork seed={i + 60} />
                      <span className="fx-icon grid size-11 place-items-center rounded-xl border border-teal/30 bg-night/70 text-xl text-teal group-hover:border-teal/70">
                        <Icon />
                      </span>
                      <h3 className="text-lg">{service.title}</h3>
                      <p className="text-sm leading-relaxed text-muted">{service.oneLiner}</p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-teal">
                        What&apos;s included <ArrowRight className="transition group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
            <li className="lg:col-span-2">
              <Reveal delay={services.length * 0.05} className="h-full">
                <Link
                  href="/contact"
                  className="group card card-hover relative isolate flex h-full flex-col gap-3 overflow-hidden border-teal/30 p-6"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[radial-gradient(90%_90%_at_100%_0%,rgb(94_234_212/0.16),transparent_70%)]"
                  />
                  <CardNetwork seed={99} />
                  <h3 className="text-lg">Not sure what you need?</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    Tell me the problem. I&apos;ll tell you honestly which of these fits, or if none of them do.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-teal">
                    Let&apos;s talk <ArrowRight className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Stack */}
      <section className="cv-auto section relative overflow-hidden border-t border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_75%_50%,rgb(94_234_212/0.08),transparent_70%)]"
        />
        <div className="container-page">
          <SectionHeading
            eyebrow="Stack"
            title={
              <>
                Tools I ship with, <span className="text-gradient">model to cloud</span>
              </>
            }
            intro="Three rings around the AI: the models, the tools that connect them to real work, and the stack that ships it."
          />
          <Reveal>
            <StackOrbit groups={stackGroups} />
          </Reveal>
        </div>
      </section>

      {/* 6. Latest posts */}
      {posts.length > 0 ? (
        <section className="cv-auto section border-t border-line">
          <div className="container-page">
            <SectionHeading
              eyebrow="Writing"
              title="Latest posts"
              action={{ href: "/blog", label: "All posts" }}
            />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <PostCard post={post} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 7. CTA */}
      <CtaBand
        title="Want AI working inside your business? Let's talk."
        text="Tell me what you want it to do, and I'll tell you honestly what will work."
      />
    </>
  );
}
