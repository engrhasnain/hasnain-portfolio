import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Home-screen icon on iPhone: your photo (iOS rounds the corners itself).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const photo = fs.readFileSync(path.join(process.cwd(), "public/images/hasnain.jpg")).toString("base64");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0B1020" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${photo}`} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
