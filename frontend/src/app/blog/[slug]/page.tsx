import Image from "next/image";
import { hasPostCover, PostCover } from "@/components/post-covers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { CtaBand } from "@/components/cta-band";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
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
    // A hook headline stays the H1; the search title leads with the keyword and skips the name suffix.
    title: post.seoTitle ?? post.title,
    absoluteTitle: Boolean(post.seoTitle) || post.title.length > 38,
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
      <article className="container-page max-w-3xl pt-10 pb-20 sm:pt-16 sm:pb-28">
        <nav aria-label="Breadcrumb">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-teal">
            <ArrowLeft /> All posts
          </Link>
        </nav>
        {post.draft ? (
          <p className="mt-6 rounded-2xl border border-amber/50 bg-amber/10 px-4 py-3 text-sm font-semibold text-amber">
            Draft preview: this post is hidden on the live site until it&apos;s published.
          </p>
        ) : null}

        <header className="mt-8 sm:mt-10">
          {/* One line on wider screens; on phones the byline, the dates and the read time stack, so no line starts with a dot. */}
          <p className="meta animate-in flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-x-2">
            <span>
              By{" "}
              <Link href="/about" rel="author" className="transition-colors hover:text-ink">
                {site.name}
              </Link>
            </span>
            <span aria-hidden="true" className="hidden text-ink/45 md:inline">
              ·
            </span>
            <span className="text-ink/55">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && post.updated !== post.date ? (
                <>
                  <span className="mx-2 text-ink/45">·</span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              ) : null}
            </span>
            <span aria-hidden="true" className="hidden text-ink/45 md:inline">
              ·
            </span>
            <span className="text-ink/55">{post.readingMinutes} min read</span>
          </p>
          <h1 className="animate-in mt-5 text-[2.3rem] leading-[1.06] [--d:60ms] sm:text-5xl lg:text-[3.5rem]">
            {post.title}
          </h1>
          <p className="animate-in mt-6 text-lg leading-relaxed text-ink/70 [--d:120ms] sm:text-xl">{post.summary}</p>
          {post.tags.length > 0 ? (
            <ul className="animate-in mt-7 flex flex-wrap gap-2 [--d:160ms]" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {hasPostCover(post.coverArt) ? (
          <div className="post-cover tilt-host card animate-pop mt-10 overflow-hidden [--d:200ms] sm:mt-12">
            <PostCover art={post.coverArt} />
          </div>
        ) : post.cover ? (
          <div className="card animate-pop mt-10 overflow-hidden [--d:200ms] sm:mt-12">
            <Image
              src={post.cover}
              alt=""
              width={2400}
              height={1260}
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}

        {post.answer ? (
          <section aria-labelledby="short-answer" className="card-feature mt-8 p-6 sm:p-7">
            <h2 id="short-answer" className="meta">
              The short answer
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-8 text-ink/90">{post.answer}</p>
          </section>
        ) : null}

        <div className="prose-glow mt-12 sm:mt-14">
          <Mdx source={post.body} />
        </div>

        {post.faq.length ? (
          <section aria-labelledby="faq" className="mt-16 border-t border-white/[0.06] pt-14">
            <p className="eyebrow">Questions</p>
            <h2 id="faq" className="mt-4 text-3xl sm:text-4xl">
              Frequently asked questions
            </h2>
            <dl className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {post.faq.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt className="text-lg font-bold text-ink">{q}</dt>
                  <dd className="mt-2.5 leading-7 text-ink/75">{a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {post.sources.length ? (
          <section aria-labelledby="sources" className="mt-20">
            <p className="eyebrow">Checked against</p>
            <h2 id="sources" className="mt-4 text-3xl sm:text-4xl">
              Sources
            </h2>
            <ol className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {post.sources.map((s, i) => (
                // The link stretches over the whole row, so the row is the click target.
                <li key={s.url} className="group relative flex gap-5 py-4">
                  <span className="meta mt-1 w-6 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="min-w-0 flex-1 leading-relaxed">
                    <span className="block text-sm text-ink/55">{s.publisher}</span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 font-semibold text-ink underline decoration-teal/40 underline-offset-4 transition-colors after:absolute after:inset-0 group-hover:text-teal group-hover:decoration-teal"
                    >
                      {s.title}
                    </a>
                  </p>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-teal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <footer className="card mt-20 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
          <Avatar className="size-16" sizes="64px" ring="bg-teal/40 p-[2px]" />
          <div>
            <p className="meta">Written by</p>
            <p className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-ink">{site.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
              {site.jobTitle} building chatbots, MCP servers and AI agents.{" "}
              <Link href="/about" className="link font-bold">
                More about me
              </Link>
            </p>
          </div>
        </footer>

        {related.length ? (
          <nav aria-labelledby="keep-reading" className="mt-20">
            <p className="eyebrow">Next up</p>
            <h2 id="keep-reading" className="mt-4 text-3xl sm:text-4xl">
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
      <CtaBand />
    </>
  );
}
