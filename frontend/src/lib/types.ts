// Shared types with no server imports, so client components can use them.

export const PROJECT_TYPES = ["Chatbots", "MCP", "Agents", "Voice", "WhatsApp", "Models"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  /** Meta description for Google, 150–160 characters. */
  description: string;
  type: ProjectType[];
  stack: string[];
  results: string[];
  status: "Live" | "Building";
  featured: boolean;
  order: number;
  date: string;
  cover?: string;
  /** Which generated cover mockup to show when there is no cover image: platform, chat, mcp, whatsapp or pdf. */
  art?: string;
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
  summary: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  cover?: string;
  canonical?: string;
  readingMinutes: number;
};
