import { getPosts, getProjects } from "@/lib/content";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

// /llms.txt (llmstxt.org): a plain map of the site for AI assistants and AI search, so they can find and quote
// the right page. Built from the same content as the site, so it never goes out of date.
export const dynamic = "force-static";

export function GET() {
  const posts = getPosts().filter((p) => !p.draft);
  const projects = getProjects();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Pages",
    `- [About ${site.name}](${site.url}/about): experience, credentials and certifications`,
    `- [Services](${site.url}/services): what I build and how a project runs`,
    `- [Projects](${site.url}/projects): case studies of AI platforms, MCP servers, chatbots and agents`,
    `- [Blog](${site.url}/blog): practical writing on AI agents, MCP, RAG and voice AI`,
    `- [All blog posts in full](${site.url}/llms-full.txt): every post as plain text, with its FAQs and sources`,
    `- [RSS feed](${site.url}/feed.xml)`,
    `- [Contact](${site.url}/contact): email, WhatsApp or book a call (${site.booking})`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.headline}](${site.url}/services/${s.slug}): ${s.oneLiner}`),
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.title}](${site.url}/projects/${p.slug}): ${p.summary}`),
    "",
    "## Blog posts",
    ...posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.answer ?? p.summary}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
