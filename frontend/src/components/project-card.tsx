import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/types";
import { ArrowRight } from "./icons";
import { ProjectCover } from "./project-cover";

/** Same anatomy as PostCard: cover panel, meta line, title, summary, one link. */
export function ProjectCard({ project, headingLevel = "h3" }: { project: ProjectMeta; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/projects/${project.slug}`} className="group card card-hover flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.07]">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="meta flex flex-wrap items-center gap-x-2">
          {project.layout === "case-study" ? (
            <>
              <span>Flagship</span>
              <span className="text-ink/45">·</span>
            </>
          ) : null}
          {project.type.slice(0, 2).map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              {i > 0 ? <span className="text-ink/45">·</span> : null}
              {t}
            </span>
          ))}
        </p>
        <Heading className="mt-3 text-xl leading-snug transition-colors group-hover:text-teal">{project.title}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{project.summary}</p>
        <span className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="inline-flex items-center gap-1.5 font-bold text-teal">
            Read the case study <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </span>
          {project.status === "Building" ? <span className="text-ink/50">Building</span> : null}
        </span>
      </div>
    </Link>
  );
}
