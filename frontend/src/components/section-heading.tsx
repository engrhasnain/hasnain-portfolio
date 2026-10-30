import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";
import { Reveal } from "./motion";

/** Big heading on the left, the one-paragraph intro on the right (stacked on phones). */
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
    <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
      <div>
        <p className={`eyebrow ${isPageTitle ? "animate-in" : ""}`}>{eyebrow}</p>
        <Tag
          className={`mt-4 ${
            isPageTitle
              ? "animate-in text-[2.6rem] [--d:60ms] sm:text-6xl lg:text-[4.2rem]"
              : "text-[2.2rem] sm:text-5xl lg:text-[3.4rem]"
          }`}
        >
          {title}
        </Tag>
      </div>
      {intro || action ? (
        <div className={`flex flex-col items-start gap-5 lg:pb-2 ${isPageTitle ? "animate-in [--d:120ms]" : ""}`}>
          {intro ? <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{intro}</p> : null}
          {action ? (
            <Link href={action.href} className="link group text-sm font-bold">
              {action.label} <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
  return isPageTitle ? content : <Reveal>{content}</Reveal>;
}
