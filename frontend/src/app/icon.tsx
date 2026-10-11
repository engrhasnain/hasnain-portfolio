import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Browser-tab icon: your photo in a gradient ring.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const photo = fs.readFileSync(path.join(process.cwd(), "public/images/hasnain.jpg")).toString("base64");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: 9999,
          padding: 4,
          background: "linear-gradient(135deg, #5EEAD4, #3B82F6)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${photo}`} width={56} height={56} alt="" style={{ borderRadius: 9999 }} />
      </div>
    ),
    size,
  );
}
