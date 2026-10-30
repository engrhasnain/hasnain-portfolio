import { CtaBand } from "@/components/cta-band";
import { Sparkles } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { ProjectsGrid } from "@/components/projects-grid";
import { SectionHeading } from "@/components/section-heading";
import { getProjects, toProjectMeta } from "@/lib/content";
import { breadcrumbSchema, projectsListSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { lab } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AI Projects: Voice Agents, MCP Servers, Chatbots",
  description:
    "AI projects by Muhammad Hasnain Pirzada: voice agents, MCP servers for Claude, RAG chatbots, WhatsApp assistants and SEO automation, built for real businesses.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects().map(toProjectMeta);

  return (
    <>
      <JsonLd
        data={[
          projectsListSchema(projects),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <section className="section">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="Projects"
            title="AI systems I've built"
            intro="Voice agents, MCP servers for Claude, chatbots, automation and SEO systems running for real businesses. Client work is described by industry and outcome only, never by name."
          />
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {lab.length > 0 ? (
        <section className="container-page pb-20 sm:pb-28">
          <Reveal>
            <div className="card grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12">
              <div className="flex items-start gap-5">
                <span className="icon-tile">
                  <Sparkles />
                </span>
                <div>
                  <p className="meta">Building now</p>
                  <h2 className="mt-2 text-xl">In the lab</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                    New projects on the way. Each gets its own case study when it ships.
                  </p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {lab.map((name) => (
                  <li key={name} className="chip">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      ) : null}

      <CtaBand title="Need something like this?" />
    </>
  );
}
