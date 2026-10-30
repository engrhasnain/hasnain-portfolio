import Link from "next/link";
import { ArrowRight, BookOpen, Mail, namedIcons, serviceIcons } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";

export const metadata = { title: "Page not found", robots: { index: false } };

const places = [
  { href: "/services", label: "Services", text: "What I build, and what each one includes.", Icon: serviceIcons.Platform },
  { href: "/about", label: "About", text: "My story, experience and credentials.", Icon: namedIcons.users },
  { href: "/blog", label: "Blog", text: "Notes from building AI in production.", Icon: BookOpen },
  { href: "/contact", label: "Contact", text: "Tell me what you want it to do.", Icon: Mail },
];

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          as="h1"
          eyebrow="Error 404"
          title="This page doesn't exist"
          intro="It may have moved. The projects are a good place to start."
        />
        <div className="animate-in -mt-4 flex flex-col gap-3 [--d:180ms] sm:flex-row lg:-mt-8">
          <Link href="/projects" className="btn btn-primary">
            View projects <ArrowRight />
          </Link>
          <Link href="/" className="btn btn-ghost">
            Go home
          </Link>
        </div>

        <nav aria-label="Other pages" className="animate-in mt-16 [--d:240ms]">
          <p className="meta">Or pick up from here</p>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {places.map(({ href, label, text, Icon }) => (
              <li key={href}>
                <Link href={href} className="group card card-hover flex h-full flex-col p-6">
                  <span className="icon-tile">
                    <Icon />
                  </span>
                  <span className="mt-5 text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-teal">{label}</span>
                  <span className="mt-1.5 text-sm leading-relaxed text-ink/60">{text}</span>
                  <span className="mt-auto pt-5 text-lg text-teal">
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
