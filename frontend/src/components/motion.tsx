import type { CSSProperties, ReactNode } from "react";

/** Kept so the layout doesn't change shape; motion no longer needs a client-side provider. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/**
 * Fade-up as the element scrolls into view, done by the browser with CSS scroll timelines (see .reveal).
 * No JavaScript: the content is always in the HTML and visible to search engines, and older browsers simply show it.
 * `delay` (seconds) staggers items in a row.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`} style={{ "--stagger": `${Math.round(delay * 100)}%` } as CSSProperties}>
      {children}
    </div>
  );
}
