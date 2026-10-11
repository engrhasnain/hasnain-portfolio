"use client";

import { useState, type CSSProperties } from "react";
import { PROJECT_TYPES, type ProjectMeta, type ProjectType } from "@/lib/types";
import { ProjectCard } from "./project-card";

export function ProjectsGrid({ projects }: { projects: ProjectMeta[] }) {
  const [filter, setFilter] = useState<ProjectType | "All">("All");
  const count = (t: ProjectType) => projects.filter((p) => p.type.includes(t)).length;
  const visible = filter === "All" ? projects : projects.filter((p) => p.type.includes(filter));
  const options: (ProjectType | "All")[] = ["All", ...PROJECT_TYPES];

  return (
    <div>
      <div role="group" aria-label="Filter projects by type" className="mb-8 flex flex-wrap gap-2">
        {options.map((option) => {
          const n = option === "All" ? projects.length : count(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              disabled={n === 0}
              onClick={() => setFilter(option)}
              className="rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted transition duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:text-ink active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:border-transparent aria-pressed:bg-brand aria-pressed:font-semibold aria-pressed:text-night"
            >
              {option} <span className="text-xs opacity-70">{n}</span>
            </button>
          );
        })}
      </div>

      <ul key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <li key={project.slug} className="animate-in" style={{ "--d": `${i * 90}ms` } as CSSProperties}>
            <ProjectCard project={project} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
