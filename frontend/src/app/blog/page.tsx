import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getPosts } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: Notes on AI Chatbots, RAG, MCP and Agents",
  description:
    "Muhammad Hasnain Pirzada writes about building AI that works in production: RAG chatbots, MCP servers, AI agents, WhatsApp bots and what each one costs.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <section className="section container-page">
        <SectionHeading
          as="h1"
          eyebrow="Blog"
          title="Notes from building AI in production"
          intro="What I learn building AI agents, chatbots and MCP servers for real businesses: what worked, what didn't, and what I'd do again."
        />
        {posts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">The first posts are on the way.</p>
        )}
      </section>
      <CtaBand />
    </>
  );
}
