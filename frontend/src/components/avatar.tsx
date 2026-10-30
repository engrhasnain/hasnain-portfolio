import Image from "next/image";
import { publicFileExists } from "@/lib/public-file";
import { site } from "@/lib/site";

/** Round photo with a thin gradient ring. Shows initials until public/images/hasnain.jpg exists. */
export function Avatar({
  className = "size-44",
  sizes = "176px",
  priority = false,
  ring = "bg-line p-[2px]",
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Classes for the ring around the photo. */
  ring?: string;
}) {
  const hasPhoto = publicFileExists(site.photo);
  return (
    <div className={`relative shrink-0 rounded-full ${ring} ${className}`}>
      <div className="relative size-full overflow-hidden rounded-full bg-panel">
        {hasPhoto ? (
          <Image
            src={site.photo}
            alt={`${site.name}, ${site.jobTitle}`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={site.name}
            className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(94_234_212/0.25),transparent_60%)] text-5xl font-extrabold"
          >
            <span className="text-teal">{site.initials}</span>
          </div>
        )}
      </div>
    </div>
  );
}
