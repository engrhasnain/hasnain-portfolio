import Link from "next/link";
import { formatDate } from "@/lib/content";
import type { PostMeta } from "@/lib/types";
import { CardNetwork } from "./card-network";
import { ArrowRight } from "./icons";

export function PostCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/blog/${post.slug}`} className="group card card-hover flex h-full flex-col gap-3 overflow-hidden p-6">
      <CardNetwork seed={post.slug.length * 3} />
      <p className="text-xs text-muted">
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
