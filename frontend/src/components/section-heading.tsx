import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";
import { Reveal } from "./motion";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
  as?: "h1" | "h2";
}) {
  const isPageTitle = Tag === "h1";
  const content = (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className={`eyebrow flex items-center gap-3 ${isPageTitle ? "animate-in" : ""}`}>
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
          {eyebrow}
        </p>
        <Tag
          className={`mt-3 ${isPageTitle ? "animate-in text-4xl [--d:80ms] sm:text-6xl" : "text-3xl sm:text-5xl"}`}
        >
          {title}
        </Tag>
        {intro ? (
          <p className={`mt-4 text-base leading-relaxed text-muted sm:text-lg ${isPageTitle ? "animate-in [--d:160ms]" : ""}`}>
            {intro}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link href={action.href} className="link group shrink-0 text-sm">
          {action.label} <ArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
  return isPageTitle ? content : <Reveal>{content}</Reveal>;
}
