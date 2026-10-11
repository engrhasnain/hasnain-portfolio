import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/mdx-components";

/** Compiles an MDX string on the server (at build time) and renders it with our components. */
export async function Mdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  });
  return <Content components={mdxComponents} />;
}
