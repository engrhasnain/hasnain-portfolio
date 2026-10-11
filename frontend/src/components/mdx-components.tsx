import Link from "next/link";
import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Areas, Architecture, Built, Highlights, Numbers, Problem, Workflows } from "./case-study";
import { Flow } from "./flow";
import { VideoEmbed } from "./video-embed";

function Callout({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-teal/30 bg-teal/5 px-5 py-4 text-ink">{children}</div>;
}

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  img: ({ alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" decoding="async" {...props} />
  ),
  Flow,
  Video: VideoEmbed,
  Callout,
  // Case-study sections (see content/projects/ai-operations-platform.mdx)
  Problem,
  Areas,
  Architecture,
  Built,
  Numbers,
  Workflows,
  Highlights,
};
