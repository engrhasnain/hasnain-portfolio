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
      <div role="group" aria-label="Filter projects by type" className="mb-10 flex flex-wrap gap-2">
        {options.map((option) => {
          const n = option === "All" ? projects.length : count(option);
          if (n === 0) return null; // an empty filter looks unfinished
          return (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              disabled={n === 0}
              onClick={() => setFilter(option)}
              className="chip cursor-pointer px-4 py-2 text-sm transition duration-200 hover:border-white/30 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:border-teal aria-pressed:bg-teal aria-pressed:text-night"
            >
              {option} <span className="text-xs tabular-nums opacity-60">{n}</span>
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
