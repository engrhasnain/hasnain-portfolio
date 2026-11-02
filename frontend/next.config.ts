import type { NextConfig } from "next";

// The FastAPI backend. In development it defaults to the local uvicorn server;
// in production set API_URL in Vercel → Project → Settings → Environment Variables.
const apiUrl = (
  process.env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : "")
).replace(/\/+$/, "");

// Content-Security-Policy: only this site, Umami analytics and YouTube embeds may load anything.
// Next.js inlines small boot scripts, so script-src needs 'unsafe-inline'; dev mode also needs 'unsafe-eval'.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://cloud.umami.is`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "font-src 'self' data:",
  "connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev",
  "media-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async rewrites() {
    // Crawlers (Google, link previews) that only look for the classic /favicon.ico
    // get the same generated photo icon that <link rel="icon"> points at.
    const favicon = { source: "/favicon.ico", destination: "/icon" };
    // /api/* on this site is proxied to FastAPI, so the browser never needs CORS.
    const api = { source: "/api/:path*", destination: `${apiUrl}/api/:path*` };
    return apiUrl ? [favicon, api] : [favicon];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Case studies merged on 2026-10-30: old links (and anything Google already found) land on the merged page.
    const merged: Record<string, string> = {
      "operations-command-center": "ai-operations-platform",
      "brand-system-website-builder": "ai-website-and-blog-engine",
      "bulk-ai-content-generation": "ai-website-and-blog-engine",
      "autonomous-blog-publishing": "ai-website-and-blog-engine",
      "wordpress-fleet-mcp": "production-mcp-servers",
      "hosting-ops-mcp": "production-mcp-servers",
      "mcp-platform-engineering": "production-mcp-servers",
      "call-intelligence": "zoom-ai-agents",
      "event-triggered-marketing": "social-media-automation",
      "service-area-intelligence": "local-seo-content-engine",
    };
    return Object.entries(merged).map(([from, to]) => ({
      source: `/projects/${from}`,
      destination: `/projects/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
