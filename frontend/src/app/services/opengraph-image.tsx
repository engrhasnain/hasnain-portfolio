import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "AI that does real work for your business";

export default function Image() {
  return renderOg({
    eyebrow: "Services",
    title: "AI that does real work for your business",
    subtitle: "AI chatbots · MCP servers · AI agents / n8n · WhatsApp · Voice agents",
  });
}
