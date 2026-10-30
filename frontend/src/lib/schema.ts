// JSON-LD builders (schema.org). Google uses these to understand who the site is about.
import { publicFileExists } from "./public-file";
import { services, type Service } from "./services";
import { certifications, credentials, site } from "./site";
import type { Post, Project } from "./content";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    givenName: "Muhammad Hasnain",
    familyName: "Pirzada",
    jobTitle: site.roles,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    ...(publicFileExists(site.photo) ? { image: abs(site.photo) } : {}),
    hasCredential: [
      ...credentials.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        credentialCategory: "Professional registration",
        ...(c.issuer ? { recognizedBy: { "@type": "Organization", name: c.issuer } } : {}),
      })),
      ...certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        credentialCategory: "Certificate",
        url: c.url,
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
    ],
    sameAs: Object.values(site.links).filter(Boolean),
    knowsAbout: [
      "Artificial intelligence",
      "Large language models",
      "Retrieval-augmented generation",
      "Model Context Protocol",
      "AI agents",
      "Chatbots",
      "WhatsApp Business API",
      "Voice agents",
      "Next.js",
      "FastAPI",
      "PostgreSQL",
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.oneLiner },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${site.url}/about`,
    mainEntity: { "@id": personId, "@type": "Person", name: site.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description,
    url: `${site.url}/projects/${project.slug}`,
    dateCreated: project.date,
    keywords: [...project.type, ...project.stack].join(", "),
    ...(project.cover ? { image: abs(project.cover) } : {}),
    author: { "@id": personId, "@type": "Person", name: site.name },
    creator: { "@id": personId },
  };
}

/** The projects index as a list, so search and AI assistants can see every case study in one place. */
export function projectsListSchema(projects: { slug: string; title: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${site.url}/projects`,
    name: `AI projects by ${site.name}`,
    isPartOf: { "@id": websiteId },
    author: { "@id": personId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/projects/${p.slug}`,
        name: p.title,
      })),
    },
  };
}

export function postSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    ...(post.answer ? { abstract: post.answer } : {}),
    url: `${site.url}/blog/${post.slug}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    wordCount: post.body.split(/\s+/).filter(Boolean).length,
    image: post.cover ? abs(post.cover) : `${site.url}/blog/${post.slug}/opengraph-image`,
    isPartOf: { "@id": websiteId },
    author: { "@id": personId, "@type": "Person", name: site.name, url: `${site.url}/about` },
    publisher: { "@id": personId },
    ...(post.sources.length
      ? {
          citation: post.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.title,
            url: s.url,
            publisher: { "@type": "Organization", name: s.publisher },
          })),
        }
      : {}),
  };
}

export function blogSchema(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    url: `${site.url}/blog`,
    name: `${site.name} · Blog`,
    description: "Notes from building AI in production: AI agents, MCP servers, RAG chatbots and voice AI.",
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    author: { "@id": personId },
    publisher: { "@id": personId },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

const areaServed = ["Saudi Arabia", "United Arab Emirates", "Worldwide"];

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.oneLiner,
        url: `${site.url}/services/${s.slug}`,
        provider: { "@id": personId, "@type": "Person", name: site.name },
        areaServed,
      },
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${s.slug}#service`,
    name: s.headline,
    serviceType: s.title,
    description: s.metaDescription,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@id": personId, "@type": "Person", name: site.name },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `What's included: ${s.title}`,
      itemListElement: s.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}
