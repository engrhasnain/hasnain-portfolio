import type { ProjectType } from "./types";

export type ServiceIcon = ProjectType | "Platform";

export type Service = {
  /** URL slug: /services/<slug> */
  slug: string;
  /** The old /services#anchor id, kept so old links still land on the right card. */
  anchor: string;
  /** Short card title. */
  title: string;
  oneLiner: string;
  includes: string[];
  /** TODO: the Fiverr gig URL for this service. Empty hides the Fiverr button. */
  fiverr: string;
  icon: ServiceIcon;
  /** <title> tag: keyword first, max 60 characters, no name suffix. */
  seoTitle: string;
  /** Meta description, 140-158 characters, includes the main keyword and a reason to click. */
  metaDescription: string;
  /** H1 on the page. Contains the main keyword, reads naturally. */
  headline: string;
  /** 2-3 sentences under the H1: who it is for and the outcome. */
  intro: string;
  /** The 40-60 word direct answer to "What is <service>?", shown near the top (AEO). */
  whatIs: { q: string; a: string };
  /** The searches this page targets (used for metadata keywords). */
  keywords: string[];
  /** 3-4 short problems the reader has today, written the way a business owner would say them. */
  problems: string[];
  /** 4 outcomes the client gets: short title + one sentence. */
  outcomes: { title: string; text: string }[];
  /** A comparison table that answers "X vs Y" searches. 3 or 4 columns including the first label column, 5 to 7 rows. */
  comparison: { title: string; intro: string; columns: string[]; rows: string[][] };
  /** 3 or 4 use cases for businesses in Saudi Arabia and the UAE (and similar markets): title + 1-2 sentences. */
  useCases: { title: string; text: string }[];
  /** How a project runs, exactly 4 steps. */
  process: { title: string; text: string }[];
  /** Related case-study slugs from content/projects (only slugs that exist). */
  projects: string[];
  /** Related blog post slugs from content/blog (only slugs that exist). */
  posts: string[];
  /** 9 or 10 questions, answers 40-75 words each. Shown on the page and sent as FAQPage schema. */
  faq: { q: string; a: string }[];
};

/*
 * Writing rules for this file: no em or en dashes, no prices, no guessed numbers,
 * no client or employer names. Every fact must come from content/projects or content/blog.
 * Use cases describe what a system would do for a type of business. They are not clients.
 *
 * WhatsApp policy FAQ checked on 2026-10-30 against:
 * - Meta Terms for WhatsApp Business Platform, section 4.7 "AI Providers", last modified 2026-09-23:
 *   https://www.facebook.com/legal/Meta-Terms-for-WhatsApp-Business-Platform
 * - TechCrunch, 2025-10-18, "WhatsApp changes its terms to bar general-purpose chatbots from its platform":
 *   https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/
 * - Meta for Developers, customer service window and templates:
 *   https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages
 *
 * Also checked on 2026-10-30 for the comparison tables, use cases and data FAQs:
 * - WhatsApp Business Messaging Policy, last updated 2026-09-23 (opt-in, escalation to a person, health information):
 *   https://whatsappbusiness.com/policy/
 * - WhatsApp Business app, "built with the small business owner in mind", greeting and away messages:
 *   https://whatsappbusiness.com/products/business-app/
 * - WhatsApp Business Platform, partner or direct API integration, live agent handoff, CRM integrations:
 *   https://whatsappbusiness.com/products/business-platform/
 * - Saudi Personal Data Protection Law (PDPL), SDAIA. Health Data is listed as Sensitive Data (Article 1),
 *   consent (Article 5), applies to processing from outside the Kingdom (Article 2), transfers outside the Kingdom (Article 29):
 *   https://sdaia.gov.sa/en/SDAIA/about/Pages/RegulationsAndPolicies.aspx
 *   https://sdaia.gov.sa/en/SDAIA/about/Documents/PersonalDataProtectionLaw.pdf
 * - UAE Federal Decree-Law No. 45 of 2021 regarding the Protection of Personal Data, in force since 2 January 2022:
 *   https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws
 * - AWS Regions list, Middle East (UAE) me-central-1 and Middle East (Bahrain) me-south-1:
 *   https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
 * Law mentions stay general ("built to respect the requirements of"). They are never legal advice.
 */

/** Same answer on every page that targets Saudi Arabia and the UAE, worded for the service. */
const gulfFaq = (what: string, after: string) => ({
  q: "Do you work with businesses in Saudi Arabia and the UAE?",
  a: `Yes. I work remotely and build ${what} in English and Arabic. I am based in Pakistan, where the time (UTC+5) is 2 hours ahead of Riyadh and 1 hour ahead of Dubai, so our working hours overlap for calls, ${after}.`,
});

/** The closing lines of every data FAQ: general, never legal advice. */
const gulfLaw =
  "For Gulf businesses, I build to respect the requirements of Saudi Arabia's PDPL and the UAE's Federal Decree-Law No. 45 of 2021. Your legal adviser should confirm what applies to you.";

export const services: Service[] = [
  {
    slug: "ai-platform-development",
    anchor: "ai-platform",
    title: "AI platform / SaaS",
    oneLiner:
      "A complete AI product or internal platform: the screen your team uses, the backend, the AI and the cloud it runs on.",
    includes: [
      "Architecture and a clear plan before any code",
      "React or Next.js app for your team or customers",
      "NestJS or FastAPI backend with clean, documented APIs",
      "AI built in: RAG, agents and MCP tools for Claude",
      "Integrations with the tools you already use",
      "Human approval, AI cost tracking and audit logs",
      "CI/CD and deployment on AWS",
    ],
    fiverr: "",
    icon: "Platform",
    seoTitle: "AI Platform Development: Custom AI SaaS and Software",
    metaDescription:
      "AI platform development for AI SaaS and internal tools: the app, backend, AI features and AWS deployment in one build, with human approval and cost tracking.",
    headline: "AI platform development, from the first screen to the cloud",
    intro:
      "For founders and teams who need a real AI product or internal platform, not a demo. I build the whole thing: the app your people use, the backend and APIs, the AI features and the AWS setup it runs on. You end up with one system your team owns and can keep building on.",
    whatIs: {
      q: "What is a custom AI platform?",
      a: "A custom AI platform is software built around how your business works, with AI inside it. It has the app your team uses, a backend and database, AI features such as RAG search and agents, and links to the tools you already run. You own it, and it follows your rules, not a vendor's.",
    },
    keywords: [
      "AI platform development",
      "AI SaaS development",
      "custom AI software",
      "AI SaaS developer",
      "AI software development",
    ],
    problems: [
      "Our team copies data between five tools every day.",
      "We tried an AI demo, but it never made it into real work.",
      "I have an AI product idea and no team to build all of it.",
      "I have no idea what the AI costs us or what it actually did.",
    ],
    outcomes: [
      {
        title: "One place for the work",
        text: "Your team works in one app instead of copying the same data between five tools every day.",
      },
      {
        title: "AI that does real tasks",
        text: "AI drafts, searches and sorts inside the platform, and a person approves anything before it goes out.",
      },
      {
        title: "AI costs you can see",
        text: "Every AI call is logged with its cost, its model and the task it was for, with spend caps on top.",
      },
      {
        title: "A system you own",
        text: "The code, the cloud account and the docs are yours, so your team or any developer can keep building.",
      },
    ],
    comparison: {
      title: "Custom AI platform vs SaaS tools stitched together",
      intro:
        "Most teams start with a handful of SaaS tools, joined by automations and a lot of copy and paste. That is fine until the work outgrows it. Here is how the two options compare.",
      columns: ["What matters", "Custom AI platform", "SaaS tools stitched together"],
      rows: [
        ["Fit to your process", "Built around how your team works", "Your team adapts to each tool"],
        ["Where your data lives", "One database in your own cloud", "Spread across several vendors"],
        ["AI on your own data", "Search and agents across all your records", "Each tool's AI sees only its own data"],
        ["Approval and audit log", "Built in where you need them", "Depends on each tool's settings"],
        ["Time to get started", "Slower: plan and build first", "Fast, if the tools already fit"],
        ["Changes later", "Your team or any developer can change it", "You wait for each vendor's roadmap"],
        ["Best for", "Core work that sets you apart", "Standard jobs like email or invoicing"],
      ],
    },
    useCases: [
      {
        title: "Real estate brokerages and developers",
        text: "One platform for listings, leads and viewings. AI drafts listing text in English and Arabic, matches new enquiries to available units, and an agent approves every message before it reaches a buyer.",
      },
      {
        title: "Marketing agencies with many client brands",
        text: "Content, reviews, social posts and calls for every client brand run in one place, with a person approving what goes live. It is the same kind of platform I built for a digital marketing agency.",
      },
      {
        title: "E-commerce with cash on delivery",
        text: "Orders, couriers and customer messages sit in one dashboard. The platform confirms cash on delivery orders before dispatch, flags orders that look risky and shows the team which ones to hold.",
      },
      {
        title: "Clinic groups with several branches",
        text: "Bookings, reminders and patient questions for every branch in one portal. Staff see only what their role allows, every access is logged, and an AI assistant answers routine questions from the clinic's own pages.",
      },
    ],
    process: [
      {
        title: "Plan before code",
        text: "We map the users, the data and the tools it has to connect to. You get the architecture, the scope and a fixed quote before I write any code.",
      },
      {
        title: "Build the core first",
        text: "I build the app, the API and the database first, then add the AI features on top, so the base is solid before the AI goes in.",
      },
      {
        title: "Demos as I go",
        text: "You see working screens early and often on a test site, so your feedback lands while things are still easy to change.",
      },
      {
        title: "Launch and handover",
        text: "I deploy to your AWS account with CI/CD, then hand over the docs and access, so your team owns the code and the cloud.",
      },
    ],
    projects: ["ai-operations-platform", "client-onboarding-activation", "billing-payment-reconciliation"],
    posts: ["ai-agent-job-description", "what-is-an-mcp-server"],
    faq: [
      {
        q: "What is AI platform development?",
        a: "It means building a full software product with AI inside it, not a chatbot bolted on top. That covers the web app people use, the backend and APIs, the database, the AI features such as RAG, agents and MCP tools, and the cloud setup. I plan all the parts together, so the AI works with your real data and your rules.",
      },
      {
        q: "Have you built an AI platform like this before?",
        a: "Yes. I built an AI operations platform that runs a digital marketing agency end to end. It has 3 apps, 2,600+ API endpoints, 50+ integrations and an MCP layer that gives Claude 1,000+ tools, with a person approving anything before it goes live. The full case study is linked on this page.",
      },
      {
        q: "What tech stack do you use?",
        a: "Usually React or Next.js for the app, NestJS or FastAPI for the backend, PostgreSQL with pgvector for data and search, Redis for scheduled jobs, and AWS for hosting. For the AI I use Claude, GPT or Gemini, picked per task. We settle the stack in the planning step, before any code is written.",
      },
      {
        q: "How do you keep AI costs under control?",
        a: "I track AI usage by cost from the first day and add spend caps, so a busy week can't turn into a surprise bill. I also pick the model per task: a smaller model for simple steps and a stronger one where quality matters. You can see what the AI did and what it cost.",
      },
      {
        q: "Will the AI make changes without anyone checking?",
        a: "Only where you decide it can. Reading data and drafting work can run on their own. Anything that goes public or changes a record waits for a person to approve it, and every action is logged. In the platform I built, nothing goes live without a yes from the team.",
      },
      {
        q: "Who owns the code and the accounts?",
        a: "You do. I deploy on your own cloud and AI provider accounts, the code lives in your repository, and you get docs and a handover so your team, or another developer, can keep building on it. Nothing important stays locked in my accounts.",
      },
      {
        q: "Can you add AI to the software we already have?",
        a: "Yes, and often that is the better first step. I add an AI service next to your current backend, connect it through your API, and build the AI features there: search over your documents, drafting, or an agent with limited tools. In the platform I built, the AI service runs in FastAPI beside the main NestJS backend.",
      },
      {
        q: "Can our data stay in Saudi Arabia or the UAE?",
        a: "Your data lives in your own cloud account, in a region we choose together. AWS, which I usually deploy on, has regions in the UAE and Bahrain. Saudi Arabia's Personal Data Protection Law (PDPL) has its own rules for transferring personal data outside the Kingdom, so if data must stay inside Saudi Arabia, we pick hosting that meets that before any code is written.",
      },
      {
        q: "How do you handle personal data?",
        a: `I keep only the personal data the job needs, limit who sees it by role, encrypt secrets and log who opened what. We also decide together what personal data, if any, is sent to an AI model. ${gulfLaw}`,
      },
      gulfFaq("AI platforms", "reviews and demos"),
    ],
  },
  {
    slug: "ai-chatbot-development",
    anchor: "ai-chatbot",
    title: "AI chatbot",
    oneLiner:
      "A chatbot trained on your documents and website that answers accurately and hands off to your team.",
    includes: [
      "Trained on your PDFs, docs and website pages (RAG)",
      "Claude, GPT or Gemini, picked for your budget",
      "Says \"I don't know\" instead of guessing",
      "Hand-off to a human by email or live chat",
      "Chat widget for your website",
      "Deployment and a handover guide",
    ],
    fiverr: "https://www.fiverr.com/s/wbblvlA",
    icon: "Chatbots",
    seoTitle: "AI Chatbot Development Services: RAG Chatbots for Business",
    metaDescription:
      "AI chatbot development services: a RAG chatbot trained on your documents and website that says when it doesn't know and hands the chat to your team.",
    headline: "AI chatbot development that answers from your own documents",
    intro:
      "For businesses that get the same questions every day and want accurate answers at any hour. I build a chatbot trained on your documents and website that says \"I don't know\" when it should, and passes the chat to your team.",
    whatIs: {
      q: "What is AI chatbot development?",
      a: "AI chatbot development means building a chat assistant that answers your customers or staff from your own content. I clean your documents, store them for search, connect a model such as Claude, GPT or Gemini, and test it with real questions. The finished bot says when it doesn't know and passes the chat to a person.",
    },
    keywords: [
      "ai chatbot development services",
      "rag chatbot for business",
      "ai chatbot app development services in saudi arabia",
      "custom ai chatbot",
      "chatbot trained on your documents",
    ],
    problems: [
      "My team answers the same questions all day.",
      "Customers message after hours and nobody replies.",
      "We tried a chatbot once and it made up answers.",
      "Our information is spread across PDFs, docs and old web pages.",
    ],
    outcomes: [
      {
        title: "Answers at any hour",
        text: "Customers get a correct answer at night and at weekends, not a promise that someone will reply tomorrow.",
      },
      {
        title: "Less repeat work for your team",
        text: "The bot takes the questions that come up every day, so your team spends its time on the ones that need a person.",
      },
      {
        title: "Answers you can check",
        text: "Each answer comes from a passage in your documents, and the bot can show which document and section it used.",
      },
      {
        title: "A list of what's missing",
        text: "Questions it couldn't answer are logged, so you know exactly which documents to add next.",
      },
    ],
    comparison: {
      title: "AI chatbot vs AI agent vs rule-based bot",
      intro:
        "These three get mixed up a lot. A rule-based bot follows a script, an AI chatbot answers from your content, and an AI agent takes actions in your systems. Most businesses should start with the chatbot.",
      columns: ["What matters", "AI chatbot (RAG)", "AI agent", "Rule-based bot"],
      rows: [
        ["Main job", "Answers questions from your content", "Takes actions in your systems", "Follows a fixed menu or script"],
        ["Free-text questions", "Yes, in the customer's own words", "Yes, in the customer's own words", "Only the phrases it was set up for"],
        ["Changes your data", "No, it only answers", "Yes, through tools you approve", "Only the fixed steps you built"],
        ["Main risk", "A wrong answer if retrieval is weak", "A wrong action, so risky steps need approval", "Customers get stuck when the script ends"],
        ["Setup work", "Clean the documents and test retrieval", "Map the workflow and set permissions", "Write every path by hand"],
        ["Upkeep", "Update the documents", "Review its access and logs", "Edit the script for every change"],
        ["Best for", "FAQs, policies and product questions", "Bookings, updates and follow-ups", "Short, fixed menus"],
      ],
    },
    useCases: [
      {
        title: "Property developers and brokers",
        text: "A chatbot on the website answers questions about projects, locations, unit types, payment plans and handover dates from your brochures and fact sheets, in English or Arabic. Serious buyers go to an agent with the chat attached.",
      },
      {
        title: "Clinics and medical centres",
        text: "It answers questions about services, doctors' schedules, accepted insurance and how to prepare for a visit, using the clinic's own pages. It gives no medical advice, and anything clinical goes to staff.",
      },
      {
        title: "Online stores",
        text: "It answers sizing, delivery areas, return rules and cash on delivery questions from the store's own policies, and hands order problems to the support team instead of guessing.",
      },
      {
        title: "Internal policy assistant",
        text: "Staff ask about leave, travel, expenses or IT rules, and the bot answers from the company handbook, showing the section it used. HR gets fewer repeat emails, and the handbook stays the one source of truth.",
      },
    ],
    process: [
      {
        title: "Gather your content",
        text: "You share your PDFs, docs and website pages. I clean them up, and we agree on the questions the bot must answer and the ones it must hand off.",
      },
      {
        title: "Build and test retrieval",
        text: "I split the content by meaning, store it for search, and test retrieval with real customer questions before I tune a single prompt.",
      },
      {
        title: "Review with your team",
        text: "You try it on a test link and flag wrong or missing answers. I fix the data and retrieval first, and the prompt last.",
      },
      {
        title: "Launch and handover",
        text: "I add the chat widget to your website, connect the hand-off to your team, and give you a guide for updating the content.",
      },
    ],
    projects: ["ai-business-chatbot", "client-knowledge-graph", "pdf-research-chatbot"],
    posts: ["rag-chatbots-that-dont-make-things-up", "what-is-an-mcp-server"],
    faq: [
      {
        q: "What is a RAG chatbot?",
        a: "RAG stands for retrieval-augmented generation. Before the chatbot answers, it searches your own documents for the passages that match the question and gives them to the AI model. The answer then comes from your content instead of the model's memory, which makes it easier to check and less likely to be made up.",
      },
      {
        q: "Will the chatbot make things up?",
        a: "It can if it is built carelessly, so I build against it. I clean the documents, split them by meaning, test retrieval with real questions, and tell the model to say it doesn't know when the answer isn't in your content. Questions it can't answer go to a person instead of getting a guess.",
      },
      {
        q: "Which AI model will my chatbot use?",
        a: "Claude, GPT or Gemini, picked for your content, your languages and your running costs. I have built a chatbot that runs all three behind one interface, so switching models later is a setting, not a rebuild. Your documents and search index live in your own database.",
      },
      {
        q: "Can it hand the chat to a real person?",
        a: "Yes. When a question is out of scope, or the customer asks for a person, the chatbot passes the conversation to your team by email or live chat. Your team can see what was already asked, so the customer doesn't have to start again.",
      },
      {
        q: "Can the same chatbot work on WhatsApp?",
        a: "Yes. The same knowledge base can power a chat widget on your website and a WhatsApp assistant, so customers get the same answers wherever they ask. WhatsApp needs its own setup through Meta's Cloud API, which I cover on the WhatsApp AI chatbot page.",
      },
      {
        q: "What content can the chatbot learn from?",
        a: "Anything your team already trusts in writing: PDFs, Word files, help pages, policies, product sheets and pages from your website. I clean it first, removing outdated files, duplicates and broken tables, because most wrong answers start in the documents. If an answer isn't written down anywhere, the bot can't know it, and it should say so.",
      },
      {
        q: "How do you test a chatbot before launch?",
        a: "With real questions in three groups. Questions it should answer, each paired with the passage the answer must come from. Questions it shouldn't answer, where the right reply is a hand-off. And questions written the messy way customers really write, with typos or two questions in one. When it gets one wrong, I fix the data and retrieval first, and the prompt last.",
      },
      {
        q: "How do I keep the answers up to date?",
        a: "You update the documents, and the bot answers from the new version. I give you a short guide for adding, replacing and removing files, and the questions it couldn't answer show you what to add next. If an answer changes every hour, like stock levels or order status, the bot should read it live from your system through an API or an MCP server.",
      },
      {
        q: "Where is the chat data stored?",
        a: `In your own database, next to the search index of your documents. I keep only what the chat needs, mask sensitive details in the logs, and give you a way to delete a person's chats on request. ${gulfLaw}`,
      },
      gulfFaq("chatbots", "demos and quick fixes"),
    ],
  },
  {
    slug: "mcp-server-development",
    anchor: "mcp-server",
    title: "MCP server",
    oneLiner: "Connect Claude or your AI agent to your CRM, database, files or internal API, securely.",
    includes: [
      "Custom MCP server for your system or API",
      "Typed tools with input validation",
      "Authentication, permissions and audit logs",
      "Works with Claude Desktop, Claude Code and custom agents",
      "Docker setup for easy deployment",
      "Docs and example prompts",
    ],
    fiverr: "https://www.fiverr.com/s/X00B44k",
    icon: "MCP",
    seoTitle: "MCP Server Development Services: Custom MCP Servers",
    metaDescription:
      "MCP server development services: a custom MCP server that connects Claude or your AI agent to your CRM, database or API, with permissions and audit logs.",
    headline: "MCP server development for Claude and your AI agents",
    intro:
      "For teams that want Claude or their own AI agent to work inside real systems: a CRM, a database, files or an internal API. I build a custom MCP server with a short list of typed tools, the right permissions and a log of every call, so you stay in control of what the AI can do.",
    whatIs: {
      q: "What is MCP server development?",
      a: "MCP server development is building the bridge between an AI model such as Claude and one of your systems. I turn each job the AI should do into a typed tool, add sign-in, permissions and logs, and test it with real prompts. The AI can use your CRM, database or API, but only as far as you allow.",
    },
    keywords: [
      "mcp server development services",
      "mcp server development company",
      "custom mcp server",
      "hire mcp developer",
      "mcp server developer",
      "model context protocol development",
    ],
    problems: [
      "Claude can't see our CRM or our database.",
      "Only our developers can pull numbers out of the system.",
      "I don't want to give an AI full access to everything.",
      "We have an internal API, but no AI can use it.",
    ],
    outcomes: [
      {
        title: "Answers from live data",
        text: "Your team asks Claude a question in plain English and gets real numbers from your system, not a guess.",
      },
      {
        title: "Access you control",
        text: "Each tool has its own permission, read-only tools come first, and anything destructive waits for a person.",
      },
      {
        title: "A log of every call",
        text: "You can see which tool ran, with what input, for whom and when, so nothing the AI does is hidden.",
      },
      {
        title: "Not tied to one AI company",
        text: "MCP is an open standard, so one server can work with Claude, ChatGPT, Cursor and your own agent.",
      },
    ],
    comparison: {
      title: "MCP server vs plugin vs direct API integration",
      intro:
        "There are three common ways to let an AI use your system. A direct API integration is wired into one app. A plugin or custom action lives inside one AI product. An MCP server is one standard bridge that many AI clients can share.",
      columns: ["What matters", "MCP server", "AI app plugin or custom action", "Direct API integration"],
      rows: [
        ["Works with", "Claude, ChatGPT, Gemini, Cursor and other MCP clients", "The one AI product it was built for", "The one app you wired it into"],
        ["Standard", "Open protocol, same pattern for every tool", "Each vendor's own format", "Custom code for each pairing"],
        ["Permissions and logs", "In one place, on the server", "Partly set by the vendor", "Written again in each app"],
        ["What the AI can reach", "Only the tools you list", "Only the actions you define", "Whatever the code exposes"],
        ["Effort for one simple case", "More setup than a one-off script", "Quick, if the product supports it", "Quickest for one app and one system"],
        ["Adding another AI client", "Reuse the same server", "Rebuild it for each AI product", "A new integration each time"],
        ["Best for", "Several AI tools or many systems", "One team on one AI product", "One app talking to one system"],
      ],
    },
    useCases: [
      {
        title: "Sales numbers in plain English",
        text: "A trading or distribution company asks Claude how Riyadh compares with Dubai this quarter and gets real figures from its sales database, through read-only tools. My SalesTalk MCP demo does exactly this, on a seeded database for a fictional Gulf trading company.",
      },
      {
        title: "Property management",
        text: "The team asks which units are vacant, which leases end next month and which maintenance tickets are still open. The MCP server reads it all from the property system, and a write tool, such as opening a ticket, waits for approval.",
      },
      {
        title: "Clinic operations reporting",
        text: "Managers ask about tomorrow's bookings, no-shows by branch or waiting lists, and get answers without exporting spreadsheets. Saudi Arabia's PDPL treats health data as sensitive, so patient details stay out of the tools unless there is a clear need.",
      },
      {
        title: "E-commerce support",
        text: "Support staff ask Claude for an order's status, delivery attempts and cash on delivery confirmation, pulled from the store and courier systems. Only approved staff can use the refund tool, and every call is logged.",
      },
    ],
    process: [
      {
        title: "Pick the tools",
        text: "We list the jobs the AI should do and turn each one into a named tool. Read-only tools come first, and write tools only where you need them.",
      },
      {
        title: "Build and secure",
        text: "I build the server with input validation on every tool, authentication, permissions per tool and an audit log of every call.",
      },
      {
        title: "Test with real prompts",
        text: "I test it in Claude Desktop, Claude Code or your own agent with the questions your team really asks, including the ones it must refuse.",
      },
      {
        title: "Ship and document",
        text: "You get a Docker setup, docs and example prompts, and the server runs where you want it to run.",
      },
    ],
    projects: ["production-mcp-servers", "salestalk-mcp", "ai-operations-platform"],
    posts: ["what-is-an-mcp-server", "ai-agent-job-description"],
    faq: [
      {
        q: "What is an MCP server?",
        a: "An MCP server is a small piece of software that connects an AI model such as Claude to one of your systems, like a CRM, database or internal API. It describes that system to the AI as a short list of named tools, each with a strict input schema, so the AI knows what it can do and the server controls what it is allowed to do.",
      },
      {
        q: "Is MCP only for Claude?",
        a: "No. Anthropic created MCP, but it is now an open standard run by the Agentic AI Foundation under the Linux Foundation. ChatGPT, Gemini, Microsoft Copilot, Cursor and Visual Studio Code support it, so one server can work with Claude Desktop, Claude Code, your own agent and other clients.",
      },
      {
        q: "Is it safe to connect AI to our database?",
        a: "It is as safe as the server is built. I start read-only, give each tool only the access it needs, validate every input and log every call. My SalesTalk MCP server uses a select-only database role, read-only transactions, a statement timeout and a row cap, and it refuses requests to delete data every time.",
      },
      {
        q: "Have you built MCP servers before?",
        a: "Yes. I built the MCP layer of an AI operations platform: 6 servers and 17 MCPs exposing 1,000+ tools for Claude, protected with OAuth 2.1. I also built SalesTalk MCP, which lets Claude answer sales questions from a live PostgreSQL database, with its code on GitHub. Both case studies are linked on this page.",
      },
      {
        q: "Can an MCP server change data, or only read it?",
        a: "Both, depending on the tools you give it. I usually start read-only, which is the safest first step, then add write tools one at a time, each with its own permission. Anything destructive, such as deleting records or making a payment, waits for a person to approve it.",
      },
      {
        q: "We already have an API. Do we still need an MCP server?",
        a: "Often yes, and the MCP server sits on top of the API you have. Your API is how software talks to your system. The MCP server turns only the parts the AI needs into clear, limited tools with descriptions, so the AI never gets the whole API, only what you approve.",
      },
      {
        q: "What do you need from us to start?",
        a: "Three things. Access to a test copy of the system, or its API docs and a test key. A list of the real questions or tasks your team wants the AI to handle. And one person who knows the data and can tell me when an answer looks wrong. With those, I can plan the tools and show you a first working version early.",
      },
      {
        q: "Where does the MCP server run?",
        a: "It depends on who uses it. For one person in Claude Desktop, it can run locally over stdio. For a team, it runs as a remote server over HTTP behind OAuth, so each person signs in and gets only their own access. I ship it with Docker, so it runs on your own cloud, close to the system it connects to.",
      },
      {
        q: "How many tools should an MCP server have?",
        a: "As few as the job needs. The model picks tools by reading their names and descriptions, so a short, clear list works better than a long, vague one. My SalesTalk server has six. On large servers, I keep a small core of 8 to 12 tools that always load and add the rest only when a task needs them.",
      },
      gulfFaq("MCP servers", "test sessions and changes"),
    ],
  },
  {
    slug: "ai-agent-development",
    anchor: "ai-agent",
    title: "AI agent / n8n",
    oneLiner: "Automate a real workflow end to end, with human approval where it matters.",
    includes: [
      "Workflow mapping before any code",
      "n8n or Python agent, whichever fits",
      "Human approval steps for risky actions",
      "Connects to Gmail, Sheets, Slack, your CRM and more",
      "Error handling, retries and logs",
      "A short runbook for your team",
    ],
    fiverr: "",
    icon: "Agents",
    seoTitle: "AI Agent Development Services: n8n and Python AI Agents",
    metaDescription:
      "AI agent development services: n8n or Python agents that run a real workflow end to end, connect to Gmail, Sheets, Slack or your CRM, and ask before acting.",
    headline: "AI agent development for the work your team repeats every day",
    intro:
      "For teams stuck doing the same steps by hand, every day. I build AI agents in n8n or Python that do the repetitive work end to end, connected to the tools you already use, with a person approving anything risky.",
    whatIs: {
      q: "What is AI agent development?",
      a: "AI agent development is building software that does a job for you instead of only answering questions. The agent reads emails, forms or records, decides the next step and acts through tools such as Gmail, Sheets or your CRM. I build agents in n8n or Python, with a person approving anything risky.",
    },
    keywords: [
      "ai agent development services",
      "n8n ai agent",
      "hire ai agent developer",
      "n8n automation developer",
      "ai workflow automation",
    ],
    problems: [
      "We copy the same details from email into Sheets every morning.",
      "Follow-ups slip because someone forgot.",
      "I want to automate this, but I don't trust an AI to act on its own.",
      "Our last automation broke and nobody noticed.",
    ],
    outcomes: [
      {
        title: "Repeat work off your desk",
        text: "Copying, sorting and first drafts run on their own every day, without anyone opening a spreadsheet.",
      },
      {
        title: "Follow-ups that don't slip",
        text: "Timers and reminders run on a clock, so a lead or a task can't sit untouched because someone forgot.",
      },
      {
        title: "Approval where it matters",
        text: "Sending, publishing and changing records wait for a person to say yes, and deleting or paying never runs alone.",
      },
      {
        title: "Failures you can see",
        text: "Every run is logged, failed calls are retried, and a step that needs a person stops and tells your team.",
      },
    ],
    comparison: {
      title: "n8n vs custom Python agent vs Zapier",
      intro:
        "All three can automate a workflow. The right pick depends on how complex the logic is, who will change it later and where your data is allowed to go. I build in n8n and Python, and I will tell you when Zapier is enough.",
      columns: ["What matters", "n8n workflow", "Custom Python agent", "Zapier and similar tools"],
      rows: [
        ["Best for", "Clear flows your team wants to see", "Complex logic, large data or custom tools", "Simple app-to-app triggers"],
        ["Who can change it", "Your team, in a visual editor", "A developer, in code", "Your team, in a visual editor"],
        ["AI steps", "AI nodes plus any model API", "Any model, any custom logic", "The AI steps the platform offers"],
        ["Where it runs", "Your own server or n8n's cloud", "Your own server or cloud", "The vendor's cloud"],
        ["Approval steps", "Wait and approval steps in the flow", "Built to your exact rules", "Possible, within the platform's features"],
        ["Error handling", "Retries and error workflows", "Anything you can write in code", "Built-in replays and error alerts"],
        ["When to skip it", "Logic too complex for a diagram", "A simple flow your team should own", "Data that must stay on your servers"],
      ],
    },
    useCases: [
      {
        title: "Lead follow-up for real estate",
        text: "Leads from property portals, Meta ads and the website land in one CRM, go to the next agent in turn and get a first reply on WhatsApp or email. If nobody acts within the time you set, the lead escalates to a manager.",
      },
      {
        title: "Contractors and maintenance companies",
        text: "Job requests from email and web forms are read, sorted by trade and area, and turned into draft jobs with the customer's details. A dispatcher approves the schedule, and the agent sends the confirmation.",
      },
      {
        title: "Cash on delivery confirmation",
        text: "Each new cash on delivery order triggers a confirmation message. Confirmed orders go to the courier, unanswered ones get one reminder, and cancelled ones are stopped before they ship.",
      },
      {
        title: "Restaurants and cafes",
        text: "New Google reviews are collected each morning, and the agent drafts replies in English or Arabic for the manager to approve. One and two star reviews always wait for a person, as they do in the review system I built.",
      },
    ],
    process: [
      {
        title: "Map the workflow",
        text: "We walk through the job step by step: what comes in, what gets decided and which actions need a person. Nothing is built until the map is clear.",
      },
      {
        title: "Pick n8n or Python",
        text: "n8n when your team wants to see and change the flow, Python when the logic is complex. I build on whichever fits the job.",
      },
      {
        title: "Build with guardrails",
        text: "Approval steps for risky actions, retries for failed calls and a log for every run, tested on real examples from your work.",
      },
      {
        title: "Run and hand over",
        text: "It goes live on your accounts, and your team gets a short runbook for checking runs and fixing common issues.",
      },
    ],
    projects: ["meta-ads-and-social-automation", "zoom-ai-agents", "ai-website-and-blog-engine"],
    posts: ["ai-agent-job-description", "what-is-an-mcp-server"],
    faq: [
      {
        q: "What is the difference between an AI agent and a chatbot?",
        a: "A chatbot answers questions. An AI agent takes actions: it can read an email, update a sheet, draft a reply or create a record by calling tools in your systems. That is why an agent needs clear limits on what it can do on its own and what needs a person's approval.",
      },
      {
        q: "Should I use n8n or a custom Python agent?",
        a: "n8n fits when the workflow is clear and your team wants to see it and change it without code. Python fits when the logic is complex, the data is large or the agent needs custom tools. Some projects use both: n8n for the flow and Python for the one hard step.",
      },
      {
        q: "Will the agent act without asking anyone?",
        a: "Only for the steps you approve in advance. Reading data and drafting work can run on their own. Sending an email, publishing something or changing a customer record waits for a person to approve it. Actions that can't be undone, like deleting data or making a payment, never run without a person.",
      },
      {
        q: "What tools can an AI agent connect to?",
        a: "Most tools with an API or an n8n node, including Gmail, Google Sheets, Slack, CRMs, calendars and webhooks. If your system has an internal API, I can connect to that too, or wrap it in an MCP server so Claude and other agents can use it with limited, logged access.",
      },
      {
        q: "What happens when something fails?",
        a: "Every agent I build has error handling, retries for calls that fail for a moment, and a log for each run, so you can see what happened and why. When a step needs a person, it stops and tells your team instead of failing quietly. The runbook explains how to check and rerun it.",
      },
      {
        q: "Have you built AI agents for real work?",
        a: "Yes. I built the AI workflows inside a platform that runs a digital marketing agency, where AI drafts pages, posts and call summaries and a person approves anything before it goes live. I have also built a WhatsApp assistant as an n8n workflow. Both case studies are linked on this page.",
      },
      {
        q: "Can an AI agent work in Arabic?",
        a: "Yes. The models I use read and write Arabic, so an agent can sort Arabic emails, pull details out of Arabic forms and draft replies in Arabic or English. Before launch, I test it with your real messages, including the short, mixed Arabic and English ones people really send, and I check names and numbers by hand.",
      },
      {
        q: "What is a good first AI agent to build?",
        a: "Pick one job that repeats every day, has clear inputs and doesn't need the AI to make the final call. Lead intake, sorting an inbox, chasing missing documents or drafting review replies are all good first jobs. Prove it on that one job with real data, then add the next one on top.",
      },
      {
        q: "How do you decide what an agent is allowed to do?",
        a: "I write it a one-page job description before it gets any access: what it may read, what it may do alone, what needs approval, what it must never do, who owns it and when its access is reviewed. Then I build the permissions to match the page, so even a confused agent can't do more than it says.",
      },
      gulfFaq("AI agents", "workflow reviews and fixes"),
    ],
  },
  {
    slug: "whatsapp-ai-chatbot",
    anchor: "whatsapp-ai-assistant",
    title: "WhatsApp AI assistant",
    oneLiner: "Answer customers and book appointments on WhatsApp, in English and Arabic.",
    includes: [
      "WhatsApp Business (Cloud API) setup",
      "Replies in English and Arabic",
      "Answers from your own FAQs and documents",
      "Appointment booking with your calendar",
      "Human takeover for complex chats",
      "Conversation logs",
    ],
    fiverr: "",
    icon: "WhatsApp",
    seoTitle: "WhatsApp AI Chatbot for Business: English and Arabic",
    metaDescription:
      "A WhatsApp AI chatbot for business that answers customers from your own FAQs, books appointments in your calendar and hands complex chats to your team.",
    headline: "A WhatsApp AI chatbot for business, in English and Arabic",
    intro:
      "For businesses whose customers already message them on WhatsApp and wait too long for a reply. I build an assistant that answers from your own FAQs and documents, books appointments and passes complex chats to a person on your team.",
    whatIs: {
      q: "What is a WhatsApp AI chatbot?",
      a: "A WhatsApp AI chatbot is an assistant that replies to customers on your WhatsApp Business number. It runs on Meta's WhatsApp Business Platform, answers from your own FAQs and documents, books appointments in your calendar and passes the chat to a person on your team when it should.",
    },
    keywords: [
      "whatsapp ai chatbot for business",
      "whatsapp chatbot saudi arabia",
      "whatsapp chatbot development dubai",
      "whatsapp chatbot for small business",
      "whatsapp ai assistant",
      "whatsapp business api chatbot",
    ],
    problems: [
      "Customers message us on WhatsApp at midnight and wait until morning.",
      "We answer the same timing and availability questions all day.",
      "Bookings get lost in long chat threads.",
      "Some customers write in Arabic, some in English, and we can't cover both.",
    ],
    outcomes: [
      {
        title: "Replies in seconds, day or night",
        text: "Common questions about timings, location and availability get an answer right away, even at midnight.",
      },
      {
        title: "Arabic and English covered",
        text: "Customers get a reply in the language they wrote in, from the same set of approved answers.",
      },
      {
        title: "Bookings that don't get lost",
        text: "Appointments go straight into your calendar instead of staying buried in a long chat thread.",
      },
      {
        title: "Your team takes the hard chats",
        text: "Complex, sensitive or unhappy chats go to a person, with the full conversation in front of them.",
      },
    ],
    comparison: {
      title: "WhatsApp Cloud API vs WhatsApp Business app vs a website chat widget",
      intro:
        "All three let customers message you. Meta built the WhatsApp Business app for small business owners who reply from a phone. The Cloud API connects WhatsApp to software, which an AI assistant needs. A website widget only reaches people already on your site.",
      columns: ["What matters", "WhatsApp Cloud API", "WhatsApp Business app", "Website chat widget"],
      rows: [
        ["Built for", "Connecting WhatsApp to your own software", "A small business owner on a phone", "Visitors already on your website"],
        ["AI answers from your documents", "Yes, through the assistant I build", "Only the app's own automated replies", "Yes, if the widget runs an AI bot"],
        ["Messaging customers first", "Approved templates outside the 24-hour window", "Manual messages from the app", "Only while the visitor is on the site"],
        ["Calendar and CRM links", "Yes, through code or n8n", "Not built in", "Depends on the widget"],
        ["Several team members", "Yes, through a shared inbox or CRM", "Limited to the app's linked devices", "Yes, in the widget's inbox"],
        ["Where customers reach you", "In WhatsApp, which they already use", "In WhatsApp, which they already use", "Only on your website"],
        ["What you need", "A Meta Business account and a number", "The app and a phone number", "A script added to your site"],
      ],
    },
    useCases: [
      {
        title: "Clinics and dental practices",
        text: "Patients ask about timings, doctors and services, and book or move an appointment in the chat, in Arabic or English. Meta's WhatsApp policy restricts health information where local rules demand stricter systems, so clinical questions go to staff, not the bot.",
      },
      {
        title: "Real estate",
        text: "Buyers and tenants ask about a project, its location and what is available. The assistant answers from your listings and brochures, notes what each person is looking for and books a viewing with an agent.",
      },
      {
        title: "Restaurants",
        text: "It answers questions about opening hours, the menu, delivery areas and table bookings, then sends a reminder before the booking through a message template that Meta has approved.",
      },
      {
        title: "Online stores with cash on delivery",
        text: "For customers who opted in at checkout, it confirms new cash on delivery orders with an approved template, answers \"where is my order\" and passes returns and complaints to your team.",
      },
    ],
    process: [
      {
        title: "Set up WhatsApp",
        text: "I set up the WhatsApp Business Platform (Cloud API) on your own Meta account and number, so the number and the chats stay yours.",
      },
      {
        title: "Load your answers",
        text: "Your FAQs, service details and documents go into the assistant's knowledge base. We agree on what it answers and what it hands off.",
      },
      {
        title: "Build and test",
        text: "I build the flow in n8n or code, connect your calendar for bookings, and test it with real customer messages in English and Arabic.",
      },
      {
        title: "Go live and hand over",
        text: "You get human takeover for complex chats, conversation logs, and a guide for updating the answers.",
      },
    ],
    projects: ["whatsapp-ai-chatbot", "ai-business-chatbot", "speed-to-lead-crm"],
    posts: ["rag-chatbots-that-dont-make-things-up"],
    faq: [
      {
        q: "Is a WhatsApp AI chatbot still allowed after Meta's 2026 policy change?",
        a: "Yes, for business use. Since January 15, 2026, Meta's WhatsApp Business terms bar AI providers from offering a general-purpose AI assistant as the main service, with some regional exceptions. A bot that serves your own customers, for support, FAQs, bookings or orders, is still allowed. The terms, last updated in September 2026, still allow this, so I build every assistant around your business.",
      },
      {
        q: "Do I need the WhatsApp Business API?",
        a: "Yes. The assistant I build runs on Meta's WhatsApp Business Platform through the Cloud API, not inside the regular WhatsApp Business app. You need a Meta Business account and a phone number for it. I set it up with you on your own account, so the number, the chats and the access stay yours.",
      },
      {
        q: "Can it reply in both Arabic and English?",
        a: "Yes. The assistant replies in the language the customer writes in, Arabic or English, from the same knowledge base. Before it goes live, I test it with real messages in both languages, including the short, mixed and informal ones customers really send.",
      },
      {
        q: "Is a WhatsApp chatbot worth it for a small business?",
        a: "It is if your customers already message you on WhatsApp and many of their questions repeat, like opening times, availability or order status. Start small: answers from your FAQs plus a hand-off to a person. Add appointment booking once the basics work. Your team then only handles the chats that need them.",
      },
      {
        q: "Can the chatbot message customers first, like a reminder?",
        a: "Within 24 hours of a customer's last message, the bot can reply freely. Outside that window, WhatsApp only allows message templates that Meta has approved, such as an appointment reminder or an order update. I set up the templates you need and keep the bot inside these rules.",
      },
      {
        q: "What is the difference between the WhatsApp Business app and the API?",
        a: "Meta built the WhatsApp Business app for small business owners who reply from a phone, with greeting and away messages. The WhatsApp Business Platform, through the Cloud API, connects WhatsApp to software, so an AI assistant, your calendar and your CRM can all work on the same chats. The assistant I build needs the Cloud API.",
      },
      {
        q: "Do customers need to opt in before the bot messages them?",
        a: "Yes, before you message them first. Meta's WhatsApp Business Messaging Policy says you may only contact people who gave you their number and agreed to receive messages from you. I add a clear opt-in at checkout or booking and store it. When a customer messages you first, the bot can reply within the 24-hour window.",
      },
      {
        q: "Does a person on my team still need to reply sometimes?",
        a: "Yes, and Meta expects it. Its WhatsApp Business Messaging Policy says automated replies must come with a clear way to reach a person, such as a hand-off in the chat, a phone number or an email. I build human takeover into every assistant, and whoever steps in sees the whole conversation, so the customer never starts again.",
      },
      {
        q: "How is customer data handled?",
        a: `Messages travel through Meta's WhatsApp platform, and the logs and customer details the assistant keeps stay in your own database. I keep only what the conversation needs and can delete a person's chat logs on request. ${gulfLaw}`,
      },
      gulfFaq("WhatsApp assistants", "testing and changes after launch"),
    ],
  },
  {
    slug: "ai-voice-agent",
    anchor: "ai-voice-agent",
    title: "AI voice agent",
    oneLiner: "A phone receptionist that answers questions and books appointments, 24/7.",
    includes: [
      "A phone number answered by AI around the clock",
      "Answers FAQs and books appointments",
      "Natural voice with low latency",
      "Call transcripts and summaries",
      "Calendar and CRM integration",
      "Escalation to a human when needed",
    ],
    fiverr: "",
    icon: "Voice",
    seoTitle: "AI Voice Agent for Small Business: AI Phone Receptionist",
    metaDescription:
      "An AI voice agent for small business that answers your phone around the clock, handles common questions, books appointments and passes hard calls to you.",
    headline: "An AI voice agent for small business that picks up when you can't",
    intro:
      "For clinics, salons, workshops and other small businesses that miss calls when the team is busy or the office is closed. I build a phone receptionist that answers questions, books appointments in your calendar and sends you a summary of every call.",
    whatIs: {
      q: "What is an AI phone receptionist?",
      a: "An AI phone receptionist is a voice agent that answers your business line and talks with callers in a natural voice. It handles the routine calls, such as opening hours, directions, bookings and changes, around the clock. It passes anything complex to a person and sends you a transcript and summary of every call.",
    },
    keywords: [
      "ai voice agent for small business",
      "arabic voice ai agent",
      "ai receptionist for clinics",
      "ai phone receptionist",
      "ai voice agent development",
    ],
    problems: [
      "We miss calls when everyone is with a customer.",
      "After hours, the phone just rings out.",
      "We get the same few questions on the phone all day.",
      "Bookings taken by phone end up on sticky notes.",
    ],
    outcomes: [
      {
        title: "No more missed calls",
        text: "Every call gets answered, after hours and when your whole team is busy with customers.",
      },
      {
        title: "Bookings in your calendar",
        text: "Appointments made on the phone land straight in your calendar, not on a sticky note.",
      },
      {
        title: "A summary of every call",
        text: "You get a transcript and a short summary, so nobody has to listen to recordings to know what happened.",
      },
      {
        title: "A person for the hard calls",
        text: "Urgent, sensitive or unclear calls go to your team, with the caller's details already captured.",
      },
    ],
    comparison: {
      title: "AI voice agent vs IVR menu vs human receptionist",
      intro:
        "An IVR menu sends callers through \"press 1, press 2\". A human receptionist can handle anything, but only during working hours and one call at a time. An AI voice agent sits in between: it talks naturally, takes the routine calls at any hour and hands the rest to a person.",
      columns: ["What matters", "AI voice agent", "IVR menu", "Human receptionist"],
      rows: [
        ["Hours", "Around the clock", "Around the clock", "Working hours and shifts"],
        ["How callers speak to it", "In their own words", "Keypad presses or fixed phrases", "Natural conversation"],
        ["Bookings", "Books and moves slots in your calendar", "Usually routes the call to a person", "Yes, by hand"],
        ["Several calls at once", "Yes", "Yes", "One call at a time"],
        ["Complex or sensitive calls", "Hands them to a person", "Sends them to a queue", "Handles them best"],
        ["Call records", "Transcript and summary of every call", "Call logs and key presses", "Notes, if someone writes them"],
        ["Local names and accents", "Needs testing with your own names", "Not an issue with a keypad", "Handles them well"],
      ],
    },
    useCases: [
      {
        title: "Clinics",
        text: "The agent answers calls about timings, doctors and services, books and moves appointments, and sends anything clinical or urgent straight to staff. Saudi Arabia's PDPL treats health data as sensitive, so it collects only what a booking needs.",
      },
      {
        title: "AC and home maintenance",
        text: "In the busy summer weeks, it takes every call, captures the address and the problem, and books a visit slot. It repeats the area name back to the caller, because place names are where speech AI often slips.",
      },
      {
        title: "Car service centres",
        text: "It books service appointments, answers questions about opening hours and what to bring, and takes a message for an advisor when the caller needs a quote or an update on their car.",
      },
      {
        title: "Real estate offices",
        text: "After-hours calls from listing ads still get answered. The agent asks what the caller is looking for, notes the area and the timing, and books a callback with an agent for the next morning.",
      },
    ],
    process: [
      {
        title: "Script the calls",
        text: "We write down the calls you get: the questions, the bookings and the moments a person must take over. That becomes the agent's job description.",
      },
      {
        title: "Build and connect",
        text: "I set up the phone number, the voice and the speech models, and connect your calendar and CRM so bookings land in the right place.",
      },
      {
        title: "Test with your names",
        text: "I test with real phrases, including your service names, staff names and local place names, because names are where speech AI often slips.",
      },
      {
        title: "Go live and review",
        text: "It answers calls around the clock and sends transcripts and summaries. We review the first calls together and fix anything it misheard.",
      },
    ],
    projects: ["ai-voice-agent-platform", "zoom-ai-agents", "speed-to-lead-crm"],
    posts: ["voice-ai-names", "ai-agent-job-description"],
    faq: [
      {
        q: "What is an AI voice agent?",
        a: "An AI voice agent is a phone assistant that listens, understands and talks back in a natural voice. It can answer common questions, take or change a booking and pass the call to a person when it should. Every call is transcribed and summarised, so your team can see what was said without listening back.",
      },
      {
        q: "Can it work as an AI receptionist for a clinic?",
        a: "Yes, for front-desk work: opening hours, location, services, and booking or moving appointments in your calendar. It doesn't give medical advice. Anything clinical, urgent or sensitive goes straight to your staff. I write those limits down before building, so the agent knows exactly what it may and may not handle.",
      },
      {
        q: "Can the voice agent speak Arabic?",
        a: "Yes. I build voice agents in English and Arabic, and I test them with real phrases from your callers before launch, including your service names, staff names and local place names. Speech AI usually gets the sentence right and the name wrong, so I give the speech model a list of names to expect and have the agent confirm key details out loud.",
      },
      {
        q: "What happens when the AI can't answer?",
        a: "It says so and hands over. Depending on what you choose, the agent transfers the call to a person, takes a message or books a callback. You get the transcript and a short summary, so whoever calls back already knows the full story.",
      },
      {
        q: "Will callers know they are talking to AI?",
        a: "They should, and I recommend the agent says so at the start of every call. It is honest, it sets the right expectations, and callers can ask for a person at any time. Some places also have rules about telling callers when AI or call recording is used, so we check yours before launch.",
      },
      {
        q: "Can it book appointments directly in our calendar?",
        a: "Yes. It checks free slots in your calendar, offers the caller a few times, books the one they choose and repeats the date and time back before ending the call. If nothing fits, it takes a callback request instead. Bookings land in the calendar your team already uses, with the caller's name and number attached.",
      },
      {
        q: "Can it make outbound calls, like callbacks or reminders?",
        a: "Yes. I have built callback and outbound dialers that check consent and calling hours before they dial, and retry on a set schedule when nobody answers. Rules on consent and calling times differ by country, so we agree on them before anything dials. Every outbound call is logged with its transcript and outcome.",
      },
      {
        q: "Which voice AI platform do you use?",
        a: "I have built voice agents on Retell AI and brand-voice speech with ElevenLabs, and I pick the speech and voice providers per project, by language and call quality. In the voice platform I built, the agent saves answers during the call, but changes to a name, address or phone number wait for a person to approve them.",
      },
      {
        q: "Are calls recorded, and how is the data kept safe?",
        a: `Calls are usually recorded and transcribed, so the agent says so at the start. I have built redaction that removes card numbers and passwords from call transcripts as they are spoken, and transcripts are stored in your own database. ${gulfLaw}`,
      },
      gulfFaq("voice agents", "test sessions and fixes after launch"),
    ],
  },
];
