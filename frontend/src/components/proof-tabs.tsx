"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectMeta } from "@/lib/types";
import { ArrowRight, Check } from "./icons";
import { ProjectCover } from "./project-cover";

export type ProofTab = {
  label: string;
  title: string;
  points: string[];
  project: ProjectMeta;
  service: { href: string; label: string };
};

/** "See it working": one tab per kind of system, each showing its live panel and three verified facts. */
export function ProofTabs({ tabs }: { tabs: ProofTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <div>
      <div role="tablist" aria-label="Systems I've built" className="flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            id={`proof-tab-${i}`}
            aria-selected={i === active}
            aria-controls="proof-panel"
            onClick={() => setActive(i)}
            className="cursor-pointer rounded-full border border-white/12 px-5 py-2.5 text-sm font-bold text-ink/75 transition hover:border-teal/50 hover:text-ink aria-selected:border-teal aria-selected:bg-teal aria-selected:text-night"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        id="proof-panel"
        role="tabpanel"
        aria-labelledby={`proof-tab-${active}`}
        className="card-feature mt-8 grid overflow-hidden lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <Link
          href={`/projects/${tab.project.slug}`}
          className="group relative block aspect-[16/10] overflow-hidden border-b border-white/[0.07] lg:aspect-auto lg:min-h-[380px] lg:border-r lg:border-b-0"
          aria-label={`Read the case study: ${tab.project.title}`}
        >
          <ProjectCover key={tab.project.slug} project={tab.project} large />
        </Link>
        <div key={tab.label} className="animate-in flex flex-col p-7 sm:p-10">
          <p className="meta">{tab.label}</p>
          <h3 className="mt-3 text-2xl leading-tight sm:text-[1.9rem]">{tab.title}</h3>
          <ul className="mt-6 space-y-3.5">
            {tab.points.map((p) => (
              <li key={p} className="flex gap-3 text-ink/85">
                <Check className="mt-1 shrink-0 text-teal" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
            <Link href={`/projects/${tab.project.slug}`} className="btn btn-primary btn-sm">
              Read the case study <ArrowRight />
            </Link>
            <Link href={tab.service.href} className="btn btn-ghost btn-sm">
              {tab.service.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
