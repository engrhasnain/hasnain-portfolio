import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-gradient text-7xl font-extrabold">404</p>
      <h1 className="mt-4 text-3xl">This page doesn&apos;t exist</h1>
      <p className="mt-3 max-w-md text-muted">It may have moved. The projects are a good place to start.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/projects" className="btn btn-primary">
          View projects <ArrowRight />
        </Link>
        <Link href="/" className="btn btn-ghost">
          Go home
        </Link>
      </div>
    </section>
  );
}
