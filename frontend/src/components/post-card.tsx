import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/content";
import type { PostMeta } from "@/lib/types";
import { CoverNotes } from "./cover-notes";
import { hasPostCover, PostCover } from "./post-covers";
import { ArrowRight } from "./icons";

/** Same anatomy as ProjectCard: cover panel, meta line, title, summary, one link. */
export function PostCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/blog/${post.slug}`} className="group card card-hover flex h-full flex-col overflow-hidden">
      <div className="post-cover relative overflow-hidden border-b border-white/[0.07]">
        {hasPostCover(post.coverArt) ? (
          <PostCover
            art={post.coverArt}
            compact
            aside={post.coverStat || post.coverNote ? <CoverNotes stat={post.coverStat} note={post.coverNote} /> : undefined}
          />
        ) : post.cover ? (
          <div className="relative aspect-[16/10]">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-[#0d1430]" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="meta flex flex-wrap items-center gap-x-2">
          {post.draft ? <span className="text-amber">Draft ·</span> : null}
          {post.tags[0] ? <span>{post.tags[0]}</span> : null}
          <span className="text-ink/45">·</span>
          <time dateTime={post.date} className="text-ink/55">
            {formatDate(post.date)}
          </time>
        </p>
        <Heading className="mt-3 text-xl leading-snug transition-colors group-hover:text-teal">{post.title}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{post.summary}</p>
        <span className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="inline-flex items-center gap-1.5 font-bold text-teal">
            Read the post <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-ink/50">{post.readingMinutes} min read</span>
        </span>
      </div>
    </Link>
  );
}
