import { getPost, getPosts } from "@/lib/content";
import { ogContentType, ogSize, renderOg, truncate } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog post by Muhammad Hasnain Pirzada";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({
    eyebrow: post ? `Blog · ${post.readingMinutes} min read` : "Blog",
    title: post?.title ?? "Blog",
    subtitle: post ? truncate(post.summary, 120) : undefined,
  });
}
