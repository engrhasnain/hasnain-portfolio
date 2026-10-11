import Link from "next/link";
import { nav, site } from "@/lib/site";
import { publicFileExists } from "@/lib/public-file";
import { BookOpen, Briefcase, GitHub, Instagram, LinkedIn, Mail, WhatsApp } from "./icons";
import { LogoMark } from "./logo";

/** Profiles with a URL in site.ts. Empty links are hidden. */
export const socials = [
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedIn },
  { label: "GitHub", href: site.links.github, Icon: GitHub },
  { label: "Instagram", href: site.links.instagram, Icon: Instagram },
  { label: "Fiverr", href: site.links.fiverr, Icon: Briefcase },
  { label: "Medium", href: site.links.medium, Icon: BookOpen },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel/30">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-3 font-bold">
            <LogoMark photo={publicFileExists(site.photo) ? site.photo : undefined} size={40} />
            {site.name}
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.jobTitle} building AI platforms and agents that automate operations for growing businesses.
          </p>
          <div className="mt-4 flex flex-col items-start gap-2">
            <a href={`mailto:${site.email}`} className="link text-sm">
              <Mail /> {site.email}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="link text-sm">
              <WhatsApp /> {site.phone}
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-ink">Site</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition hover:text-teal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ink">Elsewhere</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition hover:text-teal"
                >
                  <Icon /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Built with Next.js and FastAPI.
        </p>
      </div>
    </footer>
  );
}
