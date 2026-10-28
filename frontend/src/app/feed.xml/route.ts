import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";

// RSS feed of the blog: feed readers, Medium's "Import a story" and some search and AI crawlers use it to find new posts.
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const posts = getPosts().filter((p) => !p.draft);
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return [
        "    <item>",
        `      <title>${escape(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>`,
        `      <dc:creator>${escape(site.name)}</dc:creator>`,
        `      <description>${escape(p.answer ?? p.summary)}</description>`,
        ...p.tags.map((t) => `      <category>${escape(t)}</category>`),
        ...(p.cover ? [`      <enclosure url="${site.url}${p.cover}" type="image/jpeg" length="0" />`] : []),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(`${site.name} · Blog`)}</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escape("Notes from building AI in production: AI agents, MCP servers, RAG chatbots and voice AI.")}</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${posts[0]?.updated ?? posts[0]?.date ?? "2026-01-01"}T09:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
