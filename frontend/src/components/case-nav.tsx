"use client";

import { useEffect, useRef, useState } from "react";

export type CaseNavItem = { id: string; label: string };

/** How far below the top of the window a section counts as "being read": a third of the way down, never above the bar. */
const readingLine = () => Math.max(150, window.innerHeight * 0.33);

/**
 * Sticky "on this page" bar for long case studies. Highlights the section you're reading.
 * It sits at the top of the paper reading sheet and floats over it while you read, so it leaves with the sheet.
 */
export function CaseNav({ items }: { items: CaseNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  // The active section is the last one whose top has scrolled past the reading line.
  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = readingLine();
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top > line) break;
        current = el.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  // Keep the active pill in view on narrow screens without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const pill = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !pill) return;
    const target = pill.offsetLeft - list.clientWidth / 2 + pill.clientWidth / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    // A band of the sheet colour behind the pill (before:) hides the text scrolling under it once it sticks,
    // from the header down to a soft fade below the pill. At rest it is invisible on the sheet.
    <nav
      aria-label="On this page"
      className="sticky top-[77px] z-30 before:absolute before:inset-x-0 before:-top-3 before:-bottom-4 before:bg-[linear-gradient(var(--color-night)_calc(100%_-_16px),transparent)] before:content-['']"
    >
      <ul
        ref={listRef}
        className="relative flex gap-1 overflow-x-auto rounded-full border border-line bg-night/85 p-1.5 shadow-[0_14px_30px_-20px_rgb(11_16_32/0.45)] backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} data-id={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition duration-200 ${
                  isActive ? "bg-teal text-night" : "text-ink/70 hover:bg-ink/[0.06] hover:text-ink"
                }`}
              >
                <span className={`meta tabular-nums ${isActive ? "text-night/70" : "text-ink/60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
