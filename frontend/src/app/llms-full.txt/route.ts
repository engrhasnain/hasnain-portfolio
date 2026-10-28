import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";

// /llms-full.txt: the full text of every blog post in one plain file, so AI assistants can read and cite a post
// without rendering the page. /llms.txt is the short map; this is the long version.
export const dynamic = "force-static";

// MDX-only lines (components like <Callout>) mean nothing outside the site.
const plain = (body: string) =>
  body
    .split("\n")
    .filter((line) => !/^\s*<\/?[A-Z][A-Za-z]*[^>]*>\s*$/.test(line))
    .join("\n")
    .replace(/\]\(\//g, `](${site.url}/`)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export function GET() {
  const posts = getPosts().filter((p) => !p.draft);
  const parts = [
    `# ${site.name}: blog posts in full`,
    "",
    `> ${site.description} Short map of the site: ${site.url}/llms.txt`,
    "",
    ...posts.flatMap((p) => [
      "---",
      "",
      `# ${p.title}`,
      "",
      `URL: ${site.url}/blog/${p.slug}`,
      `Author: ${site.name}`,
      `Published: ${p.date}${p.updated ? ` · Updated: ${p.updated}` : ""}`,
      "",
      ...(p.answer ? [`Short answer: ${p.answer}`, ""] : []),
      plain(p.body),
      "",
      ...(p.faq.length ? ["## Frequently asked questions", "", ...p.faq.flatMap(({ q, a }) => [`### ${q}`, "", a, ""])] : []),
      ...(p.sources.length ? ["## Sources", "", ...p.sources.map((s, i) => `${i + 1}. ${s.publisher}: ${s.title} (${s.url})`), ""] : []),
    ]),
  ];
  return new Response(parts.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
