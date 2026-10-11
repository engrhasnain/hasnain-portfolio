import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Let's build something that works";

export default function Image() {
  return renderOg({
    eyebrow: "Contact",
    title: "Let's build something that works",
    subtitle: "Tell me what you want it to do, and I'll tell you honestly what will work.",
  });
}
