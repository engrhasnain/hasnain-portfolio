import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/types";
import { ArrowRight } from "./icons";
import { ProjectCover } from "./project-cover";

export function ProjectCard({ project, headingLevel = "h3" }: { project: ProjectMeta; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card card-hover flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        {project.layout === "case-study" ? (
          <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-amber/50 bg-night/85 px-2.5 py-1 text-[11px] font-bold text-amber shadow-[0_0_20px_-6px_rgb(245_158_11/0.8)] backdrop-blur">
            <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
            Flagship case study
          </span>
        ) : null}
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {project.type.map((t) => (
            <span key={t} className="chip text-teal">
              {t}
            </span>
          ))}
          {project.status === "Building" ? <span className="chip">Building</span> : null}
        </div>
        <Heading className="text-lg leading-snug">{project.title}</Heading>
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-teal">
          Read the case study
          <ArrowRight className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
