import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ArrowRight, BookOpen } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getPosts } from "@/lib/content";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: Notes on AI Chatbots, RAG, MCP and Agents",
  description:
    "Muhammad Hasnain Pirzada writes about building AI that works in production: AI agents, MCP servers, RAG chatbots and voice AI, with sources for every claim.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <JsonLd
        data={[
          blogSchema(posts),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <section className="section">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Notes from building AI in production"
            intro="What I learn building AI agents, chatbots and MCP servers for real businesses: what worked, what didn't, and what I'd do again."
          />
          {posts.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={(i % 3) * 0.06} className="h-full">
                    <PostCard post={post} headingLevel="h2" />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center">
              <span className="icon-tile">
                <BookOpen />
              </span>
              <p className="leading-relaxed text-ink/70">The first posts are on the way.</p>
              <Link href="/projects" className="link group text-sm font-bold sm:ml-auto">
                See the projects <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
