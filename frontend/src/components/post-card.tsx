import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/content";
import type { PostMeta } from "@/lib/types";
import { CardNetwork } from "./card-network";
import { hasPostCover, PostCover } from "./post-covers";
import { ArrowRight } from "./icons";

export function PostCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/blog/${post.slug}`} className="group card card-hover flex h-full flex-col gap-3 overflow-hidden p-6">
      <CardNetwork seed={post.slug.length * 3} />
      {hasPostCover(post.coverArt) ? (
        <div className="post-cover relative -mx-6 -mt-6 mb-2 overflow-hidden border-b border-line">
          <PostCover art={post.coverArt} />
        </div>
      ) : post.cover ? (
        <div className="relative -mx-6 -mt-6 mb-2 aspect-[1200/630] overflow-hidden border-b border-line">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <p className="flex items-center gap-2 text-xs text-muted">
        {post.draft ? (
          <span className="rounded-full border border-amber/50 bg-amber/10 px-2 py-0.5 font-semibold text-amber">
            Draft, not live
          </span>
        ) : null}
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </p>
      <Heading className="text-lg leading-snug transition group-hover:text-teal">{post.title}</Heading>
      <p className="text-sm leading-relaxed text-muted">{post.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-teal">
        Read the post <ArrowRight className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
