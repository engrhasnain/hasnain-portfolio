import Image from "next/image";
import { site } from "@/lib/site";

/** Your photo with a thin gradient ring (falls back to initials), used in the header and footer. */
export function LogoMark({ photo, size = 36 }: { photo?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative grid shrink-0 place-items-center rounded-full bg-brand p-[2px] shadow-[0_0_18px_-4px_rgb(94_234_212/0.6)]"
      style={{ width: size, height: size }}
    >
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={size * 2}
          height={size * 2}
          className="size-full rounded-full border-2 border-night object-cover"
        />
      ) : (
        <span className="grid size-full place-items-center rounded-full bg-night text-[0.7rem] font-extrabold">
          <span className="text-gradient">{site.initials}</span>
        </span>
      )}
    </span>
  );
}
