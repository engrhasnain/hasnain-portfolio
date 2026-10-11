import { getProject, getProjects } from "@/lib/content";
import { ogContentType, ogSize, renderOg, truncate } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project by Muhammad Hasnain Pirzada";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOg({
    eyebrow: project ? `Project · ${project.type.join(" / ")}` : "Project",
    title: project?.title ?? "Project",
    subtitle: project ? truncate(project.summary, 120) : undefined,
  });
}
