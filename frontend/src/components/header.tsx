"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { Close, Menu } from "./icons";
import { LogoMark } from "./logo";

export function Header({ photo }: { photo?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [glider, setGlider] = useState({ left: 0, width: 0, visible: false });
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-night/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 font-bold"
          onClick={() => setOpen(false)}
        >
          <span className="transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
            <LogoMark photo={photo} />
          </span>
          <span className="truncate text-[0.95rem] transition group-hover:text-teal sm:text-base">{site.shortName}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="relative flex items-center gap-1" onMouseLeave={() => setGlider((g) => ({ ...g, visible: false }))}>
            {/* the glowing pill that slides to whichever link you point at */}
            <li
              aria-hidden="true"
              className="nav-glider pointer-events-none absolute top-0 h-full rounded-full border border-teal/30 bg-teal/10 shadow-[0_0_24px_-6px_rgb(94_234_212/0.6)]"
              style={{ left: glider.left, width: glider.width, opacity: glider.visible ? 1 : 0 }}
            />
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onMouseEnter={(e) =>
                    setGlider({ left: e.currentTarget.offsetLeft, width: e.currentTarget.offsetWidth, visible: true })
                  }
                  className="nav-link relative block rounded-full px-4 py-2 text-sm text-muted transition duration-300 hover:text-ink aria-[current=page]:text-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-primary btn-attract hidden px-5 py-2 sm:inline-flex">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-night opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-night" />
            </span>
            Hire me
          </Link>
          <button
            type="button"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-panel text-xl text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="animate-in border-t border-line lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-xl px-3 py-3 text-base text-muted aria-[current=page]:text-teal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary btn-attract w-full">
                Hire me
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
