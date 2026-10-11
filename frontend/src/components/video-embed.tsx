"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "./icons";

const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

/**
 * Demo video for a project. Accepts a YouTube link, an .mp4/.webm/.gif in /public, or any embeddable URL.
 * YouTube only loads after a click, so the page stays fast.
 */
export function VideoEmbed({ src, title, poster }: { src: string; title: string; poster?: string }) {
  const [playing, setPlaying] = useState(false);
  const frame = "relative aspect-video w-full overflow-hidden rounded-[1.25rem] border border-line bg-panel";
  const youtubeId = src.match(YOUTUBE_ID)?.[1];

  if (youtubeId) {
    return (
      <div className={frame}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0"
            aria-label={`Play demo video: ${title}`}
          >
            <Image
              src={poster ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover opacity-80 transition group-hover:opacity-100"
            />
            <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand pl-1 text-2xl text-night shadow-[0_0_40px_-4px_rgb(94_234_212/0.7)] transition group-hover:scale-110">
              <Play />
            </span>
          </button>
        )}
      </div>
    );
  }

  if (/\.gif$/i.test(src)) {
    return (
      <div className={frame}>
        <Image src={src} alt={`Demo of ${title}`} fill unoptimized className="object-cover" />
      </div>
    );
  }

  if (/\.(mp4|webm)$/i.test(src)) {
    return (
      <video controls preload="none" poster={poster} className={frame} aria-label={`Demo video: ${title}`}>
        <source src={src} type={src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
    );
  }

  return (
    <div className={frame}>
      <iframe src={src} title={title} loading="lazy" allowFullScreen className="absolute inset-0 size-full" />
    </div>
  );
}
