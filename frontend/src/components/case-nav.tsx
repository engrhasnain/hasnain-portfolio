"use client";

import { useEffect, useRef, useState } from "react";

export type CaseNavItem = { id: string; label: string };

/** Sticky "on this page" bar for long case studies. Highlights the section you're reading. */
export function CaseNav({ items }: { items: CaseNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
    <nav
      aria-label="On this page"
      className="sticky top-[65px] z-30 border-y border-line bg-night/85 backdrop-blur-md"
    >
      <div className="container-page">
        <ul
          ref={listRef}
          className="-mx-1 flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const isActive = item.id === active;
            return (
              <li key={item.id} data-id={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition duration-300 ${
                    isActive
                      ? "bg-brand font-semibold text-night shadow-[0_0_24px_-6px_rgb(94_234_212/0.7)]"
                      : "text-muted hover:bg-panel hover:text-ink"
                  }`}
                >
                  <span className={`font-mono text-[11px] ${isActive ? "text-night/70" : "text-muted/70"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
