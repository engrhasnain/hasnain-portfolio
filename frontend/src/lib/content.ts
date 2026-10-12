import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { PROJECT_TYPES, type PostMeta, type ProjectMeta, type ProjectType } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Project = ProjectMeta & { body: string };
export type Post = PostMeta & { body: string };

type Entry = { file: string; slug: string; data: Record<string, unknown>; body: string };

function readCollection(dir: string): Entry[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf8"));
      const slug = text(data.slug) ?? file.replace(/\.mdx$/, "");
      return { file: `content/${dir}/${file}`, slug, data, body: content };
    });
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function list(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return typeof value === "string" && value.trim() ? [value.trim()] : [];
}

function required(entry: Entry, key: string): string {
  const value = text(entry.data[key]);
  if (!value) throw new Error(`${entry.file}: frontmatter is missing "${key}"`);
  return value;
}

function isoDate(entry: Entry, key: string): string | undefined {
  const value = entry.data[key];
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return text(value);
}

export const getProjects = cache((): Project[] =>
  readCollection("projects")
    .map((entry) => {
      const type = list(entry.data.type);
      const unknown = type.filter((t) => !PROJECT_TYPES.includes(t as ProjectType));
      if (unknown.length) {
        throw new Error(`${entry.file}: unknown type "${unknown.join(", ")}". Use: ${PROJECT_TYPES.join(", ")}`);
      }
      const summary = required(entry, "summary");
      return {
        slug: entry.slug,
        title: required(entry, "title"),
        summary,
        description: text(entry.data.description) ?? summary,
        type: type as ProjectType[],
        stack: list(entry.data.stack),
        results: list(entry.data.results),
        status: entry.data.status === "Building" ? "Building" : "Live",
        featured: entry.data.featured === true,
        order: typeof entry.data.order === "number" ? entry.data.order : 99,
        date: isoDate(entry, "date") ?? "2026-01-01",
        cover: text(entry.data.cover),
        art: text(entry.data.art),
        layout: entry.data.layout === "case-study" ? "case-study" : undefined,
        cta: text(entry.data.cta),
        video: text(entry.data.video),
        architecture: text(entry.data.architecture),
        github: text(entry.data.github),
        demo: text(entry.data.demo),
        fiverr: text(entry.data.fiverr),
        body: entry.body,
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date)),
);

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function toProjectMeta({ body: _body, ...meta }: Project): ProjectMeta {
  return meta;
}

export const getPosts = cache((): Post[] =>
  readCollection("blog")
    // Drafts never appear on the live site. Run a local build with SHOW_DRAFTS=1 to read them before publishing.
    .filter((entry) => !(entry.data.draft === true && process.env.NODE_ENV === "production" && process.env.SHOW_DRAFTS !== "1"))
    .map((entry) => {
      const summary = required(entry, "summary");
      const words = entry.body.split(/\s+/).filter(Boolean).length;
      const date = isoDate(entry, "date");
      if (!date) throw new Error(`${entry.file}: frontmatter is missing "date"`);
      return {
        slug: entry.slug,
        title: required(entry, "title"),
        summary,
        description: text(entry.data.description) ?? summary,
        date,
        updated: isoDate(entry, "updated"),
        tags: list(entry.data.tags),
        cover: text(entry.data.cover),
        canonical: text(entry.data.canonical),
        readingMinutes: Math.max(1, Math.round(words / 220)),
        draft: entry.data.draft === true,
        coverArt: text(entry.data.coverArt),
        body: entry.body,
      } satisfies Post;
    })
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
