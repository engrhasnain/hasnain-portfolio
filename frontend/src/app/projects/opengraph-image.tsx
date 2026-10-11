import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AI systems I've built";

export default function Image() {
  return renderOg({
    eyebrow: "Projects",
    title: "AI systems I've built",
    subtitle: "Chatbots, MCP servers, agents and assistants running for real businesses",
  });
}
