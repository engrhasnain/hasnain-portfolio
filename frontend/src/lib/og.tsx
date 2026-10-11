import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

// Open Graph images (1200x630) in Midnight Glow, so links look right on LinkedIn and WhatsApp.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgInput = { eyebrow: string; title: string; subtitle?: string; withPhoto?: boolean };

// Inter from @fontsource (WOFF, which the OG renderer supports), so share images match the site.
function interFont(weight: 400 | 700 | 800) {
  const file = path.join(process.cwd(), "node_modules/@fontsource/inter/files", `inter-latin-${weight}-normal.woff`);
  return { name: "Inter", data: fs.readFileSync(file), weight, style: "normal" as const };
}

function photoDataUrl(): string | undefined {
  const file = path.join(process.cwd(), "public", site.photo);
  if (!fs.existsSync(file)) return undefined;
  return `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
}

export function renderOg({ eyebrow, title, subtitle, withPhoto = false }: OgInput) {
  const host = site.url.replace(/^https?:\/\//, "");
  const photo = withPhoto ? photoDataUrl() : undefined;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0B1020",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(94,234,212,0.30), rgba(94,234,212,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(59,130,246,0.28), rgba(59,130,246,0) 70%)",
          }}
        />

        {photo ? (
          <div
            style={{
              position: "absolute",
              right: 80,
              top: 150,
              width: 330,
              height: 330,
              borderRadius: 9999,
              padding: 6,
              background: "linear-gradient(135deg, #5EEAD4, #3B82F6)",
              display: "flex",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={318} height={318} alt="" style={{ borderRadius: 9999, objectFit: "cover" }} />
          </div>
        ) : null}

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #5EEAD4, #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B1020",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, color: "#E5E7F0", fontWeight: 700 }}>{site.name}</div>
            <div style={{ fontSize: 22, color: "#8B90A8" }}>{site.jobTitle}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: photo ? 640 : 1000 }}>
          <div style={{ fontSize: 24, color: "#5EEAD4", letterSpacing: 3, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 48 || photo ? 58 : 70,
              fontWeight: 800,
              color: "#E5E7F0",
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 28, color: "#8B90A8", lineHeight: 1.35 }}>{subtitle}</div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, color: "#8B90A8" }}>{host}</div>
          <div
            style={{
              width: 260,
              height: 8,
              borderRadius: 9999,
              background: "linear-gradient(90deg, #5EEAD4, #3B82F6)",
            }}
          />
        </div>
      </div>
    ),
    { ...ogSize, fonts: [interFont(400), interFont(700), interFont(800)] },
  );
}

export function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
