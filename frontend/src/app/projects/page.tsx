import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { ProjectsGrid } from "@/components/projects-grid";
import { SectionHeading } from "@/components/section-heading";
import { getProjects, toProjectMeta } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { lab } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AI Projects: Chatbots, MCP Servers and Agents",
  description:
    "AI projects by Muhammad Hasnain Pirzada: an AI operations platform, RAG chatbots, MCP servers and WhatsApp assistants built for real businesses, with results.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects().map(toProjectMeta);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <section className="section container-page">
        <SectionHeading
          as="h1"
          eyebrow="Projects"
          title="AI systems I've built"
          intro="Chatbots, MCP servers, agents and assistants running for real businesses. Client work is described by industry and outcome only."
        />
        <ProjectsGrid projects={projects} />
      </section>

      {lab.length > 0 ? (
        <section className="container-page pb-16 sm:pb-24">
          <div className="card p-6 sm:p-8">
            <h2 className="flex items-center gap-3 text-xl">
              In the lab
              <span className="rounded-full border border-amber/40 bg-amber/10 px-2.5 py-0.5 text-xs font-semibold text-amber">
                Building now
              </span>
            </h2>
            <p className="mt-2 text-sm text-muted">New projects on the way. Each gets its own case study when it ships.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {lab.map((name) => (
                <li key={name} className="chip text-ink">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand title="Need something like this?" />
    </>
  );
}
