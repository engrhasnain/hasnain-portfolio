import type { ComponentType, CSSProperties } from "react";
import { type BrandLogoKey, brandLogos } from "@/lib/brand-logos";
import { type IconProps, namedIcons } from "./icons";

// Tool name -> logo. Brands that aren't in Simple Icons (OpenAI, AWS, Groq) get a plain icon instead of their trademark.
const logoFor: Record<string, BrandLogoKey | { icon: keyof typeof namedIcons }> = {
  claude: "claude",
  anthropic: "claude",
  gemini: "googlegemini",
  googlegemini: "googlegemini",
  langchain: "langchain",
  mcp: "modelcontextprotocol",
  modelcontextprotocol: "modelcontextprotocol",
  postgresql: "postgresql",
  postgresqlpgvector: "postgresql",
  pgvector: "postgresql",
  redis: "redis",
  n8n: "n8n",
  whatsapp: "whatsapp",
  whatsappcloudapi: "whatsapp",
  python: "python",
  fastapi: "fastapi",
  typescript: "typescript",
  react: "react",
  nextjs: "nextdotjs",
  nestjs: "nestjs",
  tailwindcss: "tailwindcss",
  docker: "docker",
  vercel: "vercel",
  openai: { icon: "sparkles" },
  openaigpt: { icon: "sparkles" },
  groq: { icon: "zap" },
  rag: { icon: "search" },
  embeddings: { icon: "layers" },
  aws: { icon: "cloud" },
  awss3: { icon: "database" },
  s3: { icon: "database" },
  oauth21: { icon: "key" },
  cicd: { icon: "zap" },
};

const key = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

// Near-black brand colours (Next.js, Vercel, MCP) would vanish on the dark page, so those logos use the text colour.
// Darker blues (PostgreSQL, Python, TypeScript) are lifted a little towards white so they read clearly.
function visible(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const rgb = [n >> 16, (n >> 8) & 255, n & 255];
  const lum = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  if (lum < 0.25) return "#E5E7F0";
  if (lum >= 0.5) return hex;
  return `#${rgb.map((c) => Math.round(c + (255 - c) * 0.3).toString(16).padStart(2, "0")).join("")}`;
}

/** The logo (or matching icon) and display colour for a tool name. */
export function toolBrand(name: string): { color: string; path?: string; Fallback: ComponentType<IconProps> } {
  const match = logoFor[key(name)];
  const brand = typeof match === "string" ? brandLogos[match] : undefined;
  return {
    color: brand ? visible(brand.hex) : "#5EEAD4",
    path: brand?.path,
    Fallback: typeof match === "object" ? namedIcons[match.icon] : namedIcons.sparkles,
  };
}

export function ToolLogo({ name, size = 20 }: { name: string; size?: number }) {
  const { color, path, Fallback } = toolBrand(name);
  return path ? (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  ) : (
    <Fallback style={{ color, fontSize: size }} />
  );
}

/** A tool in my stack, with its real logo in brand colour (or a matching icon), glowing in that colour on hover. */
export function ToolChip({ name, size = "md", className = "" }: { name: string; size?: "sm" | "md"; className?: string }) {
  const small = size === "sm";
  return (
    <span
      style={{ "--brand": toolBrand(name).color } as CSSProperties}
      className={`tool-chip flex shrink-0 items-center rounded-2xl border border-line bg-panel font-semibold whitespace-nowrap text-ink ${
        small ? "gap-2 py-1 pr-3 pl-1 text-xs" : "gap-3 py-2.5 pr-5 pl-2.5 text-sm"
      } ${className}`}
    >
      <span
        className={`tool-logo grid place-items-center border border-white/[0.06] bg-night ${small ? "size-6 rounded-lg" : "size-9 rounded-xl"}`}
      >
        <ToolLogo name={name} size={small ? 14 : 20} />
      </span>
      {name}
    </span>
  );
}
