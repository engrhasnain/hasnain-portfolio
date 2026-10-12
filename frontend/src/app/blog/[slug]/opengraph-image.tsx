import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
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

  // A post with its own cover shares that cover, so LinkedIn and WhatsApp show the designed image.
  const coverFile = post?.cover ? path.join(process.cwd(), "public", post.cover) : undefined;
  if (coverFile && fs.existsSync(coverFile)) {
    const type = coverFile.endsWith(".png") ? "image/png" : "image/jpeg";
    const src = `data:${type};base64,${fs.readFileSync(coverFile).toString("base64")}`;
    return new ImageResponse(
      (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={ogSize.width} height={ogSize.height} style={{ objectFit: "cover" }} />
      ),
      ogSize,
    );
  }

  return renderOg({
    eyebrow: post ? `Blog · ${post.readingMinutes} min read` : "Blog",
    title: post?.title ?? "Blog",
    subtitle: post ? truncate(post.summary, 120) : undefined,
  });
}
