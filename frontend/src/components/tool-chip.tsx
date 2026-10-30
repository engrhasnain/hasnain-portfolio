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
  mcpsdk: "modelcontextprotocol",
  fastmcp: "modelcontextprotocol",
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
  meta: "meta",
  metaads: "meta",
  facebook: "facebook",
  instagram: "instagram",
  google: "google",
  googlesearchconsole: "google",
  googlebusinessprofile: "google",
  googlecloud: "googlecloud",
  zoom: "zoom",
  wordpress: "wordpress",
  elementor: "elementor",
  twilio: "twilio",
  elevenlabs: "elevenlabs",
  quickbooks: "quickbooks",
  retellai: { icon: "voice" },
  retell: { icon: "voice" },
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
function channels(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const rgb = [n >> 16, (n >> 8) & 255, n & 255];
  return { rgb, lum: (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255 };
}
const toHex = (rgb: number[]) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;

function visible(hex: string) {
  const { rgb, lum } = channels(hex);
  if (lum < 0.25) return "#E5E7F0";
  if (lum >= 0.5) return hex;
  return toHex(rgb.map((c) => c + (255 - c) * 0.3));
}

// On the cream paper sheet the true brand colour reads best; only very light ones (React, WhatsApp) are deepened a little.
function onPaper(hex: string) {
  const { rgb, lum } = channels(hex);
  return lum > 0.45 ? toHex(rgb.map((c) => c * 0.75)) : hex;
}

/** The logo (or matching icon) and display colour for a tool name. */
// Names like "Zoom RTMS", "Google Calendar API" or "PostgreSQL + pgvector" fall back to the longest brand they start with.
const prefixes = Object.keys(logoFor).sort((a, b) => b.length - a.length);
const extra: Record<string, { icon: keyof typeof namedIcons }> = {
  bullmq: { icon: "layers" },
  apscheduler: { icon: "clock" },
  starlette: { icon: "code" },
  typeorm: { icon: "database" },
  sqlalchemy: { icon: "database" },
  playwright: { icon: "globe" },
  pillow: { icon: "image" },
  opencv: { icon: "image" },
  socketio: { icon: "zap" },
  pdfkit: { icon: "layers" },
  dataforseo: { icon: "search" },
  cohere: { icon: "sparkles" },
  indexnow: { icon: "search" },
  authorizenet: { icon: "billing" },
};

function lookup(name: string) {
  const k = key(name);
  if (logoFor[k]) return logoFor[k];
  if (extra[k]) return extra[k];
  const prefix = prefixes.find((p) => p.length > 2 && k.startsWith(p));
  return prefix ? logoFor[prefix] : undefined;
}

export function toolBrand(name: string): {
  color: string;
  /** The colour on the paper sheet. */
  paper: string;
  path?: string;
  Fallback: ComponentType<IconProps>;
} {
  const match = lookup(name);
  const brand = typeof match === "string" ? brandLogos[match] : undefined;
  return {
    color: brand ? visible(brand.hex) : "#5EEAD4",
    paper: brand ? onPaper(brand.hex) : "#0f766e",
    path: brand?.path,
    Fallback: typeof match === "object" ? namedIcons[match.icon] : namedIcons.sparkles,
  };
}

export function ToolLogo({ name, size = 20 }: { name: string; size?: number }) {
  const { color, paper, path, Fallback } = toolBrand(name);
  // The fill attribute is the navy-page colour; on paper, .paper svg.brand-logo swaps in --logo-paper.
  // Icons without a logo are the accent teal, which the paper theme already turns dark teal.
  return path ? (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      className="brand-logo"
      style={{ "--logo-paper": paper } as CSSProperties}
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  ) : (
    <Fallback className="text-teal" style={{ fontSize: size }} />
  );
}

/** A tool in my stack: the system's chip, led by the tool's real logo (or a matching icon). The border takes the brand colour on hover. */
export function ToolChip({ name, size = "md", className = "" }: { name: string; size?: "sm" | "md"; className?: string }) {
  const small = size === "sm";
  const { color, paper } = toolBrand(name);
  return (
    <span
      style={{ "--brand": color, "--brand-paper": paper } as CSSProperties}
      className={`tool-chip chip shrink-0 whitespace-nowrap text-ink/85 ${
        small ? "gap-2 py-1.5 pr-3 pl-2" : "gap-2.5 py-2 pr-4 pl-3 text-sm"
      } ${className}`}
    >
      <span className="tool-logo grid shrink-0 place-items-center">
        <ToolLogo name={name} size={small ? 14 : 17} />
      </span>
      {name}
    </span>
  );
}
