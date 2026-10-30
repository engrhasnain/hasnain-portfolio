"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Play } from "./icons";

const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

/** The system card, framing the video like a screen. */
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="card p-2 sm:p-2.5">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/[0.06] bg-night">
        {children}
      </div>
    </div>
  );
}

/**
 * Demo video for a project. Accepts a YouTube link, an .mp4/.webm/.gif in /public, or any embeddable URL.
 * YouTube only loads after a click, so the page stays fast.
 */
export function VideoEmbed({ src, title, poster }: { src: string; title: string; poster?: string }) {
  const [playing, setPlaying] = useState(false);
  const youtubeId = src.match(YOUTUBE_ID)?.[1];

  if (youtubeId) {
    return (
      <Frame>
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
            className="group absolute inset-0 cursor-pointer"
            aria-label={`Play demo video: ${title}`}
          >
            <Image
              src={poster ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover opacity-80 transition duration-300 group-hover:opacity-100"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="btn btn-primary group-hover:-translate-y-0.5">
                <Play /> Play demo
              </span>
            </span>
          </button>
        )}
      </Frame>
    );
  }

  if (/\.gif$/i.test(src)) {
    return (
      <Frame>
        <Image src={src} alt={`Demo of ${title}`} fill unoptimized className="object-cover" />
      </Frame>
    );
  }

  if (/\.(mp4|webm)$/i.test(src)) {
    return (
      <Frame>
        <video controls preload="none" poster={poster} className="absolute inset-0 size-full" aria-label={`Demo video: ${title}`}>
          <source src={src} type={src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      </Frame>
    );
  }

  return (
    <Frame>
      <iframe src={src} title={title} loading="lazy" allowFullScreen className="absolute inset-0 size-full" />
    </Frame>
  );
}
