import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { CtaBand } from "@/components/cta-band";
import { ArrowLeft } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { formatDate, getPost, getPosts } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { breadcrumbSchema, postSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    canonical: post.canonical,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          postSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="container-page max-w-3xl py-12 sm:py-20">
        <nav aria-label="Breadcrumb">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-teal">
            <ArrowLeft /> All posts
          </Link>
        </nav>
        <header className="animate-in mt-6">
          <p className="text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{post.summary}</p>
          {post.tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="prose-glow mt-10 border-t border-line pt-10">
          <Mdx source={post.body} />
        </div>

        <footer className="card mt-14 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center">
          <Avatar className="size-16" sizes="64px" />
          <div>
            <p className="font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-muted">
              {site.jobTitle} building chatbots, MCP servers and AI agents.{" "}
              <Link href="/about" className="text-teal hover:underline">
                More about me
              </Link>
            </p>
          </div>
        </footer>
      </article>
      <CtaBand />
    </>
  );
}
