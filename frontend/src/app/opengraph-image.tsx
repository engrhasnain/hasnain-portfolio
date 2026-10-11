import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "I build AI platforms and agents that automate operations.";

export default function Image() {
  return renderOg({
    eyebrow: "Full Stack AI Engineer",
    title: "I build AI platforms and agents that automate operations.",
    withPhoto: true,
    subtitle: "AI platforms · RAG chatbots · MCP servers · WhatsApp and voice AI",
  });
}
