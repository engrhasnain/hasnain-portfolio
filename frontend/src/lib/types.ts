// Shared types with no server imports, so client components can use them.

export const PROJECT_TYPES = ["Chatbots", "MCP", "Agents", "Voice", "WhatsApp", "SEO", "Automation", "Models"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type PreviewRow = { label: string; value: string; tone?: "ok" | "info" | "warn" | "muted" };

/** A product-style cover panel described in frontmatter (art: panel). */
export type ProjectPreview = {
  /** Window title bar, e.g. "call-intake · live". */
  window: string;
  /** Optional first line, like a request or an event. */
  heading?: string;
  /** Up to 5 rows that appear one by one. */
  rows: PreviewRow[];
  /** Optional closing line with a check mark. */
  footer?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  /** Meta description for Google, 150-160 characters. */
  description: string;
  type: ProjectType[];
  stack: string[];
  results: string[];
  status: "Live" | "Building";
  featured: boolean;
  order: number;
  date: string;
  cover?: string;
  /** Which generated cover mockup to show when there is no cover image: platform, chat, mcp, whatsapp, pdf or panel. */
  art?: string;
  /** The panel cover's content, used when art is "panel". */
  preview?: ProjectPreview;
  /** The cover's sticky note: one number from the results, e.g. { value: "37", label: "live-call functions" }. */
  coverStat?: { value: string; label: string };
  /** The cover's handwritten margin note, 2 to 5 words. */
  coverNote?: string;
  /** "case-study" gives the project a full-width page for long write-ups (used by the flagship). */
  layout?: "case-study";
  /** Title of the call-to-action band at the end of the project page. */
  cta?: string;
  video?: string;
  architecture?: string;
  github?: string;
  demo?: string;
  fiverr?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  /** The <title> tag when the H1 is a hook: keyword first, max 60 characters, used without the name suffix. */
  seoTitle?: string;
  summary: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  cover?: string;
  canonical?: string;
  readingMinutes: number;
  /** A live, animated cover from components/post-covers.tsx, shown on the site instead of the cover image. */
  coverArt?: string;
  /** Only ever true in a local SHOW_DRAFTS preview. */
  draft?: boolean;
  /** The 40-60 word direct answer shown at the top, the part search and AI answers quote. */
  answer?: string;
  /** Questions people ask about the topic. Shown under the post and sent to search engines as FAQPage. */
  faq: { q: string; a: string }[];
  /** Everything the post cites. Shown as the Sources list and sent as schema.org citations. */
  sources: { publisher: string; title: string; url: string }[];
};
