import Image from "next/image";
import { hasPostCover, PostCover } from "@/components/post-covers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { CtaBand } from "@/components/cta-band";
import { ArrowLeft } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { formatDate, getPost, getPosts } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { breadcrumbSchema, faqSchema, postSchema } from "@/lib/schema";
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

  // Interlinking: the other posts that share the most tags with this one.
  const related = getPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, shared: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, 2)
    .map(({ p }) => p);

  return (
    <>
      <JsonLd
        data={[
          postSchema(post),
          ...(post.faq.length ? [faqSchema(post.faq)] : []),
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
        {post.draft ? (
          <p className="mt-6 rounded-2xl border border-amber/50 bg-amber/10 px-4 py-3 text-sm font-semibold text-amber">
            Draft preview: this post is hidden on the live site until it&apos;s published.
          </p>
        ) : null}
        <header className="animate-in mt-6">
          <p className="text-sm text-muted">
            By{" "}
            <Link href="/about" rel="author" className="text-ink hover:text-teal">
              {site.name}
            </Link>{" "}
            · <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && post.updated !== post.date ? (
              <>
                {" "}
                · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            ) : null}{" "}
            · {post.readingMinutes} min read
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
        {hasPostCover(post.coverArt) ? (
          <div className="post-cover animate-pop tilt-host mt-10 overflow-hidden rounded-2xl border border-line shadow-[0_30px_80px_-40px_rgb(94_234_212/0.5)]">
            <PostCover art={post.coverArt} />
          </div>
        ) : post.cover ? (
          <Image
            src={post.cover}
            alt=""
            width={2400}
            height={1260}
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="animate-pop mt-10 h-auto w-full rounded-2xl border border-line shadow-[0_30px_80px_-40px_rgb(94_234_212/0.5)]"
          />
        ) : null}

        {post.answer ? (
          <section aria-labelledby="short-answer" className="mt-10 rounded-2xl border border-teal/30 bg-teal/5 px-5 py-4">
            <h2 id="short-answer" className="font-mono text-xs font-semibold tracking-[0.18em] text-teal uppercase">
              The short answer
            </h2>
            <p className="mt-2 text-[1.0625rem] leading-8 text-ink">{post.answer}</p>
          </section>
        ) : null}

        <div className={`prose-glow border-t border-line pt-10 ${post.answer ? "mt-8" : "mt-10"}`}>
          <Mdx source={post.body} />
        </div>

        {post.faq.length ? (
          <section aria-labelledby="faq" className="mt-14 border-t border-line pt-10">
            <h2 id="faq" className="text-2xl sm:text-3xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-3">
              {post.faq.map(({ q, a }) => (
                <div key={q} className="card p-5">
                  <dt className="font-semibold text-ink">{q}</dt>
                  <dd className="mt-2 leading-7 text-ink/85">{a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {post.sources.length ? (
          <section aria-labelledby="sources" className="mt-14 border-t border-line pt-10">
            <h2 id="sources" className="text-2xl sm:text-3xl">
              Sources
            </h2>
            <ol className="mt-5 list-decimal space-y-2 pl-8 text-ink/90 marker:text-teal">
              {post.sources.map((s) => (
                <li key={s.url}>
                  {s.publisher}:{" "}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal underline decoration-teal/40 underline-offset-4 hover:decoration-teal"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {related.length ? (
          <nav aria-labelledby="keep-reading" className="mt-14 border-t border-line pt-10">
            <h2 id="keep-reading" className="text-2xl sm:text-3xl">
              Keep reading
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group card card-hover flex h-full flex-col gap-2 p-5">
                    <span className="font-semibold leading-snug text-ink transition group-hover:text-teal">{p.title}</span>
                    <span className="text-sm leading-relaxed text-muted">{p.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

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
