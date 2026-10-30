/**
 * Everything personal lives here, so edit this file first.
 * Lines marked TODO need your real values before you share the site.
 */
export const site = {
  name: "Muhammad Hasnain Pirzada",
  shortName: "Muhammad Hasnain Pirzada", // always the full name, everywhere on the site
  initials: "HP",
  jobTitle: "Full Stack AI Engineer",
  /** The one-line promise used in the hero, share images and Google. */
  headline: "I build AI platforms and agents that automate operations for growing businesses",
  /** Shown under your name in the hero and on About. */
  roles: ["Software Engineer", "Full Stack AI Engineer"],
  /** Current employer. Only shown in the About experience timeline, never as a headline. */
  company: "Techtimize",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://hasnainpirzada.vercel.app").replace(/\/+$/, ""),
  description:
    "Muhammad Hasnain Pirzada is a Full Stack AI Engineer building AI platforms and agents that automate operations for growing businesses: chatbots, MCP, voice AI.",
  // Shown on /contact and in the footer, and used when the form can't send.
  email: "pirzadahasnain.18@gmail.com",
  phone: "+92 314 5672336",
  whatsapp: "https://wa.me/923145672336",
  /** Free Cal.com booking page for a 30-minute call. Leave "" to hide every "Book a call" button. */
  booking: "https://cal.com/muhammad-hasnain-pirzada/30min",
  // Put your photo (the same one as LinkedIn and Fiverr) at public/images/hasnain.jpg, square, 800x800 or bigger.
  // Until the file exists, the site shows your initials instead.
  photo: "/images/hasnain.jpg",
  // Put your CV at this path. Until the file exists, the CV button sends people to /contact.
  cv: "/cv/Muhammad-Hasnain-Pirzada-CV.pdf",
  // Leave a link empty ("") to hide it everywhere.
  links: {
    linkedin: "https://www.linkedin.com/in/muhammad-hasnain-pirzada-335816201/",
    github: "https://github.com/engrhasnain",
    instagram: "https://www.instagram.com/hasnain_pirz.da/",
    fiverr: "https://www.fiverr.com/s/aeeog18",
    medium: "https://medium.com/@mhasnainpirzada",
  } as Record<"linkedin" | "github" | "instagram" | "fiverr" | "medium", string>,
  keywords: [
    "Muhammad Hasnain Pirzada",
    "Full Stack AI Engineer",
    "AI platform developer",
    "AI SaaS developer",
    "MCP server developer",
    "RAG chatbot developer",
    "AI agent developer",
    "WhatsApp AI chatbot",
    "Software Engineer",
  ],
};

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * Facts counted in the AI Operations Platform codebase on 2026-10-30 (no guessed percentages):
 * routes = route decorators in the Python (1,943) and NestJS (694) backends; MCP tools = registered tools on the
 * three MCP servers (868 + 201 + 117); tests = test functions in the Python (11,453), NestJS (2,402) and MCP (4,461) code.
 */
export const proof = [
  { value: "2,600+", label: "API endpoints" },
  { value: "1,180+", label: "MCP tools for Claude" },
  { value: "18,000+", label: "automated tests" },
  { value: "50+", label: "integrations" },
];

/** The flagship case study the proof numbers come from. */
export const flagship = "/projects/ai-operations-platform";

/** "Tools I ship with" on the home page: one orbit ring per group, inner to outer. */
export const stackGroups = [
  {
    label: "AI models",
    note: "The models I build on, picked per job for quality and cost.",
    tools: ["Claude", "OpenAI", "Gemini", "Groq"],
  },
  {
    label: "AI and automation",
    note: "Retrieval, tools for Claude, agents and the channels customers use.",
    tools: ["LangChain", "MCP", "RAG", "n8n", "WhatsApp Cloud API"],
  },
  {
    label: "Build and ship",
    note: "The full stack around the AI, from database to cloud.",
    tools: ["Python", "FastAPI", "TypeScript", "React", "Next.js", "NestJS", "Tailwind CSS", "PostgreSQL / pgvector", "Redis", "Docker", "AWS", "S3", "Vercel"],
  },
];

/** Professional registration, shown on About and given to Google. */
export const credentials = [
  {
    title: "Registered Engineer",
    issuer: "Pakistan Engineering Council",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  /** The certificate's public verify link (e.g. coursera.org/verify/...). Without one, the card has no Verify button. */
  url?: string;
  year?: string;
  /** For a specialization: its courses, each with its own verify link if it has one. */
  courses?: { title: string; url?: string }[];
};

/** Courses and certificates, shown on About. Add a verify link to any of them and a Verify button appears. */
export const certifications: Certification[] = [
  {
    // A Coursera specialization that prepares for AWS Cloud Practitioner (not the official AWS exam certification).
    title: "AWS Cloud Practitioner Specialization",
    issuer: "Coursera · LearnKartS",
    year: "Nov 2025",
    url: "https://coursera.org/verify/specialization/GXKLJVIC8VSI",
    courses: [
      { title: "Cloud Fundamentals", url: "https://coursera.org/verify/XJNBLYBO3EK1" },
      { title: "Introduction to AWS", url: "https://coursera.org/verify/BILX56R1B2Y3" },
      { title: "AWS Services", url: "https://coursera.org/verify/MNGN0PXTN8I1" },
      { title: "AWS Pricing" },
    ],
  },
  // From the CV. Add each verify link when you have it.
  { title: "Machine Learning Specialization (3 courses)", issuer: "Stanford University" },
  { title: "Applied Data Science with Python (5 courses)", issuer: "University of Michigan" },
  { title: "Neural Networks and Deep Learning", issuer: "DeepLearning.AI" },
  { title: "Mastering REST APIs with FastAPI", issuer: "Packt · Coursera" },
  { title: "Complete Generative AI with LangChain and Hugging Face", issuer: "Udemy" },
];

/** Playbook projects in progress. Move one to content/projects/*.mdx when it ships. */
export const lab = ["AskStore", "Wasla", "InboxPilot", "Reception AI", "QuantKit"];
