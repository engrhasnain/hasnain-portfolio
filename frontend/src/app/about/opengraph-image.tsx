import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "The model, the integrations and the app";

export default function Image() {
  return renderOg({
    eyebrow: "About",
    title: "The model, the integrations and the app",
    withPhoto: true,
    subtitle: "Software Engineer · Full Stack AI Engineer: AI platforms, MCP servers and AI agents",
  });
}
