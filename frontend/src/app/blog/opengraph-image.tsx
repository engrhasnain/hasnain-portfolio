import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Notes from building AI in production";

export default function Image() {
  return renderOg({
    eyebrow: "Blog",
    title: "Notes from building AI in production",
    subtitle: "RAG, MCP servers, agents and what really works",
  });
}
