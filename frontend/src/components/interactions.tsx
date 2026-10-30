"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

/**
 * Close the loop: count every contact action (Fiverr, WhatsApp, LinkedIn, email, /contact), with the page it came from.
 * Sent to Umami Cloud (free plan includes custom events; Vercel's free plan doesn't). Does nothing until
 * NEXT_PUBLIC_UMAMI_WEBSITE_ID is set, because the Umami script isn't loaded before then.
 */
export function Interactions() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element | null)?.closest("a")?.getAttribute("href") ?? "";
      const channel = href.includes("cal.com")
        ? "Book a call"
        : href.includes("fiverr.com")
          ? "Fiverr"
          : href.includes("wa.me")
            ? "WhatsApp"
            : href.includes("linkedin.com")
              ? "LinkedIn"
              : href.startsWith("mailto:")
                ? "Email"
                : href.includes("github.com")
                  ? "GitHub"
                  : href === "/contact"
                    ? "Contact page"
                    : null;
      if (channel) window.umami?.track("Contact click", { channel, page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
