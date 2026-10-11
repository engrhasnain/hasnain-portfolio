import type { Metadata } from "next";
import { site } from "./site";

type PageMetaInput = {
  title: string;
  /** 150–160 characters, with the page's main keyword. */
  description: string;
  path: string;
  /** Use the title as-is instead of adding " · Muhammad Hasnain Pirzada". */
  absoluteTitle?: boolean;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  canonical?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  canonical,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.shortName}`;
  const common = {
    url: path,
    title: fullTitle,
    description,
    siteName: site.name,
    locale: "en_US",
  };

  let openGraph: Metadata["openGraph"];
  if (type === "article") {
    openGraph = { ...common, type: "article", publishedTime, modifiedTime, authors: [`${site.url}/about`] };
  } else if (type === "profile") {
    openGraph = { ...common, type: "profile", firstName: "Muhammad Hasnain", lastName: "Pirzada" };
  } else {
    openGraph = { ...common, type: "website" };
  }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: canonical ?? path },
    openGraph,
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
