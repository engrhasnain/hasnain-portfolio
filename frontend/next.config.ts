import type { NextConfig } from "next";

// The FastAPI backend. In development it defaults to the local uvicorn server;
// in production set API_URL in Vercel → Project → Settings → Environment Variables.
const apiUrl = (
  process.env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : "")
).replace(/\/+$/, "");

const securityHeaders = [
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
};

export default nextConfig;
