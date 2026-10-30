import Link from "next/link";
import { services } from "@/lib/services";
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
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <LogoMark photo={publicFileExists(site.photo) ? site.photo : undefined} size={36} />
            {site.name}
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.jobTitle} building AI platforms and agents that automate operations for growing businesses.
          </p>
          <div className="mt-5 flex flex-col items-start gap-2 text-sm">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-ink hover:text-teal">
              <Mail className="text-muted" /> {site.email}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink hover:text-teal">
              <WhatsApp className="text-muted" /> {site.phone}
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-muted">Site</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/80 transition-colors hover:text-teal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="eyebrow text-muted">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-ink/80 transition-colors hover:text-teal">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-muted">Elsewhere</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-teal"
                >
                  <Icon className="text-muted" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div aria-hidden="true" className="overflow-hidden px-2 pt-2 text-center select-none">
        <span className="wordmark inline-block">{site.name}</span>
      </div>
      <div className="border-t border-line">
        <p className="container-page flex flex-col gap-1 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Built with Next.js and FastAPI</span>
        </p>
      </div>
    </footer>
  );
}
